import type { App, MaybeRef, Plugin, WatchStopHandle } from 'vue';
import { watch, computed, reactive, defineComponent, watchEffect } from 'vue';
import defaultRenderEmpty from './renderEmpty';
import type { RenderEmptyHandler } from './renderEmpty';
import type { Locale } from '../locale-provider';
import LocaleProvider, { ANT_MARK } from '../locale-provider';

import LocaleReceiver from '../locale-provider/LocaleReceiver';

import message from '../message';
import notification from '../notification';
import { registerTheme } from './cssVariables';
import defaultLocale from '../locale/en_US';
import type { ValidateMessages } from '../form/interface';
import useStyle from './style';
import useTheme from './hooks/useTheme';
import defaultSeedToken from '../theme/themes/seed';
import type { ConfigProviderInnerProps, ConfigProviderProps, Theme } from './context';
import {
  useConfigContextProvider,
  useConfigContextInject,
  configProviderProps,
  useProvideGlobalForm,
  defaultIconPrefixCls,
} from './context';
import { useProviderSize } from './SizeContext';
import { useProviderDisabled } from './DisabledContext';
import { useProviderVariant } from './VariantContext';
import { createTheme } from '../_util/cssinjs';
import { DesignTokenProvider } from '../theme/internal';
import { useConfig } from './hooks/useConfig';
import type { HolderRenderType } from './holderStore';
import { getHolderRender, setHolderRender } from './holderStore';
import type { WarningConfig } from '../_util/warning';
import { setWarningConfig } from '../_util/warning';

export type {
  ConfigProviderProps,
  Theme,
  SizeType,
  Direction,
  CSPConfig,
  DirectionType,
} from './context';
export type { HolderRenderType } from './holderStore';
export const defaultPrefixCls = 'ant';
export { defaultIconPrefixCls };
function getGlobalPrefixCls() {
  return globalConfigForApi.prefixCls || defaultPrefixCls;
}

function getGlobalIconPrefixCls() {
  return globalConfigForApi.iconPrefixCls || defaultIconPrefixCls;
}
const globalConfigBySet = reactive<ConfigProviderProps>({}); // 权重最大
export const globalConfigForApi: ConfigProviderProps & {
  getRootPrefixCls?: (rootPrefixCls?: string, customizePrefixCls?: string) => string;
} = reactive({});

export const configConsumerProps = [
  'getTargetContainer',
  'getPopupContainer',
  'rootPrefixCls',
  'getPrefixCls',
  'renderEmpty',
  'csp',
  'autoInsertSpaceInButton',
  'locale',
  'pageHeader',
];

watchEffect(() => {
  Object.assign(globalConfigForApi, globalConfigBySet);
  globalConfigForApi.prefixCls = getGlobalPrefixCls();
  globalConfigForApi.iconPrefixCls = getGlobalIconPrefixCls();
  globalConfigForApi.getPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls
      ? `${globalConfigForApi.prefixCls}-${suffixCls}`
      : globalConfigForApi.prefixCls;
  };
  globalConfigForApi.getRootPrefixCls = () => {
    // If Global prefixCls provided, use this
    if (globalConfigForApi.prefixCls) {
      return globalConfigForApi.prefixCls;
    }

    // Fallback to default prefixCls
    return getGlobalPrefixCls();
  };
});

type GlobalConfigProviderProps = {
  prefixCls?: MaybeRef<ConfigProviderProps['prefixCls']>;
  iconPrefixCls?: MaybeRef<ConfigProviderProps['iconPrefixCls']>;
  getPopupContainer?: ConfigProviderProps['getPopupContainer'];
  /** Wrap static Modal / Message / Notification trees (antd ≥ 5.13). */
  holderRender?: HolderRenderType;
  /** Warning level (antd ≥ 5.10). */
  warning?: WarningConfig;
};

