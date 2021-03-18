import React from 'react';
import { MdInsertDriveFile, MdPeople } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import QueryBuilder from '@ferlab/ui/core/components/QueryBuilder';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Tabs } from 'antd';
import get from 'lodash/get';

import QueryLayout from 'layouts/Query';
import { t } from 'locales/translate';
import SideBarContent from 'pages/Files/filters/SideBarContent';
import DonorsTable from 'pages/Files/tabs/DonorsTable';
import FilesTable from 'pages/Files/tabs/FilesTable';
import Summary from 'pages/Files/tabs/Summary';
import { getQueryBuilderCache, setQueryBuilderCache } from 'store/cache/queryBuilder';
import { FILE_PAGE_METADATA } from 'store/queries/files/page';
import { updateQueryFilters } from 'utils/filters';
import { useFilters } from 'utils/filters/useFilters';
import { useLazyResultQuery } from 'utils/graphql/query';
import { readQueryParam, updateQueryParam } from 'utils/url/query';

import './Files.scss';

const { TabPane } = Tabs;
const tabKey = 'searchTableTab';
const FileRepo: React.FC = () => {
    const history = useHistory();

    const { filters, mappedFilters } = useFilters();
    const { loading, result } = useLazyResultQuery<any>(FILE_PAGE_METADATA, {
        variables: mappedFilters,
    });

    const onTabChange = (activeKey: string) => {
        updateQueryParam(history, tabKey, activeKey);
    };

    const filesTotal = get(result, 'File.hits.total', 0);
    const donorsTotal = get(result, 'Donor.hits.total', 0);

    return (
        <QueryLayout className="file-repo" sidebar={<SideBarContent />}>
            <StackLayout className="file-repo__wrapper" fitContent flexContent vertical>
                <QueryBuilder
                    IconTotal={<MdInsertDriveFile size={18} />}
                    className="file-repo__query-builder"
                    currentQuery={filters}
                    dictionary={{ query: { facet: (key) => t(`facet.${key}`) } }}
                    loading={loading}
                    onChangeQuery={(_, query) => updateQueryParam(history, 'filters', query)}
                    onRemoveFacet={(query) => updateQueryFilters(history, query.content.field, [])}
                    onUpdate={(state) => setQueryBuilderCache('file-repo', state)}
                    total={filesTotal}
                />
                <StackLayout fitContent flexContent vertical>
                    <StackLayout fitContent flexContent vertical>
                        <Tabs
                            activeKey={readQueryParam(tabKey, 'files')}
                            className="tabs-container"
                            onChange={onTabChange}
                            type="card"
                        >
                            <TabPane
                                className="tabs-container__panes"
                                key="files"
                                tab={
                                    <div className="tabs-container__panes__tab">
                                        <MdInsertDriveFile className="icon" />
                                        {t('repo.tabs.files', { count: filesTotal.toLocaleString() })}
                                    </div>
                                }
                            >
                                <StackLayout fitContent flexContent vertical>
                                    <FilesTable />
                                </StackLayout>
                            </TabPane>
                            <TabPane
                                className="tabs-container__panes"
                                key="donors"
                                tab={
                                    <div className="tabs-container__panes__tab">
                                        <MdPeople className="icon" />
                                        {t('repo.tabs.donors', { count: donorsTotal.toLocaleString() })}
                                    </div>
                                }
                            >
                                <StackLayout fitContent flexContent vertical>
                                    <DonorsTable />
                                </StackLayout>
                            </TabPane>
                            <TabPane
                                className="tabs-container__panes"
                                key="summary"
                                tab={<div className="tabs-container__panes__tab">{t('repo.tabs.summary')}</div>}
                            >
                                <StackLayout fitContent flexContent vertical>
                                    <Summary />
                                </StackLayout>
                            </TabPane>
                        </Tabs>
                    </StackLayout>
                </StackLayout>
            </StackLayout>
        </QueryLayout>
    );
};

export default FileRepo;
