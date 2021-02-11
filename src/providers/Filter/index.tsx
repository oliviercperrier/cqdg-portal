import React from 'react';

import { ISqonGroupFilter } from 'types/interface/filters';
import { mapFilter } from 'utils/filters';

import { donorToFileMapping, fileToDonorMapping } from './mapper';

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
            { remapValues: (filters) => mapFilter(filters, donorToFileMapping), type: 'fileFilters' },
            { remapValues: (filters) => mapFilter(filters, fileToDonorMapping), type: 'donorFilters' },
        ]}
    >
        {children}
    </FilterProvider>
);

export default FilterProviderConfigured;
