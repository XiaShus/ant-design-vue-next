import type { VNodeChild } from 'vue';

export type HolderRenderType = (children: VNodeChild) => VNodeChild;

let holderRender: HolderRenderType | undefined;

export function setHolderRender(render?: HolderRenderType) {
  holderRender = render;
}

export function getHolderRender() {
  return holderRender;
}

/** Wrap static Modal / Message / Notification tree with ConfigProvider.config({ holderRender }). */
export function wrapWithHolderRender(node: VNodeChild): VNodeChild {
  if (typeof holderRender === 'function') {
    return holderRender(node);
  }
  return node;
}
