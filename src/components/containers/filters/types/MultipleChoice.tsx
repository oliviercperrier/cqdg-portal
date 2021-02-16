import React, { Fragment, useEffect, useState } from 'react';
import { AutoComplete, Button, Checkbox, Divider, Tag } from 'antd';
import get from 'lodash/get';

import StackLayout from 'components/layouts/StackLayout';

import { IFilter, IFilterCount, IFilterProps } from '../Filters';

import './MultipleChoice.scss';

interface IMultipleChoice extends IFilterProps {
    maxShowing: number;
    hasSearchInput: boolean;
    filters: IFilter<IFilterCount>[];
}

const MultipleChoice: React.FC<IMultipleChoice> = ({
    dictionary,
    filterGroup,
    filters,
    hasSearchInput,
    maxShowing,
    onChange,
    selectedFilters = [],
}) => {
    const [isShowingMore, setShowingMore] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredFilters, setFilteredFilters] = useState(filters);
    useEffect(() => {
        const newFilters = filters.filter(({ data }) => data.key.toLowerCase().includes(search.toLowerCase()));

        setFilteredFilters(newFilters);
    }, [filters, search]);
    return (
        <Fragment>
            {hasSearchInput && (
                <div className="fui-search-wrapper">
                    <AutoComplete
                        allowClear
                        aria-label={get(dictionary, 'multiChoice.searchPlaceholder', 'search...')}
                        autoFocus
                        className="fui-search-input"
                        onChange={(value) => {
                            if (value) {
                                setSearch(value);
                            } else {
                                setSearch('');
                            }
                        }}
                        options={filteredFilters.map((filter) => ({ label: filter.name, value: filter.data.key }))}
                        placeholder={get(dictionary, 'multiChoice.searchPlaceholder', 'search...')}
                        value={search}
                    />
                </div>
            )}
            {filteredFilters.length > 0 && (
                <StackLayout className="fui-filters" vertical>
                    <StackLayout className="fui-filters-actions">
                        <Button
                            className="fui-filters-links"
                            onClick={() => onChange(filterGroup, filters)}
                            type="text"
                        >
                            {get(dictionary, 'actions.all', 'select all')}
                        </Button>

                        <Divider className="separator" type="vertical" />
                        <Button className="fui-filters-links" onClick={() => onChange(filterGroup, [])} type="text">
                            {get(dictionary, 'actions.none', 'none')}
                        </Button>
                    </StackLayout>
                    {filteredFilters
                        .sort((a, b) => b.data.count - a.data.count)
                        .slice(0, isShowingMore ? Infinity : maxShowing)
                        .map((filter, i) => (
                            <StackLayout
                                className="fui-mc-item"
                                horizontal
                                key={`${filterGroup.field}-${filter.id}-${filter.data.count}-${selectedFilters.length}-${i}`}
                            >
                                <Checkbox
                                    className="fui-mc-item-checkbox"
                                    defaultChecked={selectedFilters.some((f) => f.data.key === filter.data.key)}
                                    id={`input-${filter.data.key}`}
                                    name={`input-${filter.id}`}
                                    onChange={(e) => {
                                        const { checked } = e.target;
                                        let newFilter: IFilter[];
                                        if (checked) {
                                            newFilter = [...selectedFilters, filter];
                                        } else {
                                            newFilter = selectedFilters.filter((f) => f != filter);
                                        }
                                        onChange(filterGroup, newFilter);
                                    }}
                                    type="checkbox"
                                >
                                    {filter.name}
                                </Checkbox>
                                <Tag>{filter.data.count.toLocaleString()}</Tag>
                            </StackLayout>
                        ))}
                    {filteredFilters.length > maxShowing && (
                        <Button
                            className="fui-filters-types-mc-footer"
                            onClick={() => setShowingMore(!isShowingMore)}
                            onKeyPress={() => setShowingMore(!isShowingMore)}
                            tabIndex={0}
                            type="text"
                        >
                            {isShowingMore
                                ? get(dictionary, 'actions.less', 'less')
                                : filteredFilters.length - 5 &&
                                  `${filteredFilters.length - 5} ${get(dictionary, 'actions.more', 'more')}...`}
                        </Button>
                    )}
                </StackLayout>
            )}
            {filteredFilters.length === 0 && (
                <StackLayout className="fui-no-filters" vertical>
                    <span className="no-results-text">
                        {get(dictionary, 'messages.errorNoData', 'No values found for this request')}
                    </span>
                </StackLayout>
            )}
        </Fragment>
    );
};

export default MultipleChoice;
