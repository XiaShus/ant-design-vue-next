import { mount } from '@vue/test-utils';
import Modal from '..';
import mountTest from '../../../tests/shared/mountTest';
import { asyncExpect } from '../../../tests/utils';
jest.mock('../../_util/Portal');
const ModalTester = {
  props: ['footer', 'visible'],
  methods: {
    getContainer() {
      return this.$refs.container;
    },
  },
  render() {
    const modalProps = {
      ...this.$props,
      getContainer: this.getContainer,
    };
    return (
      <div>
        <div ref="container" />
        <Modal {...modalProps}>Here is content of Modal</Modal>
      </div>
    );
  },
};

describe('Modal', () => {
  mountTest(Modal);
  it('render correctly', async () => {
    const wrapper = mount(
      {
        render() {
          return <ModalTester visible />;
        },
      },
      {
        sync: false,
        attachTo: 'body',
      },
    );
    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot();
    });
    // https://github.com/vuejs/vue-test-utils/issues/624
    const wrapper1 = mount(ModalTester, {
      sync: false,
      attachTo: 'body',
    });
    wrapper1.setProps({ visible: true });
    await asyncExpect(() => {
      expect(wrapper1.html()).toMatchSnapshot();
    });
  });

  it('render without footer', async () => {
    const wrapper = mount(
      {
        render() {
          return <ModalTester visible footer={null} />;
        },
      },
      { attachTo: 'body', sync: true },
    );
    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  it('should work with getContainer=false', async () => {
    const wrapper1 = mount(Modal, {
      sync: false,
      props: {
        getContainer: false,
        visible: true,
      },
    });
    await asyncExpect(() => {
      expect(wrapper1.html()).toMatchSnapshot();
    });
  });

  it('destroyOnHidden maps to destroyOnClose for Dialog', async () => {
    const wrapper = mount(Modal, {
      sync: false,
      props: {
        open: true,
        getContainer: false,
        destroyOnHidden: true,
      },
      slots: {
        default: () => <span class="modal-child">child</span>,
      },
    });
    await asyncExpect(() => {
      expect(wrapper.find('.modal-child').exists()).toBe(true);
    });
    await wrapper.setProps({ open: false });
    await asyncExpect(() => {
      expect(wrapper.find('.modal-child').exists()).toBe(false);
    }, 1000);
  });
});
