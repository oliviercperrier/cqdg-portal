import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineMenuFold } from 'react-icons/ai';
import { MdInsertDriveFile, MdPeople } from 'react-icons/md';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Button, Divider } from 'antd';
import { Tabs } from 'antd';
import classNames from 'classnames/bind';

import ScrollView from 'components/layouts/ScrollView';
import { t } from 'locales/utils';
import { readQueryParam, updateQueryParam } from 'utils/url/query';

import './SideBar.scss';

export type FiltersProp = {
    files: React.ReactElement;
    donors: React.ReactElement;
};
interface ISideBarProps {
    filters: FiltersProp;
}

const { TabPane } = Tabs;
const tabKey = 'facetTab';

const SideBar = ({ filters }: ISideBarProps): React.ReactElement => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const intl = useIntl();
    const history = useHistory();

    const onTabChange = (activeKey: string) => {
        updateQueryParam(tabKey, activeKey, history);
    };

    const isCollapsedClassName = classNames({ 'side-panel-collapsed': isCollapsed });
    return (
        <div className={`side-panel ${isCollapsedClassName}`}>
            <div className="side-panel-header">
                <Button onClick={() => setIsCollapsed(!isCollapsed)} type="text">
                    {isCollapsed ? <AiOutlineMenu /> : <AiOutlineMenuFold />}
                </Button>
            </div>
            <div className="side-panel-content">
                <Tabs
                    activeKey={readQueryParam(tabKey, 'files')}
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
                            {filters.files}
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
                            {filters.donors}
                        </ScrollView>
                    </TabPane>
                </Tabs>
            </div>
            <div className="side-panel-footer">
                <Button className="link" href="mailto:support@cqdg.ca" type="link">
                    {t('short_footer.info')}
                </Button>
                <Divider className="spacer" type="vertical" />
                <Button
                    className="link"
                    href={intl.formatMessage({ id: 'footer.logo.genome.link' })}
                    target="_blank"
                    type="link"
                >
                    Génome Québec
                </Button>
                <Divider className="spacer" type="vertical" />
                <Button
                    className="link"
                    href={intl.formatMessage({ id: 'footer.logo.chusj.link' })}
                    target="_blank"
                    type="link"
                >
                    CHU Sainte-Justine
                </Button>
            </div>
        </div>
    );
};

export default SideBar;
