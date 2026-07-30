import { scrollTo, waitElementReady } from '../../utils/uiUtil';
import { useInjectPanel } from '../../PanelContext';
import classNames from '../../../_util/classNames';
import { ref, onBeforeUnmount, watch, defineComponent, nextTick, shallowRef } from 'vue';

export type Unit = {
  label: any;
  value: number;
  disabled: boolean;
};

export type TimeUnitColumnProps = {
  prefixCls?: string;
  units?: Unit[];
  value?: number;
  active?: boolean;
  hideDisabledOptions?: boolean;
  changeOnScroll?: boolean;
  onSelect?: (value: number, fromScroll?: boolean) => void;
};

export default defineComponent({
  name: 'TimeUnitColumn',
  props: [
    'prefixCls',
    'units',
    'onSelect',
    'value',
    'active',
    'hideDisabledOptions',
    'changeOnScroll',
  ],
  setup(props) {
    const { open } = useInjectPanel();

    const ulRef = shallowRef<HTMLElement>(null);
    const liRefs = ref(new Map<number, HTMLElement | null>());
    const scrollRef = ref<Function>();
    const programmaticScroll = ref(false);
    let scrollRaf = 0;

    const scrollToValue = (duration: number) => {
      const li = liRefs.value.get(props.value!);
      if (li && ulRef.value) {
        programmaticScroll.value = true;
        scrollTo(ulRef.value, li.offsetTop, duration);
        window.setTimeout(() => {
          programmaticScroll.value = false;
        }, Math.max(duration, 50) + 20);
      }
    };

    watch(
      () => props.value,
      () => {
        if (open.value !== false) {
          scrollToValue(120);
        }
      },
    );
    onBeforeUnmount(() => {
      scrollRef.value?.();
      cancelAnimationFrame(scrollRaf);
    });

    watch(
      open,
      () => {
        scrollRef.value?.();
        nextTick(() => {
          if (open.value) {
            const li = liRefs.value.get(props.value!);
            if (li) {
              scrollRef.value = waitElementReady(li, () => {
                scrollToValue(0);
              });
            }
          }
        });
      },
      { immediate: true, flush: 'post' },
    );

    const onScroll = () => {
      if (!props.changeOnScroll || programmaticScroll.value || !ulRef.value) {
        return;
      }
      cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(() => {
        const ul = ulRef.value;
        if (!ul) {
          return;
        }
        const visibleUnits = (props.units || []).filter(
          unit => !(props.hideDisabledOptions && unit.disabled),
        );
        if (!visibleUnits.length) {
          return;
        }
        const firstLi = liRefs.value.get(visibleUnits[0].value);
        const itemHeight = firstLi?.offsetHeight || 0;
        if (!itemHeight) {
          return;
        }
        const index = Math.min(
          visibleUnits.length - 1,
          Math.max(0, Math.round(ul.scrollTop / itemHeight)),
        );
        const unit = visibleUnits[index];
        if (unit && !unit.disabled && unit.value !== props.value) {
          props.onSelect?.(unit.value, true);
        }
      });
    };

    return () => {
      const { prefixCls, units, onSelect, value, active, hideDisabledOptions } = props;
      const cellPrefixCls = `${prefixCls}-cell`;
      return (
        <ul
          class={classNames(`${prefixCls}-column`, {
            [`${prefixCls}-column-active`]: active,
          })}
          ref={ulRef}
          style={{ position: 'relative' }}
          onScroll={onScroll}
        >
          {units!.map(unit => {
            if (hideDisabledOptions && unit.disabled) {
              return null;
            }

            return (
              <li
                key={unit.value}
                ref={element => {
                  liRefs.value.set(unit.value, element as HTMLElement);
                }}
                class={classNames(cellPrefixCls, {
                  [`${cellPrefixCls}-disabled`]: unit.disabled,
                  [`${cellPrefixCls}-selected`]: value === unit.value,
                })}
                onClick={() => {
                  if (unit.disabled) {
                    return;
                  }
                  onSelect!(unit.value, false);
                }}
              >
                <div class={`${cellPrefixCls}-inner`}>{unit.label}</div>
              </li>
            );
          })}
        </ul>
      );
    };
  },
});
