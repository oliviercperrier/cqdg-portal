import React, { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';

import SearchAutocomplete, { ISearchAutocomplete, OptionsType } from 'components/functionnal/SearchAutocomplete';
import { addMultipleFilter } from 'utils/filters/manipulator';
import { useLazyResultQuery } from 'utils/graphql/query';
import { usePrevious } from 'utils/pagination/usePrevious';

interface IGlobalSearch {
    filterKey: string;
    query: any;
    searchKey: string[];
    setCurrentOptions: (result: any) => OptionsType[];
    onSelect: (values: string[]) => void;
}

type TGlobalSearch = IGlobalSearch & Omit<ISearchAutocomplete, 'onSearch' | 'onSelect' | 'options'>;

const GlobalSearch: React.FC<TGlobalSearch> = ({
    filterKey,
    onSelect,
    query,
    searchKey,
    selectedItems = [],
    setCurrentOptions,
    ...props
}) => {
    const [search, setSearch] = useState('');
    const [options, setOptions] = useState<OptionsType[]>([]);

    const searchSQON = addMultipleFilter(null, searchKey, [`${search}*`]);
    const { result: globalSearchResult } = useLazyResultQuery<any>(query, {
        variables: { [filterKey]: searchSQON },
    });
    const previousData = usePrevious(globalSearchResult);
    useEffect(() => {
        const newData = isEmpty(globalSearchResult) ? previousData : globalSearchResult;
        setOptions(setCurrentOptions(newData));
    }, [globalSearchResult]);
    return (
        <SearchAutocomplete
            onSearch={(value) => setSearch(value)}
            onSelect={(values) => {
                setSearch('');
                onSelect(values);
            }}
            options={options}
            selectedItems={selectedItems}
            {...props}
        />
    );
};

export default GlobalSearch;
