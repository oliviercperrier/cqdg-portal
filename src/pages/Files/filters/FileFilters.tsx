import React from 'react';
import { MdInsertDriveFile } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import FilterContainer from '@ferlab/ui/core/components/filters/FilterContainer';
import get from 'lodash/get';

import GlobalSearch from 'components/containers/GlobalSearch';
import SelectSets from 'components/functionnal/SaveSets/SelectSets';
import { t } from 'locales/translate';
import { FILE_GLOBAL_SEARCH, FILE_TAB_FILTERS } from 'store/queries/files/filters';
import { enhanceFilters, getSelectedFilters } from 'utils/filters';
import { updateFilters, updateQueryFilters } from 'utils/filters';
import { createSubFilter } from 'utils/filters/manipulator';
import { useFilters } from 'utils/filters/useFilters';
import { Hits, useLazyResultQuery } from 'utils/graphql/query';

import presetFilters from './FileFilter.model';

const FileFilters: React.FC = () => {
    const history = useHistory();
    const {
        mappedFilters: { fileFilters },
    } = useFilters();

    const { result } = useLazyResultQuery<any>(FILE_TAB_FILTERS, {
        variables: { fileFilters },
    });

    const aggregations = get(result, 'File.aggregations', []);
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
            <SelectSets />
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
