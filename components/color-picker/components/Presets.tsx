import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import type { AggregationColor } from '../color';
import type { PresetsItem } from '../interface';
import { generateColor } from '../util';

/** Preset swatches. Exposed via panelRender `components.Presets`. */
export default defineComponent({
  name: 'AColorPickerPresets',
  props: {
    prefixCls: { type: String, required: true },
    presets: { type: Array as PropType<PresetsItem[]> },
    disabled: Boolean,
  },
  emits: ['change', 'changeComplete'],
  setup(props, { emit }) {
    const onPresetClick = (c: string | AggregationColor) => {
      if (props.disabled) return;
      const next = generateColor(c);
      emit('change', next);
      emit('changeComplete', next);
    };

    return () => {
      if (!props.presets?.length) return null;
      const pre = props.prefixCls;
      return (
        <div class={`${pre}-presets`}>
          {props.presets.map((group, gi) => (
            <div class={`${pre}-presets-group`} key={group.key ?? gi}>
              {group.label != null && (
                <div class={`${pre}-presets-label`}>{group.label as any}</div>
              )}
              <div class={`${pre}-presets-colors`}>
                {group.colors.map((c, ci) => {
                  const color = generateColor(c);
                  return (
                    <div
                      key={ci}
                      class={`${pre}-presets-color`}
                      style={{ background: color.toRgbString() }}
                      onClick={() => onPresetClick(c)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      );
    };
  },
});
