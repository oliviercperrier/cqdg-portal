import React, { useState } from 'react';
import { Collapse } from 'antd';

import StackLayout from 'components/layouts/StackLayout';

import { IDictionary } from './dictionary';
import FilterContainerHeader from './FilterContainerHeader';
import { FilterComponent } from './FilterContainerSelector';
import { IFilter, IFilterGroup, onChangeType } from './Filters';

import styles from './FilterContainer.module.scss';

const { Panel } = Collapse;

interface IFilterContainerProps {
    filterGroup: IFilterGroup;
    dictionary?: IDictionary;
    title: string;
    filters?: IFilter[];
    selectedFilters?: any;
    onChange: onChangeType;
    maxShowing?: number;
    searchEnabled?: boolean;
}
const FilterContainer: React.FC<IFilterContainerProps> = ({
    filterGroup,
    dictionary = {},
    title,
    filters = [],
    maxShowing = 5,
    onChange,
    searchEnabled = false,
    selectedFilters,
}) => {
    const [hasSearchInput, setSearchInputVisible] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <div className={styles['filter-container']}>
            <Collapse
                onChange={(panels) => {
                    setIsCollapsed(panels.length === 0);
                }}
            >
                <Panel
                    className={styles['filter-container-content']}
                    header={
                        <FilterContainerHeader
                            isCollapsed={isCollapsed}
                            onSearchClick={setSearchInputVisible}
                            searchEnabled={searchEnabled}
                            searchInputVisibled={hasSearchInput}
                            title={title}
                        />
                    }
                    key={`${title}-1`}
                >
                    <FilterComponent
                        dictionary={dictionary}
                        filterGroup={filterGroup}
                        filters={filters}
                        maxShowing={maxShowing}
                        onChange={onChange}
                        searchInputVisible={hasSearchInput}
                        selectedFilters={selectedFilters}
                        title={title}
                    />
                </Panel>
            </Collapse>
        </div>
    );
};

export default FilterContainer;
