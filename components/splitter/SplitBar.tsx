import type { PropType } from 'vue';
import { defineComponent, ref } from 'vue';
import LeftOutlined from '@ant-design/icons-vue/LeftOutlined';
import RightOutlined from '@ant-design/icons-vue/RightOutlined';
import UpOutlined from '@ant-design/icons-vue/UpOutlined';
import DownOutlined from '@ant-design/icons-vue/DownOutlined';
import classNames from '../_util/classNames';

export type ShowCollapsibleIconMode = boolean | 'auto';

export default defineComponent({
  name: 'ASplitterBar',
  props: {
    prefixCls: { type: String, required: true },
    index: { type: Number, required: true },
    vertical: Boolean,
    resizable: { type: Boolean, default: true },
    active: Boolean,
    lazy: Boolean,
    ariaNow: Number,
    ariaMin: Number,
    ariaMax: Number,
    startCollapsible: Boolean,
    endCollapsible: Boolean,
    showStartCollapsibleIcon: {
      type: [Boolean, String] as PropType<ShowCollapsibleIconMode>,
      default: 'auto' as ShowCollapsibleIconMode,
    },
    showEndCollapsibleIcon: {
      type: [Boolean, String] as PropType<ShowCollapsibleIconMode>,
      default: 'auto' as ShowCollapsibleIconMode,
    },
    containerSize: { type: Number, default: 0 },
  },
  emits: ['start', 'move', 'end', 'collapse'],
  setup(props, { emit }) {
    const dragging = ref(false);
    const startPos = ref<{ x: number; y: number } | null>(null);
    const previewOffset = ref(0);

    const getConstrainedOffset = (rawOffset: number) => {
      const size = props.containerSize;
      if (!size) return rawOffset;
      const currentPos = props.ariaNow ?? 0;
      const minAllowed = props.ariaMin ?? 0;
      const maxAllowed = props.ariaMax ?? size;
      const clampedPos = Math.max(minAllowed, Math.min(maxAllowed, currentPos + rawOffset));
      return clampedPos - currentPos;
    };

    const onMouseDown = (e: MouseEvent) => {
      if (!props.resizable) return;
      e.preventDefault();
      e.stopPropagation();
      dragging.value = true;
      startPos.value = { x: e.clientX, y: e.clientY };
      previewOffset.value = 0;
      emit('start', props.index, e.clientX, e.clientY);

      const onMove = (ev: MouseEvent) => {
        if (!startPos.value) return;
        const offsetX = ev.clientX - startPos.value.x;
        const offsetY = ev.clientY - startPos.value.y;
        if (props.lazy) {
          previewOffset.value = getConstrainedOffset(props.vertical ? offsetY : offsetX);
        } else {
          emit('move', props.index, ev.clientX, ev.clientY);
        }
      };
      const onUp = (ev: MouseEvent) => {
        if (props.lazy && startPos.value) {
          const x = startPos.value.x + (props.vertical ? 0 : previewOffset.value);
          const y = startPos.value.y + (props.vertical ? previewOffset.value : 0);
          emit('move', props.index, x, y);
        }
        dragging.value = false;
        startPos.value = null;
        previewOffset.value = 0;
        emit('end', props.index);
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
        void ev;
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    };

    const visibilityClass = (mode: ShowCollapsibleIconMode) => {
      const bar = `${props.prefixCls}-bar`;
      if (mode === true) return `${bar}-collapse-bar-always-visible`;
      if (mode === false) return `${bar}-collapse-bar-always-hidden`;
      return `${bar}-collapse-bar-hover-only`;
    };

    const onCollapse = (type: 'start' | 'end', e: Event) => {
      e.stopPropagation();
      e.preventDefault();
      emit('collapse', props.index, type);
    };

    return () => {
      const barCls = `${props.prefixCls}-bar`;
      const StartIcon = props.vertical ? UpOutlined : LeftOutlined;
      const EndIcon = props.vertical ? DownOutlined : RightOutlined;
      const previewStyle = props.lazy
        ? ({ ['--splitter-bar-preview-offset' as any]: `${previewOffset.value}px` } as any)
        : undefined;

      return (
        <div
          class={classNames(barCls, {
            [`${barCls}-active`]: props.active || dragging.value,
            [`${barCls}-disabled`]: !props.resizable,
          })}
          style={previewStyle}
          role="separator"
          aria-orientation={props.vertical ? 'horizontal' : 'vertical'}
          aria-valuenow={props.ariaNow}
          aria-valuemin={props.ariaMin}
          aria-valuemax={props.ariaMax}
          tabindex={props.resizable ? 0 : -1}
          onMousedown={onMouseDown}
        >
          {props.lazy && dragging.value ? (
            <div class={`${barCls}-preview`} aria-hidden="true" />
          ) : null}
          <div class={`${barCls}-dragger`} />
          {props.startCollapsible && (
            <div
              class={classNames(
                `${barCls}-collapse-bar`,
                `${barCls}-collapse-bar-start`,
                visibilityClass(props.showStartCollapsibleIcon),
              )}
              role="button"
              tabindex={0}
              onMousedown={(e: MouseEvent) => e.stopPropagation()}
              onClick={(e: MouseEvent) => onCollapse('start', e)}
            >
              <StartIcon class={`${barCls}-collapse-icon`} />
            </div>
          )}
          {props.endCollapsible && (
            <div
              class={classNames(
                `${barCls}-collapse-bar`,
                `${barCls}-collapse-bar-end`,
                visibilityClass(props.showEndCollapsibleIcon),
              )}
              role="button"
              tabindex={0}
              onMousedown={(e: MouseEvent) => e.stopPropagation()}
              onClick={(e: MouseEvent) => onCollapse('end', e)}
            >
              <EndIcon class={`${barCls}-collapse-icon`} />
            </div>
          )}
        </div>
      );
    };
  },
});
