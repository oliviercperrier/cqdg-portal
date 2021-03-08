import React from 'react';
import { Table, TableProps } from 'antd';

interface ITableContent {
    className?: string;
}

type TTableContent = ITableContent & TableProps<any>;

export const TableContent: React.FC<TTableContent> = ({ className = '', columns, dataSource, loading, pagination }) => (
    <Table
        className={className}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onHeaderRow={() => ({ className: 'table-header' })}
        pagination={{
            ...pagination,
            defaultPageSize: 25,
            showQuickJumper: true,
            showSizeChanger: true,
            size: 'small',
        }}
        rowClassName={(_, index) => (index % 2 === 0 ? 'odd' : 'even')}
        size="small"
    />
);
