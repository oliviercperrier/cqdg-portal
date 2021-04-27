import React from 'react';
import { MdPeople } from 'react-icons/md';
import FilterContainer from '@ferlab/ui/core/components/filters/FilterContainer';
import get from 'lodash/get';

import GlobalSearch from 'components/containers/GlobalSearch';
import { t } from 'locales/translate';
import { DONOR_GLOBAL_SEARCH } from 'store/queries/files/filters';
import { enhanceFilters, getSelectedFilters } from 'utils/filters';
import { updateFilters, updateQueryFilters } from 'utils/filters';
import { createSubFilter } from 'utils/filters/manipulator';
import { useFilters } from 'utils/filters/useFilters';
import { Hits } from 'utils/graphql/query';

import presetFilters from './DonorFilter.model';

interface IDonorFilters {
    history: any;
    data: any;
}
const DonorFilters: React.FC<IDonorFilters> = ({ data, history }) => {
    const {
        mappedFilters: { donorFilters },
    } = useFilters();

    const aggregations = get(data, 'Donor.donorFilters', []);
    return (
        <>
            <GlobalSearch
                filterKey="donorFilters"
                filters={donorFilters}
                onSelect={(value, key) => updateQueryFilters(history, key, createSubFilter(key, [value]))}
                query={DONOR_GLOBAL_SEARCH}
                searchKey="submitter_donor_id"
                setCurrentOptions={(options) => {
                    const globalSearchOptions = get(options, `Donor.${Hits.COLLECTION}`, []);

                    return globalSearchOptions.map(({ node }: any) => ({
                        label: (
                            <div>
                                <MdPeople /> {node.submitter_donor_id}
                            </div>
                        ),
                        value: node.submitter_donor_id,
                    }));
                }}
                tooltipText={t('facet.search_suggest_tooltip_donors')}
            />
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

export default DonorFilters;
