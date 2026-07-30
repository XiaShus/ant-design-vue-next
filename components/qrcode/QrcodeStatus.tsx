import type { VNode, VNodeChild } from 'vue';
import { ReloadOutlined } from '@ant-design/icons-vue';
import Spin from '../spin';
import Button from '../button';
import type { Locale } from '../locale';

export type QRStatus = 'active' | 'expired' | 'loading' | 'scanned';

export type StatusRenderInfo = {
  status: Exclude<QRStatus, 'active'>;
  locale: Locale['QRCode'];
  onRefresh?: () => void;
};

export type StatusRender = (info: StatusRenderInfo) => VNodeChild;

export type QRcodeStatusProps = {
  prefixCls: string;
  locale?: Locale['QRCode'];
  onRefresh?: () => void;
  statusRender?: StatusRender;
  status: StatusRenderInfo['status'];
};

export default function QRcodeStatus({
  prefixCls,
  locale,
  onRefresh,
  statusRender,
  status,
}: QRcodeStatusProps): VNode {
  const defaultExpiredNode = (
    <>
      <p class={`${prefixCls}-expired`}>{locale?.expired}</p>
      {onRefresh && (
        <Button type="link" onClick={onRefresh} v-slots={{ icon: () => <ReloadOutlined /> }}>
          {locale?.refresh}
        </Button>
      )}
    </>
  );

  const defaultScannedNode = <p class={`${prefixCls}-scanned`}>{locale?.scanned}</p>;

  const defaultNodes = {
    expired: defaultExpiredNode,
    loading: <Spin />,
    scanned: defaultScannedNode,
  };

  const defaultStatusRender: StatusRender = info => defaultNodes[info.status];
  const mergedStatusRender = statusRender ?? defaultStatusRender;

  return <>{mergedStatusRender({ status, locale, onRefresh })}</>;
}
