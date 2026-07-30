import { defineComponent, ref } from 'vue';
import classNames from '../_util/classNames';

export default defineComponent({
  name: 'ASplitterBar',
  props: {
    prefixCls: { type: String, required: true },
    index: { type: Number, required: true },
    vertical: Boolean,
    resizable: { type: Boolean, default: true },
    active: Boolean,
    ariaNow: Number,
    ariaMin: Number,
    ariaMax: Number,
  },
  emits: ['start', 'move', 'end'],
  setup(props, { emit }) {
    const dragging = ref(false);

    const onMouseDown = (e: MouseEvent) => {
      if (!props.resizable) return;
      e.preventDefault();
      e.stopPropagation();
      dragging.value = true;
      emit('start', props.index, e.clientX, e.clientY);

      const onMove = (ev: MouseEvent) => {
        emit('move', props.index, ev.clientX, ev.clientY);
      };
      const onUp = () => {
        dragging.value = false;
        emit('end', props.index);
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    };

    return () => {
      const barCls = `${props.prefixCls}-bar`;
      return (
        <div
          class={classNames(barCls, {
            [`${barCls}-active`]: props.active || dragging.value,
            [`${barCls}-disabled`]: !props.resizable,
          })}
          role="separator"
          aria-orientation={props.vertical ? 'horizontal' : 'vertical'}
          aria-valuenow={props.ariaNow}
          aria-valuemin={props.ariaMin}
          aria-valuemax={props.ariaMax}
          tabindex={props.resizable ? 0 : -1}
          onMousedown={onMouseDown}
        >
          <div class={`${barCls}-dragger`} />
        </div>
      );
    };
  },
});
