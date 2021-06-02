import React from 'react';
import { MdInsertDriveFile } from 'react-icons/md';
import FilterContainer from '@ferlab/ui/core/components/filters/FilterContainer';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';

import GlobalSearch from 'components/containers/GlobalSearch';
import SelectSets from 'components/functionnal/SaveSets/SelectSets';
import { ISaveSet } from 'components/functionnal/SaveSets/type';
import DropdownLabels from 'components/layouts/DropdownLabels';
import { t } from 'locales/translate';
import { FILE_GLOBAL_SEARCH } from 'store/queries/files/filters';
import { GET_ALL_SAVE_SETS } from 'store/queries/files/saveSets';
import { getFiltersDictionary } from 'utils/dictionnary';
import { enhanceFilters, getSelectedFilters } from 'utils/filters';
import { updateFilters, updateQueryFilters } from 'utils/filters';
import { createSubFilter, getSubFilter } from 'utils/filters/manipulator';
import { useFilters } from 'utils/filters/useFilters';
import { Hits, useLazyResultQuery } from 'utils/graphql/query';

import presetFilters from './FileFilter.model';

interface IFileFilters {
    history: any;
    data: any;
}
const FileFilters: React.FC<IFileFilters> = ({ data, history }) => {
    const {
        filters,
        mappedFilters: { fileFilters },
    } = useFilters();

    const { result: saveSetResults } = useLazyResultQuery<any>(GET_ALL_SAVE_SETS);
    const dataSaveSets = cloneDeep(saveSetResults?.saveSetsFile) || [];
    const aggregations = get(data, 'File.fileFilters', []);
    return (
        <>
            <GlobalSearch
                filterKey="fileFilters"
                onSelect={(values) =>
                    updateQueryFilters(history, 'file_name_keyword', createSubFilter('file_name_keyword', values))
                }
                placeHolder={t('search.files.placeholder')}
                query={FILE_GLOBAL_SEARCH}
                searchKey={['file_name', 'file_id']}
                selectedItems={getSubFilter('file_name_keyword', fileFilters) as string[]}
                setCurrentOptions={(options) => {
                    const globalSearchOptions = get(options, `File.${Hits.COLLECTION}`, []);

                    return globalSearchOptions.map(({ node }: any) => ({
                        label: (
                            <DropdownLabels
                                Icon={<MdInsertDriveFile />}
                                label={node.file_id}
                                subLabel={node.file_name}
                            />
                        ),
                        value: node.file_name,
                    }));
                }}
                title={t('search.files.title')}
                tooltipText={t('search.files.tooltips')}
            />
            <SelectSets
                data={[
                    {
                        dictionary: {
                            emptyValueText: t('global.savesets.empty.description', { type: t('global.files') }),
                            emptyValueTitle: t('global.savesets.empty.title', { type: t('global.files') }),
                        },
                        indexName: 'savesets.file',
                        selectedValues: getSubFilter('savesets.file', filters) as string[],
                        values: dataSaveSets
                            .sort(
                                (a: ISaveSet, b: ISaveSet) =>
                                    new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
                            )
                            .map((item: ISaveSet) => ({
                                count: item.content.ids.length,
                                icon: <MdInsertDriveFile />,
                                name: item.content.name,
                            })),
                    },
                ]}
                dictionary={{
                    placeholder: t('global.savesets.choose'),
                    title: t('global.savesets.title', { type: t('global.files') }),
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

export default FileFilters;
