import type { CSSProperties, VNode } from 'vue';
import { computed, defineComponent, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue';
import useConfigInject from '../config-provider/hooks/useConfigInject';
import { flattenChildren, initDefaultProps } from '../_util/props-util';
import classNames from '../_util/classNames';
import useStyle from './style';
import { splitterProps } from './interface';
import type { PanelProps } from './interface';
import Panel from './Panel';
import SplitBar from './SplitBar';
import { parseSizeToPx } from './util';

function getPanelProps(vnode: VNode): PanelProps {
  return { ...(vnode.props || {}) } as PanelProps;
}

function getPanelContent(vnode: VNode) {
  const children = vnode.children as any;
  if (children && typeof children === 'object' && typeof children.default === 'function') {
    return children.default();
  }
  return flattenChildren([vnode]);
}

const Splitter = defineComponent({
  name: 'ASplitter',
  inheritAttrs: false,
  props: initDefaultProps(splitterProps(), {
    layout: 'horizontal',
    lazy: false,
  }),
  emits: ['resize', 'resizeStart', 'resizeEnd', 'collapse'],
  setup(props, { attrs, slots, emit }) {
    const { prefixCls, direction } = useConfigInject('splitter', props);
    const [wrapSSR, hashId] = useStyle(prefixCls);

    const containerRef = ref<HTMLDivElement>();
    const containerSize = ref(0);
    const activeIndex = ref<number | null>(null);
    const startPos = shallowRef<{ x: number; y: number; sizes: number[] } | null>(null);
    const innerSizes = ref<number[]>([]);

    const vertical = computed(() => props.layout === 'vertical');
    const isRTL = computed(() => direction.value === 'rtl' && !vertical.value);

    const panelNodes = computed(() => {
      const children = flattenChildren(slots.default?.() || []);
      return children.filter(child => {
        const type: any = child.type;
        return type === Panel || type?.name === 'ASplitterPanel';
      });
    });

    const itemProps = computed(() => panelNodes.value.map(getPanelProps));

    const measure = () => {
      const el = containerRef.value;
      if (!el) return;
      const size = vertical.value ? el.clientHeight : el.clientWidth;
      if (size <= 0) return;
      containerSize.value = size;

      const items = itemProps.value;
      const next: Array<number | undefined> = items.map((item, i) => {
        const controlled = parseSizeToPx(item.size, size);
        if (controlled !== undefined) return controlled;
        if (innerSizes.value[i] !== undefined) return innerSizes.value[i];
        return parseSizeToPx(item.defaultSize, size);
      });

      const known = next.reduce<number>((sum, v) => sum + (v ?? 0), 0);
      const unknownIdx = next.map((v, i) => (v === undefined ? i : -1)).filter(i => i >= 0);
      if (unknownIdx.length) {
        const each = Math.max(0, size - known) / unknownIdx.length;
        unknownIdx.forEach(i => {
          next[i] = each;
        });
      } else if (known > 0 && Math.abs(known - size) > 0.5) {
        const scale = size / known;
        for (let i = 0; i < next.length; i += 1) {
          next[i] = (next[i] as number) * scale;
        }
      }
      innerSizes.value = next as number[];
    };

    let ro: ResizeObserver | undefined;
    onMounted(() => {
      measure();
      if (typeof ResizeObserver !== 'undefined' && containerRef.value) {
        ro = new ResizeObserver(() => measure());
        ro.observe(containerRef.value);
      }
    });
    onBeforeUnmount(() => ro?.disconnect());

    watch([() => props.layout, () => panelNodes.value.length], () => measure());

    const pxSizes = computed(() => {
      const size = containerSize.value;
      return itemProps.value.map((item, i) => {
        const controlled = parseSizeToPx(item.size, size);
        if (controlled !== undefined) return controlled;
        return innerSizes.value[i] ?? 0;
      });
    });

    const getLimits = (index: number) => {
      const size = containerSize.value;
      const item = itemProps.value[index] || {};
      return {
        min: parseSizeToPx(item.min, size) ?? 0,
        max: parseSizeToPx(item.max, size) ?? size,
      };
    };

    const onStart = (index: number, x: number, y: number) => {
      activeIndex.value = index;
      startPos.value = { x, y, sizes: [...pxSizes.value] };
      emit('resizeStart', [...pxSizes.value]);
    };

    const onMove = (index: number, x: number, y: number) => {
      if (!startPos.value || containerSize.value <= 0) return;
      let offset = vertical.value ? y - startPos.value.y : x - startPos.value.x;
      if (isRTL.value) offset = -offset;

      const sizes = [...startPos.value.sizes];
      const next = index + 1;
      if (next >= sizes.length) return;

      const startLimit = getLimits(index);
      const endLimit = getLimits(next);
      let merged = offset;
      if (sizes[index] + merged < startLimit.min) merged = startLimit.min - sizes[index];
      if (sizes[next] - merged < endLimit.min) merged = sizes[next] - endLimit.min;
      if (sizes[index] + merged > startLimit.max) merged = startLimit.max - sizes[index];
      if (sizes[next] - merged > endLimit.max) merged = sizes[next] - endLimit.max;

      sizes[index] += merged;
      sizes[next] -= merged;

      const items = itemProps.value;
      const nextInner = [...innerSizes.value];
      sizes.forEach((s, i) => {
        if (items[i]?.size === undefined) nextInner[i] = s;
      });
      innerSizes.value = nextInner;
      emit('resize', sizes);
    };

    const onEnd = () => {
      activeIndex.value = null;
      startPos.value = null;
      emit('resizeEnd', [...pxSizes.value]);
    };

    return () => {
      const pre = prefixCls.value;
      const nodes = panelNodes.value;
      const sizes = pxSizes.value;
      const items = itemProps.value;
      const panels: any[] = [];

      nodes.forEach((vnode, index) => {
        const item = items[index] || {};
        const size = sizes[index] ?? 0;
        const collapsed = size === 0;
        panels.push(
          <div
            key={`panel-${index}`}
            class={classNames(`${pre}-panel`, {
              [`${pre}-panel-hidden`]: collapsed,
            })}
            style={
              {
                flexBasis: containerSize.value ? `${size}px` : 'auto',
                flexGrow: containerSize.value ? 0 : 1,
                flexShrink: 0,
                overflow: 'auto',
              } as CSSProperties
            }
          >
            {!(item.destroyOnHidden && collapsed) ? getPanelContent(vnode) : null}
          </div>,
        );

        if (index < nodes.length - 1) {
          const resizable = item.resizable !== false && items[index + 1]?.resizable !== false;
          panels.push(
            <SplitBar
              key={`bar-${index}`}
              prefixCls={pre}
              index={index}
              vertical={vertical.value}
              resizable={resizable}
              active={activeIndex.value === index}
              ariaNow={Math.round(size)}
              ariaMin={Math.round(getLimits(index).min)}
              ariaMax={Math.round(getLimits(index).max)}
              onStart={onStart}
              onMove={onMove}
              onEnd={onEnd}
            />,
          );
        }
      });

      return wrapSSR(
        <div
          {...attrs}
          ref={containerRef}
          class={classNames(
            pre,
            hashId.value,
            props.rootClassName,
            attrs.class as string,
            `${pre}-${props.layout}`,
            { [`${pre}-rtl`]: isRTL.value },
          )}
        >
          {panels}
        </div>,
      );
    };
  },
});

export default Splitter;
