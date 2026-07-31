import type { VNodeTypes, HTMLAttributes, FunctionalComponent, CSSProperties } from 'vue';

function notEmpty(val: any) {
  return val !== undefined && val !== null;
}

interface CellProps extends HTMLAttributes {
  itemPrefixCls: string;
  span: number;
  component: string;
  labelStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  labelClassName?: string;
  contentClassName?: string;
  bordered?: boolean;
  label?: number | VNodeTypes;
  content?: number | VNodeTypes;
  colon?: boolean;
}

const Cell: FunctionalComponent<CellProps> = props => {
  const {
    itemPrefixCls,
    component,
    span,
    labelStyle,
    contentStyle,
    labelClassName,
    contentClassName,
    bordered,
    label,
    content,
    colon,
  } = props;
  const Component = component as any;
  if (bordered) {
    return (
      <Component
        class={[
          {
            [`${itemPrefixCls}-item-label`]: notEmpty(label),
            [`${itemPrefixCls}-item-content`]: notEmpty(content),
          },
          notEmpty(label) ? labelClassName : null,
          notEmpty(content) ? contentClassName : null,
        ]}
        colSpan={span}
      >
        {notEmpty(label) && <span style={labelStyle}>{label}</span>}
        {notEmpty(content) && <span style={contentStyle}>{content}</span>}
      </Component>
    );
  }

  return (
    <Component class={[`${itemPrefixCls}-item`]} colSpan={span}>
      <div class={`${itemPrefixCls}-item-container`}>
        {(label || label === 0) && (
          <span
            class={[
              `${itemPrefixCls}-item-label`,
              {
                [`${itemPrefixCls}-item-no-colon`]: !colon,
              },
              labelClassName,
            ]}
            style={labelStyle}
          >
            {label}
          </span>
        )}
        {(content || content === 0) && (
          <span class={[`${itemPrefixCls}-item-content`, contentClassName]} style={contentStyle}>
            {content}
          </span>
        )}
      </div>
    </Component>
  );
};

export default Cell;
