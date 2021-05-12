import React from 'react';
import { Table, TableProps } from 'antd';
import isEmpty from 'lodash/isEmpty';

interface ITableContent {
    className?: string;
}

type TTableContent = ITableContent & TableProps<any>;

export const TableContent: React.FC<TTableContent> = ({ className = '', pagination, ...rest }) => {
    let page = pagination;
    if (!isEmpty(page)) {
        page = {
            ...page,
            defaultPageSize: 25,
            showQuickJumper: true,
            showSizeChanger: true,
            size: 'small',
        };
    }
    return (
        <Table
            className={className}
            onHeaderRow={() => ({ className: 'table-header' })}
            pagination={page}
            rowClassName={(_, index) => (index % 2 === 0 ? 'odd' : 'even')}
            showSorterTooltip={false}
            size="small"
            {...rest}
        />
    );
};
