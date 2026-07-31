import type { CSSProperties, ExtractPropTypes } from 'vue';
import { presetPrimaryColors } from '@ant-design/colors';
import { computed, defineComponent } from 'vue';
import type { Direction } from '../config-provider';
import type { StringGradients, ProgressGradient, ProgressSize, PercentPositionType } from './props';
import { progressProps } from './props';
import { getSize, getSuccessPercent, validProgress } from './utils';
import { LineStrokeColorVar, Percent } from './style';
import devWarning from '../vc-util/devWarning';
import { anyType, objectType, stringType } from '../_util/type';

export const lineProps = () => ({
  ...progressProps(),
  strokeColor: anyType<string | ProgressGradient>(),
  direction: stringType<Direction>(),
  percentPosition: objectType<PercentPositionType>(),
});

export type LineProps = Partial<ExtractPropTypes<ReturnType<typeof lineProps>>>;

/**
 * {
 *   '0%': '#afc163',
 *   '75%': '#009900',
 *   '50%': 'green',     ====>     '#afc163 0%, #66FF00 25%, #00CC00 50%, #009900 75%, #ffffff 100%'
 *   '25%': '#66FF00',
 *   '100%': '#ffffff'
 * }
 */
export const sortGradient = (gradients: StringGradients) => {
  let tempArr = [];
  Object.keys(gradients).forEach(key => {
    const formattedKey = parseFloat(key.replace(/%/g, ''));
    if (!isNaN(formattedKey)) {
      tempArr.push({
        key: formattedKey,
        value: gradients[key],
      });
    }
  });
  tempArr = tempArr.sort((a, b) => a.key - b.key);
  return tempArr.map(({ key, value }) => `${value} ${key}%`).join(', ');
};

/**
 * Then this man came to realize the truth: Besides six pence, there is the moon. Besides bread and
 * butter, there is the bug. And... Besides women, there is the code.
 *
 * @example
 *   {
 *     "0%": "#afc163",
 *     "25%": "#66FF00",
 *     "50%": "#00CC00", // ====>  linear-gradient(to right, #afc163 0%, #66FF00 25%,
 *     "75%": "#009900", //        #00CC00 50%, #009900 75%, #ffffff 100%)
 *     "100%": "#ffffff"
 *   }
 */
export const handleGradient = (
  strokeColor: ProgressGradient,
  directionConfig?: Direction,
): CSSProperties => {
  const {
    from = presetPrimaryColors.blue,
    to = presetPrimaryColors.blue,
    direction = directionConfig === 'rtl' ? 'to left' : 'to right',
    ...rest
  } = strokeColor;
  if (Object.keys(rest).length !== 0) {
    const sortedGradients = sortGradient(rest as StringGradients);
    const background = `linear-gradient(${direction}, ${sortedGradients})`;
    return { background, [LineStrokeColorVar]: background };
  }
  const background = `linear-gradient(${direction}, ${from}, ${to})`;
  return { background, [LineStrokeColorVar]: background };
};

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ProgressLine',
  inheritAttrs: false,
  props: lineProps(),
  setup(props, { slots, attrs }) {
    const backgroundProps = computed<CSSProperties>(() => {
      const { strokeColor, direction } = props;
      return strokeColor && typeof strokeColor !== 'string'
        ? handleGradient(strokeColor, direction)
        : {
            [LineStrokeColorVar]: strokeColor as string,
            background: strokeColor as string,
          };
    });
    const borderRadius = computed(() =>
      props.strokeLinecap === 'square' || props.strokeLinecap === 'butt' ? 0 : undefined,
    );

    const trailStyle = computed<CSSProperties>(() => ({
      backgroundColor: props.trailColor || undefined,
      borderRadius: borderRadius.value,
    }));

    const mergedSize = computed(
      () => props.size ?? [-1, props.strokeWidth || (props.size === 'small' ? 6 : 8)],
    );

    const sizeRef = computed(() =>
      getSize(mergedSize.value as ProgressSize, 'line', { strokeWidth: props.strokeWidth }),
    );

    if (process.env.NODE_ENV !== 'production') {
      devWarning(
        'strokeWidth' in props,
        'Progress',
        '`strokeWidth` is deprecated. Please use `size` instead.',
      );
    }

    const percentStyle = computed<CSSProperties>(() => {
      const { percent } = props;
      return {
        width: `${validProgress(percent)}%`,
        height: `${sizeRef.value.height}px`,
        borderRadius: borderRadius.value,
        ...backgroundProps.value,
        [Percent]: validProgress(percent) / 100,
      };
    });

    const successPercent = computed(() => {
      return getSuccessPercent(props);
    });
    const successPercentStyle = computed<CSSProperties>(() => {
      const { success } = props;
      return {
        width: `${validProgress(successPercent.value)}%`,
        height: `${sizeRef.value.height}px`,
        borderRadius: borderRadius.value,
        backgroundColor: success?.strokeColor,
      };
    });

    const outerStyle = computed<CSSProperties>(() => ({
      width: sizeRef.value.width < 0 ? '100%' : sizeRef.value.width,
    }));

    const percentPosition = computed(() => ({
      align: props.percentPosition?.align ?? 'end',
      type: props.percentPosition?.type ?? 'outer',
    }));

    return () => {
      const { prefixCls } = props;
      const { align: infoAlign, type: infoPosition } = percentPosition.value;
      const children = slots.default?.();

      const lineInner = (
        <div class={`${prefixCls}-inner`} style={trailStyle.value}>
          <div
            class={[`${prefixCls}-bg`, `${prefixCls}-bg-${infoPosition}`]}
            style={percentStyle.value}
          >
            {infoPosition === 'inner' ? children : null}
          </div>
          {successPercent.value !== undefined ? (
            <div class={`${prefixCls}-success-bg`} style={successPercentStyle.value} />
          ) : null}
        </div>
      );

      const isOuterStart = infoPosition === 'outer' && infoAlign === 'start';
      const isOuterEnd = infoPosition === 'outer' && infoAlign === 'end';

      if (infoPosition === 'outer' && infoAlign === 'center') {
        return (
          <div {...attrs} class={[`${prefixCls}-layout-bottom`, attrs.class]}>
            {lineInner}
            {children}
          </div>
        );
      }

      return (
        <div
          {...attrs}
          class={[`${prefixCls}-outer`, attrs.class]}
          style={[attrs.style as CSSProperties, outerStyle.value]}
        >
          {isOuterStart ? children : null}
          {lineInner}
          {isOuterEnd ? children : null}
        </div>
      );
    };
  },
});
