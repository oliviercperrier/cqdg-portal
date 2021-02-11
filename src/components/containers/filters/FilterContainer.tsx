import React, { useState } from 'react';
import { Collapse } from 'antd';
import isEmpty from 'lodash/isEmpty';

import { IDictionary } from './dictionary';
import FilterContainerHeader from './FilterContainerHeader';
import { FilterComponent } from './FilterContainerSelector';
import { IFilter, IFilterGroup, onChangeType, VisualType } from './Filters';

import styles from './FilterContainer.module.scss';

const { Panel } = Collapse;

interface IFilterContainerProps {
    filterGroup: IFilterGroup;
    dictionary?: IDictionary;
    filters: IFilter[];
    selectedFilters?: IFilter[];
    onChange: onChangeType;
    maxShowing?: number;
    isOpen?: boolean;
}
const FilterContainer: React.FC<IFilterContainerProps> = ({
    filterGroup,
    dictionary = {},
    filters = [],
    maxShowing = 5,
    onChange,
    selectedFilters,
    isOpen = true,
}) => {
    const [hasSearchInput, setSearchInputVisible] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(!isOpen);

    const defaultActiveKey = isCollapsed ? {} : { defaultActiveKey: '1' };
    return (
        <div className={styles['filter-container']}>
            <Collapse
                {...defaultActiveKey}
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
                            searchEnabled={filterGroup.type === VisualType.Checkbox}
                            searchInputVisibled={hasSearchInput}
                            title={filterGroup.title}
                        />
                    }
                    key={`1`}
                >
                    <FilterComponent
                        dictionary={dictionary}
                        filterGroup={filterGroup}
                        filters={filters}
                        maxShowing={maxShowing}
                        onChange={onChange}
                        searchInputVisible={hasSearchInput}
                        selectedFilters={selectedFilters}
                    />
                </Panel>
            </Collapse>
        </div>
    );
};

export default FilterContainer;
