import { useEffect, useState } from 'react';
import isEqual from 'lodash/isEqual';

import { usePrevious } from './usePrevious';

interface IPageFilterState {
    offset: number;
    first: number;
}

type TPagination = {
    currentPage: number;
    pageFilter: IPageFilterState;
    setCurrentPageFilter: (page: number, pageSize: number) => void;
    pageSize: number;
};

export const usePagination = (data: any, initialState: IPageFilterState = { first: 25, offset: 0 }): TPagination => {
    const [pageFilter, setPageFilter] = useState<IPageFilterState>(initialState);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(25);
    const oldData = usePrevious(data);

    useEffect(() => {
        if (!isEqual(oldData, data)) {
            setCurrentPage(1);
            setPageFilter({ first: pageSize, offset: 0 });
        }
    }, [data]);
    const setCurrentPageFilter = (page: number, pageSize: number): void => {
        setPageSize(pageSize);
        setPageFilter({ first: pageSize, offset: page * pageSize - pageSize });
        setCurrentPage(page);
    };

    return {
        currentPage,
        pageFilter,
        pageSize,
        setCurrentPageFilter,
    };
};
