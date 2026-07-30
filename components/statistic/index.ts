import type { App, Plugin } from 'vue';
import Statistic from './Statistic';
import Countdown from './Countdown';
import Timer from './Timer';

export type { StatisticProps } from './Statistic';
export type { CountdownProps } from './Countdown';
export type { TimerProps, TimerType } from './Timer';

Statistic.Countdown = Countdown;
Statistic.Timer = Timer;
/* istanbul ignore next */
Statistic.install = function (app: App) {
  app.component(Statistic.name, Statistic);
  app.component(Statistic.Countdown.name, Statistic.Countdown);
  app.component(Statistic.Timer.name, Statistic.Timer);
  return app;
};

export const StatisticCountdown = Statistic.Countdown;
export const StatisticTimer = Statistic.Timer;

export default Statistic as typeof Statistic &
  Plugin & {
    readonly Countdown: typeof Countdown;
    readonly Timer: typeof Timer;
  };
