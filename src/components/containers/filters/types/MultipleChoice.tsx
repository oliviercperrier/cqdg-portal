import React, { Fragment, useEffect, useState } from 'react';
import { AutoComplete, Button, Checkbox, Divider, Tag } from 'antd';
import get from 'lodash/get';

import StackLayout from 'components/layouts/StackLayout';

import { IFilter, IFilterProps } from '../Filters';

import './MultipleChoice.scss';

interface IMultipleChoice extends IFilterProps {
    maxShowing: number;
    hasSearchInput: boolean;
    title: string;
    filters: IFilter[];
}

const MultipleChoice: React.FC<IMultipleChoice> = ({
    dictionary,
    filterGroup,
    filters,
    hasSearchInput,
    maxShowing,
    onChange,
    selectedFilters = [],
    title,
}) => {
    const [isShowingMore, setShowingMore] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredFilters, setFilteredFilters] = useState(filters);

    useEffect(() => {
        const newFilters = filters.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()));
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
                        options={filteredFilters.map((filter) => ({ value: filter.name }))}
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
                        .sort((a, b) => b.doc_count - a.doc_count)
                        .slice(0, isShowingMore ? Infinity : maxShowing)
                        .map((filter) => (
                            <StackLayout
                                className="fui-mc-item"
                                horizontal
                                key={`${filterGroup.field}-${filter.id}-${filter.doc_count}`}
                            >
                                <Checkbox
                                    defaultChecked={selectedFilters.indexOf(filter.key) >= 0}
                                    id={`input-${title}-${filter.key}`}
                                    name={`input-${title}-${filter.id}`}
                                    onChange={() => onChange(filterGroup, [filter])}
                                    type="checkbox"
                                >
                                    {filter.name}
                                </Checkbox>
                                <Tag>{filter.doc_count.toLocaleString()}</Tag>
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
