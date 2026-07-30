import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import Splitter from '..';

const { Panel } = Splitter;

describe('Splitter', () => {
  it('should render panels and bar', async () => {
    const wrapper = mount({
      components: { Splitter, Panel },
      template: `
        <div style="width:400px;height:200px">
          <Splitter>
            <Panel :default-size="120">A</Panel>
            <Panel>B</Panel>
          </Splitter>
        </div>
      `,
    });
    await nextTick();
    // force measure
    const root = wrapper.find('.ant-splitter');
    expect(root.exists()).toBe(true);
    expect(wrapper.findAll('.ant-splitter-panel').length).toBe(2);
    expect(wrapper.find('.ant-splitter-bar').exists()).toBe(true);
  });

  it('support vertical layout', () => {
    const wrapper = mount({
      components: { Splitter, Panel },
      template: `
        <Splitter layout="vertical">
          <Panel :default-size="80">A</Panel>
          <Panel>B</Panel>
        </Splitter>
      `,
    });
    expect(wrapper.find('.ant-splitter-vertical').exists()).toBe(true);
  });

  it('emit resizeStart on bar mousedown', async () => {
    const onResizeStart = jest.fn();
    const wrapper = mount({
      components: { Splitter, Panel },
      setup() {
        return { onResizeStart };
      },
      template: `
        <div style="width:400px;height:200px">
          <Splitter @resizeStart="onResizeStart">
            <Panel :default-size="160">A</Panel>
            <Panel>B</Panel>
          </Splitter>
        </div>
      `,
    });
    await nextTick();
    const root = wrapper.find('.ant-splitter').element;
    Object.defineProperty(root, 'clientWidth', { configurable: true, value: 400 });
    Object.defineProperty(root, 'clientHeight', { configurable: true, value: 200 });
    // re-measure
    window.dispatchEvent(new Event('resize'));
    await nextTick();
    const bar = wrapper.find('.ant-splitter-bar');
    await bar.trigger('mousedown', {
      clientX: 160,
      clientY: 0,
      preventDefault() {},
      stopPropagation() {},
    });
    await nextTick();
    expect(onResizeStart).toHaveBeenCalled();
  });

  it('support controlled sizes', async () => {
    const Demo = {
      components: { Splitter, Panel },
      setup() {
        const sizes = ref([100, 300]);
        const onResize = next => {
          sizes.value = next;
        };
        return { sizes, onResize };
      },
      template: `
        <div style="width:400px;height:200px">
          <Splitter @resize="onResize">
            <Panel :size="sizes[0]">A</Panel>
            <Panel :size="sizes[1]">B</Panel>
          </Splitter>
        </div>
      `,
    };
    const wrapper = mount(Demo);
    await nextTick();
    expect(wrapper.findAll('.ant-splitter-panel').length).toBe(2);
  });
});
