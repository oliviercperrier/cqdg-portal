import React from 'react';
import { MdInsertDriveFile, MdPeople } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Tabs } from 'antd';
import get from 'lodash/get';

import QueryBuilder from 'components/functionnal/QueryBuilder';
import StackLayout from 'components/layouts/StackLayout';
import QueryLayout from 'layouts/Query';
import { t } from 'locales/utils';
import SideBarContent from 'pages/Files/filters/SideBarContent';
import DonorsTable from 'pages/Files/tabs/DonorsTable';
import FilesTable from 'pages/Files/tabs/FilesTable';
import Summary from 'pages/Files/tabs/Summary';
import { FILE_PAGE_METADATA } from 'store/queries/files/page';
import { readQueryParam, updateQueryParam } from 'utils/url/query';

import './Files.scss';

const { TabPane } = Tabs;
const tabKey = 'searchTableTab';
const FileRepo = () => {
    const history = useHistory();
    const { data, error, loading } = useQuery<any>(FILE_PAGE_METADATA);

    const onTabChange = (activeKey: string) => {
        updateQueryParam(tabKey, activeKey, history);
    };

    const filesTotal = get(data, 'File.hits.total', 0);
    const donorsTotal = get(data, 'Donor.hits.total', 0);

    return (
        <QueryLayout className="file-repo" sidebar={<SideBarContent />}>
            <StackLayout grow noScroll vertical>
                <QueryBuilder />
                <StackLayout grow noScroll vertical>
                    <StackLayout grow noScroll vertical>
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
                                <StackLayout grow noScroll vertical>
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
                                <StackLayout grow vertical>
                                    <DonorsTable />
                                </StackLayout>
                            </TabPane>
                            <TabPane
                                className="tabs-container__panes"
                                key="summary"
                                tab={<div className="tabs-container__panes__tab">{t('repo.tabs.summary')}</div>}
                            >
                                <StackLayout grow vertical>
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
