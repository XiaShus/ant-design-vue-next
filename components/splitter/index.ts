import type { App, Plugin } from 'vue';
import SplitterRoot from './Splitter';
import Panel from './Panel';
import type { SplitterProps, PanelProps } from './interface';

export type { SplitterProps, PanelProps };

type SplitterType = typeof SplitterRoot &
  Plugin & {
    Panel: typeof Panel;
  };

const Splitter = SplitterRoot as SplitterType;
Splitter.Panel = Panel;

Splitter.install = function (app: App) {
  app.component(SplitterRoot.name!, SplitterRoot);
  app.component(Panel.name!, Panel);
  return app;
};

export { Panel as SplitterPanel };

export default Splitter;
