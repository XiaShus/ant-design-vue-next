import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import Input from '..';

const { OTP } = Input;

describe('Input.OTP', () => {
  it('should render length cells', () => {
    const wrapper = mount(OTP, { props: { length: 4 } });
    expect(wrapper.find('.ant-otp').exists()).toBe(true);
    expect(wrapper.findAll('.ant-otp-input-wrapper').length).toBe(4);
  });

  it('support separator', () => {
    const wrapper = mount(OTP, { props: { length: 3, separator: '-' } });
    expect(wrapper.findAll('.ant-otp-separator').length).toBe(2);
    expect(wrapper.find('.ant-otp-separator').text()).toBe('-');
  });

  it('emit change when filled', async () => {
    const onChange = jest.fn();
    const wrapper = mount(OTP, {
      props: { length: 3, onChange },
    });
    const inputs = wrapper.findAll('input');
    await inputs[0].setValue('1');
    await inputs[1].setValue('2');
    await inputs[2].setValue('3');
    await nextTick();
    expect(onChange).toHaveBeenCalledWith('123');
  });

  it('support formatter', async () => {
    const onChange = jest.fn();
    const wrapper = mount(OTP, {
      props: {
        length: 2,
        formatter: str => str.toUpperCase(),
        onChange,
      },
    });
    const inputs = wrapper.findAll('input');
    await inputs[0].setValue('a');
    await inputs[1].setValue('b');
    await nextTick();
    expect(onChange).toHaveBeenCalledWith('AB');
  });

  it('support controlled value', async () => {
    const Demo = {
      components: { OTP },
      setup() {
        const value = ref('12');
        return { value };
      },
      template: `<OTP v-model:value="value" :length="4" />`,
    };
    const wrapper = mount(Demo);
    await nextTick();
    const inputs = wrapper.findAll('input');
    expect(inputs[0].element.value).toBe('1');
    expect(inputs[1].element.value).toBe('2');
    wrapper.vm.value = 'abcd';
    await nextTick();
    expect(inputs[0].element.value).toBe('a');
  });

  it('support disabled and mask', () => {
    const wrapper = mount(OTP, { props: { disabled: true, mask: '*' } });
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });
});
