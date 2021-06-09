import { makeVar } from '@apollo/client';

import { ITableColumnItem } from 'types/interface';

const getTableColumns = (): Record<string, any> => JSON.parse(localStorage.getItem('tableColumns') || '{}') || {};
export const configureColumns = (original: Array<any>, newOrder: Array<any>): Array<any> => {
    const newDataOrder: Array<any> = [];
    newOrder.forEach((newValue) => {
        for (let i = 0; i < original.length; i++) {
            if (original[i].initialOrder === newValue.order) {
                newDataOrder.push({ ...original[i], hidden: newValue.hidden });
                break;
            }
        }
    });
    return newDataOrder;
};

type TableColumns = {
    hidden: boolean;
    order: number;
};
export const setTableColumn = (key: string, data: ITableColumnItem[]): void => {
    tableColumns({
        ...tableColumns(),
        [key]: data.reduce(
            (acc: TableColumns[], item: ITableColumnItem) => [
                ...acc,
                { hidden: item.hidden, order: item.initialOrder },
            ],
            []
        ),
    });
    localStorage.setItem('tableColumns', JSON.stringify(tableColumns()));
};
export const tableColumns = makeVar<Record<string, any>>(getTableColumns());
