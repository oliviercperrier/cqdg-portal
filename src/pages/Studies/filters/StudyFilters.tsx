import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import get from 'lodash/get';

import FilterContainer from 'components/containers/filters/FilterContainer';
import { STUDY_FILTERS } from 'store/queries/studies/filters';
import { enhanceFilters, getSelectedFilters } from 'utils/filters';
import { updateFilters } from 'utils/filters';
import { useFilters } from 'utils/filters/useFilters';

import presetFilters from './StudyFilter.model';

const StudyFilters: React.FC = () => {
    const history = useHistory();
    const { mappedFilters } = useFilters();
    const { data, loading, previousData } = useQuery<any>(STUDY_FILTERS, {
        variables: mappedFilters,
    });

    let result = previousData;
    if (!previousData && loading) {
        return null;
    }

    if (data) {
        result = data;
    }
    const aggregations = get(result, 'Study.aggregations', []);

    return (
        <>
            {presetFilters.map((filter) => {
                const enhancedFilters = enhanceFilters(aggregations, filter.field);
                const selectedFilters = getSelectedFilters(enhancedFilters, filter);

                return (
                    <FilterContainer
                        filterGroup={filter}
                        filters={enhancedFilters}
                        key={filter.field}
                        onChange={(fg, f) => updateFilters(history, fg, f)}
                        selectedFilters={selectedFilters}
                    />
                );
            })}
        </>
    );
};

export default StudyFilters;
