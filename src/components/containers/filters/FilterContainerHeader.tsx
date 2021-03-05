import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';

import styles from './FilterContainerHeader.module.scss';

interface IFilterContainerHeaderProps {
    searchEnabled?: boolean;
    onSearchClick: (v: boolean) => void;
    searchInputVisibled: boolean;
    title: string | React.ReactNode;
    isCollapsed: boolean;
}

const FilterContainerHeader: React.FC<IFilterContainerHeaderProps> = ({
    searchEnabled = false,
    onSearchClick = (f) => f,
    searchInputVisibled,
    title,
    isCollapsed,
}) => (
    <StackLayout className={styles['fui-filters-container-header']}>
        <span className={styles.title}>{title}</span>
        {searchEnabled && !isCollapsed && (
            <div className={`${styles['fui-search-icon-wrapper']}`}>
                <AiOutlineSearch
                    className={`search-icon ${styles['fui-search-icon']}`}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onSearchClick(!searchInputVisibled);
                    }}
                />
            </div>
        )}
    </StackLayout>
);

export default FilterContainerHeader;
