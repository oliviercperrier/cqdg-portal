import React from 'react';
import { MdInsertDriveFile, MdPeople } from 'react-icons/md';
import FilterContainer from '@ferlab/ui/core/components/filters/FilterContainer';
import get from 'lodash/get';

import GlobalSearch from 'components/containers/GlobalSearch';
import SelectSets from 'components/functionnal/SaveSets/SelectSets';
import { t } from 'locales/translate';
import { FILE_GLOBAL_SEARCH } from 'store/queries/files/filters';
import { GET_ALL_SAVE_SETS } from 'store/queries/files/saveSets';
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

    const aggregations = get(data, 'File.fileFilters', []);
    return (
        <>
            <GlobalSearch
                filterKey="fileFilters"
                filters={fileFilters}
                onSelect={(value) =>
                    updateQueryFilters(history, 'file_name_keyword', createSubFilter('file_name_keyword', [value]))
                }
                query={FILE_GLOBAL_SEARCH}
                searchKey="file_name"
                setCurrentOptions={(options) => {
                    const globalSearchOptions = get(options, `File.${Hits.COLLECTION}`, []);

                    return globalSearchOptions.map(({ node }: any) => ({
                        label: (
                            <div>
                                <MdInsertDriveFile /> {node.file_name}
                            </div>
                        ),
                        value: node.file_name,
                    }));
                }}
                tooltipText={t('facet.search_suggest_tooltip_files')}
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
                        values:
                            saveSetResults?.saveSetsFile.map((item: any) => ({
                                count: item.content.ids.length,
                                icon: <MdInsertDriveFile />,
                                name: item.content.name,
                            })) || [],
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
