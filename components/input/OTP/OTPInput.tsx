import type { PropType } from 'vue';
import { defineComponent, nextTick, ref } from 'vue';
import classNames from '../../_util/classNames';
import Input from '../Input';

const DEFAULT_MASK = '•';

export default defineComponent({
  name: 'AOTPInput',
  inheritAttrs: false,
  props: {
    index: { type: Number, required: true },
    value: { type: String, default: '' },
    disabled: Boolean,
    size: String,
    status: String,
    mask: { type: [Boolean, String] as PropType<boolean | string> },
    type: String,
    inputMode: String,
    autoComplete: String,
    autofocus: Boolean,
    class: String,
    bordered: { type: Boolean, default: true },
  },
  emits: ['change', 'activeChange', 'focus'],
  setup(props, { emit, expose }) {
    const inputRef = ref<any>();

    const syncSelection = () => {
      nextTick(() => {
        inputRef.value?.select?.();
      });
    };

    expose({
      focus: () => inputRef.value?.focus?.(),
      blur: () => inputRef.value?.blur?.(),
      input: inputRef,
    });

    return () => {
      const prefixCls = 'ant-otp';
      const maskValue = typeof props.mask === 'string' ? props.mask : DEFAULT_MASK;
      const showMask = !!props.mask && props.value !== '' && props.value !== undefined;

      return (
        <span class={`${prefixCls}-input-wrapper`} role="presentation">
          {showMask && (
            <span class={`${prefixCls}-mask-icon`} aria-hidden="true">
              {maskValue}
            </span>
          )}
          <Input
            ref={inputRef}
            aria-label={`OTP Input ${props.index + 1}`}
            size={props.size as any}
            status={props.status as any}
            disabled={props.disabled}
            bordered={props.bordered}
            maxlength={1}
            value={props.value}
            autofocus={props.autofocus}
            autocomplete={props.autoComplete}
            type={(props.type as any) ?? (props.mask ? 'password' : 'text')}
            class={classNames(props.class, `${prefixCls}-input`, {
              [`${prefixCls}-mask-input`]: !!props.mask,
            })}
            {...(props.inputMode ? ({ inputmode: props.inputMode } as any) : {})}
            onFocus={(e: FocusEvent) => {
              emit('focus', e);
              syncSelection();
            }}
            onMousedown={syncSelection}
            onMouseup={syncSelection}
            onKeydown={(e: KeyboardEvent) => {
              const { key, ctrlKey, metaKey } = e;
              if (key === 'ArrowLeft') {
                emit('activeChange', props.index - 1);
              } else if (key === 'ArrowRight') {
                emit('activeChange', props.index + 1);
              } else if (key === 'z' && (ctrlKey || metaKey)) {
                e.preventDefault();
              } else if (key === 'Backspace' && !props.value) {
                emit('activeChange', props.index - 1);
              }
              syncSelection();
            }}
            onChange={(e: Event) => {
              emit('change', props.index, (e.target as HTMLInputElement).value);
            }}
          />
        </span>
      );
    };
  },
});
