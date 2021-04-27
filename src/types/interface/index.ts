import { IPageFilterState } from 'utils/pagination/usePagination';

export interface ITableColumnItem {
    hidden: boolean;
    id: string;
    initialOrder: number;
    movable: boolean;
    title: React.ReactNode;
}

export interface ITablePage {
    loading: boolean;
    data: any;
    setCurrentPage: (filters: IPageFilterState) => void;
}
