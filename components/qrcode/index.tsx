import { defineComponent, computed, ref } from 'vue';
import type { CSSProperties, ExtractPropTypes } from 'vue';
import useConfigInject from '../config-provider/hooks/useConfigInject';
import useStyle from './style';
import { useLocaleReceiver } from '../locale/LocaleReceiver';
import { withInstall } from '../_util/type';
import { useToken } from '../theme/internal';
import { QRCodeCanvas, QRCodeSVG } from './QRCode';
import warning from '../_util/warning';
import { qrcodeProps } from './interface';
import QRcodeStatus from './QrcodeStatus';
import type { StatusRender, StatusRenderInfo } from './QrcodeStatus';

export type { StatusRender, StatusRenderInfo };
export type QRCodeProps = Partial<ExtractPropTypes<ReturnType<typeof qrcodeProps>>>;

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

const QRCode = defineComponent({
  name: 'AQrcode',
  inheritAttrs: false,
  props: qrcodeProps(),
  emits: ['refresh'],
  setup(props, { emit, attrs, expose, slots }) {
    if (process.env.NODE_ENV !== 'production') {
      warning(
        !(props.icon && props.errorLevel === 'L'),
        'QRCode',
        'ErrorLevel `L` is not recommended to be used with `icon`, for scanning result would be affected by low level.',
      );
    }
    const [locale] = useLocaleReceiver('QRCode');
    const { prefixCls } = useConfigInject('qrcode', props);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    const [, token] = useToken();
    const qrCodeCanvas = ref();
    expose({
      toDataURL: (type?: string, quality?: any) => {
        return qrCodeCanvas.value?.toDataURL(type, quality);
      },
    });
    const qrCodeProps = computed(() => {
      const {
        value,
        icon = '',
        size = 160,
        iconSize = 40,
        color = token.value.colorText,
        bgColor = 'transparent',
        errorLevel = 'M',
      } = props;
      const resolvedIconSize = isNumber(iconSize)
        ? { width: iconSize, height: iconSize }
        : { width: iconSize?.width ?? 40, height: iconSize?.height ?? 40 };
      const imageSettings: QRCodeProps['imageSettings'] = {
        src: icon,
        x: undefined,
        y: undefined,
        height: resolvedIconSize.height,
        width: resolvedIconSize.width,
        excavate: true,
      };
      return {
        value,
        size: size - (token.value.paddingSM + token.value.lineWidth) * 2,
        level: errorLevel,
        bgColor,
        fgColor: color,
        imageSettings: icon ? imageSettings : undefined,
      };
    });
    return () => {
      const pre = prefixCls.value;
      const onRefresh = () => emit('refresh');
      const statusRenderInfo: StatusRenderInfo | null =
        props.status !== 'active'
          ? {
              status: props.status as StatusRenderInfo['status'],
              locale: locale.value,
              onRefresh,
            }
          : null;

      let statusNode: any = null;
      if (statusRenderInfo) {
        if (props.statusRender) {
          statusNode = props.statusRender(statusRenderInfo);
        } else if (slots.statusRender) {
          statusNode = slots.statusRender(statusRenderInfo);
        } else {
          statusNode = (
            <QRcodeStatus
              prefixCls={pre}
              locale={locale.value}
              status={statusRenderInfo.status}
              onRefresh={onRefresh}
            />
          );
        }
      }

      return wrapSSR(
        <div
          {...attrs}
          style={[
            attrs.style as CSSProperties,
            {
              width: `${props.size}px`,
              height: `${props.size}px`,
              backgroundColor: qrCodeProps.value.bgColor,
            },
          ]}
          class={[
            hashId.value,
            pre,
            {
              [`${pre}-borderless`]: !props.bordered,
            },
          ]}
        >
          {statusNode && <div class={`${pre}-mask`}>{statusNode}</div>}
          {props.type === 'canvas' ? (
            <QRCodeCanvas ref={qrCodeCanvas} {...qrCodeProps.value} />
          ) : (
            <QRCodeSVG {...qrCodeProps.value} />
          )}
        </div>,
      );
    };
  },
});
export default withInstall(QRCode);
