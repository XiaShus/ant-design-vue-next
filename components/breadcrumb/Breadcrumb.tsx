import type { PropType, ExtractPropTypes } from 'vue';
import { cloneVNode, defineComponent } from 'vue';
import PropTypes from '../_util/vue-types';
import { flattenChildren, getPropsSlot } from '../_util/props-util';
import warning from '../_util/warning';
import type { BreadcrumbItemProps } from './BreadcrumbItem';
import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbSeparator from './BreadcrumbSeparator';
import Menu from '../menu';
import type { MenuProps } from '../menu';
import useConfigInject from '../config-provider/hooks/useConfigInject';
import useStyle from './style';
import type { CustomSlotsType, VueNode } from '../_util/type';
import { arrayType } from '../_util/type';
import type { DropdownProps } from '../dropdown';

/** @deprecated Prefer `BreadcrumbItemType` with `title`. */
export interface Route {
  path?: string;
  breadcrumbName?: string;
  children?: Omit<Route, 'children'>[];
}

/** Item config for `items` prop (antd ≥ 5.3). */
export interface BreadcrumbItemType {
  key?: string | number;
  href?: string;
  path?: string;
  title?: VueNode;
  /** @deprecated Please use `title` instead */
  breadcrumbName?: string;
  menu?: MenuProps;
  /** @deprecated Please use `menu` instead */
  overlay?: any;
  className?: string;
  dropdownProps?: DropdownProps;
  onClick?: (e: MouseEvent) => void;
  children?: Omit<BreadcrumbItemType, 'children'>[];
}

export interface BreadcrumbSeparatorType {
  type: 'separator';
  separator?: VueNode;
}

export type BreadcrumbItemConfig = Partial<BreadcrumbItemType & BreadcrumbSeparatorType>;

export const breadcrumbProps = () => ({
  prefixCls: String,
  /** @deprecated Please use `items` instead */
  routes: { type: Array as PropType<Route[]> },
  params: PropTypes.any,
  separator: PropTypes.any,
  /** Breadcrumb items (antd ≥ 5.3). */
  items: arrayType<BreadcrumbItemConfig[]>(),
  itemRender: {
    type: Function as PropType<
      (opt: {
        route: BreadcrumbItemConfig;
        params: unknown;
        routes: BreadcrumbItemConfig[];
        paths: string[];
      }) => VueNode
    >,
  },
});

export type BreadcrumbProps = Partial<ExtractPropTypes<ReturnType<typeof breadcrumbProps>>>;

function getBreadcrumbName(route: BreadcrumbItemConfig, params: unknown) {
  const name = route.title ?? route.breadcrumbName;
  if (name == null || typeof name !== 'string') {
    return name ?? null;
  }
  const paramsKeys = Object.keys(params || {}).join('|');
  if (!paramsKeys) {
    return name;
  }
  return name.replace(
    new RegExp(`:(${paramsKeys})`, 'g'),
    (replacement, key) => (params as any)[key] || replacement,
  );
}

function defaultItemRender(opt: {
  route: BreadcrumbItemConfig;
  params: unknown;
  routes: BreadcrumbItemConfig[];
  paths: string[];
}): VueNode {
  const { route, params, routes, paths } = opt;
  const isLastItem = routes.indexOf(route) === routes.length - 1;
  const name = getBreadcrumbName(route, params);
  if (isLastItem) {
    return <span>{name}</span>;
  }
  if (route.href !== undefined) {
    return <a href={route.href}>{name}</a>;
  }
  return <a href={`#/${paths.join('/')}`}>{name}</a>;
}

