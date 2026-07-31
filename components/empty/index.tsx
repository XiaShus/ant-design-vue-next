import { defineComponent, h } from 'vue';
import type { CSSProperties, ExtractPropTypes } from 'vue';
import classNames from '../_util/classNames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import DefaultEmptyImg from './empty';
import SimpleEmptyImg from './simple';
import { filterEmpty } from '../_util/props-util';
import type { VueNode } from '../_util/type';
import { anyType, objectType, withInstall } from '../_util/type';
import useConfigInject from '../config-provider/hooks/useConfigInject';
import { useConfigContextInject } from '../config-provider/context';
import warning from '../_util/warning';

import useStyle from './style';

interface Locale {
  description?: string;
}

export type EmptySemanticName = 'root' | 'image' | 'description' | 'footer';

export type EmptyClassNamesType = Partial<Record<EmptySemanticName, string>>;
export type EmptyStylesType = Partial<Record<EmptySemanticName, CSSProperties>>;

export const emptyProps = () => ({
  prefixCls: String,
  /** @deprecated Please use `styles.image` instead */
  imageStyle: objectType<CSSProperties>(),
  image: anyType<VueNode>(),
  description: anyType<VueNode>(),
  /** Semantic structure className (antd ≥ 5.23). */
  classNames: objectType<EmptyClassNamesType>(),
  /** Semantic structure style (antd ≥ 5.23). */
  styles: objectType<EmptyStylesType>(),
});

export type EmptyProps = Partial<ExtractPropTypes<ReturnType<typeof emptyProps>>>;

const Empty = defineComponent({
  name: 'AEmpty',
  compatConfig: { MODE: 3 },
  inheritAttrs: false,
  props: emptyProps(),
  setup(props, { slots = {}, attrs }) {
    const { direction, prefixCls: prefixClsRef } = useConfigInject('empty', props);
    const { empty: ctxEmpty } = useConfigContextInject();

    const [wrapSSR, hashId] = useStyle(prefixClsRef);

    warning(
      props.imageStyle === undefined,
      'Empty',
      '`imageStyle` is deprecated. Please use `styles.image` instead.',
    );

    return () => {
      const prefixCls = prefixClsRef.value;
      const emptyCfg = ctxEmpty?.value;
      const {
        image: mergedImage = slots.image?.() || h(DefaultEmptyImg),
        description = slots.description?.() || undefined,
        imageStyle,
        classNames: emptyClassNames,
        styles: emptyStyles,
        class: className = '',
        style,
        ...restProps
      } = { ...props, ...attrs } as EmptyProps & {
        class?: any;
        style?: CSSProperties;
      };
      const image =
        typeof mergedImage === 'function' ? (mergedImage as () => VueNode)() : mergedImage;
      const isNormal =
        typeof image === 'object' && 'type' in image && (image.type as any).PRESENTED_IMAGE_SIMPLE;
      return wrapSSR(
        <LocaleReceiver
          componentName="Empty"
          children={(locale: Locale) => {
            const des = typeof description !== 'undefined' ? description : locale.description;
            const alt = typeof des === 'string' ? des : 'empty';
            let imageNode: EmptyProps['image'] = null;

            if (typeof image === 'string') {
              imageNode = <img alt={alt} src={image} />;
            } else {
              imageNode = image;
            }

            return (
              <div
                class={classNames(
                  prefixCls,
                  className,
                  hashId.value,
                  emptyCfg?.className,
                  emptyClassNames?.root,
                  {
                    [`${prefixCls}-normal`]: isNormal,
                    [`${prefixCls}-rtl`]: direction.value === 'rtl',
                  },
                )}
                style={{ ...emptyCfg?.style, ...emptyStyles?.root, ...(style as CSSProperties) }}
                {...restProps}
              >
                <div
                  class={classNames(`${prefixCls}-image`, emptyClassNames?.image)}
                  style={{ ...imageStyle, ...emptyStyles?.image }}
                >
                  {imageNode}
                </div>
                {des && (
                  <p
                    class={classNames(`${prefixCls}-description`, emptyClassNames?.description)}
                    style={emptyStyles?.description}
                  >
                    {des}
                  </p>
                )}
                {slots.default && (
                  <div
                    class={classNames(`${prefixCls}-footer`, emptyClassNames?.footer)}
                    style={emptyStyles?.footer}
                  >
                    {filterEmpty(slots.default())}
                  </div>
                )}
              </div>
            );
          }}
        />,
      );
    };
  },
});

Empty.PRESENTED_IMAGE_DEFAULT = () => h(DefaultEmptyImg);
Empty.PRESENTED_IMAGE_SIMPLE = () => h(SimpleEmptyImg);

export default withInstall(Empty);
