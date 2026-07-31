import pickAttrs from './pickAttrs';

/** Closable config object (antd ≥ 5.16 Modal / Drawer). */
export type ClosableConfig = {
  closeIcon?: any;
  disabled?: boolean;
  [key: `aria-${string}`]: string | undefined;
  [key: `data-${string}`]: string | undefined;
};

export type ClosableType = boolean | ClosableConfig;

export function isClosableConfig(closable: ClosableType | undefined): closable is ClosableConfig {
  return !!closable && typeof closable === 'object';
}

/** Normalize `closable` + `closeIcon` into Dialog/Drawer close-button state. */
export default function getClosable(
  closable: ClosableType | undefined,
  closeIcon: any,
  defaultClosable = true,
) {
  const config = isClosableConfig(closable) ? closable : null;

  let mergedClosable: boolean;
  if (config) {
    mergedClosable = true;
  } else if (typeof closable === 'boolean') {
    mergedClosable = closable;
  } else if (closeIcon === false || closeIcon === null) {
    mergedClosable = false;
  } else {
    mergedClosable = defaultClosable;
  }

  const mergedCloseIcon =
    config?.closeIcon ?? (closeIcon !== false && closeIcon !== null ? closeIcon : undefined);

  return {
    closable: mergedClosable,
    closeIcon: mergedCloseIcon,
    disabled: !!config?.disabled,
    closeBtnProps: config ? pickAttrs(config, { aria: true, data: true }) : {},
  };
}
