import React from 'react';
import { MdInsertDriveFile, MdPeople } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import ScrollView from '@ferlab/ui/core/layout/ScrollView';
import { Tabs } from 'antd';

import { t } from 'locales/translate';
import { readQueryParam, updateQueryParam } from 'utils/url/query';

import DonorFilters from './DonorFilters';
import FileFilters from './FileFilters';

import './SideBarContent.scss';

const { TabPane } = Tabs;
const tabKey = 'facetTab';

const SideBar: React.FC = () => {
    const history = useHistory();

    const onTabChange = (activeKey: string) => {
        updateQueryParam(history, tabKey, activeKey);
    };
    return (
        <Tabs
            activeKey={readQueryParam(tabKey, { defaultValue: 'files', whiteList: ['files', 'donors'] })}
            className="side-panel-content__panes"
            onChange={onTabChange}
        >
            <TabPane
                key="files"
                tab={
                    <div className="side-panel-content__panes__tab">
                        <MdInsertDriveFile className="icon" />
                        {t('global.files.title')}
                    </div>
                }
            >
                <ScrollView className="side-panel-content__panes__content" vertical>
                    <FileFilters />
                </ScrollView>
            </TabPane>
            <TabPane
                key="donors"
                tab={
                    <div className="side-panel-content__panes__tab">
                        <MdPeople className="icon" />
                        {t('global.donors.title')}
                    </div>
                }
            >
                <ScrollView className="side-panel-content__panes__content" vertical>
                    <DonorFilters />
                </ScrollView>
            </TabPane>
        </Tabs>
    );
};

export default SideBar;
