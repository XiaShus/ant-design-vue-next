import type { PropType } from 'vue';
import { computed, defineComponent, ref, watch } from 'vue';
import Select from '../../select';
import Input from '../../input';
import type { AggregationColor } from '../color';
import type { ColorFormatType } from '../interface';
import { generateColor } from '../util';
import Saturation from './Saturation';
import Slider from './Slider';
import ColorBlock from './ColorBlock';

/** Color picker body (saturation / sliders / input). Exposed via panelRender `components.Picker`. */
export default defineComponent({
  name: 'AColorPickerPicker',
  props: {
    prefixCls: { type: String, required: true },
    value: { type: Object as PropType<AggregationColor>, required: true },
    format: { type: String as PropType<ColorFormatType>, default: 'hex' },
    disabledAlpha: Boolean,
    allowClear: Boolean,
    disabled: Boolean,
  },
  emits: ['change', 'changeComplete', 'formatChange', 'clear'],
  setup(props, { emit }) {
    const inputText = ref('');

    const syncInput = () => {
      const color = props.value;
      if (color.cleared) {
        inputText.value = '';
        return;
      }
      switch (props.format) {
        case 'rgb':
          inputText.value = color.toRgbString();
          break;
        case 'hsb':
          inputText.value = color.toHsbString();
          break;
        default:
          inputText.value = color.toHexString().toUpperCase();
      }
    };

    watch(() => [props.value, props.format], syncInput, { immediate: true, deep: true });

    const rgbString = computed(() =>
      props.value.cleared ? 'rgba(0,0,0,0)' : props.value.toRgbString(),
    );

    const onHueChange = (hue: number) => {
      const { s, b, a } = props.value.toHsb();
      emit('change', generateColor({ h: hue, s, b, a }));
    };
    const onHueComplete = (hue: number) => {
      const { s, b, a } = props.value.toHsb();
      emit('changeComplete', generateColor({ h: hue, s, b, a }));
    };
    const onAlphaChange = (alpha: number) => {
      const { h, s, b } = props.value.toHsb();
      emit('change', generateColor({ h, s, b, a: alpha }));
    };
    const onAlphaComplete = (alpha: number) => {
      const { h, s, b } = props.value.toHsb();
      emit('changeComplete', generateColor({ h, s, b, a: alpha }));
    };

    const onInputCommit = () => {
      const next = generateColor(inputText.value || null);
      if (!inputText.value) {
        next.cleared = true;
      }
      emit('change', next);
      emit('changeComplete', next);
    };

    return () => {
      const pre = props.prefixCls;
      const hsb = props.value.toHsb();
      return (
        <div class={`${pre}-inner`}>
          <Saturation
            prefixCls={pre}
            value={props.value}
            onChange={c => emit('change', c)}
            onChangeComplete={c => emit('changeComplete', c)}
          />
          <div class={`${pre}-slider-container`}>
            <div class={`${pre}-slider-group`}>
              <Slider
                prefixCls={pre}
                type="hue"
                value={hsb.h}
                onChange={onHueChange}
                onChangeComplete={onHueComplete}
              />
              {!props.disabledAlpha && (
                <Slider
                  prefixCls={pre}
                  type="alpha"
                  value={hsb.a}
                  color={rgbString.value}
                  onChange={onAlphaChange}
                  onChangeComplete={onAlphaComplete}
                />
              )}
            </div>
            <ColorBlock prefixCls={pre} color={rgbString.value} />
          </div>
          <div class={`${pre}-input-container`}>
            <Select
              size="small"
              value={props.format}
              options={[
                { value: 'hex', label: 'HEX' },
                { value: 'rgb', label: 'RGB' },
                { value: 'hsb', label: 'HSB' },
              ]}
              onChange={(v: ColorFormatType) => emit('formatChange', v)}
              getPopupContainer={n => n.parentElement || document.body}
              style={{ width: 68 }}
            />
            <Input
              size="small"
              value={inputText.value}
              onChange={e => {
                inputText.value = (e.target as HTMLInputElement).value;
              }}
              onPressEnter={onInputCommit}
              onBlur={onInputCommit}
            />
            {props.allowClear && (
              <div
                class={`${pre}-clear`}
                role="button"
                tabindex={0}
                onClick={() => emit('clear')}
                title="Clear"
              />
            )}
          </div>
        </div>
      );
    };
  },
});
