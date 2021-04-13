import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import union from 'lodash/union';

import {
    IMergeStategy,
    ISqonGroupFilter,
    ISqonGroupFilters,
    IValueFilter,
    MERGE_OPERATOR_STRATEGIES,
    MERGE_VALUES_STRATEGIES,
    TFilterValue,
    TSqonDataFilter,
    TSqonGroupContent,
    TValueOp,
} from 'types/interface/filters';

export const addFilter = (filters: ISqonGroupFilter | null, field: string, value: string[]): ISqonGroupFilter => {
    if (!filters) {
        return { content: [{ content: { field, value }, op: 'in' }], op: 'or' };
    }

    return { ...filters, content: [...filters.content, { content: { field, value }, op: 'in' }] };
};

export const createSubFilter = (field: string, value: string[], op: TValueOp = 'in'): TSqonGroupContent => {
    const newField = field.replace('__', '.');
    if (isEmpty(value)) {
        return [];
    }
    return [{ content: { field: newField, value }, op }];
};

export const getSubFilter = (field: string, filters: ISqonGroupFilter): TFilterValue => {
    if (isEmpty(filters)) {
        return [];
    }

    const newField = field.replace('__', '.');
    for (const filter of filters.content) {
        if (filter.content.field === newField) {
            return filter.content.value;
        }
    }

    return [];
};

export const setSubFilter = (sourceFilters: ISqonGroupFilters, newFilters: TSqonDataFilter, opt: IMergeStategy) => {
    const clonedFilters = cloneDeep(sourceFilters);
    const useOpt: IMergeStategy = merge(
        {},
        {
            op: MERGE_OPERATOR_STRATEGIES.DEFAULT,
            values: MERGE_VALUES_STRATEGIES.DEFAULT,
        },
        opt
    );

    deeplySetFilter(clonedFilters, newFilters, useOpt);
    return clonedFilters;
};

export const BOOLEAN_OPS = ['and', 'or', 'not'];

const deeplySetFilter = (
    sourceFilters: ISqonGroupFilters,
    newFilters: TSqonDataFilter,
    opt: IMergeStategy
): boolean => {
    let isUpdated = false;
    sourceFilters.content.forEach((sqon: ISqonGroupFilter | IValueFilter) => {
        // TODO: Manage referenced query

        if (BOOLEAN_OPS.includes(sqon.op)) {
            isUpdated = deeplySetFilter(sqon as ISqonGroupFilter, newFilters, opt);
            return;
        }
        const sqonContent = sqon as IValueFilter;
        if (sqonContent.content.field === newFilters.field) {
            isUpdated = true;

            if (opt.values === MERGE_VALUES_STRATEGIES.APPEND_VALUES) {
                sqonContent.content.value = union([], sqonContent.content.value, newFilters.value);
            }

            if (opt.values === MERGE_VALUES_STRATEGIES.OVERRIDE_VALUES) {
                sqonContent.content.value = newFilters.value;
            }

            if (opt.op === MERGE_OPERATOR_STRATEGIES.OVERRIDE_OPERATOR && newFilters.op) {
                sqonContent.op = newFilters.op;
            }
        }
    });

    return isUpdated;
};
