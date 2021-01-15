import React from 'react';
import { MdInsertDriveFile, MdSave } from 'react-icons/md';
import { useQuery } from '@apollo/client';
import { Table } from 'antd';
import DataLayout from 'layouts/DataContent';
import get from 'lodash/get';
import { FILE_PAGE_DATA } from 'store/queries/files/table';

import ScrollableTable from 'components/functionnal/ScrollableTable';
import TableActions from 'components/functionnal/TableActions';
import ContentSeparator from 'components/layouts/ContentSeparator';
import CountWithIcon from 'components/layouts/CountWithIcon';
import { EFileInputType, formatFileSize } from 'utils/formatFileSize';
import { Hits } from 'utils/graphql/query';

import { FilesModel } from './FilesTable.models';

import './FilesTable.scss';

const FilesTable = () => {
    const { data, error, loading } = useQuery<any>(FILE_PAGE_DATA, {
        variables: { first: 20, offset: 0 },
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
            actions={<TableActions />}
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
                    columns={FilesModel}
                    dataSource={dataSource}
                    loading={loading}
                    onHeaderRow={() => ({ className: 'table-header' })}
                    pagination={false}
                    rowClassName={(_, index) => (index % 2 === 0 ? 'odd' : 'even')}
                />
            </ScrollableTable>
        </DataLayout>
    );
};
export default FilesTable;
