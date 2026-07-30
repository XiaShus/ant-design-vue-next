import type { Key } from '../_util/type';
import { Teleport, computed, defineComponent, onBeforeUnmount, shallowRef, watch } from 'vue';
import type { HTMLAttributes, CSSProperties } from 'vue';
import type { MouseEventHandler } from '../_util/EventInterface';
import classNames from '../_util/classNames';
import useNoticeTimer from './hooks/useNoticeTimer';

interface DivProps extends HTMLAttributes {
  // Ideally we would allow all data-* props but this would depend on https://github.com/microsoft/TypeScript/issues/28960
  'data-testid'?: string;
}

export interface NoticeProps {
  prefixCls: string;
  duration?: number | null;
  updateMark?: string;
  /** Mark as final key since set maxCount may keep the key but user pass key is different */
  noticeKey: Key;
  closeIcon?: any;
  closable?: boolean;
  props?: DivProps;
  onClick?: MouseEventHandler;
  onClose?: (key: Key) => void;

  /** Show progress bar for auto-closing notice */
  showProgress?: boolean;
  /** Whether to pause the timer on hover. Default true */
  pauseOnHover?: boolean;

  /** @private Only for internal usage. We don't promise that we will refactor this */
  holder?: HTMLDivElement;

  /** @private Provided by CSSMotionList */
  visible?: boolean;
}

export default defineComponent<NoticeProps>({
  name: 'Notice',
  inheritAttrs: false,
  props: [
    'prefixCls',
    'duration',
    'updateMark',
    'noticeKey',
    'closeIcon',
    'closable',
    'props',
    'onClick',
    'onClose',
    'holder',
    'visible',
    'showProgress',
    'pauseOnHover',
  ] as any,
  setup(props, { attrs, slots }) {
    let isUnMounted = false;
    const duration = computed(() => (props.duration === undefined ? 4.5 : props.duration));
    const pauseOnHover = computed(() => props.pauseOnHover !== false);
    const percent = shallowRef(0);

    const close = (e?: MouseEvent) => {
      if (e) {
        e.stopPropagation();
      }
      if (isUnMounted) {
        return;
      }
      const { onClose, noticeKey } = props;
      if (onClose) {
        onClose(noticeKey);
      }
    };

    const { onResume, onPause, reset } = useNoticeTimer(
      duration,
      () => close(),
      ptg => {
        percent.value = ptg;
      },
    );

    watch(
      [() => props.updateMark, () => props.visible],
      ([updateMark, visible], [prevUpdateMark, prevVisible]) => {
        if (updateMark !== prevUpdateMark || (visible !== prevVisible && visible)) {
          reset();
        }
      },
      { flush: 'post' },
    );

    onBeforeUnmount(() => {
      isUnMounted = true;
    });

    const onMouseEnter = () => {
      if (pauseOnHover.value) {
        onPause();
      }
    };

    const onMouseLeave = () => {
      if (pauseOnHover.value) {
        onResume();
      }
    };

    return () => {
      const { prefixCls, closable, closeIcon = slots.closeIcon?.(), onClick, holder } = props;
      const { class: className, style } = attrs;
      const componentClass = `${prefixCls}-notice`;
      const dataOrAriaAttributeProps = Object.keys(attrs).reduce(
        (acc: Record<string, string>, key: string) => {
          if (key.startsWith('data-') || key.startsWith('aria-') || key === 'role') {
            acc[key] = (attrs as any)[key];
          }
          return acc;
        },
        {},
      );
      const validPercent = 100 - Math.min(Math.max(percent.value * 100, 0), 100);
      const showProgressBar =
        !!props.showProgress && typeof duration.value === 'number' && duration.value > 0;

      const node = (
        <div
          class={classNames(componentClass, className, {
            [`${componentClass}-closable`]: closable,
          })}
          style={style as CSSProperties}
          onMouseenter={onMouseEnter}
          onMouseleave={onMouseLeave}
          onClick={onClick}
          {...dataOrAriaAttributeProps}
        >
          <div class={`${componentClass}-content`}>{slots.default?.()}</div>
          {closable ? (
            <a tabindex={0} onClick={close} class={`${componentClass}-close`}>
              {closeIcon || <span class={`${componentClass}-close-x`} />}
            </a>
          ) : null}
          {showProgressBar ? (
            <progress class={`${componentClass}-progress`} max={100} value={validPercent} />
          ) : null}
        </div>
      );

      if (holder) {
        return <Teleport to={holder} v-slots={{ default: () => node }}></Teleport>;
      }

      return node;
    };
  },
});
