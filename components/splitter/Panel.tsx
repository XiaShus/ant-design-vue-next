import { defineComponent } from 'vue';
import { panelProps } from './interface';

/** Marker component — real rendering happens in Splitter. */
const Panel = defineComponent({
  name: 'ASplitterPanel',
  inheritAttrs: false,
  props: panelProps(),
  setup(_, { slots }) {
    return () => slots.default?.();
  },
});

export default Panel;
