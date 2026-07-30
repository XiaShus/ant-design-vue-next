import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default defineComponent({
  name: 'AColorSlider',
  props: {
    prefixCls: String,
    type: { type: String as PropType<'hue' | 'alpha'>, required: true },
    value: { type: Number, required: true },
    color: String,
    disabled: Boolean,
  },
  emits: ['change', 'changeComplete'],
  setup(props, { emit }) {
    const percent = computed(() => {
      if (props.type === 'hue') return (props.value / 360) * 100;
      return props.value * 100;
    });

    const updateFromEvent = (e: MouseEvent, complete?: boolean) => {
      if (props.disabled) return;
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      const next = props.type === 'hue' ? x * 360 : x;
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

    return () => {
      const cls = `${props.prefixCls}-slider`;
      return (
        <div
          class={[cls, `${cls}-${props.type}`]}
          style={
            props.type === 'alpha'
              ? {
                  background: `linear-gradient(to right, rgba(255,0,0,0), ${
                    props.color || '#ff0000'
                  })`,
                }
              : undefined
          }
          onMousedown={onMouseDown}
        >
          <div class={`${cls}-handler`} style={{ left: `${percent.value}%` }} />
        </div>
      );
    };
  },
});
