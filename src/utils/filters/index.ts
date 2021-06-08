import {
    IFilter,
    IFilterCount,
    IFilterGroup,
    IFilterRange,
    VisualType,
} from '@ferlab/ui/core/components/filters/types';
import { History } from 'history';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { t } from 'locales/translate';
import { ISqonGroupFilter, IValueFilter, TSqonGroupContent } from 'types/interface/filters';
import { readQueryParam } from 'utils/url/query';
import { updateQueryParam } from 'utils/url/query';

interface IBucket {
    doc_count: number;
    key: string;
}

interface IAggregation {
    buckets: IBucket[];
}

interface IAggregations {
    [key: string]: IAggregation;
}

const getFilterWithNoSelection = (filters: ISqonGroupFilter, field: string): ISqonGroupFilter => {
    const filtered = filters.content.filter((filter) => filter.content.field !== field);
    return {
        ...filters,
        content: filtered,
    };
};

const createRangeFilter = (field: string, filters: IFilter<IFilterRange>[]) => {
    const selectedFilters: TSqonGroupContent = [];
    if (filters.length === 0) {
        return selectedFilters;
    }
    const selectedRange = filters[0];
    if (selectedRange.data.min && selectedRange.data.max) {
        selectedFilters.push({
            content: { field, value: [selectedRange.data.min, selectedRange.data.max] },
            op: 'between',
        });
    } else {
        if (selectedRange.data.max) {
            selectedFilters.push({
                content: { field, value: [selectedRange.data.max] },
                op: '<=',
            });
        }
        if (selectedRange.data.min) {
            selectedFilters.push({
                content: { field, value: [selectedRange.data.min] },
                op: '>=',
            });
        }
    }
    return selectedFilters;
};

const createInlineFilters = (field: string, filters: IFilter<IFilterCount>[]): TSqonGroupContent => {
    const arrayFilters = filters.map((v) => v.data.key);
    return arrayFilters.length > 0
        ? [
              {
                  content: { field, value: arrayFilters },
                  op: 'in',
              },
          ]
        : [];
};

const createSQONFromFilters = (filterGroup: IFilterGroup, selectedFilters: IFilter[]): TSqonGroupContent => {
    switch (filterGroup.type) {
        case VisualType.Range:
            return createRangeFilter(filterGroup.field, selectedFilters);
        default:
            return createInlineFilters(filterGroup.field, selectedFilters);
    }
};

export const updateFilters = (history: History, filterGroup: IFilterGroup, selected: IFilter[]): void => {
    const newSelectedFilters: TSqonGroupContent = createSQONFromFilters(filterGroup, selected);

    updateQueryFilters(history, filterGroup.field, newSelectedFilters);
};

export const updateQueryFilters = (history: History, field: string, filters: TSqonGroupContent): void => {
    const currentFilter = getFiltersQuery();
    const newField = field.replace('__', '.');

    let newFilters: ISqonGroupFilter | Record<string, never> = { content: filters, op: 'and' };
    if (!isEmpty(currentFilter)) {
        const filterWithoutSelection = getFilterWithNoSelection(currentFilter, newField);
        if (isEmpty(filterWithoutSelection.content) && isEmpty(filters)) {
            newFilters = {};
        } else {
            newFilters = {
                ...filterWithoutSelection,
                content: [...filterWithoutSelection.content, ...filters],
            };
        }
    }

    updateQueryParam(history, 'filters', newFilters);
};

const booleanValues = ['1', '0'];

export const enhanceFilters = (aggregations: IAggregations, key: string): IFilter[] => {
    const aggregation = aggregations[key.split('.').join('__')];
    const newData: IFilter[] = aggregation
        ? aggregation.buckets.map((f) => {
              const newKeyValue = f.key.includes('missing') ? 'No Data' : f.key;
              return {
                  data: {
                      count: f.doc_count,
                      key: booleanValues.includes(newKeyValue) ? `${newKeyValue === '1' ? true : false}` : newKeyValue,
                  },
                  id: f.key.trim().toLowerCase().split(' ').join('.'),
                  name: t(`aggregation.${newKeyValue.trim().toLowerCase().split(' ').join('.')}`, {}, newKeyValue),
              };
          })
        : [{ data: {}, id: key, name: key }];
    const indexMissingData = newData.findIndex((item: IFilter) => item.data.key === 'No Data');
    if (indexMissingData > 0) {
        const missingData: IFilter = newData[indexMissingData];
        newData.splice(indexMissingData, 1);
        newData.push(missingData);
    }

    return newData;
};

const isFilterSelected = (filters: ISqonGroupFilter, filterGroup: IFilterGroup, key: string) => {
    for (const filter of filters.content) {
        if (filter.content.value.includes(key) && filter.content.field === filterGroup.field) {
            return true;
        }
    }

    return false;
};

const getRangeSelection = (filters: ISqonGroupFilter, filterGroup: IFilterGroup) => {
    let rangeSelection: IFilterRange = { max: undefined, min: undefined, rangeType: undefined };
    for (const filter of filters.content) {
        if (filter.content.field === filterGroup.field) {
            if (filter.op === 'between') {
                rangeSelection = {
                    ...rangeSelection,
                    max: filter.content.value[1] as number,
                    min: filter.content.value[0] as number,
                };
            } else {
                const op = filter.op === '>=' ? 'min' : 'max';
                rangeSelection = { ...rangeSelection, [op]: filter.content.value[0] };
            }
        }
    }

    return rangeSelection;
};

export const getSelectedFilters = (filters: IFilter[], filterGroup: IFilterGroup): IFilter[] => {
    const selectedFilters = getFiltersQuery();
    if (isEmpty(selectedFilters)) {
        return [];
    }

    switch (filterGroup.type) {
        case VisualType.Range:
            const rangeData = getRangeSelection(selectedFilters, filterGroup);
            const currentFilter = filters[0] as IFilter<IFilterRange>;
            return [{ ...currentFilter, data: rangeData }];
        default:
            const currentFilters = filters as IFilter<IFilterCount>[];
            return currentFilters.reduce<IFilter<IFilterCount>[]>((acc, filter) => {
                const isSelected = isFilterSelected(selectedFilters, filterGroup, filter.data.key);
                if (isSelected) {
                    acc.push(filter);
                }
                return acc;
            }, []);
    }
};

export const mapFilter = (filters: ISqonGroupFilter, mapping: Map<string, string>): ISqonGroupFilter | null => {
    const filtersContent = get(filters, 'content', [] as IValueFilter[]);
    const remapedFilterContent: IValueFilter[] = filtersContent.map((filter: IValueFilter) => {
        const field = get(filter, 'content.field', null);
        const values = get(filter, 'content.value', []).map((v: string) => v.replace('No Data', '__missing__'));
        const newFilter = {
            ...filter,
            content: {
                ...filter.content,
                value: values,
            },
        };
        if (mapping.has(field)) {
            return {
                ...newFilter,
                content: {
                    ...newFilter.content,
                    field: mapping.get(field)!,
                },
            };
        }

        return newFilter;
    });

    if (isEmpty(remapedFilterContent)) {
        return null;
    }

    return {
        content: remapedFilterContent,
        op: filters.op,
    };
};

export const getFiltersQuery = (search: any = null): ISqonGroupFilter => {
    const filters = readQueryParam('filters', { defaultValue: JSON.stringify({}) }, search);

    return JSON.parse(filters);
};

export const getDefaultFilters = (): ISqonGroupFilter => ({ content: [], op: 'and' });
