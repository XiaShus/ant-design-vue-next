import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import type { AggregationColor } from './color';
import type { ColorFormatType, PresetsItem } from './interface';
import Picker from './components/Picker';
import Presets from './components/Presets';

export default defineComponent({
  name: 'AColorPickerPanel',
  props: {
    prefixCls: { type: String, required: true },
    value: { type: Object as PropType<AggregationColor>, required: true },
    format: { type: String as PropType<ColorFormatType>, default: 'hex' },
    disabledAlpha: Boolean,
    allowClear: Boolean,
    disabledFormat: Boolean,
    presets: { type: Array as PropType<PresetsItem[]> },
    disabled: Boolean,
  },
  emits: ['change', 'changeComplete', 'formatChange', 'clear'],
  setup(props, { emit }) {
    return () => {
      const pre = props.prefixCls;
      return (
        <div class={`${pre}-panel`}>
          <Picker
            prefixCls={pre}
            value={props.value}
            format={props.format}
            disabledAlpha={props.disabledAlpha}
            allowClear={props.allowClear}
            disabledFormat={props.disabledFormat}
            disabled={props.disabled}
            onChange={c => emit('change', c)}
            onChangeComplete={c => emit('changeComplete', c)}
            onFormatChange={f => emit('formatChange', f)}
            onClear={() => emit('clear')}
          />
          <Presets
            prefixCls={pre}
            presets={props.presets}
            disabled={props.disabled}
            onChange={c => emit('change', c)}
            onChangeComplete={c => emit('changeComplete', c)}
          />
        </div>
      );
    };
  },
});

export { Picker, Presets };
