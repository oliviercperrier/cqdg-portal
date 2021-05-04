import React from 'react';
import { MdInsertDriveFile, MdPeople } from 'react-icons/md';
import FilterContainer from '@ferlab/ui/core/components/filters/FilterContainer';
import get from 'lodash/get';

import GlobalSearch from 'components/containers/GlobalSearch';
import SelectSets from 'components/functionnal/SaveSets/SelectSets';
import { t } from 'locales/translate';
import { DONOR_GLOBAL_SEARCH } from 'store/queries/files/filters';
import { GET_ALL_SAVE_SETS } from 'store/queries/files/saveSets';
import { enhanceFilters, getSelectedFilters } from 'utils/filters';
import { updateFilters, updateQueryFilters } from 'utils/filters';
import { createSubFilter, getSubFilter } from 'utils/filters/manipulator';
import { useFilters } from 'utils/filters/useFilters';
import { Hits, useLazyResultQuery } from 'utils/graphql/query';

import presetFilters from './DonorFilter.model';

interface IDonorFilters {
    history: any;
    data: any;
}
const DonorFilters: React.FC<IDonorFilters> = ({ data, history }) => {
    const {
        filters,
        mappedFilters: { donorFilters },
    } = useFilters();
    const { result: saveSetResults } = useLazyResultQuery<any>(GET_ALL_SAVE_SETS);

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
            <SelectSets
                data={[
                    {
                        dictionary: { emptyValue: t('global.empty'), groupTitle: t('global.donors.title') },
                        indexName: 'savesets.donor',
                        selectedValues: getSubFilter('savesets.donor', filters) as string[],
                        values:
                            saveSetResults?.saveSetsDonor.map((item: any) => ({
                                count: item.content.ids.length,
                                icon: <MdPeople />,
                                name: item.content.name,
                            })) || [],
                    },
                    {
                        dictionary: { emptyValue: t('global.empty'), groupTitle: t('global.files.title') },
                        indexName: 'savesets.file',
                        selectedValues: getSubFilter('savesets.file', filters) as string[],
                        values:
                            saveSetResults?.saveSetsFile.map((item: any) => ({
                                count: item.content.ids.length,
                                icon: <MdInsertDriveFile />,
                                name: item.content.name,
                            })) || [],
                    },
                ]}
                dictionary={{ placeholder: t('global.savesets.choose'), title: t('global.savesets.title') }}
                onSelect={(items) =>
                    items.forEach((item) => updateQueryFilters(history, item.key, createSubFilter(item.key, item.data)))
                }
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