function normalizeRoutes(routes: Route[] = []): BreadcrumbItemConfig[] {
  return routes.map(route => ({
    ...route,
    title: route.breadcrumbName,
    children: route.children?.map(child => ({
      ...child,
      title: child.breadcrumbName,
    })),
  }));
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ABreadcrumb',
  inheritAttrs: false,
  props: breadcrumbProps(),
  slots: Object as CustomSlotsType<{
    separator: any;
    itemRender: {
      route: BreadcrumbItemConfig;
      params: any;
      routes: BreadcrumbItemConfig[];
      paths: string[];
    };
    default: any;
  }>,
  setup(props, { slots, attrs }) {
    const { prefixCls, direction } = useConfigInject('breadcrumb', props);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    const getPath = (path: string, params: unknown) => {
      path = (path || '').replace(/^\//, '');
      Object.keys(params || {}).forEach(key => {
        path = path.replace(`:${key}`, (params as any)[key]);
      });
      return path;
    };

    const addChildPath = (paths: string[], childPath: string, params: unknown) => {
      const originalPaths = [...paths];
      const path = getPath(childPath || '', params);
      if (path) {
        originalPaths.push(path);
      }
      return originalPaths;
    };

    const genForItems = ({
      items = [],
      params = {},
      separator,
      itemRender = defaultItemRender,
    }: {
      items?: BreadcrumbItemConfig[];
      params?: any;
      separator?: any;
      itemRender?: typeof defaultItemRender;
    }) => {
      const paths: string[] = [];
      return items.map((item, index) => {
        if (item.type === 'separator') {
          return <BreadcrumbSeparator key={`sep-${index}`}>{item.separator}</BreadcrumbSeparator>;
        }

        const path = getPath(item.path || '', params);
        if (path) {
          paths.push(path);
        }
        const tempPaths = [...paths];
        let overlay = null;
        if (item.menu) {
          overlay = <Menu {...item.menu} />;
        } else if (item.overlay) {
          overlay = item.overlay;
        } else if (item.children && item.children.length) {
          overlay = (
            <Menu
              items={item.children.map((child, i) => ({
                key: child.key ?? child.path ?? child.breadcrumbName ?? i,
                label: itemRender({
                  route: child,
                  params,
                  routes: items,
                  paths: addChildPath(tempPaths, child.path || '', params),
                }),
              }))}
            />
          );
        }
        const itemProps: BreadcrumbItemProps = {
          separator,
          dropdownProps: item.dropdownProps,
        };
        if (overlay) {
          itemProps.overlay = overlay;
        }
        if (item.href !== undefined) {
          itemProps.href = item.href;
        }
        if (item.onClick) {
          itemProps.onClick = item.onClick;
        }
        return (
          <BreadcrumbItem
            {...itemProps}
            key={item.key ?? (path || item.breadcrumbName || index)}
            class={item.className}
          >
            {itemRender({ route: item, params, routes: items, paths: tempPaths })}
          </BreadcrumbItem>
        );
      });
    };

    return () => {
      let crumbs: VueNode[];

      const { routes, params = {}, items } = props;

      const children = flattenChildren(getPropsSlot(slots, props));
      const separator = getPropsSlot(slots, props, 'separator') ?? '/';

      const itemRender = props.itemRender || slots.itemRender || defaultItemRender;
      const mergedItems = items?.length ? items : routes?.length ? normalizeRoutes(routes) : null;

      if (mergedItems && mergedItems.length > 0) {
        crumbs = genForItems({
          items: mergedItems,
          params,
          separator,
          itemRender,
        });
      } else if (children.length) {
        crumbs = children.map((element, index) => {
          warning(
            typeof element.type === 'object' &&
              (element.type.__ANT_BREADCRUMB_ITEM || element.type.__ANT_BREADCRUMB_SEPARATOR),
            'Breadcrumb',
            "Only accepts Breadcrumb.Item and Breadcrumb.Separator as it's children",
          );
          return cloneVNode(element, { separator, key: index });
        });
      }

      const breadcrumbClassName = {
        [prefixCls.value]: true,
        [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
        [`${attrs.class}`]: !!attrs.class,
        [hashId.value]: true,
      };

      return wrapSSR(
        <nav {...attrs} class={breadcrumbClassName}>
          <ol>{crumbs}</ol>
        </nav>,
      );
    };
  },
});
