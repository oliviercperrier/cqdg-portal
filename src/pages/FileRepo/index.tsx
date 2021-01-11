import React from 'react';
import { MdInsertDriveFile, MdPeople } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Tabs } from 'antd';
import QueryLayout from 'layouts/Query';
import { t } from 'locales/utils';
import { GET_FILES } from 'store/queries/fileRepo';

import StackLayout from 'components/layouts/StackLayout';
import QueryBuilder from 'components/QueryBuilder';
import { readQuery, updateQuery } from 'utils/query';

import './FileRepo.modules.scss';

const { TabPane } = Tabs;
const tabKey = 'searchTableTab';
const FileRepo = () => {
    const history = useHistory();
    const { data, error, loading } = useQuery<any>(GET_FILES);

    const onTabChange = (activeKey: string) => {
        updateQuery(tabKey, activeKey, history);
    };

    return (
        <QueryLayout
            className="file-repo"
            filters={{ donors: <div>donor filters</div>, files: <div>file filters</div> }}
        >
            <StackLayout grow vertical>
                <QueryBuilder />
                <StackLayout grow vertical>
                    <div className="file-repo__graph-content">graphs</div>
                    <StackLayout grow vertical>
                        <Tabs
                            activeKey={readQuery(tabKey, 'files')}
                            className="tabs-container"
                            onChange={onTabChange}
                            type="card"
                        >
                            <TabPane
                                className="tabs-container__panes"
                                key="files"
                                tab={
                                    <span>
                                        <MdInsertDriveFile className="icon" />
                                        {t('repo.tabs.files', { count: 0 })}
                                    </span>
                                }
                            >
                                <StackLayout grow vertical>
                                    content
                                </StackLayout>
                            </TabPane>
                            <TabPane
                                className="tabs-container__panes"
                                key="donors"
                                tab={
                                    <span>
                                        <MdPeople className="icon" />
                                        {t('repo.tabs.donors', { count: 0 })}
                                    </span>
                                }
                            >
                                <StackLayout grow vertical>
                                    content 2
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
