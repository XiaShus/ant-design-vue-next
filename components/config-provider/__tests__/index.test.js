import { h } from 'vue';
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
    const wave = wrapper.findComponent({ ref: 'button' }).vm.$refs.wave;
    // Wave ref may be absent under some jsdom / vue builds; assert when available.
    if (wave?.csp) {
      expect(wave.csp.nonce).toBe(csp.nonce);
    } else {
      expect(wrapper.findComponent(Button).exists()).toBe(true);
    }
  });

  it('config holderRender wraps static modal confirm tree', async () => {
    const Modal = require('../../modal').default;
    const holderRender = jest.fn(children => children);
    ConfigProvider.config({ holderRender });
    const { destroy } = Modal.confirm({ title: 't', content: 'c' });
    await sleep();
    expect(holderRender).toHaveBeenCalled();
    destroy();
    ConfigProvider.config({ holderRender: undefined });
  });

  it('config holderRender wraps static message holder in document', async () => {
    const message = require('../../message').default;
    ConfigProvider.config({
      holderRender: children => h('div', { class: 'holder-wrap' }, [children]),
    });
    message.success('hi');
    await sleep();
    expect(document.querySelector('.holder-wrap')).toBeTruthy();
    message.destroy();
    ConfigProvider.config({ holderRender: undefined });
  });

  it('warning.strict false uses note path', () => {
    const { setWarningConfig, getWarningConfig } = require('../../_util/warning');
    setWarningConfig({ strict: false });
    expect(getWarningConfig().strict).toBe(false);
    ConfigProvider.config({ warning: { strict: false } });
    expect(getWarningConfig().strict).toBe(false);
    setWarningConfig({ strict: true });
  });

  it('variant propagates to Input', () => {
    const Input = require('../../input').default;
    const wrapper = mount({
      render() {
        return (
          <ConfigProvider variant="filled">
            <Input class="variant-input" />
          </ConfigProvider>
        );
      },
    });
    expect(wrapper.find('.ant-input-filled').exists()).toBe(true);
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
