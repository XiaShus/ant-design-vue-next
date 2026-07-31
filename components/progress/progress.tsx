import { computed, defineComponent } from 'vue';
import { TinyColor } from '@ctrl/tinycolor';
import initDefaultProps from '../_util/props-util/initDefaultProps';
import CloseOutlined from '@ant-design/icons-vue/CloseOutlined';
import CheckOutlined from '@ant-design/icons-vue/CheckOutlined';
import CheckCircleFilled from '@ant-design/icons-vue/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons-vue/CloseCircleFilled';
import classNames from '../_util/classNames';
import Line from './Line';
import Circle from './Circle';
import Steps from './Steps';
import { getSize, getSuccessPercent, validProgress } from './utils';
import useConfigInject from '../config-provider/hooks/useConfigInject';
import devWarning from '../vc-util/devWarning';
import { progressProps, progressStatuses } from './props';
import type { VueNode, CustomSlotsType } from '../_util/type';
import useStyle from './style';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AProgress',
  inheritAttrs: false,
  props: initDefaultProps(progressProps(), {
    type: 'line',
    percent: 0,
    showInfo: true,
    // null for different theme definition
    trailColor: null,
    size: 'default',
    strokeLinecap: 'round',
  }),
  slots: Object as CustomSlotsType<{
    default?: any;
    format?: any;
  }>,
  setup(props, { slots, attrs }) {
    const { prefixCls, direction } = useConfigInject('progress', props);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    if (process.env.NODE_ENV !== 'production') {
      devWarning(
        'successPercent' in props,
        'Progress',
        '`successPercent` is deprecated. Please use `success.percent` instead.',
      );

      devWarning('width' in props, 'Progress', '`width` is deprecated. Please use `size` instead.');
    }
    const strokeColorNotArray = computed(() =>
      Array.isArray(props.strokeColor) ? props.strokeColor[0] : props.strokeColor,
    );
    const percentNumber = computed(() => {
      const { percent = 0 } = props;
      const successPercent = getSuccessPercent(props);
      return parseInt(
        successPercent !== undefined ? successPercent.toString() : percent.toString(),
        10,
      );
    });

    const progressStatus = computed(() => {
      const { status } = props;
      if (!progressStatuses.includes(status) && percentNumber.value >= 100) {
        return 'success';
      }
      return status || 'normal';
    });

    const mergedSteps = computed(() => {
      const { steps } = props;
      if (steps === undefined || steps === null) {
        return null;
      }
      if (typeof steps === 'object') {
        return { count: steps.count, gap: steps.gap };
      }
      return { count: steps, gap: undefined as number | undefined };
    });

    const infoAlign = computed(() => props.percentPosition?.align ?? 'end');
    const infoPosition = computed(() => props.percentPosition?.type ?? 'outer');

    const strokeColorIsBright = computed(() => {
      const colorValue = strokeColorNotArray.value;
      if (!colorValue) {
        return false;
      }
      const color =
        typeof colorValue === 'string' ? colorValue : Object.values(colorValue as object)[0];
      return typeof color === 'string' ? new TinyColor(color).isLight() : false;
    });

    const classString = computed(() => {
      const { type, showInfo, size } = props;
      const pre = prefixCls.value;
      const isLineType = type === 'line';
      const isPureLineType = isLineType && !mergedSteps.value;
      return {
        [pre]: true,
        [`${pre}-inline-circle`]: type === 'circle' && getSize(size, 'circle').width <= 20,
        [`${pre}-${(type === 'dashboard' && 'circle') || type}`]: type !== 'line',
        [`${pre}-line`]: isPureLineType,
        [`${pre}-line-align-${infoAlign.value}`]: isPureLineType,
        [`${pre}-line-position-${infoPosition.value}`]: isPureLineType,
        [`${pre}-status-${progressStatus.value}`]: true,
        [`${pre}-show-info`]: showInfo,
        [`${pre}-${size}`]: typeof size === 'string',
        [`${pre}-steps`]: !!mergedSteps.value,
        [`${pre}-rtl`]: direction.value === 'rtl',
        [hashId.value]: true,
      };
    });

    const strokeColorNotGradient = computed(() =>
      typeof props.strokeColor === 'string' || Array.isArray(props.strokeColor)
        ? props.strokeColor
        : undefined,
    );

    const renderProcessInfo = () => {
      const { showInfo, format, type, percent, title } = props;
      const successPercent = getSuccessPercent(props);
      if (!showInfo) return null;

      let text: VueNode;
      const textFormatter = format || slots?.format || ((val: number) => `${val}%`);
      const isLineType = type === 'line';
      const isPureLineType = isLineType && !mergedSteps.value;
      const isBrightInnerColor =
        isLineType && strokeColorIsBright.value && infoPosition.value === 'inner';
      if (
        infoPosition.value === 'inner' ||
        format ||
        slots?.format ||
        (progressStatus.value !== 'exception' && progressStatus.value !== 'success')
      ) {
        text = textFormatter(validProgress(percent), validProgress(successPercent));
      } else if (progressStatus.value === 'exception') {
        text = isLineType ? <CloseCircleFilled /> : <CloseOutlined />;
      } else if (progressStatus.value === 'success') {
        text = isLineType ? <CheckCircleFilled /> : <CheckOutlined />;
      }
      return (
        <span
          class={classNames(`${prefixCls.value}-text`, {
            [`${prefixCls.value}-text-bright`]: isBrightInnerColor,
            [`${prefixCls.value}-text-${infoAlign.value}`]: isPureLineType,
            [`${prefixCls.value}-text-${infoPosition.value}`]: isPureLineType,
          })}
          title={title === undefined && typeof text === 'string' ? text : undefined}
        >
          {text}
        </span>
      );
    };

    return () => {
      const { type, title } = props;
      const { class: cls, ...restAttrs } = attrs;
      const progressInfo = renderProcessInfo();
      const stepsInfo = mergedSteps.value;
      let progress: VueNode;
      // Render progress shape
      if (type === 'line') {
        progress = stepsInfo ? (
          <Steps
            {...props}
            strokeColor={strokeColorNotGradient.value}
            prefixCls={prefixCls.value}
            steps={stepsInfo.count}
            stepGap={stepsInfo.gap}
          >
            {progressInfo}
          </Steps>
        ) : (
          <Line
            {...props}
            strokeColor={strokeColorNotArray.value}
            prefixCls={prefixCls.value}
            direction={direction.value}
            percentPosition={{
              align: infoAlign.value,
              type: infoPosition.value,
            }}
          >
            {progressInfo}
          </Line>
        );
      } else if (type === 'circle' || type === 'dashboard') {
        progress = (
          <Circle
            {...props}
            prefixCls={prefixCls.value}
            strokeColor={strokeColorNotArray.value}
            progressStatus={progressStatus.value}
          >
            {progressInfo}
          </Circle>
        );
      }
      return wrapSSR(
        <div role="progressbar" {...restAttrs} class={[classString.value, cls]} title={title}>
          {progress}
        </div>,
      );
    };
  },
});
