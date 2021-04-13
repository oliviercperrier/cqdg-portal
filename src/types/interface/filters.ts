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

export interface ISqonGroupFilters {
    op: TSqonGroupOp;
    content: TSqonGroupFiltersContent;
}

export type TSqonGroupFiltersContent = ISqonGroupFilter[] | TSqonGroupContent;

export type TSqonDataFilter = IValueContent & {
    op?: TValueOp;
};

/**
 * Strategy to use to merge the values of the field.
 */
export enum MERGE_VALUES_STRATEGIES {
    /**
     * Append provided values to existing ones
     */
    APPEND_VALUES = 'APPEND_VALUES',

    /**
     * Defaults to `OVERRIDE_VALUES`
     */
    DEFAULT = 'OVERRIDE_VALUES',

    /**
     * Replaces existing values with provided ones
     */
    OVERRIDE_VALUES = 'OVERRIDE_VALUES',
}

/**
 * Strategy to use to merge the operator of the field.
 */
export enum MERGE_OPERATOR_STRATEGIES {
    /**
     * Defaults to `OVERRIDE_OPERATOR`
     */
    DEFAULT = 'OVERRIDE_OPERATOR',

    /**
     * Keep the current operator.
     * The one provided will be used if the field is not found.
     */
    KEEP_OPERATOR = 'KEEP_OPERATOR',

    /**
     * Replaces existing operator with provided one
     */
    OVERRIDE_OPERATOR = 'OVERRIDE_OPERATOR',
}

export interface IMergeStategy {
    values: MERGE_VALUES_STRATEGIES;
    op: MERGE_OPERATOR_STRATEGIES;
}

export interface IFilterModel {
    type: VisualType;
    field: string;
    title?: string;
    config?: TFilterGroupConfig;
}
