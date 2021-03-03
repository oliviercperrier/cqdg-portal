import { ISqonGroupFilter, TFilterValue, TSqonGroupOp, TValueOp } from 'types/interface/filters';

export interface IFilterContent {
    op?: TValueOp;
    field: string;
    value: TFilterValue;
}

export interface ISimpleFilters {
    op?: TSqonGroupOp;
    content: IFilterContent | IFilterContent[];
}

export const createQueryFilters = (filters: ISimpleFilters): ISqonGroupFilter => {
    const newFiltersValue: ISqonGroupFilter = { content: [], op: filters.op || 'and' };
    let filterContent = filters.content;
    if (!Array.isArray(filterContent)) {
        filterContent = [filterContent];
    }

    newFiltersValue.content = filterContent.map((f) => ({
        content: {
            field: f.field,
            value: f.value,
        },
        op: f.op || 'in',
    }));

    return newFiltersValue;
};
