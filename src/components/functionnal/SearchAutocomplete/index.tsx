import React, { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { AutoComplete, Input, Tooltip } from 'antd';
import take from 'lodash/take';

import styles from './SearchAutocomplete.module.scss';

export type OptionsType = {
    value: string;
    label: string | React.ReactNode;
};

export interface ISearchAutocomplete {
    title?: string | React.ReactNode;
    tooltipText?: string | React.ReactNode;
    placeHolder?: string;
    className?: string;
    options: OptionsType[];
    limit?: number;
    onSearch: (value: string) => void;
    onSelect: (value: string) => void;
}
const SearchAutocomplete: React.FC<ISearchAutocomplete> = ({
    className = '',
    limit = 5,
    onSearch,
    onSelect,
    options,
    placeHolder = 'Search',
    title = 'Search',
    tooltipText = 'test text',
}) => {
    const [search, setSearch] = useState('');
    const newOptions = take(options, limit);
    return (
        <div className={`${styles.container} ${className}`}>
            <span className={styles.title}>{title}</span>
            <AutoComplete
                allowClear
                className={styles.search}
                onSearch={(value) => {
                    setSearch(value);
                    onSearch(value);
                }}
                onSelect={(value) => {
                    setSearch('');
                    onSelect(value);
                }}
                options={newOptions}
                value={search}
            >
                <Input
                    placeholder={placeHolder}
                    suffix={
                        <Tooltip title={tooltipText}>
                            <AiOutlineInfoCircle />
                        </Tooltip>
                    }
                />
            </AutoComplete>
        </div>
    );
};

export default SearchAutocomplete;
