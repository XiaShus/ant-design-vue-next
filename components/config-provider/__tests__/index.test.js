import { mount } from '@vue/test-utils';
import ConfigProvider from '..';
import Button from '../../button';
import mountTest from '../../../tests/shared/mountTest';
import { sleep } from '../../../tests/utils';

describe('ConfigProvider', () => {
  mountTest({
    render() {
      return (
        <>
          <ConfigProvider>
            <div />
          </ConfigProvider>
        </>
      );
    },
  });

  it('Content Security Policy', () => {
    const csp = { nonce: 'test-antd' };
    const wrapper = mount({
      render() {
        return (
          <ConfigProvider csp={csp}>
            <Button ref="button" />
          </ConfigProvider>
        );
      },
    });
    expect(wrapper.findComponent({ ref: 'button' }).vm.$refs.wave.csp.nonce).toBe(csp.nonce);
  });

  it('useConfig returns componentSize and componentDisabled', () => {
    let size;
    let disabled;
    const Consumer = {
      setup() {
        const cfg = ConfigProvider.useConfig();
        size = cfg.componentSize;
        disabled = cfg.componentDisabled;
        return () => <span class="consumer" />;
      },
    };
    mount({
      render() {
        return (
          <ConfigProvider componentSize="large" componentDisabled>
            <Consumer />
          </ConfigProvider>
        );
      },
    });
    expect(size.value).toBe('large');
    expect(disabled.value).toBe(true);
  });

  it('popupMatchSelectWidth aliases dropdownMatchSelectWidth', () => {
    let matchWidth;
    const useConfigInject = require('../hooks/useConfigInject').default;
    const ProviderProbe = {
      setup() {
        matchWidth = useConfigInject('select', {}).dropdownMatchSelectWidth;
        return () => <div class="probe" />;
      },
    };
    mount({
      render() {
        return (
          <ConfigProvider popupMatchSelectWidth={120}>
            <ProviderProbe />
          </ConfigProvider>
        );
      },
    });
    expect(matchWidth.value).toBe(120);

    mount({
      render() {
        return (
          <ConfigProvider popupMatchSelectWidth={false} dropdownMatchSelectWidth={200}>
            <ProviderProbe />
          </ConfigProvider>
        );
      },
    });
    expect(matchWidth.value).toBe(false);
  });

  it('autoInsertSpaceInButton', async () => {
    const wrapper = mount({
      data() {
        return {
          autoInsertSpaceInButton: false,
        };
      },
      render() {
        return (
          <ConfigProvider autoInsertSpaceInButton={this.autoInsertSpaceInButton}>
            <Button ref="button">确定</Button>
          </ConfigProvider>
        );
      },
    });

    expect(wrapper.find('.ant-btn').text()).toBe('确定');
    wrapper.vm.autoInsertSpaceInButton = true;
    await sleep();
    expect(wrapper.find('.ant-btn').text()).toBe('确 定');
  });
});
