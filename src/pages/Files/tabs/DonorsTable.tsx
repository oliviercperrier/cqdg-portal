import React from 'react';
import { MdPeople } from 'react-icons/md';
import { useQuery } from '@apollo/client';
import CountWithIcon from '@ferlab/ui/core/dist/components/labels/CountWithIcon';
import ScrollableTable from '@ferlab/ui/core/dist/components/tables/ScrollableTable';
import { Table } from 'antd';
import get from 'lodash/get';

import TableActions from 'components/functionnal/TableActions';
import ContentSeparator from 'components/layouts/ContentSeparator';
import DataLayout from 'layouts/DataContent';
import { setTableColumn } from 'store/cache/tableColumns';
import { DONOR_TAB_DATA } from 'store/queries/files/donorTabs';
import { GET_TABLE_COLUMNS } from 'store/queries/tables';
import { ITableColumnItem } from 'types/interface';
import { useFilters } from 'utils/filters/useFilters';
import { Hits } from 'utils/graphql/query';

import { labelDisplayName } from '../../../utils/labelDisplayName';

import { presetDonorsModel } from './DonorsTable.models';

import './DonorsTable.scss';

const tableKey = 'files-tabs-donor';
const DonorsTable = (): React.ReactElement => {
    const filters = useFilters();
    const { data, loading } = useQuery<any>(DONOR_TAB_DATA, {
        variables: { first: 20, offset: 0, ...filters },
    });
    const { data: tablesData } = useQuery<any>(GET_TABLE_COLUMNS, {
        variables: { default: presetDonorsModel, key: tableKey },
    });
    const donorsData = get(data, `Donor.${Hits.COLLECTION}`, []);
    const dataSource = donorsData.map((data: any) => ({
        ...data,
        key: data.node.id,
    }));
    const totalDonors = get(data, `Donor.${Hits.ITEM}.total`, 0);
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
                    restoreDefault={() => setTableColumn(tableKey, presetDonorsModel)}
                    sortableList={tablesData.tableColumns}
                />
            }
            summary={
                <ContentSeparator>
                    <CountWithIcon
                        Icon={<MdPeople />}
                        label={labelDisplayName('global.donors')}
                        total={totalDonors.toLocaleString()}
                        type="inline"
                    />
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
export default DonorsTable;
