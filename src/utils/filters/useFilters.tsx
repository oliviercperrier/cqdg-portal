import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { FilterContext } from 'providers/Filter';
import { ISqonGroupFilter } from 'types/interface/filters';
import { getFiltersQuery } from 'utils/filters';

interface IMapFilters {
    [key: string]: ISqonGroupFilter | null;
}

interface IFilters {
    filters: ISqonGroupFilter;
    mappedFilters: IMapFilters;
}

export const useFilters = (): IFilters => {
    const { search } = useLocation();
    const filterTypes = useContext(FilterContext);
    const filters = getFiltersQuery(search);
    const mappedFilters: IMapFilters = {};
    filterTypes.forEach((filter) => {
        mappedFilters[filter.type] = filter.remapValues(filters);
    });
    return { filters, mappedFilters };
};
