import React from 'react';
import { MdAssignment } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import FilterContainer from '@ferlab/ui/core/components/filters/FilterContainer';
import { getSelectedFilters, updateFilters, updateQueryFilters } from '@ferlab/ui/core/data/filters/utils';
import get from 'lodash/get';

import GlobalSearch from 'components/containers/GlobalSearch';
import DropdownLabels from 'components/layouts/DropdownLabels';
import { t } from 'locales/translate';
import { STUDY_GLOBAL_SEARCH } from 'store/queries/files/filters';
import { STUDY_FILTERS } from 'store/queries/studies/filters';
import { getFiltersDictionary } from 'utils/dictionnary';
import { enhanceFilters } from 'utils/filters';
import { createSubFilter, getSubFilter } from 'utils/filters/manipulator';
import { useFilters } from 'utils/filters/useFilters';
import { Hits } from 'utils/graphql/query';
import { STUDY_REPO_CACHE_KEY } from 'config/constants';

import presetFilters from './StudyFilter.model';
const globalSearchKey = 'internal_study_id';

const StudyFilters: React.FC = () => {
    const history = useHistory();
    const { filters: studyFilters, mappedFilters } = useFilters(STUDY_REPO_CACHE_KEY);
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
            <GlobalSearch
                filterKey="studyFilters"
                onSelect={(values) =>
                    updateQueryFilters(history, globalSearchKey, createSubFilter(globalSearchKey, values))
                }
                placeHolder={t('search.studies.placeholder')}
                query={STUDY_GLOBAL_SEARCH}
                searchKey={['name', globalSearchKey, 'keyword']}
                selectedItems={getSubFilter(globalSearchKey, studyFilters) as string[]}
                setCurrentOptions={(options) => {
                    const globalSearchOptions = get(options, `Study.${Hits.COLLECTION}`, []);

                    return globalSearchOptions.map(({ node }: any) => ({
                        label: (
                            <DropdownLabels
                                Icon={<MdAssignment />}
                                label={node.internal_study_id}
                                subLabel={node.name}
                            />
                        ),
                        value: node.internal_study_id,
                    }));
                }}
                title={t('search.studies.title')}
                tooltipText={t('search.studies.tooltips')}
            />

            {presetFilters.map((filter) => {
                const enhancedFilters = enhanceFilters(aggregations, filter.field);
                const selectedFilters = getSelectedFilters(enhancedFilters, filter);

                return (
                    <FilterContainer
                        dictionary={getFiltersDictionary()}
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
