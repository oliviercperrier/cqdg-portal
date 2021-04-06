import isEmpty from 'lodash/isEmpty';

import { ISqonGroupFilter, TFilterValue, TSqonGroupContent, TValueOp } from 'types/interface/filters';

export const addFilter = (filters: ISqonGroupFilter | null, field: string, value: string[]): ISqonGroupFilter => {
    if (!filters) {
        return { content: [{ content: { field, value }, op: 'in' }], op: 'or' };
    }

    return { ...filters, content: [...filters.content, { content: { field, value }, op: 'in' }] };
};

export const createSubFilter = (field: string, value: string[], op: TValueOp = 'in'): TSqonGroupContent => {
    if (isEmpty(value)) {
        return [];
    }
    return [{ content: { field, value }, op }];
};

export const getSubFilter = (field: string, filters: ISqonGroupFilter): TFilterValue => {
    if (isEmpty(filters)) {
        return [];
    }

    for (const filter of filters.content) {
        if (filter.content.field === field) {
            return filter.content.value;
        }
    }

    return [];
};
