import { TFilterGroupConfig, VisualType } from '@ferlab/ui/core/components/filters/types';
export type TFilterValue = Array<string | number | boolean>;
export interface IValueContent {
    field: string;
    value: TFilterValue;
}

export type TValueOp = 'in' | '>=' | '<=' | 'not in' | 'all' | 'between';
export interface IValueFilter {
    content: IValueContent;
    op: TValueOp;
}

export type TSqonGroupContent = IValueFilter[];
export type TSqonGroupOp = 'and' | 'or';
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
