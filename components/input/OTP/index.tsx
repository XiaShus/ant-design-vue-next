import type { PropType, VNodeChild } from 'vue';
import { computed, defineComponent, ref, watch } from 'vue';
import classNames from '../../_util/classNames';
import { initDefaultProps } from '../../_util/props-util';
import useConfigInject from '../../config-provider/hooks/useConfigInject';
import { FormItemInputContext } from '../../form/FormItemContext';
import { getMergedStatus } from '../../_util/statusUtils';
import type { SizeType } from '../../config-provider';
import type { InputStatus } from '../../_util/statusUtils';
import useStyle from '../style/otp';
import OTPInput from './OTPInput';

function strToArr(str: string) {
  return (str || '').split('');
}

export const otpProps = () => ({
  length: { type: Number, default: 6 },
  size: String as PropType<SizeType>,
  defaultValue: String,
  value: String,
  formatter: Function as PropType<(value: string) => string>,
  separator: {
    type: [String, Number, Object, Function] as PropType<
      VNodeChild | ((index: number) => VNodeChild)
    >,
  },
  disabled: { type: Boolean, default: undefined },
  status: String as PropType<InputStatus>,
  mask: { type: [Boolean, String] as PropType<boolean | string> },
  type: String,
  autoComplete: String,
  autofocus: Boolean,
  inputMode: String,
  bordered: { type: Boolean, default: true },
  rootClassName: String,
});

export type OTPProps = Partial<import('vue').ExtractPropTypes<ReturnType<typeof otpProps>>>;

const OTP = defineComponent({
  name: 'AInputOTP',
  inheritAttrs: false,
  props: initDefaultProps(otpProps(), {
    length: 6,
    bordered: true,
  }),
  emits: ['update:value', 'change', 'input', 'focus'],
  setup(props, { attrs, emit, expose }) {
    const { prefixCls, size: contextSize, direction } = useConfigInject('otp', props);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    const formItemInputContext = FormItemInputContext.useInject();
    const mergedStatus = computed(() => getMergedStatus(formItemInputContext.status, props.status));
    const mergedSize = computed(() => props.size ?? contextSize.value);

    const format = (txt: string) => (props.formatter ? props.formatter(txt) : txt);

    const valueCells = ref<string[]>(
      strToArr(format((props.value !== undefined ? props.value : props.defaultValue) || '')),
    );
    const inputsRef = ref<Record<number, any>>({});
    const containerRef = ref<HTMLDivElement>();

    watch(
      () => props.value,
      v => {
        if (v !== undefined) {
          valueCells.value = strToArr(v);
        }
      },
    );

    expose({
      focus: () => inputsRef.value[0]?.focus?.(),
      blur: () => {
        for (let i = 0; i < props.length; i += 1) {
          inputsRef.value[i]?.blur?.();
        }
      },
      nativeElement: containerRef,
    });

    const triggerValueCellsChange = (next: string[]) => {
      const prev = valueCells.value;
      valueCells.value = next;
      emit('input', next);
      if (
        next.length === props.length &&
        next.every(c => c) &&
        next.some((c, i) => prev[i] !== c)
      ) {
        const joined = next.join('');
        emit('update:value', joined);
        emit('change', joined);
      }
    };

    const patchValue = (index: number, txt: string) => {
      let nextCells = [...valueCells.value];
      for (let i = 0; i < index; i += 1) {
        if (!nextCells[i]) nextCells[i] = '';
      }
      if (txt.length <= 1) {
        nextCells[index] = txt;
      } else {
        nextCells = nextCells.slice(0, index).concat(strToArr(txt));
      }
      nextCells = nextCells.slice(0, props.length);
      for (let i = nextCells.length - 1; i >= 0; i -= 1) {
        if (nextCells[i]) break;
        nextCells.pop();
      }
      const formatted = format(nextCells.map(c => c || ' ').join(''));
      nextCells = strToArr(formatted).map((c, i) => {
        if (c === ' ' && !nextCells[i]) return nextCells[i];
        return c;
      });
      return nextCells;
    };

    const onInputChange = (index: number, txt: string) => {
      const nextCells = patchValue(index, txt);
      const nextIndex = Math.min(index + Math.max(txt.length, 1), props.length - 1);
      if (nextIndex !== index && nextCells[index] !== undefined) {
        inputsRef.value[nextIndex]?.focus?.();
      }
      triggerValueCellsChange(nextCells);
    };

    const onActiveChange = (nextIndex: number) => {
      if (nextIndex >= 0 && nextIndex < props.length) {
        inputsRef.value[nextIndex]?.focus?.();
      }
    };

    const onInputFocus = (event: FocusEvent, index: number) => {
      for (let i = 0; i < index; i += 1) {
        if (!valueCells.value[i]) {
          inputsRef.value[i]?.focus?.();
          break;
        }
      }
      emit('focus', event);
    };

    return () => {
      const pre = prefixCls.value;
      const length = props.length;
      const nodes: any[] = [];

      for (let index = 0; index < length; index += 1) {
        const singleValue = valueCells.value[index] || '';
        nodes.push(
          <OTPInput
            key={`otp-${index}`}
            ref={(el: any) => {
              if (el) inputsRef.value[index] = el;
            }}
            index={index}
            size={mergedSize.value}
            status={mergedStatus.value}
            disabled={props.disabled}
            mask={props.mask}
            type={props.type}
            inputMode={props.inputMode}
            autoComplete={props.autoComplete}
            autofocus={index === 0 && props.autofocus}
            bordered={props.bordered}
            class={`${pre}-input`}
            value={singleValue}
            onChange={onInputChange}
            onActiveChange={onActiveChange}
            onFocus={(e: FocusEvent) => onInputFocus(e, index)}
          />,
        );
        if (index < length - 1 && props.separator != null) {
          const sep =
            typeof props.separator === 'function' ? props.separator(index) : props.separator;
          if (sep != null && sep !== false) {
            nodes.push(
              <span key={`sep-${index}`} class={`${pre}-separator`}>
                {sep as any}
              </span>,
            );
          }
        }
      }

      return wrapSSR(
        <div
          {...attrs}
          ref={containerRef}
          role="group"
          class={classNames(pre, hashId.value, props.rootClassName, attrs.class as string, {
            [`${pre}-sm`]: mergedSize.value === 'small',
            [`${pre}-lg`]: mergedSize.value === 'large',
            [`${pre}-rtl`]: direction.value === 'rtl',
          })}
        >
          {nodes}
        </div>,
      );
    };
  },
});

export default OTP;
