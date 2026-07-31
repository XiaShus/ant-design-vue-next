import type { Key, VueNode } from '../_util/type';
import { arrayType, booleanType, someType, stringType, functionType } from '../_util/type';
import PropTypes from '../_util/vue-types';

export type CollapsibleType = 'header' | 'icon' | 'disabled';

export type ActiveKeyType = Array<string | number> | string | number;

/** Collapse size (antd ≥ 5.2). `default` / `middle` share the same style. */
export type CollapseSize = 'large' | 'middle' | 'small' | 'default';

export interface PanelProps {
  isActive?: boolean;
  header?: any;
  showArrow?: boolean;
  forceRender?: boolean;
  /** @deprecated Use `collapsible="disabled"` instead */
  disabled?: boolean;
  extra?: any;
  collapsible?: CollapsibleType;
}

/** Collapse panel config for `items` (antd ≥ 5.6). */
export type CollapseItemType = {
  key?: string | number;
  label?: VueNode;
  children?: VueNode;
  collapsible?: CollapsibleType;
  showArrow?: boolean;
  forceRender?: boolean;
  /** @deprecated Use `collapsible="disabled"` instead */
  disabled?: boolean;
  extra?: VueNode;
  headerClass?: string;
};

const collapseProps = () => ({
  prefixCls: String,
  activeKey: someType<ActiveKeyType>([Array, Number, String]),
  defaultActiveKey: someType<ActiveKeyType>([Array, Number, String]),
  accordion: booleanType(),
  /** @deprecated Please use `destroyOnHidden` instead (antd ≥ 5.25). */
  destroyInactivePanel: booleanType(),
  /** Destroy inactive panel DOM when hidden (antd ≥ 5.25). */
  destroyOnHidden: booleanType(),
  bordered: booleanType(),
  expandIcon: functionType<(panelProps: PanelProps) => any>(),
  openAnimation: PropTypes.object,
  expandIconPosition: stringType<'start' | 'end'>(),
  collapsible: stringType<CollapsibleType>(),
  ghost: booleanType(),
  /** Collapse size (antd ≥ 5.2). */
  size: stringType<CollapseSize>(),
  /** Collapse panels config (antd ≥ 5.6). */
  items: arrayType<CollapseItemType[]>(),
  onChange: functionType<(key: Key | Key[]) => void>(),
  'onUpdate:activeKey': functionType<(key: Key | Key[]) => void>(),
});

const collapsePanelProps = () => ({
  openAnimation: PropTypes.object,
  prefixCls: String,
  header: PropTypes.any,
  headerClass: String,
  showArrow: booleanType(),
  isActive: booleanType(),
  /** @deprecated Please use `destroyOnHidden` instead (antd ≥ 5.25). */
  destroyInactivePanel: booleanType(),
  destroyOnHidden: booleanType(),
  /** @deprecated Use `collapsible="disabled"` instead */
  disabled: booleanType(),
  accordion: booleanType(),
  forceRender: booleanType(),
  expandIcon: functionType<(panelProps: PanelProps) => any>(),
  extra: PropTypes.any,
  panelKey: someType<number | string>(),
  collapsible: stringType<CollapsibleType>(),
  role: String,
  onItemClick: functionType<(panelKey: Key) => void>(),
});

export { collapseProps, collapsePanelProps };
