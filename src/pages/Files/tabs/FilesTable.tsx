import React from 'react';
import { MdInsertDriveFile, MdSave } from 'react-icons/md';
import { useQuery } from '@apollo/client';
import { Table } from 'antd';
import get from 'lodash/get';

import ScrollableTable from 'components/functionnal/ScrollableTable';
import TableActions from 'components/functionnal/TableActions';
import ContentSeparator from 'components/layouts/ContentSeparator';
import CountWithIcon from 'components/layouts/CountWithIcon';
import DataLayout from 'layouts/DataContent';
import { setTableColumn } from 'store/cache/tableColumns';
import { FILE_TAB_DATA } from 'store/queries/files/fileTabs';
import { GET_TABLE_COLUMNS } from 'store/queries/tables';
import { useFilters } from 'utils/filters/useFilters';
import { EFileInputType, formatFileSize } from 'utils/formatFileSize';
import { Hits } from 'utils/graphql/query';

import { FilesModel } from './FilesTable.models';

import './FilesTable.scss';

export interface ITableColumnItem {
    hidden: boolean;
    id: string;
    initialOrder: number;
    movable: boolean;
    title: React.ReactNode;
}

const tableKey = 'files-tabs-file';
const FilesTable = (): React.ReactElement => {
    const filters = useFilters();
    const { data, loading } = useQuery<any>(FILE_TAB_DATA, {
        variables: { first: 20, offset: 0, ...filters },
    });

    const { data: tablesData } = useQuery<any>(GET_TABLE_COLUMNS, {
        variables: { default: FilesModel, key: tableKey },
    });

    const filesData = get(data, `File.${Hits.COLLECTION}`, []);
    const dataSource = filesData.map((data: any) => ({
        ...data,
        key: data.node.id,
    }));
    const totalFiles = get(data, `File.${Hits.ITEM}.total`, 0);
    const totalSizes = get(data, `File.aggregations.file_size.stats.sum`, 0);
    const fileSizes = formatFileSize(totalSizes, { output: 'object' }, EFileInputType.MB) as Record<string, any>;
    return (
        <DataLayout
            actions={
                <TableActions
                    onCheckBoxChange={(items) => {
                        setTableColumn(tableKey, items);
                    }}
                    onSortingChange={(items) => {
                        setTableColumn(tableKey, items);
                    }}
                    restoreDefault={() => setTableColumn(tableKey, FilesModel)}
                    sortableList={tablesData.tableColumns}
                />
            }
            summary={
                <ContentSeparator>
                    <CountWithIcon
                        Icon={MdInsertDriveFile}
                        label="global.files"
                        total={totalFiles.toLocaleString()}
                        type="inline"
                    />
                    <CountWithIcon Icon={MdSave} label={fileSizes.symbol} total={fileSizes.value} type="inline" />
                </ContentSeparator>
            }
        >
            <ScrollableTable>
                <Table
                    className="files-table"
                    columns={tablesData.tableColumns.filter((item: ITableColumnItem) => !item.hidden)}
                    dataSource={dataSource}
                    loading={loading}
                    onHeaderRow={() => ({ className: 'table-header' })}
                    pagination={false}
                    rowClassName={(_, index) => (index % 2 === 0 ? 'odd' : 'even')}
                    size="small"
                />
            </ScrollableTable>
        </DataLayout>
    );
};
export default FilesTable;
