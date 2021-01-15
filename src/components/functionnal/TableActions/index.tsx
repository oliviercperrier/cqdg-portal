import React from 'react';
import { MdFileDownload, MdFormatLineSpacing } from 'react-icons/md';
import { Button, Dropdown, Menu } from 'antd';
import { t } from 'locales/utils';

import StackLayout from 'components/layouts/StackLayout';

import styles from './TableActions.module.scss';

const TableActions = (): React.ReactElement => (
    <StackLayout className={styles.container}>
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item>test</Menu.Item>
                </Menu>
            }
            placement="bottomRight"
            trigger={['click']}
        >
            <Button className={styles.button}>
                <MdFormatLineSpacing />
            </Button>
        </Dropdown>
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item>{t('repo.download.options.all.tsv')}</Menu.Item>
                </Menu>
            }
            placement="bottomRight"
            trigger={['click']}
        >
            <Button className={styles.button}>
                <MdFileDownload />
            </Button>
        </Dropdown>
    </StackLayout>
);

export default TableActions;
