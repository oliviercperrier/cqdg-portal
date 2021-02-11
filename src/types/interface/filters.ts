import { TFilterGroupConfig, VisualType } from 'components/containers/filters/Filters';
export type TFilterValue = Array<string | number | boolean>;
export interface IValueContent {
    field: string;
    value: TFilterValue;
}

export type TValueOp = 'in' | '>=' | '<=';
export interface IValueFilter {
    content: IValueContent;
    op: TValueOp;
}

export type TSqonGroupContent = IValueFilter[];
export type TSqonGroupOp = 'and';
export interface ISqonGroupFilter {
    content: TSqonGroupContent;
    op: TSqonGroupOp;
}

export interface IFilterModel {
    type: VisualType;
    field: string;
    title?: string;
    config?: TFilterGroupConfig;
}
