import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

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

export const useFilters = (): IFilters => {
    const { search } = useLocation();
    const filterTypes = useContext(FilterContext);
    const { result } = useLazyResultQuery<any>(GET_ALL_SAVE_SETS);
    const filters = getFiltersQuery(search);
    const mappedFilters: IMapFilters = {};
    filterTypes.forEach((filter) => {
        const filtersWithSaveSetIds = remapFilterToSaveSets(
            { donor: result?.saveSetsDonor || [], file: result?.saveSetsFile || [] },
            filters
        );
        const remapedFilter = filter.remapValues(filtersWithSaveSetIds);
        mappedFilters[filter.type] = remapedFilter;
    });
    return { filters, mappedFilters };
};
