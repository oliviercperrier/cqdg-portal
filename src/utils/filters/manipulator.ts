import { ISyntheticSqon, IValueContent } from '@ferlab/ui/core/data/sqon/types';
import { isEmptySqon, isFieldOperator, isReference } from '@ferlab/ui/core/data/sqon/utils';
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

export const getSubFilter = (field: string, filters: ISyntheticSqon | null): TFilterValue => {
    if (isEmpty(filters) || !filters || isEmptySqon(filters)) {
        return [];
    }

    const findSubFilter = (sqon: any): TFilterValue | undefined => {
        if (isReference(sqon)) {
            return undefined;
        } else if (isFieldOperator(sqon)) {
            const valueContent = sqon.content as unknown as IValueContent;
            if (valueContent.field === field.replace('__', '.')) {
                return valueContent.value;
            }
        } else {
            return sqon.content.reduce((acc: any, contentSqon: any) => acc || findSubFilter(contentSqon), false);
        }
    };

    return findSubFilter(filters) || [];
};
