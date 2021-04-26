import React, { useState } from 'react';
import { MdAssignment, MdBorderAll, MdDashboard, MdPeople } from 'react-icons/md';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import CountWithIcon, { CountWithIconTypeEnum } from '@ferlab/ui/core/components/labels/CountWithIcon';
import QueryBuilder from '@ferlab/ui/core/components/QueryBuilder';
import ScrollView from '@ferlab/ui/core/layout/ScrollView';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Button } from 'antd';
import get from 'lodash/get';

import BorderedContainer from 'components/containers/BorderedContainer';
import TableActions from 'components/functionnal/TableActions';
import { TableContent } from 'components/functionnal/TableContent';
import ContentSeparator from 'components/layouts/ContentSeparator';
import DataLayout from 'layouts/DataContent';
import QueryLayout from 'layouts/Query';
import { t } from 'locales/translate';
import CardsContent from 'pages/Studies/content/Cards';
import { presetModel } from 'pages/Studies/content/Table.models';
import { getQueryBuilderCache, setQueryBuilderCache } from 'store/cache/queryBuilder';
import { setTableColumn } from 'store/cache/tableColumns';
import { STUDIES_PAGE_DATA } from 'store/queries/studies/content';
import { GET_TABLE_COLUMNS } from 'store/queries/tables';
import { ITableColumnItem } from 'types/interface';
import { updateQueryFilters } from 'utils/filters';
import { useFilters } from 'utils/filters/useFilters';
import { Hits, useLazyResultQuery } from 'utils/graphql/query';
import { updateQueryParam } from 'utils/url/query';

import Filters from './filters/StudyFilters';

import styles from './Studies.module.scss';

const tableKey = 'study-content';
const Study: React.FC<RouteComponentProps<any>> = ({ history }) => {
    const [showCards, setShowCards] = useState(false);
    const { filters, mappedFilters } = useFilters();

    const { data: tablesData } = useQuery<any>(GET_TABLE_COLUMNS, {
        variables: { default: presetModel, key: tableKey },
    });

    //const { currentPage, pageFilter, pageSize, setCurrentPageFilter } = usePagination(mappedFilters);
    const { loading, result } = useLazyResultQuery<any>(STUDIES_PAGE_DATA, {
        variables: { ...mappedFilters },
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
                IconTotal={<MdAssignment size={18} />}
                className="file-repo__query-builder"
                currentQuery={filters}
                dictionary={{ query: { facet: (key) => t(`facet.${key}`) } }}
                enableSingleQuery
                initialState={getQueryBuilderCache('study-repo')}
                onChangeQuery={(_, query) => updateQueryParam(history, 'filters', query)}
                onRemoveFacet={(query) => updateQueryFilters(history, query.content.field, [])}
                onUpdate={(state) => setQueryBuilderCache('study-repo', state)}
                total={totalStudies}
            />
            <StackLayout flexContent vertical>
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
                            <TableContent
                                columns={tablesData.tableColumns.filter((item: ITableColumnItem) => !item.hidden)}
                                dataSource={dataSource}
                                loading={loading}
                                pagination={false}
                            />
                        )}
                    </DataLayout>
                </BorderedContainer>
            </StackLayout>
        </QueryLayout>
    );
};
export default Study;
