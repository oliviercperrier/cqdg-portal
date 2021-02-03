/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import MultipleChoice from './types/MultipleChoice';
import RangeFilter from './types/RangeFilter';
import SingleChoice from './types/SingleChoice';
import { IFilter, IFilterProps, VisualType } from './Filters';

interface IFiltersProps extends IFilterProps {
    title: string;
    selectedFilters?: any;
    searchInputVisible: boolean;
    maxShowing: number;
    filters: IFilter[];
}

export const FilterComponent: React.FC<IFiltersProps> = ({
    dictionary,
    filterGroup,
    filters,
    maxShowing,
    onChange,
    searchInputVisible,
    selectedFilters,
    title,
}: IFiltersProps) => {
    const commonProps = {
        dictionary,
        filterGroup,
        onChange,
        selectedFilters,
        title,
    };
    switch (filterGroup.type) {
        case VisualType.Toggle:
            return <SingleChoice {...commonProps} filters={filters} />;
        case VisualType.Range:
            return <RangeFilter {...commonProps} />;
        case VisualType.Checkbox:
        default:
            return (
                <MultipleChoice
                    {...commonProps}
                    filters={filters}
                    hasSearchInput={searchInputVisible}
                    maxShowing={maxShowing}
                />
            );
    }
};
