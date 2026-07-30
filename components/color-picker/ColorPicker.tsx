import type { CSSProperties } from 'vue';
import { computed, defineComponent, ref, shallowRef, watch } from 'vue';
import Popover from '../popover';
import useConfigInject from '../config-provider/hooks/useConfigInject';
import { initDefaultProps } from '../_util/props-util';
import classNames from '../_util/classNames';
import { withInstall } from '../_util/type';
import useStyle from './style';
import { AggregationColor } from './color';
import { colorPickerProps } from './interface';
import type { ColorFormatType } from './interface';
import { generateColor, getColorAlpha } from './util';
import ColorPickerPanel from './ColorPickerPanel';
import ColorBlock from './components/ColorBlock';

const ColorPicker = defineComponent({
  name: 'AColorPicker',
  inheritAttrs: false,
  props: initDefaultProps(colorPickerProps(), {
    trigger: 'click',
    placement: 'bottomLeft',
    arrow: true,
    allowClear: false,
    disabledAlpha: false,
    showText: false,
    defaultFormat: 'hex',
    destroyTooltipOnHide: false,
  }),
  emits: [
    'update:value',
    'update:open',
    'change',
    'changeComplete',
    'formatChange',
    'openChange',
    'clear',
  ],
  setup(props, { attrs, slots, emit, expose }) {
    const { prefixCls, size: contextSize } = useConfigInject('color-picker', props);
    const [wrapSSR, hashId] = useStyle(prefixCls);

    const mergedSize = computed(() => props.size ?? contextSize.value);

    // shallowRef: AggregationColor has private fields; deep ref unwrap breaks the class instance
    const innerValue = shallowRef<AggregationColor>(
      generateColor(props.value ?? props.defaultValue ?? '#1677ff'),
    );
    const innerOpen = ref(!!props.open);
    const innerFormat = ref<ColorFormatType>(props.format ?? props.defaultFormat ?? 'hex');

    watch(
      () => props.value,
      v => {
        if (v !== undefined) {
          innerValue.value = generateColor(v);
        }
      },
    );
    watch(
      () => props.open,
      v => {
        if (v !== undefined) {
          innerOpen.value = v;
        }
      },
    );
    watch(
      () => props.format,
      v => {
        if (v !== undefined) {
          innerFormat.value = v;
        }
      },
    );

    const mergedDisabled = computed(() => !!props.disabled);

    const setOpen = (next: boolean) => {
      if (mergedDisabled.value && next) return;
      if (props.open === undefined) {
        innerOpen.value = next;
      }
      emit('update:open', next);
      emit('openChange', next);
    };

    const triggerChange = (color: AggregationColor) => {
      if (props.value === undefined) {
        innerValue.value = color;
      }
      const css = color.cleared ? '' : color.toCssString();
      emit('update:value', color);
      emit('change', color, css);
    };

    const onChangeComplete = (color: AggregationColor) => {
      emit('changeComplete', color);
    };

    const onClear = () => {
      const cleared = generateColor(null);
      cleared.cleared = true;
      triggerChange(cleared);
      emit('clear');
      onChangeComplete(cleared);
    };

    const onFormatChange = (format: ColorFormatType) => {
      if (props.format === undefined) {
        innerFormat.value = format;
      }
      emit('formatChange', format);
    };

    const displayText = computed(() => {
      const color = innerValue.value;
      const showText = props.showText;
      if (!showText) return null;
      if (typeof showText === 'function') return showText(color);
      if (color.cleared) return 'Transparent';
      const alpha = getColorAlpha(color);
      switch (innerFormat.value) {
        case 'rgb':
          return color.toRgbString();
        case 'hsb':
          return color.toHsbString();
        default: {
          const hex = color.toHexString().toUpperCase();
          return alpha < 100 ? `${hex.slice(0, 7)}, ${alpha}%` : hex;
        }
      }
    });

    expose({
      getValue: () => innerValue.value,
    });

    return () => {
      const pre = prefixCls.value;
      const color = innerValue.value;
      const open = props.open !== undefined ? props.open : innerOpen.value;
      const triggerCls = classNames(
        `${pre}-trigger`,
        {
          [`${pre}-trigger-active`]: open,
          [`${pre}-trigger-disabled`]: mergedDisabled.value,
          [`${pre}-trigger-${mergedSize.value}`]: mergedSize.value,
        },
        attrs.class as string,
        props.rootClassName,
        hashId.value,
      );

      const triggerNode = slots.default ? (
        slots.default()
      ) : (
        <div
          class={triggerCls}
          style={attrs.style as CSSProperties}
          role="button"
          tabindex={mergedDisabled.value ? -1 : 0}
        >
          <ColorBlock
            prefixCls={pre}
            color={color.cleared ? 'rgba(0,0,0,0)' : color.toRgbString()}
          />
          {displayText.value != null && displayText.value !== false && (
            <span class={`${pre}-trigger-text`}>{displayText.value as any}</span>
          )}
        </div>
      );

      const panel = (
        <ColorPickerPanel
          prefixCls={pre}
          value={color}
          format={innerFormat.value}
          disabledAlpha={props.disabledAlpha}
          allowClear={props.allowClear}
          presets={props.presets}
          disabled={mergedDisabled.value}
          onChange={triggerChange}
          onChangeComplete={onChangeComplete}
          onFormatChange={onFormatChange}
          onClear={onClear}
        />
      );

      return wrapSSR(
        <Popover
          open={!!open && !mergedDisabled.value}
          trigger={props.trigger}
          placement={props.placement}
          arrow={props.arrow}
          overlayClassName={classNames(`${pre}-overlay`, hashId.value)}
          onOpenChange={setOpen}
          getPopupContainer={props.getPopupContainer}
          destroyTooltipOnHide={props.destroyOnHidden ?? props.destroyTooltipOnHide}
          destroyOnHidden={props.destroyOnHidden ?? props.destroyTooltipOnHide}
          v-slots={{
            content: () => panel,
            default: () => triggerNode,
          }}
        />,
      );
    };
  },
});

export default withInstall(ColorPicker);
export { AggregationColor };
