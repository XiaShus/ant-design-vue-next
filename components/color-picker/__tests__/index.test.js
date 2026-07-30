import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import ColorPicker, { AggregationColor } from '..';

describe('ColorPicker', () => {
  it('should render trigger', () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#1677ff' },
    });
    expect(wrapper.find('.ant-color-picker-trigger').exists()).toBe(true);
    expect(wrapper.find('.ant-color-picker-color-block-inner').exists()).toBe(true);
  });

  it('AggregationColor helpers', () => {
    const color = new AggregationColor('#1677ff');
    expect(color.toHexString().toLowerCase()).toBe('#1677ff');
    expect(color.toRgb().r).toBe(22);
    expect(color.toHsb().b).toBeGreaterThan(0);
    expect(color.toCssString()).toContain('rgb');
  });

  it('support showText', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#1677ff', showText: true },
    });
    await nextTick();
    expect(wrapper.find('.ant-color-picker-trigger-text').text().toUpperCase()).toContain('1677FF');
  });

  it('support disabled', () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#1677ff', disabled: true },
    });
    expect(wrapper.find('.ant-color-picker-trigger-disabled').exists()).toBe(true);
  });

  it('support controlled value change', async () => {
    const Demo = {
      components: { ColorPicker },
      setup() {
        const color = ref('#1677ff');
        return { color };
      },
      template: `<ColorPicker v-model:value="color" show-text />`,
    };
    const wrapper = mount(Demo);
    wrapper.vm.color = '#ff0000';
    await nextTick();
    expect(wrapper.find('.ant-color-picker-trigger-text').text().toUpperCase()).toContain('FF0000');
  });

  it('emit clear', async () => {
    const onClear = jest.fn();
    const wrapper = mount(ColorPicker, {
      props: {
        value: '#1677ff',
        allowClear: true,
        open: true,
        onClear,
      },
    });
    await nextTick();
    const clear = document.querySelector('.ant-color-picker-clear');
    expect(clear).toBeTruthy();
    clear.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextTick();
    expect(onClear).toHaveBeenCalled();
  });
});