let stopWatchEffect: WatchStopHandle;
const setGlobalConfig = (params: GlobalConfigProviderProps & { theme?: Theme }) => {
  const { holderRender: _omitHolder, warning: warningCfg, ...rest } = params;
  if ('holderRender' in params) {
    setHolderRender(params.holderRender);
  }
  if ('warning' in params) {
    setWarningConfig(warningCfg || {});
  }
  if (stopWatchEffect) {
    stopWatchEffect();
  }
  stopWatchEffect = watchEffect(() => {
    Object.assign(globalConfigBySet, reactive(rest));
    Object.assign(globalConfigForApi, reactive(rest));
  });
  if (params.theme) {
    registerTheme(getGlobalPrefixCls(), params.theme);
  }
};

export const globalConfig = () => ({
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
  },
  getIconPrefixCls: getGlobalIconPrefixCls,
  getRootPrefixCls: () => {
    // If Global prefixCls provided, use this
    if (globalConfigForApi.prefixCls) {
      return globalConfigForApi.prefixCls;
    }

    // Fallback to default prefixCls
    return getGlobalPrefixCls();
  },
  get holderRender() {
    return getHolderRender();
  },
});

const ConfigProvider = defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AConfigProvider',
  inheritAttrs: false,
  props: configProviderProps(),
  setup(props, { slots }) {
    const parentContext = useConfigContextInject();
    const getPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
      const { prefixCls = 'ant' } = props;
      if (customizePrefixCls) return customizePrefixCls;
      const mergedPrefixCls = prefixCls || parentContext.getPrefixCls('');
      return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls;
    };
    const iconPrefixCls = computed(
      () => props.iconPrefixCls || parentContext.iconPrefixCls.value || defaultIconPrefixCls,
    );
    const shouldWrapSSR = computed(() => iconPrefixCls.value !== parentContext.iconPrefixCls.value);
    const csp = computed(() => props.csp || parentContext.csp?.value);

    const wrapSSR = useStyle(iconPrefixCls);

    const mergedTheme = useTheme(
      computed(() => props.theme),
      computed(() => parentContext.theme?.value),
    );
    const renderEmptyComponent = (name?: string) => {
      const renderEmpty = (props.renderEmpty ||
        slots.renderEmpty ||
        parentContext.renderEmpty ||
        defaultRenderEmpty) as RenderEmptyHandler;
      return renderEmpty(name);
    };
    const autoInsertSpaceInButton = computed(
      () => props.autoInsertSpaceInButton ?? parentContext.autoInsertSpaceInButton?.value,
    );
    const locale = computed(() => props.locale || parentContext.locale?.value);
    watch(
      locale,
      () => {
        globalConfigBySet.locale = locale.value;
      },
      { immediate: true },
    );
    const direction = computed(() => props.direction || parentContext.direction?.value);
    const space = computed(() => props.space ?? parentContext.space?.value);
    const alert = computed(() => props.alert ?? parentContext.alert?.value);
    const breadcrumb = computed(() => props.breadcrumb ?? parentContext.breadcrumb?.value);
    const virtual = computed(() => props.virtual ?? parentContext.virtual?.value);
    // antd ≥ 5.5 prefers popupMatchSelectWidth; keep dropdownMatchSelectWidth as alias
    const popupMatchSelectWidth = computed(
      () =>
        props.popupMatchSelectWidth ??
        props.dropdownMatchSelectWidth ??
        parentContext.popupMatchSelectWidth?.value ??
        parentContext.dropdownMatchSelectWidth?.value,
    );
    const dropdownMatchSelectWidth = popupMatchSelectWidth;
    const getTargetContainer = computed(() =>
      props.getTargetContainer !== undefined
        ? props.getTargetContainer
        : parentContext.getTargetContainer?.value,
    );
    const getPopupContainer = computed(() =>
      props.getPopupContainer !== undefined
        ? props.getPopupContainer
        : parentContext.getPopupContainer?.value,
    );
    const pageHeader = computed(() =>
      props.pageHeader !== undefined ? props.pageHeader : parentContext.pageHeader?.value,
    );
    const input = computed(() =>
      props.input !== undefined ? props.input : parentContext.input?.value,
    );
    const pagination = computed(() =>
      props.pagination !== undefined ? props.pagination : parentContext.pagination?.value,
    );
    const transfer = computed(() =>
      props.transfer !== undefined ? props.transfer : parentContext.transfer?.value,
    );
    const button = computed(() =>
      props.button !== undefined ? props.button : parentContext.button?.value,
    );
    const form = computed(() =>
      props.form !== undefined ? props.form : parentContext.form?.value,
    );
    const select = computed(() =>
      props.select !== undefined ? props.select : parentContext.select?.value,
    );
    const componentSize = computed(() => props.componentSize);
    const componentDisabled = computed(() => props.componentDisabled);
    const variant = computed(() => props.variant ?? parentContext.variant?.value);
    const wave = computed(() => props.wave ?? parentContext.wave?.value);
    const flex = computed(() => props.flex ?? parentContext.flex?.value);
    watchEffect(() => {
      if (props.warning) {
        setWarningConfig(props.warning);
      }
    });
    const configProvider: ConfigProviderInnerProps = {
      csp,
      autoInsertSpaceInButton,
      locale,
      direction,
      space,
      alert,
      breadcrumb,
      virtual,
      dropdownMatchSelectWidth,
      popupMatchSelectWidth,
      getPrefixCls,
      iconPrefixCls,
      theme: computed(() => {
        return mergedTheme.value ?? parentContext.theme?.value;
      }),
      renderEmpty: renderEmptyComponent,
      getTargetContainer,
      getPopupContainer,
      pageHeader,
      input,
      pagination,
      transfer,
      button,
      form,
      select,
      componentSize,
      componentDisabled,
      variant,
      transformCellText: computed(() => props.transformCellText),
      wave,
      flex,
    };

    // ================================ Dynamic theme ================================
    const memoTheme = computed(() => {
      const { algorithm, token, ...rest } = mergedTheme.value || {};
      const themeObj =
        algorithm && (!Array.isArray(algorithm) || algorithm.length > 0)
          ? createTheme(algorithm)
          : undefined;
      return {
        ...rest,
        theme: themeObj,

        token: {
          ...defaultSeedToken,
          ...token,
        },
      };
    });
    const validateMessagesRef = computed(() => {
      // Additional Form provider
      let validateMessages: ValidateMessages = {};

      if (locale.value) {
        validateMessages =
          locale.value.Form?.defaultValidateMessages ||
          defaultLocale.Form?.defaultValidateMessages ||
          {};
      }
      if (props.form && props.form.validateMessages) {
        validateMessages = { ...validateMessages, ...props.form.validateMessages };
      }
      return validateMessages;
    });
    useConfigContextProvider(configProvider);
    useProvideGlobalForm({ validateMessages: validateMessagesRef });
    useProviderSize(componentSize);
    useProviderDisabled(componentDisabled);
    useProviderVariant(variant);

    const renderProvider = (legacyLocale: Locale) => {
      let childNode = shouldWrapSSR.value ? wrapSSR(slots.default?.()) : slots.default?.();
      if (props.theme)
        childNode = <DesignTokenProvider value={memoTheme.value}>{childNode}</DesignTokenProvider>;
      return (
        <LocaleProvider locale={locale.value || legacyLocale} ANT_MARK__={ANT_MARK}>
          {childNode}
        </LocaleProvider>
      );
    };

    watchEffect(() => {
      if (direction.value) {
        message.config({
          rtl: direction.value === 'rtl',
        });
        notification.config({
          rtl: direction.value === 'rtl',
        });
      }
    });

    return () => (
      <LocaleReceiver children={(_, __, legacyLocale) => renderProvider(legacyLocale as Locale)} />
    );
  },
});

ConfigProvider.config = setGlobalConfig;
ConfigProvider.useConfig = useConfig;

ConfigProvider.install = function (app: App) {
  app.component(ConfigProvider.name, ConfigProvider);
};

export { useConfig };
export type { UseConfigResult } from './hooks/useConfig';

export default ConfigProvider as typeof ConfigProvider &
  Plugin & {
    readonly useConfig: typeof useConfig;
    readonly config: typeof setGlobalConfig;
  };
