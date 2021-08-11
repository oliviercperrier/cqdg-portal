import React from 'react';
import { MdPeople } from 'react-icons/md';
import FilterContainer from '@ferlab/ui/core/components/filters/FilterContainer';
import { updateFilters, updateQueryFilters } from '@ferlab/ui/core/data/filters/utils';
import { getSelectedFilters } from '@ferlab/ui/core/data/filters/utils';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';

import GlobalSearch from 'components/containers/GlobalSearch';
import SelectSets from 'components/functionnal/SaveSets/SelectSets';
import { ISaveSet } from 'components/functionnal/SaveSets/type';
import DropdownLabels from 'components/layouts/DropdownLabels';
import { t } from 'locales/translate';
import { DONOR_GLOBAL_SEARCH } from 'store/queries/files/filters';
import { GET_ALL_SAVE_SETS } from 'store/queries/files/saveSets';
import { getFiltersDictionary } from 'utils/dictionnary';
import { enhanceFilters } from 'utils/filters';
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
    const dataSaveSets = cloneDeep(saveSetResults?.saveSetsDonor) || [];

    const aggregations = get(data, 'Donor.donorFilters', []);
    return (
        <>
            <GlobalSearch
                filterKey="donorFilters"
                onSelect={(values) =>
                    updateQueryFilters(history, 'internal_donor_id', createSubFilter('internal_donor_id', values))
                }
                placeHolder={t('search.donors.placeholder')}
                query={DONOR_GLOBAL_SEARCH}
                searchKey={['internal_donor_id']}
                selectedItems={getSubFilter('internal_donor_id', donorFilters) as string[]}
                setCurrentOptions={(options) => {
                    const globalSearchOptions = get(options, `Donor.${Hits.COLLECTION}`, []);

                    return globalSearchOptions.map(({ node }: any) => ({
                        label: (
                            <DropdownLabels
                                Icon={<MdPeople />}
                                label={node.internal_donor_id}
                                subLabel={node.study.hits.edges[0].node.name}
                            />
                        ),
                        value: node.internal_donor_id,
                    }));
                }}
                title={t('search.donors.title')}
                tooltipText={t('search.donors.tooltips')}
            />
            <SelectSets
                data={[
                    {
                        dictionary: {
                            emptyValueText: t('global.savesets.empty.description', { type: t('global.donors') }),
                            emptyValueTitle: t('global.savesets.empty.title', { type: t('global.donors') }),
                        },
                        indexName: 'savesets.donor',
                        selectedValues: getSubFilter('savesets.donor', filters) as string[],
                        values: dataSaveSets
                            .sort(
                                (a: ISaveSet, b: ISaveSet) =>
                                    new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
                            )
                            .map((item: ISaveSet) => ({
                                count: item.content.ids.length,
                                icon: <MdPeople />,
                                name: item.content.name,
                            })),
                    },
                ]}
                dictionary={{
                    placeholder: t('global.savesets.choose'),
                    title: t('global.savesets.title', { type: t('global.donors') }),
                }}
                onSelect={(items) =>
                    items.forEach((item) => updateQueryFilters(history, item.key, createSubFilter(item.key, item.data)))
                }
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

export default DonorFilters;
