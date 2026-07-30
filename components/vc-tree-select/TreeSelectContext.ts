import type { InjectionKey } from 'vue';
import { provide, inject } from 'vue';
import type { DataEntity } from '../vc-tree/interface';
import type { ExpandAction } from '../vc-tree/props';
import type {
  DefaultOptionType,
  InternalFieldName,
  OnInternalSelect,
  RawValueType,
} from './TreeSelect';

export interface TreeSelectContextProps {
  virtual?: boolean;
  dropdownMatchSelectWidth?: boolean | number;
  listHeight: number;
  listItemHeight: number;
  treeData: DefaultOptionType[];
  fieldNames: InternalFieldName;
  onSelect: OnInternalSelect;
  treeExpandAction?: ExpandAction;
  /** Remaining selectable slots under maxCount; `null` means unlimited. */
  leftMaxCount?: number | null;
  /** When true, parent selection cost is measured by unchecked leaf/checkable children. */
  leafCountOnly?: boolean;
  valueEntities?: Map<RawValueType, DataEntity>;
}

const TreeSelectContextPropsKey: InjectionKey<TreeSelectContextProps> = Symbol(
  'TreeSelectContextPropsKey',
);

export function useProvideSelectContext(props: TreeSelectContextProps) {
  return provide(TreeSelectContextPropsKey, props);
}
export default function useInjectSelectContext() {
  return inject(TreeSelectContextPropsKey, {} as TreeSelectContextProps);
}
