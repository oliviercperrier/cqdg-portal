import React from 'react';
import ScrollableTable from '@ferlab/ui/core/dist/components/tables/ScrollableTable';
import { Table } from 'antd';

const TableContent = ({ columns, data, loading }: any): React.ReactElement => (
    <ScrollableTable>
        <Table
            className="files-table"
            columns={columns.filter((item: any) => !item.hidden)}
            dataSource={data}
            loading={loading}
            onHeaderRow={() => ({ className: 'table-header' })}
            pagination={false}
            rowClassName={(_, index) => (index % 2 === 0 ? 'odd' : 'even')}
            size="small"
        />
    </ScrollableTable>
);
export default TableContent;
