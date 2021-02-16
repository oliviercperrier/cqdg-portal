import React from 'react';

import { ISqonGroupFilter } from 'types/interface/filters';
import { mapFilter } from 'utils/filters';

import { donorMapping, fileMapping, studyMapping } from './mapper';

export const FilterContext = React.createContext<IFilterTypes[]>([]);

type TFilterType = (filters: ISqonGroupFilter) => ISqonGroupFilter | null;

interface IFilterTypes {
    type: string;
    remapValues: TFilterType;
}

export interface IFilterProviderProps {
    types: IFilterTypes[];
}

const FilterProvider: React.FC<IFilterProviderProps> = ({ children, types }) => (
    <FilterContext.Provider value={types}>{children}</FilterContext.Provider>
);

const FilterProviderConfigured: React.FC = ({ children }) => (
    <FilterProvider
        types={[
            { remapValues: (filters) => mapFilter(filters, fileMapping), type: 'fileFilters' },
            { remapValues: (filters) => mapFilter(filters, donorMapping), type: 'donorFilters' },
            { remapValues: (filters) => mapFilter(filters, studyMapping), type: 'studyFilters' },
        ]}
    >
        {children}
    </FilterProvider>
);

export default FilterProviderConfigured;
