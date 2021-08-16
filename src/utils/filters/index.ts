import { IFilter } from '@ferlab/ui/core/components/filters/types';
import { readQueryParam } from '@ferlab/ui/core/data/filters/utils';
import { ISqonGroupFilter, TSqonContent } from '@ferlab/ui/core/data/sqon/types';
import { isFieldOperator } from '@ferlab/ui/core/data/sqon/utils';
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

const replaceNoData = (value: any) =>
    typeof value === 'string' || value instanceof String ? value.replace('No Data', '__missing__') : value;

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

export const mapFilter = (filters: ISqonGroupFilter | null, mapping: Map<string, string>): ISqonGroupFilter | null => {
    const filtersContent = get(filters, 'content', [] as TSqonContent);

    if (isEmpty(filtersContent)) {
        return null;
    }

    const mapSubFilter = (filter: any): any => {
        if (isFieldOperator(filter)) {
            const field = get(filter, 'content.field', null);
            const values = get(filter, 'content.value', []).map((v: string | number | boolean) => replaceNoData(v));

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
        } else {
            return {
                content: filter.content.map((c: TSqonContent) => mapSubFilter(c)),
                op: filter.op,
            };
        }
    };

    const remapedFilterContent = filtersContent.map((filter: any) => mapSubFilter(filter));

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
