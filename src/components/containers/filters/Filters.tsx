import { ReactNode } from 'react';

import { IDictionary } from './dictionary';

export enum VisualType {
    Checkbox = 'checkbox',
    Toggle = 'toggle',
    Range = 'range',
}

export interface IFiltersOnChange {
    selectedFilter: IFilter[];
    filterGroup: IFilterGroup;
}

export type onChangeType = (fg: IFilterGroup, f: IFilter[]) => void;

export interface IFilterRangeTypes {
    key: string;
    name: string | React.ReactNode;
}

export interface IFilterRange {
    max: number | undefined;
    min: number | undefined;
    rangeType: string | undefined;
}

export interface IFilterRangeConfig {
    max?: number | undefined;
    min?: number | undefined;
    rangeTypes: IFilterRangeTypes[];
}

export type TFilterGroupConfig = IFilterRangeConfig;

export interface IFilterGroup {
    field: string;
    config?: TFilterGroupConfig;
    title: string | ReactNode;
    type: VisualType;
}

export interface IFilterCount {
    count: number;
    key: string;
}

export type TFilterData = IFilterCount | IFilterRange;

export interface IFilter<T extends TFilterData = any> {
    data: T;
    name: string | ReactNode;
    id: string; //  dash (-) separated key
}

export interface IFilterProps {
    dictionary?: IDictionary | Record<string, never>;
    filterGroup: IFilterGroup;
    onChange: onChangeType;
    selectedFilters?: IFilter[];
}
