import React from 'react';
import { MdInsertDriveFile, MdPeople } from 'react-icons/md';
import { Tabs } from 'antd';
import cx from 'classnames';

import { t } from 'locales/translate';

import './FileDonor.scss';

const { TabPane } = Tabs;

interface ISidebarContent {
    history: any;
    activeKey?: string;
    defaultActiveKey?: string;
    onChange?: (activeKey: string) => void;
    files: React.ReactNode;
    donors: React.ReactNode;
    className?: string;
    tabsPadding?: boolean;
}
const SideBar: React.FC<ISidebarContent> = ({
    activeKey,
    className,
    defaultActiveKey,
    donors,
    files,
    onChange = (f) => f,
    tabsPadding = false,
}) => (
    <Tabs
        activeKey={activeKey}
        className={cx('filedonortabs-container', {
            'filedonortabs-container__tabs-padding': tabsPadding,
        })}
        defaultActiveKey={defaultActiveKey}
        onChange={onChange}
    >
        <TabPane
            key="files"
            tab={
                <div className="filedonortabs-container__tab">
                    <MdInsertDriveFile className="filedonortabs-container__tab__icon" />
                    {t('global.files.title')}
                </div>
            }
        >
            <div className={cx('filedonortabs-container__content', className)}>{files}</div>
        </TabPane>
        <TabPane
            key="donors"
            tab={
                <div className="filedonortabs-container__tab">
                    <MdPeople className="filedonortabs-container__tab__icon" />
                    {t('global.donors.title')}
                </div>
            }
        >
            <div className={cx('filedonortabs-container__content', className)}>{donors}</div>
        </TabPane>
    </Tabs>
);

export default SideBar;
