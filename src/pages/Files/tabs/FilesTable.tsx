import React from 'react';
import { MdInsertDriveFile, MdSave } from 'react-icons/md';
import { useQuery } from '@apollo/client';
import CountWithIcon, { CountWithIconTypeEnum } from '@ferlab/ui/core/components/labels/CountWithIcon';
import get from 'lodash/get';

import SaveSets from 'components/functionnal/SaveSets';
import TableActions from 'components/functionnal/TableActions';
import { TableContent } from 'components/functionnal/TableContent';
import ContentSeparator from 'components/layouts/ContentSeparator';
import DataLayout from 'layouts/DataContent';
import { t } from 'locales/translate';
import { setTableColumn } from 'store/cache/tableColumns';
import { FILE_TAB_DATA } from 'store/queries/files/fileTabs';
import { GET_TABLE_COLUMNS } from 'store/queries/tables';
import { ITableColumnItem } from 'types/interface';
import { formatToTSV } from 'utils/download';
import { useFilters } from 'utils/filters/useFilters';
import { EFileInputType, formatFileSize } from 'utils/formatFileSize';
import { Hits } from 'utils/graphql/query';
import { useLazyResultQuery } from 'utils/graphql/query';
import { usePagination } from 'utils/pagination/usePagination';

import { FilesModel } from './FilesTable.models';

import './FilesTable.scss';

const tableKey = 'files-tabs-file';
const FilesTable = (): React.ReactElement => {
    const { mappedFilters } = useFilters();
    const { currentPage, pageFilter, pageSize, setCurrentPageFilter } = usePagination(mappedFilters);
    const { loading, result } = useLazyResultQuery<any>(FILE_TAB_DATA, {
        variables: { ...pageFilter, ...mappedFilters },
    });
    const { data: tablesData } = useQuery<any>(GET_TABLE_COLUMNS, {
        variables: { default: FilesModel, key: tableKey },
    });

    const filesData = get(result, `File.${Hits.COLLECTION}`, []);
    const dataSource = filesData.map((data: any) => ({
        ...data,
        key: data.node.id,
    }));
    const totalFiles = get(result, `File.${Hits.ITEM}.total`, 0);
    const totalSizes = get(result, `File.aggregations.file_size.stats.sum`, 0);
    const fileSizes = formatFileSize(totalSizes, { output: 'object' }, EFileInputType.MB) as Record<string, any>;
    const filteredColumns = tablesData.tableColumns.filter((item: ITableColumnItem) => !item.hidden);
    return (
        <DataLayout
            actions={
                <ContentSeparator>
                    <SaveSets
                        Icon={<MdInsertDriveFile />}
                        dictionary={{ labelType: t('global.files') }}
                        total={totalFiles}
                        type="saveSetsFile"
                    />
                    <TableActions
                        downloadData={formatToTSV(filteredColumns, dataSource)}
                        onCheckBoxChange={(items) => {
                            setTableColumn(tableKey, items);
                        }}
                        onSortingChange={(items) => {
                            setTableColumn(tableKey, items);
                        }}
                        restoreDefault={() => setTableColumn(tableKey, FilesModel)}
                        sortableList={tablesData.tableColumns}
                    />
                </ContentSeparator>
            }
            className="files-content"
            summary={
                <ContentSeparator className="data-summary">
                    <CountWithIcon
                        Icon={<MdInsertDriveFile />}
                        label={t('global.files')}
                        labelClassName="data-label"
                        total={totalFiles.toLocaleString()}
                        type={CountWithIconTypeEnum.Inline}
                    />
                    <CountWithIcon
                        Icon={<MdSave />}
                        label={fileSizes.symbol}
                        labelClassName="data-label"
                        total={fileSizes.value}
                        type={CountWithIconTypeEnum.Inline}
                    />
                </ContentSeparator>
            }
        >
            <TableContent
                className="files-table"
                columns={filteredColumns}
                dataSource={dataSource}
                loading={loading}
                pagination={{
                    current: currentPage,
                    onChange: (page, pageSize = 25) => setCurrentPageFilter(page, pageSize),
                    pageSize,
                    total: totalFiles,
                }}
            />
        </DataLayout>
    );
};
export default FilesTable;
