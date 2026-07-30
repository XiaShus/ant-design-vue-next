import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';
import type { AggregationColor } from '../color';
import { generateColor } from '../util';

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default defineComponent({
  name: 'AColorSaturation',
  props: {
    prefixCls: String,
    value: { type: Object as PropType<AggregationColor>, required: true },
  },
  emits: ['change', 'changeComplete'],
  setup(props, { emit }) {
    const hueColor = computed(() => {
      const { h } = props.value.toHsb();
      return `hsl(${h}, 100%, 50%)`;
    });

    const pointerStyle = computed(() => {
      const { s, b } = props.value.toHsb();
      return {
        left: `${s * 100}%`,
        top: `${(1 - b) * 100}%`,
      };
    });

    const updateFromEvent = (e: MouseEvent | TouchEvent, complete?: boolean) => {
      const target = (e.currentTarget || e.target) as HTMLElement;
      const rect = target.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0]?.clientX ?? 0 : e.clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY ?? 0 : e.clientY;
      const x = clamp((clientX - rect.left) / rect.width, 0, 1);
      const y = clamp((clientY - rect.top) / rect.height, 0, 1);
      const { h, a } = props.value.toHsb();
      const next = generateColor({ h, s: x, b: 1 - y, a });
      emit('change', next);
      if (complete) emit('changeComplete', next);
    };

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      updateFromEvent(e);
      const onMove = (ev: MouseEvent) => updateFromEvent(ev);
      const onUp = (ev: MouseEvent) => {
        updateFromEvent(ev, true);
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    };

    return () => (
      <div
        class={`${props.prefixCls}-saturation`}
        style={{ backgroundColor: hueColor.value }}
        onMousedown={onMouseDown}
      >
        <div class={`${props.prefixCls}-saturation-handler`} style={pointerStyle.value} />
      </div>
    );
  },
});
