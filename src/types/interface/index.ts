import { IPageFilterState } from 'utils/pagination/usePagination';

export interface ITableColumnItem {
    hidden: boolean;
    id: string;
    initialOrder: number;
    movable: boolean;
    title: React.ReactNode;
    translate: string;
}

export interface ITablePage {
    loading: boolean;
    data: any;
    total: number;
    model: any;
    extraActions?: (selectedRows: string[]) => React.ReactNode;
    tableKey: string;
    setCurrentPage: (filters: IPageFilterState) => void;
    qbuilderCacheKey: string;
}
