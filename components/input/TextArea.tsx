import type { CSSProperties } from 'vue';
import {
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  shallowRef,
  watch,
  watchEffect,
} from 'vue';
import ClearableLabeledInput from './ClearableLabeledInput';
import ResizableTextArea from './ResizableTextArea';
import { textAreaProps } from './inputProps';
import type { InputFocusOptions } from '../vc-input/utils/commonUtils';
import { fixControlledValue, resolveOnChange, triggerFocus } from '../vc-input/utils/commonUtils';
import {
  formatCountDisplay,
  getCountLength,
  resolveCountConfig,
} from '../vc-input/utils/countUtil';
import classNames from '../_util/classNames';
import { FormItemInputContext, useInjectFormItemContext } from '../form/FormItemContext';
import type { FocusEventHandler } from '../_util/EventInterface';
import useConfigInject from '../config-provider/hooks/useConfigInject';
import omit from '../_util/omit';
import type { VueNode } from '../_util/type';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';

// CSSINJS
import useStyle from './style';
import { useInjectDisabled } from '../config-provider/DisabledContext';
import useVariant from '../config-provider/hooks/useVariant';

function fixEmojiLength(value: string, maxLength: number) {
  return [...(value || '')].slice(0, maxLength).join('');
}

function setTriggerValue(
  isCursorInEnd: boolean,
  preValue: string,
  triggerValue: string,
  maxLength: number,
) {
  let newTriggerValue = triggerValue;
  if (isCursorInEnd) {
    // 光标在尾部，直接截断
    newTriggerValue = fixEmojiLength(triggerValue, maxLength);
  } else if (
    [...(preValue || '')].length < triggerValue.length &&
    [...(triggerValue || '')].length > maxLength
  ) {
    // 光标在中间，如果最后的值超过最大值，则采用原先的值
    newTriggerValue = preValue;
  }
  return newTriggerValue;
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ATextarea',
  inheritAttrs: false,
  props: textAreaProps(),
  setup(props, { attrs, expose, emit }) {
    const formItemContext = useInjectFormItemContext();
    const formItemInputContext = FormItemInputContext.useInject();
    const mergedStatus = computed(() => getMergedStatus(formItemInputContext.status, props.status));
    const stateValue = shallowRef(props.value ?? props.defaultValue);
    const resizableTextArea = shallowRef();
    const mergedValue = shallowRef('');
    const { prefixCls, size, direction } = useConfigInject('input', props);
    const variant = useVariant(props);

    // Style
    const [wrapSSR, hashId] = useStyle(prefixCls);
    const disabled = useInjectDisabled();

    const showCount = computed(() => {
      return (props.showCount as any) === '' || props.showCount || !!props.count || false;
    });
    // Max length value
    const hasMaxLength = computed(() => Number(props.maxlength) > 0);
    const compositing = shallowRef(false);

    const oldCompositionValueRef = shallowRef<string>();
    const oldSelectionStartRef = shallowRef<number>(0);
    const onInternalCompositionStart = (e: CompositionEvent) => {
      compositing.value = true;
      // 拼音输入前保存一份旧值
      oldCompositionValueRef.value = mergedValue.value;
      // 保存旧的光标位置
      oldSelectionStartRef.value = (e.currentTarget as any).selectionStart;
      emit('compositionstart', e);
    };

    const onInternalCompositionEnd = (e: CompositionEvent) => {
      compositing.value = false;
      let triggerValue = (e.currentTarget as any).value;
      if (hasMaxLength.value) {
        const isCursorInEnd =
          oldSelectionStartRef.value >= props.maxlength + 1 ||
          oldSelectionStartRef.value === oldCompositionValueRef.value?.length;
        triggerValue = setTriggerValue(
          isCursorInEnd,
          oldCompositionValueRef.value,
          triggerValue,
          props.maxlength,
        );
      }
      // Patch composition onChange when value changed
      if (triggerValue !== mergedValue.value) {
        setValue(triggerValue);
        resolveOnChange(e.currentTarget as any, e, triggerChange, triggerValue);
      }

      emit('compositionend', e);
    };
    const instance = getCurrentInstance();
    watch(
      () => props.value,
      () => {
        if ('value' in instance.vnode.props || {}) {
          stateValue.value = props.value ?? '';
        }
      },
    );

    const focus = (option?: InputFocusOptions) => {
      triggerFocus(resizableTextArea.value?.textArea, option);
    };

    const blur = () => {
      resizableTextArea.value?.textArea?.blur();
    };

    const setValue = (value: string | number, callback?: Function) => {
      if (stateValue.value === value) {
        return;
      }
      if (props.value === undefined) {
        stateValue.value = value;
      } else {
        nextTick(() => {
          if (resizableTextArea.value.textArea.value !== mergedValue.value) {
            resizableTextArea.value?.instance.update?.();
          }
        });
      }
      nextTick(() => {
        callback && callback();
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        emit('pressEnter', e);
      }
      emit('keydown', e);
    };

    const onBlur: FocusEventHandler = e => {
      const { onBlur } = props;
      onBlur?.(e);
      formItemContext.onFieldBlur();
    };
    const triggerChange = (e: Event) => {
      emit('update:value', (e.target as HTMLInputElement).value);
      emit('change', e);
      emit('input', e);
      formItemContext.onFieldChange();
    };

    const handleReset = (e: MouseEvent) => {
      props.onClear?.(e);
      resolveOnChange(resizableTextArea.value.textArea, e, triggerChange);
      setValue('', () => {
        focus();
      });
    };

    const handleChange = (e: Event) => {
      let triggerValue = (e.target as any).value;
      if (stateValue.value === triggerValue) return;

      if (hasMaxLength.value) {
        // 1. 复制粘贴超过maxlength的情况 2.未超过maxlength的情况
        const target = e.target as any;
        const isCursorInEnd =
          target.selectionStart >= props.maxlength + 1 ||
          target.selectionStart === triggerValue.length ||
          !target.selectionStart;
        triggerValue = setTriggerValue(
          isCursorInEnd,
          mergedValue.value,
          triggerValue,
          props.maxlength,
        );
      }
      const countConfig = resolveCountConfig(props.count, props.showCount);
      if (
        countConfig &&
        countConfig.max != null &&
        countConfig.exceedFormatter &&
        getCountLength(triggerValue, countConfig.strategy) > countConfig.max
      ) {
        triggerValue = countConfig.exceedFormatter(triggerValue, { max: countConfig.max });
      }
      resolveOnChange(e.currentTarget as any, e, triggerChange, triggerValue);
      setValue(triggerValue);
    };
    const renderTextArea = () => {
      const { class: customClass } = attrs;
      const mergedVariant = variant.value;
      const resizeProps = {
        ...omit(props, [
          'allowClear',
          'bordered',
          'variant',
          'classNames',
          'styles',
          'onClear',
          'count',
          'showCount',
        ]),
        ...attrs,
        class: [
          {
            [`${prefixCls.value}-borderless`]: mergedVariant === 'borderless',
            [`${prefixCls.value}-filled`]: mergedVariant === 'filled',
            [`${prefixCls.value}-underlined`]: mergedVariant === 'underlined',
            [`${customClass}`]: customClass && !showCount.value,
            [`${prefixCls.value}-sm`]: size.value === 'small',
            [`${prefixCls.value}-lg`]: size.value === 'large',
          },
          getStatusClassNames(prefixCls.value, mergedStatus.value),
          hashId.value,
          props.classNames?.textarea,
        ],
        style: { ...(attrs.style as CSSProperties), ...props.styles?.textarea },
        disabled: disabled.value,
        showCount: null,
        prefixCls: prefixCls.value,
        onInput: handleChange,
        onChange: handleChange,
        onBlur,
        onKeydown: handleKeyDown,
        onCompositionstart: onInternalCompositionStart,
        onCompositionend: onInternalCompositionEnd,
      };
      if (props.valueModifiers?.lazy) {
        delete resizeProps.onInput;
      }
      return (
        <ResizableTextArea
          {...resizeProps}
          id={resizeProps?.id ?? formItemContext.id.value}
          ref={resizableTextArea}
          maxlength={props.maxlength}
          lazy={props.lazy}
        />
      );
    };

    expose({
      focus,
      blur,
      resizableTextArea,
    });

    watchEffect(() => {
      let val = fixControlledValue(stateValue.value);
      if (
        !compositing.value &&
        hasMaxLength.value &&
        (props.value === null || props.value === undefined)
      ) {
        // fix #27612 将value转为数组进行截取，解决 '😂'.length === 2 等emoji表情导致的截取乱码的问题
        val = fixEmojiLength(val, props.maxlength);
      }
      mergedValue.value = val;
    });
    return () => {
      const { maxlength, hidden } = props;
      const { style, class: customClass } = attrs;
      const mergedVariant = variant.value;
      const inputProps: any = {
        ...props,
        ...attrs,
        prefixCls: prefixCls.value,
        inputType: 'text',
        handleReset,
        direction: direction.value,
        bordered: mergedVariant !== 'borderless',
        variant: mergedVariant,
        style: showCount.value ? undefined : style,
        hashId: hashId.value,
        disabled: props.disabled ?? disabled.value,
      };

      let textareaNode = (
        <ClearableLabeledInput
          {...omit(inputProps, ['classNames', 'styles', 'onClear'])}
          value={mergedValue.value}
          affixWrapperClassName={props.classNames?.affixWrapper}
          affixWrapperStyle={props.styles?.affixWrapper}
          v-slots={{ element: renderTextArea }}
          status={props.status}
        />
      );

      const countConfig = resolveCountConfig(props.count, props.showCount as any);
      const showCountNode = !!countConfig && countConfig.show !== false;
      if (showCountNode || formItemInputContext.hasFeedback) {
        const valueLength = countConfig
          ? getCountLength(mergedValue.value, countConfig.strategy)
          : [...mergedValue.value].length;
        let dataCount: VueNode = '';
        if (countConfig) {
          dataCount = formatCountDisplay(countConfig, mergedValue.value, valueLength, maxlength);
        } else {
          dataCount = `${valueLength}${hasMaxLength.value ? ` / ${maxlength}` : ''}`;
        }
        const outOfRange =
          !!countConfig && countConfig.max != null && valueLength > countConfig.max;
        textareaNode = (
          <div
            hidden={hidden}
            class={classNames(
              `${prefixCls.value}-textarea`,
              {
                [`${prefixCls.value}-textarea-rtl`]: direction.value === 'rtl',
                [`${prefixCls.value}-textarea-show-count`]: showCountNode,
                [`${prefixCls.value}-textarea-in-form-item`]: formItemInputContext.isFormItemInput,
                [`${prefixCls.value}-out-of-range`]: outOfRange,
              },
              showCountNode && `${prefixCls.value}-textarea-show-count`,
              customClass,
              hashId.value,
              props.classNames?.count,
            )}
            style={{ ...(style as CSSProperties), ...props.styles?.count }}
            data-count={typeof dataCount !== 'object' ? dataCount : undefined}
          >
            {textareaNode}
            {formItemInputContext.hasFeedback && (
              <span class={`${prefixCls.value}-textarea-suffix`}>
                {formItemInputContext.feedbackIcon}
              </span>
            )}
          </div>
        );
      }
      return wrapSSR(textareaNode);
    };
  },
});
