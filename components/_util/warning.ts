import vcWarning, { resetWarned, noteOnce } from '../vc-util/warning';

export { resetWarned };
export function noop() {}

export type WarningConfig = {
  /**
   * When `false`, warnings use console.warn (note) instead of console.error.
   * Aligns with antd ConfigProvider `warning.strict` (≥ 5.10).
   */
  strict?: boolean;
};

let warningConfig: WarningConfig = {
  strict: true,
};

export function setWarningConfig(config: WarningConfig = {}) {
  warningConfig = {
    ...warningConfig,
    ...config,
  };
}

export function getWarningConfig(): WarningConfig {
  return warningConfig;
}

type Warning = (valid: boolean, component: string, message?: string) => void;

// eslint-disable-next-line import/no-mutable-exports
let warning: Warning = noop;
if (process.env.NODE_ENV !== 'production') {
  warning = (valid, component, message) => {
    const text = `[ant-design-vue: ${component}] ${message}`;
    if (warningConfig.strict === false) {
      noteOnce(valid, text);
    } else {
      vcWarning(valid, text);
    }

    // StrictMode will inject console which will not throw warning in React 17.
    if (process.env.NODE_ENV === 'test') {
      resetWarned();
    }
  };
}

export default warning;
