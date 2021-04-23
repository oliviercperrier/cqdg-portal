import React, { useState } from 'react';
import { MdFileDownload, MdPeople } from 'react-icons/md';
import { useQuery } from '@apollo/client';
import CountWithIcon, { CountWithIconTypeEnum } from '@ferlab/ui/core/components/labels/CountWithIcon';
import get from 'lodash/get';

import DownloadClinicalButton from 'components/functionnal/DownloadClinicalButton';
import SaveSets from 'components/functionnal/SaveSets';
import TableActions from 'components/functionnal/TableActions';
import { TableContent } from 'components/functionnal/TableContent';
import ContentSeparator from 'components/layouts/ContentSeparator';
import DataLayout from 'layouts/DataContent';
import { t } from 'locales/translate';
import { setTableColumn } from 'store/cache/tableColumns';
import { DONOR_TAB_DATA } from 'store/queries/files/donorTabs';
import { GET_TABLE_COLUMNS } from 'store/queries/tables';
import { ITableColumnItem } from 'types/interface';
import { formatToTSV } from 'utils/download';
import { useFilters } from 'utils/filters/useFilters';
import { Hits } from 'utils/graphql/query';
import { useLazyResultQuery } from 'utils/graphql/query';
import { usePagination } from 'utils/pagination/usePagination';

import { presetDonorsModel } from './DonorsTable.models';

import styles from './DonorsTable.module.scss';

const tableKey = 'files-tabs-donor';
const DonorsTable = (): React.ReactElement => {
    const [selectedRow, setSelectedRow] = useState<string[]>([]);
    const { filters, mappedFilters } = useFilters();
    const { currentPage, pageFilter, pageSize, setCurrentPageFilter } = usePagination(mappedFilters);
    const { loading, result } = useLazyResultQuery<any>(DONOR_TAB_DATA, {
        variables: { ...pageFilter, ...mappedFilters },
    });
    const { data: tablesData } = useQuery<any>(GET_TABLE_COLUMNS, {
        variables: { default: presetDonorsModel, key: tableKey },
    });
    const donorsData = get(result, `Donor.${Hits.COLLECTION}`, []);
    const dataSource = donorsData.map((data: any) => ({
        ...data,
        key: data.node.submitter_donor_id,
    }));
    const totalDonors = get(result, `Donor.${Hits.ITEM}.total`, 0);
    const filteredColumns = tablesData.tableColumns.filter((item: ITableColumnItem) => !item.hidden);
    return (
        <DataLayout
            actions={
                <ContentSeparator>
                    <>
                        <DownloadClinicalButton className={styles.btnDownload} filters={filters}>
                            <MdFileDownload size={16} />
                            {t('global.tables.actions.clinical.data')}
                        </DownloadClinicalButton>
                        <SaveSets
                            Icon={<MdPeople />}
                            dictionary={{ labelType: t('global.donors') }}
                            selectedIds={selectedRow}
                            total={totalDonors}
                            type="saveSetsDonor"
                        />
                    </>
                    <TableActions
                        downloadData={formatToTSV(filteredColumns, dataSource)}
                        onCheckBoxChange={(items) => {
                            setTableColumn(tableKey, items);
                        }}
                        onSortingChange={(items) => {
                            setTableColumn(tableKey, items);
                        }}
                        restoreDefault={() => setTableColumn(tableKey, presetDonorsModel)}
                        sortableList={tablesData.tableColumns}
                    />
                </ContentSeparator>
            }
            summary={
                <ContentSeparator>
                    <CountWithIcon
                        Icon={<MdPeople />}
                        label={t('global.donors')}
                        total={totalDonors.toLocaleString()}
                        type={CountWithIconTypeEnum.Inline}
                    />
                </ContentSeparator>
            }
        >
            <TableContent
                className="donors-table"
                columns={filteredColumns}
                dataSource={dataSource}
                loading={loading}
                pagination={{
                    current: currentPage,
                    onChange: (page, pageSize = 25) => setCurrentPageFilter(page, pageSize),
                    pageSize,
                    total: totalDonors,
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
export default DonorsTable;
