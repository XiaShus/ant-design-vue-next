import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AColorBlock',
  props: {
    prefixCls: String,
    color: String,
  },
  setup(props) {
    return () => (
      <div class={`${props.prefixCls}-color-block`}>
        <div
          class={`${props.prefixCls}-color-block-inner`}
          style={{ background: props.color || 'transparent' }}
        />
      </div>
    );
  },
});
