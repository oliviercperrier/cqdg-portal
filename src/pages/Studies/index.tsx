import React, { useState } from 'react';
import { MdAssignment, MdBorderAll, MdDashboard, MdPeople } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import CountWithIcon, { CountWithIconTypeEnum } from '@ferlab/ui/core/components/labels/CountWithIcon';
import QueryBuilder from '@ferlab/ui/core/components/QueryBuilder';
import { Button } from 'antd';
import get from 'lodash/get';

import BorderedContainer from 'components/containers/BorderedContainer';
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
import { getQueryBuilderCache, setQueryBuilderCache } from 'store/cache/queryBuilder';
import { setTableColumn } from 'store/cache/tableColumns';
import { STUDIES_PAGE_DATA } from 'store/queries/studies/content';
import { GET_TABLE_COLUMNS } from 'store/queries/tables';
import { updateQueryFilters } from 'utils/filters';
import { useFilters } from 'utils/filters/useFilters';
import { Hits, useLazyResultQuery } from 'utils/graphql/query';
import { updateQueryParam } from 'utils/url/query';

import Filters from './filters/StudyFilters';

import styles from './Studies.module.scss';

const tableKey = 'study-content';
const Study: React.FC = () => {
    const history = useHistory();

    const [showCards, setShowCards] = useState(false);
    const { filters, mappedFilters } = useFilters();

    const { data: tablesData } = useQuery<any>(GET_TABLE_COLUMNS, {
        variables: { default: presetModel, key: tableKey },
    });

    const { loading, result } = useLazyResultQuery<any>(STUDIES_PAGE_DATA, {
        variables: mappedFilters,
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
            <QueryBuilder
                IconTotal={<MdAssignment />}
                className="file-repo__query-builder"
                currentQuery={filters}
                dictionary={{ query: { facet: (key) => t(`facet.${key}`) } }}
                initialState={getQueryBuilderCache('study-repo')}
                loading={loading}
                onChangeQuery={(_, query) => updateQueryParam(history, 'filters', query)}
                onRemoveFacet={(query) => updateQueryFilters(history, query.content.field, [])}
                onUpdate={(state) => setQueryBuilderCache('study-repo', state)}
                total={totalStudies}
            />
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
                                    type={CountWithIconTypeEnum.Inline}
                                />
                                <CountWithIcon
                                    Icon={<MdAssignment />}
                                    label={t('global.studies')}
                                    total={totalStudies.toLocaleString()}
                                    type={CountWithIconTypeEnum.Inline}
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
