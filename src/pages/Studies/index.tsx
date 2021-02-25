import React, { useState } from 'react';
import { MdAssignment, MdBorderAll, MdDashboard, MdPeople } from 'react-icons/md';
import { useQuery } from '@apollo/client';
import CountWithIcon from '@ferlab/ui/core/dist/components/labels/CountWithIcon';
import { Button } from 'antd';
import get from 'lodash/get';

import BorderedContainer from 'components/containers/BorderedContainer';
import QueryBuilder from 'components/functionnal/QueryBuilder';
import TableActions from 'components/functionnal/TableActions';
import ContentSeparator from 'components/layouts/ContentSeparator';
import ScrollView from 'components/layouts/ScrollView';
import StackLayout from 'components/layouts/StackLayout';
import DataLayout from 'layouts/DataContent';
import QueryLayout from 'layouts/Query';
import { t } from 'locales/translate';
import CardsContent from 'pages/Studies/content/Cards';
import TableContent from 'pages/Studies/content/Table';
import { presetModel } from 'pages/Studies/content/Table.models';
import { setTableColumn } from 'store/cache/tableColumns';
import { STUDIES_PAGE_DATA } from 'store/queries/studies/content';
import { GET_TABLE_COLUMNS } from 'store/queries/tables';
import { useFilters } from 'utils/filters/useFilters';
import { Hits, useLazyResultQuery } from 'utils/graphql/query';

import Filters from './filters/StudyFilters';

import styles from './Studies.module.scss';

const tableKey = 'study-content';
const Study: React.FC = () => {
    const [showCards, setShowCards] = useState(false);
    const filters = useFilters();

    const { data: tablesData } = useQuery<any>(GET_TABLE_COLUMNS, {
        variables: { default: presetModel, key: tableKey },
    });

    const { loading, result } = useLazyResultQuery<any>(STUDIES_PAGE_DATA, {
        variables: filters,
    });
    const totalDonors = get(result, `Donor.${Hits.ITEM}.total`, 0);
    const totalStudies = get(result, `Study.${Hits.ITEM}.total`, 0);
    const studyData = get(result, `Study.${Hits.COLLECTION}`, []);
    const dataSource = studyData.map((data: any) => ({
        ...data,
        key: data.node.id,
    }));

    return (
        <QueryLayout
            className={styles.container}
            sidebar={
                <ScrollView className={styles.filters}>
                    <Filters />
                </ScrollView>
            }
        >
            <QueryBuilder />
            <StackLayout grow vertical>
                <BorderedContainer className={styles.graphs}>graphs</BorderedContainer>
                <BorderedContainer grow>
                    <DataLayout
                        actions={
                            <ContentSeparator>
                                <StackLayout className={styles.layoutActions}>
                                    <Button className={styles.buttons} onClick={() => setShowCards(false)}>
                                        <MdBorderAll />
                                    </Button>
                                    <Button className={styles.buttons} onClick={() => setShowCards(true)}>
                                        <MdDashboard />
                                    </Button>
                                </StackLayout>
                                {!showCards && (
                                    <TableActions
                                        onCheckBoxChange={(items) => {
                                            setTableColumn(tableKey, items);
                                        }}
                                        onSortingChange={(items) => {
                                            setTableColumn(tableKey, items);
                                        }}
                                        restoreDefault={() => setTableColumn(tableKey, presetModel)}
                                        sortableList={tablesData.tableColumns}
                                    />
                                )}
                            </ContentSeparator>
                        }
                        summary={
                            <ContentSeparator>
                                <CountWithIcon
                                    Icon={<MdPeople />}
                                    label={t('global.donors')}
                                    total={totalDonors.toLocaleString()}
                                    type="inline"
                                />
                                <CountWithIcon
                                    Icon={<MdAssignment />}
                                    label={t('global.studies')}
                                    total={totalStudies.toLocaleString()}
                                    type="inline"
                                />
                            </ContentSeparator>
                        }
                    >
                        {showCards ? (
                            <CardsContent data={dataSource} />
                        ) : (
                            <TableContent columns={tablesData.tableColumns} data={dataSource} loading={loading} />
                        )}
                    </DataLayout>
                </BorderedContainer>
            </StackLayout>
        </QueryLayout>
    );
};
export default Study;
