import { IFilter } from '@ferlab/ui/core/components/filters/types';
import { readQueryParam } from '@ferlab/ui/core/data/filters/utils';
import { ISqonGroupFilter, ISyntheticSqon, IValueFilter } from '@ferlab/ui/core/data/sqon/types';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { t } from 'locales/translate';

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

export const mapFilter = (filters: ISyntheticSqon | null, mapping: Map<string, string>): ISyntheticSqon | null => {
    const filtersContent = get(filters, 'content', [] as IValueFilter[]);
    const remapedFilterContent: IValueFilter[] = filtersContent.map((filter: any) => {
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
        op: filters!.op,
    };
};

export const getFiltersQuery = (search: any = null): ISqonGroupFilter => {
    const filters = readQueryParam('filters', { defaultValue: JSON.stringify({}) }, search);

    return JSON.parse(filters);
};

export const getDefaultFilters = (): ISqonGroupFilter => ({ content: [], op: 'and' });
