import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { FilterContext } from 'providers/Filter';
import { ISqonGroupFilter } from 'types/interface/filters';
import { getFilters } from 'utils/filters';

interface IFilters {
    [key: string]: ISqonGroupFilter | null;
}

export const useFilters = (): IFilters => {
    const { search } = useLocation();
    const filterTypes = useContext(FilterContext);
    const filters = getFilters(search);
    const remapedFilters: IFilters = {};
    filterTypes.forEach((filter) => {
        remapedFilters[filter.type] = filter.remapValues(filters);
    });
    return remapedFilters;
};
