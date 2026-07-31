import { isVNode } from 'vue';
import type { TooltipProps } from '../tooltip';
import type { VueNode } from './type';

/** Convert string / VNode / TooltipProps into TooltipProps (antd ≥ 5.25). */
function convertToTooltipProps<P extends TooltipProps>(
  tooltip: P | VueNode | undefined | null,
): P | null {
  if (tooltip === undefined || tooltip === null) {
    return null;
  }

  if (typeof tooltip === 'object' && !isVNode(tooltip) && !Array.isArray(tooltip)) {
    return tooltip as P;
  }

  return {
    title: tooltip,
  } as P;
}

export default convertToTooltipProps;
