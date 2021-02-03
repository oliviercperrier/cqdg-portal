import React from 'react';
import { MdInsertDriveFile, MdPeople } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { Tabs } from 'antd';

import ScrollView from 'components/layouts/ScrollView';
import { t } from 'locales/utils';
import { readQueryParam, updateQueryParam } from 'utils/url/query';

import FileFilters from './FileFilters';

import './SideBarContent.scss';

const { TabPane } = Tabs;
const tabKey = 'facetTab';

const SideBar: React.FC = () => {
    const history = useHistory();

    const onTabChange = (activeKey: string) => {
        updateQueryParam(tabKey, activeKey, history);
    };

    return (
        <Tabs activeKey={readQueryParam(tabKey, 'files')} className="side-panel-content__panes" onChange={onTabChange}>
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
                    <div>donors filter</div>
                </ScrollView>
            </TabPane>
        </Tabs>
    );
};

export default SideBar;
