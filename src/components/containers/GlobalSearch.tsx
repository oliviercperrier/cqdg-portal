import React, { useEffect, useState } from 'react';

import SearchAutocomplete, { ISearchAutocomplete, OptionsType } from 'components/functionnal/SearchAutocomplete';
import { addFilter } from 'utils/filters/manipulator';
import { useLazyResultQuery } from 'utils/graphql/query';

interface IGlobalSearch {
    filters: any;
    filterKey: string;
    query: any;
    searchKey: string;
    setCurrentOptions: (result: any) => OptionsType[];
    onSelect: (value: string, key: string) => void;
}

type TGlobalSearch = IGlobalSearch & Omit<ISearchAutocomplete, 'onSearch' | 'onSelect' | 'options'>;

const GlobalSearch: React.FC<TGlobalSearch> = ({
    filterKey,
    filters,
    onSelect,
    query,
    searchKey,
    setCurrentOptions,
    ...props
}) => {
    const [search, setSearch] = useState('');
    const [options, setOptions] = useState<OptionsType[]>([]);

    const searchSQON = addFilter(filters, searchKey, [`${search}*`]);
    const { result: globalSearchResult } = useLazyResultQuery<any>(query, {
        variables: { [filterKey]: searchSQON },
    });

    useEffect(() => {
        setOptions(setCurrentOptions(globalSearchResult));
    }, [globalSearchResult]);

    return (
        <SearchAutocomplete
            onSearch={(value) => setSearch(value)}
            onSelect={(value) => {
                setSearch('');
                onSelect(value, searchKey);
            }}
            options={options}
            {...props}
        />
    );
};

export default GlobalSearch;
