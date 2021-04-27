import { useContext } from 'react';

import { FilterContext } from 'providers/Filter';
import { GET_ALL_SAVE_SETS } from 'store/queries/files/saveSets';
import { ISqonGroupFilter } from 'types/interface/filters';
import { getFiltersQuery } from 'utils/filters';
import { remapFilterToSaveSets } from 'utils/filters/saveSets';
import { useLazyResultQuery } from 'utils/graphql/query';

interface IMapFilters {
    [key: string]: ISqonGroupFilter | null;
}

interface IFilters {
    filters: ISqonGroupFilter;
    mappedFilters: IMapFilters;
}

export const useFilters = (filters: ISqonGroupFilter | null = null): IFilters => {
    const filterTypes = useContext(FilterContext);
    const { result } = useLazyResultQuery<any>(GET_ALL_SAVE_SETS);
    const currentFilters = filters || getFiltersQuery();
    const mappedFilters: IMapFilters = {};
    filterTypes.forEach((filter) => {
        const filtersWithSaveSetIds = remapFilterToSaveSets(
            { donor: result?.saveSetsDonor || [], file: result?.saveSetsFile || [] },
            currentFilters
        );
        const remapedFilter = filter.remapValues(filtersWithSaveSetIds);
        mappedFilters[filter.type] = remapedFilter;
    });
    return { filters: currentFilters, mappedFilters };
};
