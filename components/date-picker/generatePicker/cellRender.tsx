import type { VueNode } from '../../_util/type';
import type { Locale, PanelMode } from '../../vc-picker/interface';
import type { GenerateConfig } from '../../vc-picker/generate';
import type { DateRender } from '../../vc-picker/panels/DatePanel/DateBody';
import type { MonthCellRender } from '../../vc-picker/panels/MonthPanel/MonthBody';
import type { RangeDateRender } from '../../vc-picker/RangePicker';

/** antd ≥ 5.4 DatePicker cellRender info (subset supported via vc-picker adapters). */
export type DatePickerCellRenderInfo<DateType> = {
  originNode: VueNode;
  today?: DateType;
  type: PanelMode;
  locale?: Locale;
  range?: 'start' | 'end';
};

export type DatePickerCellRender<DateType> = (
  current: DateType,
  info: DatePickerCellRenderInfo<DateType>,
) => VueNode;

type CellRenderSlot<DateType> = (
  payload: DatePickerCellRenderInfo<DateType> & { current: DateType },
) => VueNode;

export function mergeDateCellRender<DateType>(options: {
  prefixCls: string;
  generateConfig: GenerateConfig<DateType>;
  dateRender?: DateRender<DateType>;
  cellRender?: DatePickerCellRender<DateType>;
  cellRenderSlot?: CellRenderSlot<DateType>;
}): DateRender<DateType> | undefined {
  const { prefixCls, generateConfig, dateRender, cellRender, cellRenderSlot } = options;
  if (dateRender) {
    return dateRender;
  }
  if (!cellRender && !cellRenderSlot) {
    return undefined;
  }
  return ({ current, today }) => {
    const originNode = (
      <div class={`${prefixCls}-cell-inner`}>{generateConfig.getDate(current)}</div>
    );
    const info: DatePickerCellRenderInfo<DateType> = {
      originNode,
      today,
      type: 'date',
    };
    if (cellRender) {
      return cellRender(current, info);
    }
    return cellRenderSlot!({ current, ...info });
  };
}

export function mergeMonthCellRender<DateType>(options: {
  prefixCls: string;
  generateConfig: GenerateConfig<DateType>;
  monthCellRender?: MonthCellRender<DateType>;
  cellRender?: DatePickerCellRender<DateType>;
  cellRenderSlot?: CellRenderSlot<DateType>;
}): MonthCellRender<DateType> | undefined {
  const { prefixCls, generateConfig, monthCellRender, cellRender, cellRenderSlot } = options;
  if (monthCellRender) {
    return monthCellRender;
  }
  if (!cellRender && !cellRenderSlot) {
    return undefined;
  }
  return ({ current, locale }) => {
    const months =
      locale.shortMonths ||
      (generateConfig.locale.getShortMonths
        ? generateConfig.locale.getShortMonths(locale.locale)
        : []);
    const originNode = (
      <div class={`${prefixCls}-cell-inner`}>{months[generateConfig.getMonth(current)]}</div>
    );
    const info: DatePickerCellRenderInfo<DateType> = {
      originNode,
      type: 'month',
      locale,
    };
    if (cellRender) {
      return cellRender(current, info);
    }
    return cellRenderSlot!({ current, ...info });
  };
}

export function mergeRangeDateCellRender<DateType>(options: {
  prefixCls: string;
  generateConfig: GenerateConfig<DateType>;
  dateRender?: RangeDateRender<DateType>;
  cellRender?: DatePickerCellRender<DateType>;
  cellRenderSlot?: CellRenderSlot<DateType>;
}): RangeDateRender<DateType> | undefined {
  const { prefixCls, generateConfig, dateRender, cellRender, cellRenderSlot } = options;
  if (dateRender) {
    return dateRender;
  }
  if (!cellRender && !cellRenderSlot) {
    return undefined;
  }
  return ({ current, today, info: rangeInfo }) => {
    const originNode = (
      <div class={`${prefixCls}-cell-inner`}>{generateConfig.getDate(current)}</div>
    );
    const info: DatePickerCellRenderInfo<DateType> = {
      originNode,
      today,
      type: 'date',
      range: rangeInfo?.range,
    };
    if (cellRender) {
      return cellRender(current, info);
    }
    return cellRenderSlot!({ current, ...info });
  };
}
