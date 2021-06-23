import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useQuery } from '@apollo/client';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Button } from 'antd';
import isEqual from 'lodash/isEqual';

import TableActions from 'components/functionnal/TableActions';
import { TableContent } from 'components/functionnal/TableContent';
import ContentSeparator from 'components/layouts/ContentSeparator';
import DataLayout from 'layouts/DataContent';
import { t } from 'locales/translate';
import { setTableColumn } from 'store/cache/tableColumns';
import { GET_TABLE_COLUMNS } from 'store/queries/tables';
import { ITableColumnItem, ITablePage } from 'types/interface';
import { formatToTSV } from 'utils/download';
import { useFilters } from 'utils/filters/useFilters';
import { usePagination } from 'utils/pagination/usePagination';

import styles from './Table.module.scss';

const TableContainer: React.FC<ITablePage> = ({
    data,
    extraActions = null,
    loading,
    model,
    setCurrentPage,
    tableKey,
    total,
}) => {
    const [selectedRow, setSelectedRow] = useState<string[]>([]);
    const { filters } = useFilters();
    const { currentPage, pageFilter, pageSize, setCurrentPageFilter } = usePagination(filters);

    const [showingData, setShowingData] = useState({ lowerRange: 1, upperRange: pageSize });
    const { data: tablesData } = useQuery<any>(GET_TABLE_COLUMNS, {
        variables: { default: model, key: tableKey },
    });
    useEffect(() => {
        setCurrentPage(pageFilter);
    }, [pageFilter]);

    const filteredColumns = tablesData.tableColumns.filter((item: ITableColumnItem) => !item.hidden);
    return (
        <DataLayout
            actions={
                <ContentSeparator>
                    {extraActions && extraActions(selectedRow)}
                    <TableActions
                        downloadData={formatToTSV(filteredColumns, data)}
                        onCheckBoxChange={(items) => {
                            setTableColumn(tableKey, items);
                        }}
                        onSortingChange={(items) => {
                            setTableColumn(tableKey, items);
                        }}
                        restoreDefault={() => setTableColumn(tableKey, model)}
                        sortableList={tablesData.tableColumns}
                    />
                </ContentSeparator>
            }
            className={styles.container}
            summary={
                <ContentSeparator className={styles.summary}>
                    <StackLayout>
                        {selectedRow.length > 0 ? (
                            <>
                                <span className={styles.bold}>{selectedRow.length}</span>
                                <span className={styles.spacing}>{t('global.tables.selected')}</span>
                                <Button
                                    className={styles.selectedItems}
                                    icon={<AiOutlineClose />}
                                    onClick={() => setSelectedRow([])}
                                    size="small"
                                    type="primary"
                                />
                            </>
                        ) : (
                            <>
                                <span className={styles.bold}>
                                    {showingData.lowerRange}-{showingData.upperRange}
                                </span>
                                <span className={styles.spacing}>{t('global.tables.showing')}</span>
                                <span className={styles.bold}>{total}</span>
                            </>
                        )}
                    </StackLayout>
                </ContentSeparator>
            }
        >
            <TableContent
                className="files-table"
                columns={filteredColumns}
                dataSource={data}
                loading={loading}
                pagination={{
                    current: currentPage,
                    onChange: (page, pageSize = 25) => setCurrentPageFilter(page, pageSize),
                    pageSize,
                    showTotal: (_, range) => {
                        const newTotal = { lowerRange: range[0], upperRange: range[1] };
                        if (!isEqual(newTotal, showingData)) {
                            setShowingData({ lowerRange: range[0], upperRange: range[1] });
                        }
                        return null;
                    },
                    total,
                }}
                rowSelection={{
                    onSelect: (record, selected) => {
                        if (selected) {
                            setSelectedRow((s) => s.concat(record.key));
                            return;
                        }

                        setSelectedRow((s) => s.filter((item) => item !== record.key));
                    },
                    onSelectAll: (selected, _, changeRows) => {
                        if (selected) {
                            setSelectedRow((s) => [
                                ...s,
                                ...changeRows.map((item) => {
                                    if (!s.includes(item.key)) {
                                        return item.key;
                                    }
                                }),
                            ]);
                            return;
                        }
                        const changeRowKeys = changeRows.map((item) => item.key);
                        setSelectedRow((s) => s.filter((item) => !changeRowKeys.includes(item)));
                    },
                    selectedRowKeys: selectedRow,
                }}
            />
        </DataLayout>
    );
};
export default TableContainer;
