import type { ExtractPropTypes, PropType } from 'vue';
import { defineComponent, onBeforeUnmount, onMounted, watch, ref } from 'vue';
import omit from '../_util/omit';
import initDefaultProps from '../_util/props-util/initDefaultProps';
import { someType, stringType } from '../_util/type';
import Statistic, { statisticProps } from './Statistic';
import type { countdownValueType, FormatConfig, valueType } from './utils';
import { formatCounter } from './utils';

const REFRESH_INTERVAL = 1000 / 30;

export type TimerType = 'countdown' | 'countup';

function getTime(value?: countdownValueType) {
  return new Date(value as any).getTime();
}

export const timerProps = () => {
  return {
    ...statisticProps(),
    value: someType<countdownValueType>([Number, String, Object]),
    format: String,
    /** Timer direction (antd ≥ 5.25). */
    type: stringType<TimerType>('countdown'),
    onFinish: Function as PropType<() => void>,
    onChange: Function as PropType<(value?: number) => void>,
  };
};

export type TimerProps = Partial<ExtractPropTypes<ReturnType<typeof timerProps>>>;

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AStatisticTimer',
  props: initDefaultProps(timerProps(), {
    format: 'HH:mm:ss',
    type: 'countdown',
  }),
  setup(props, { emit, slots }) {
    const timerId = ref<any>();
    const statistic = ref();
    const isCountdown = () => props.type !== 'countup';

    const clearTimer = () => {
      if (timerId.value) {
        clearInterval(timerId.value);
        timerId.value = undefined;
      }
    };

    const startTimer = () => {
      if (timerId.value) return;
      timerId.value = setInterval(() => {
        statistic.value?.$forceUpdate?.();
        const now = Date.now();
        const timestamp = getTime(props.value);
        const timeDiff = isCountdown() ? timestamp - now : now - timestamp;
        emit('change', timeDiff);
        if (isCountdown() && timestamp <= now) {
          clearTimer();
          emit('finish');
        }
      }, REFRESH_INTERVAL);
    };

    const syncTimer = () => {
      clearTimer();
      const timestamp = getTime(props.value);
      if (isCountdown()) {
        if (timestamp > Date.now()) {
          startTimer();
        }
      } else {
        startTimer();
      }
    };

    const formatTimer = ({ value, config }: { value: valueType; config: FormatConfig }) => {
      return formatCounter(value, { ...config, format: props.format }, isCountdown());
    };

    const valueRenderHtml = (node: any) => node;

    onMounted(() => {
      syncTimer();
    });

    watch(
      () => [props.value, props.type] as const,
      () => {
        syncTimer();
      },
    );

    onBeforeUnmount(() => {
      clearTimer();
    });

    return () => {
      const value = props.value as valueType;
      return (
        <Statistic
          ref={statistic}
          {...{
            ...omit(props, ['onFinish', 'onChange', 'type']),
            value,
            valueRender: valueRenderHtml,
            formatter: formatTimer,
          }}
          v-slots={slots}
        />
      );
    };
  },
});
