import React from 'react';
import { MdInsertDriveFile, MdPeople } from 'react-icons/md';
import { Tabs } from 'antd';

import { t } from 'locales/translate';
import { readQueryParam, updateQueryParam } from 'utils/url/query';

import DonorFilters from './DonorFilters';
import FileFilters from './FileFilters';

import './SideBarContent.scss';

const { TabPane } = Tabs;
const tabKey = 'facetTab';

interface ISidebarContent {
    history: any;
    data: any;
}
const SideBar: React.FC<ISidebarContent> = ({ data, history }) => {
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
                <div className="side-panel-content__panes__content">
                    <FileFilters data={data} history={history} />
                </div>
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
                <div className="side-panel-content__panes__content">
                    <DonorFilters data={data} history={history} />
                </div>
            </TabPane>
        </Tabs>
    );
};

export default SideBar;
