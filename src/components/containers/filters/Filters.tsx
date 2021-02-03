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

export type onChangeType = (fg: IFilterGroup, f: IFilter[] | IRangeFilterState) => void;

export interface IRangeFilterTypes {
    key: string;
    name: string | React.ReactElement;
}

export interface IRangeFilterState {
    max: number | undefined;
    min: number | undefined;
    rangeType: string | undefined;
}

export interface IRangeFilter {
    max: number | undefined;
    min: number | undefined;
    rangeTypes: IRangeFilterTypes[];
}

export const createDefaultRange = (max = 0, min = 0, rangeTypes = []) => ({
    max,
    min,
    rangeTypes,
});

export interface IFilterGroup {
    //docType: string;
    //description?: string;
    field: string;
    placeholder?: string;
    range?: IRangeFilter;
    title: string;
    type: VisualType;
}

export interface IFilter {
    doc_count: number;
    key: string;
    name: string; // use for translated/todisplay string
    id: string; //  dash (-) separated key
}

export interface IFilterProps {
    dictionary?: IDictionary | Record<string, never>;
    filterGroup: IFilterGroup;
    onChange: onChangeType;
    selectedFilters?: any;
}
