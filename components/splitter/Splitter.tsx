import type { CSSProperties, VNode } from 'vue';
import { computed, defineComponent, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue';
import useConfigInject from '../config-provider/hooks/useConfigInject';
import { flattenChildren, initDefaultProps } from '../_util/props-util';
import classNames from '../_util/classNames';
import useStyle from './style';
import { splitterProps } from './interface';
import type { PanelCollapsible, PanelProps } from './interface';
import Panel from './Panel';
import SplitBar from './SplitBar';
import type { ShowCollapsibleIconMode } from './SplitBar';
import { parseSizeToPx } from './util';

type NormalizedCollapsible = {
  start: boolean;
  end: boolean;
  showCollapsibleIcon: ShowCollapsibleIconMode;
};

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

function normalizeCollapsible(collapsible?: PanelCollapsible): NormalizedCollapsible {
  if (collapsible && typeof collapsible === 'object') {
    return {
      start: !!collapsible.start,
      end: !!collapsible.end,
      showCollapsibleIcon:
        collapsible.showCollapsibleIcon === undefined ? 'auto' : collapsible.showCollapsibleIcon,
    };
  }
  const on = !!collapsible;
  return { start: on, end: on, showCollapsibleIcon: 'auto' };
}

function getShowCollapsibleIcon(
  prev: { collapsible: boolean; showCollapsibleIcon: ShowCollapsibleIconMode },
  next: { collapsible: boolean; showCollapsibleIcon: ShowCollapsibleIconMode },
): ShowCollapsibleIconMode {
  if (prev.collapsible && next.collapsible) {
    if (prev.showCollapsibleIcon === true || next.showCollapsibleIcon === true) return true;
    if (prev.showCollapsibleIcon === 'auto' || next.showCollapsibleIcon === 'auto') return 'auto';
    return false;
  }
  if (prev.collapsible) return prev.showCollapsibleIcon;
  if (next.collapsible) return next.showCollapsibleIcon;
  return false;
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
    const collapsedCache = shallowRef<number[]>([]);

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

    const applySizes = (sizes: number[]) => {
      const items = itemProps.value;
      const nextInner = [...innerSizes.value];
      sizes.forEach((s, i) => {
        if (items[i]?.size === undefined) nextInner[i] = s;
      });
      innerSizes.value = nextInner;
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

      applySizes(sizes);
      emit('resize', sizes);
    };

    const onEnd = () => {
      activeIndex.value = null;
      startPos.value = null;
      emit('resizeEnd', [...pxSizes.value]);
    };

    const onCollapse = (index: number, type: 'start' | 'end') => {
      const adjustedType = isRTL.value ? (type === 'start' ? 'end' : 'start') : type;
      const currentSizes = [...pxSizes.value];
      const currentIndex = adjustedType === 'start' ? index : index + 1;
      const targetIndex = adjustedType === 'start' ? index + 1 : index;
      const currentSize = currentSizes[currentIndex];
      const targetSize = currentSizes[targetIndex];

      if (currentSize !== 0 && targetSize !== 0) {
        currentSizes[currentIndex] = 0;
        currentSizes[targetIndex] += currentSize;
        const cache = [...collapsedCache.value];
        cache[index] = currentSize;
        collapsedCache.value = cache;
      } else {
        const totalSize = currentSize + targetSize;
        const currentLimit = getLimits(currentIndex);
        const targetLimit = getLimits(targetIndex);
        const limitStart = Math.max(currentLimit.min, totalSize - targetLimit.max);
        const limitEnd = Math.min(currentLimit.max, totalSize - targetLimit.min);
        const halfOffset = targetLimit.min || (limitEnd - limitStart) / 2;
        const targetCache = collapsedCache.value[index];
        const currentCache = totalSize - (targetCache || 0);
        const shouldUseCache =
          targetCache &&
          targetCache <= targetLimit.max &&
          targetCache >= targetLimit.min &&
          currentCache <= currentLimit.max &&
          currentCache >= currentLimit.min;

        if (shouldUseCache) {
          currentSizes[targetIndex] = targetCache;
          currentSizes[currentIndex] = currentCache;
        } else {
          currentSizes[currentIndex] = Math.max(0, currentSize - halfOffset);
          currentSizes[targetIndex] = totalSize - currentSizes[currentIndex];
        }
      }

      applySizes(currentSizes);
      emit('collapse', currentSizes);
      emit('resize', currentSizes);
    };

    const barInfos = computed(() => {
      const items = itemProps.value;
      const sizes = pxSizes.value;
      const infos: Array<{
        resizable: boolean;
        startCollapsible: boolean;
        endCollapsible: boolean;
        showStartCollapsibleIcon: ShowCollapsibleIconMode;
        showEndCollapsibleIcon: ShowCollapsibleIconMode;
      }> = [];

      for (let i = 0; i < items.length - 1; i += 1) {
        const prev = items[i] || {};
        const next = items[i + 1] || {};
        const prevSize = sizes[i] ?? 0;
        const nextSize = sizes[i + 1] ?? 0;
        const prevCol = normalizeCollapsible(prev.collapsible);
        const nextCol = normalizeCollapsible(next.collapsible);
        const prevMin = parseSizeToPx(prev.min, containerSize.value) ?? 0;
        const nextMin = parseSizeToPx(next.min, containerSize.value) ?? 0;

        const resizable =
          prev.resizable !== false &&
          next.resizable !== false &&
          (prevSize !== 0 || !prevMin) &&
          (nextSize !== 0 || !nextMin);

        const prevEndCollapsible = !!prevCol.end && prevSize > 0;
        const nextStartExpandable = !!nextCol.start && nextSize === 0 && prevSize > 0;
        const startCollapsible = prevEndCollapsible || nextStartExpandable;

        const nextStartCollapsible = !!nextCol.start && nextSize > 0;
        const prevEndExpandable = !!prevCol.end && prevSize === 0 && nextSize > 0;
        const endCollapsible = nextStartCollapsible || prevEndExpandable;

        const showStart = getShowCollapsibleIcon(
          {
            collapsible: prevEndCollapsible,
            showCollapsibleIcon: prevCol.showCollapsibleIcon,
          },
          {
            collapsible: nextStartExpandable,
            showCollapsibleIcon: nextCol.showCollapsibleIcon,
          },
        );
        const showEnd = getShowCollapsibleIcon(
          {
            collapsible: nextStartCollapsible,
            showCollapsibleIcon: nextCol.showCollapsibleIcon,
          },
          {
            collapsible: prevEndExpandable,
            showCollapsibleIcon: prevCol.showCollapsibleIcon,
          },
        );

        infos[i] = {
          resizable,
          startCollapsible: isRTL.value ? endCollapsible : startCollapsible,
          endCollapsible: isRTL.value ? startCollapsible : endCollapsible,
          showStartCollapsibleIcon: isRTL.value ? showEnd : showStart,
          showEndCollapsibleIcon: isRTL.value ? showStart : showEnd,
        };
      }
      return infos;
    });

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
          const info = barInfos.value[index] || {
            resizable: true,
            startCollapsible: false,
            endCollapsible: false,
            showStartCollapsibleIcon: 'auto' as ShowCollapsibleIconMode,
            showEndCollapsibleIcon: 'auto' as ShowCollapsibleIconMode,
          };
          const cumSize = sizes.slice(0, index + 1).reduce((a, b) => a + b, 0);
          panels.push(
            <SplitBar
              key={`bar-${index}`}
              prefixCls={pre}
              index={index}
              vertical={vertical.value}
              lazy={props.lazy}
              resizable={info.resizable}
              active={activeIndex.value === index}
              ariaNow={Math.round(cumSize)}
              ariaMin={Math.round(getLimits(index).min)}
              ariaMax={Math.round(containerSize.value - getLimits(index + 1).min)}
              containerSize={containerSize.value}
              startCollapsible={info.startCollapsible}
              endCollapsible={info.endCollapsible}
              showStartCollapsibleIcon={info.showStartCollapsibleIcon}
              showEndCollapsibleIcon={info.showEndCollapsibleIcon}
              onStart={onStart}
              onMove={onMove}
              onEnd={onEnd}
              onCollapse={onCollapse}
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
