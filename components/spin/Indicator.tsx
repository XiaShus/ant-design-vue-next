import { defineComponent, shallowRef, watch, type PropType } from 'vue';
import classNames from '../_util/classNames';

const viewSize = 100;
const borderWidth = viewSize / 5;
const radius = viewSize / 2 - borderWidth / 2;
const circumference = radius * 2 * Math.PI;
const position = 50;

const Progress = defineComponent({
  name: 'ASpinProgress',
  props: {
    prefixCls: String,
    percent: { type: Number, default: 0 },
  },
  setup(props) {
    const render = shallowRef(false);
    watch(
      () => props.percent,
      percent => {
        if (percent !== 0) {
          render.value = true;
        }
      },
      { immediate: true },
    );
    return () => {
      if (!render.value) {
        return null;
      }
      const { prefixCls, percent } = props;
      const dotClassName = `${prefixCls}-dot`;
      const holderClassName = `${dotClassName}-holder`;
      const safePtg = Math.max(Math.min(percent, 100), 0);
      const circleStyle = {
        strokeDashoffset: `${circumference / 4}`,
        strokeDasharray: `${(circumference * safePtg) / 100} ${
          (circumference * (100 - safePtg)) / 100
        }`,
      };
      return (
        <span
          class={classNames(holderClassName, `${dotClassName}-progress`, {
            [`${holderClassName}-hidden`]: safePtg <= 0,
          })}
        >
          <svg
            viewBox={`0 0 ${viewSize} ${viewSize}`}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={safePtg}
          >
            <circle
              class={classNames(`${dotClassName}-circle`, `${dotClassName}-circle-bg`)}
              r={radius}
              cx={position}
              cy={position}
              stroke-width={borderWidth}
            />
            <circle
              class={`${dotClassName}-circle`}
              r={radius}
              cx={position}
              cy={position}
              stroke-width={borderWidth}
              style={circleStyle}
            />
          </svg>
        </span>
      );
    };
  },
});

export default defineComponent({
  name: 'ASpinIndicator',
  props: {
    prefixCls: String,
    percent: { type: Number as PropType<number | undefined> },
  },
  setup(props) {
    return () => {
      const { prefixCls, percent = 0 } = props;
      const dotClassName = `${prefixCls}-dot`;
      const holderClassName = `${dotClassName}-holder`;
      return (
        <>
          <span class={classNames(holderClassName, { [`${holderClassName}-hidden`]: percent > 0 })}>
            <span class={classNames(dotClassName, `${prefixCls}-dot-spin`)}>
              <i class={`${prefixCls}-dot-item`} />
              <i class={`${prefixCls}-dot-item`} />
              <i class={`${prefixCls}-dot-item`} />
              <i class={`${prefixCls}-dot-item`} />
            </span>
          </span>
          <Progress prefixCls={prefixCls} percent={percent} />
        </>
      );
    };
  },
});
