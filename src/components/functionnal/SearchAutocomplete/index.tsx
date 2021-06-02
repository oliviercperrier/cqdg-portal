import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Tooltip } from 'antd';
import debounce from 'lodash/debounce';
import take from 'lodash/take';

import SelectWithCustomTag from '../Select';

import styles from './SearchAutocomplete.module.scss';

export type OptionsType = {
    value: string;
    label: string | React.ReactNode;
};

export interface ISearchAutocomplete {
    title?: string | React.ReactNode;
    tooltipText?: string | React.ReactNode;
    placeHolder?: string | React.ReactNode;
    className?: string;
    options: OptionsType[];
    limit?: number;
    onSearch: (value: string) => void;
    onSelect: (values: string[]) => void;
    selectedItems?: string[];
}
const SearchAutocomplete: React.FC<ISearchAutocomplete> = ({
    className = '',
    limit = 5,
    onSearch,
    onSelect,
    options,
    placeHolder = 'Search',
    selectedItems = [],
    title = 'Search',
    tooltipText = '',
}) => {
    const [itemSelected, setItemSelected] = useState(selectedItems);
    useEffect(() => {
        setItemSelected(selectedItems);
    }, [selectedItems]);
    const debounceSearch = useCallback(
        debounce((nextValue) => onSearch(nextValue), 250),
        []
    );
    const newOptions = take(options, limit);
    return (
        <div className={`${styles.container} ${className}`}>
            <span className={styles.title}>
                {title}
                <Tooltip arrowPointAtCenter placement="topLeft" title={tooltipText}>
                    <AiOutlineInfoCircle className={styles.tooltipIcon} />
                </Tooltip>
            </span>
            <SelectWithCustomTag
                allowClear
                className={styles.search}
                filterOption={false}
                maxTagCount="responsive"
                mode="multiple"
                onChange={(values: string[]) => {
                    onSelect(values);
                    setItemSelected(values);
                }}
                onSearch={(value) => debounceSearch(value)}
                options={newOptions}
                placeholder={placeHolder}
                value={itemSelected}
            />
        </div>
    );
};

export default SearchAutocomplete;
