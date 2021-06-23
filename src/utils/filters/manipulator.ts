import isEmpty from 'lodash/isEmpty';

import { ISqonGroupFilter, TFilterValue, TSqonGroupContent, TSqonGroupOp, TValueOp } from 'types/interface/filters';

export const addFilter = (
    filters: ISqonGroupFilter | null,
    field: string,
    value: string[],
    operator: TSqonGroupOp = 'or'
): ISqonGroupFilter => {
    if (isEmpty(filters)) {
        return { content: [{ content: { field, value }, op: 'in' }], op: operator };
    }

    return { ...filters!, content: [...filters!.content, { content: { field, value }, op: 'in' }] };
};

export const addMultipleFilter = (
    filters: ISqonGroupFilter | null,
    fields: string[],
    value: string[]
): ISqonGroupFilter =>
    fields.reduce((acc, field) => {
        const initialFilters = isEmpty(acc) ? filters : acc;
        return addFilter(initialFilters, field, value);
    }, {} as ISqonGroupFilter);

export const createSubFilter = (field: string, value: string[], op: TValueOp = 'in'): TSqonGroupContent => {
    const newField = field.replace('__', '.');
    if (isEmpty(value)) {
        return [];
    }
    return [{ content: { field: newField, value }, op }];
};

export const getSubFilter = (field: string, filters: ISqonGroupFilter | null): TFilterValue => {
    if (isEmpty(filters)) {
        return [];
    }

    const newField = field.replace('__', '.');
    for (const filter of filters!.content) {
        if (filter.content.field === newField) {
            return filter.content.value;
        }
    }

    return [];
};
