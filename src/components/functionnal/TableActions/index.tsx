import React from 'react';
import { MdFileDownload, MdFormatLineSpacing } from 'react-icons/md';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Button, Checkbox, Dropdown, Menu, Popover } from 'antd';

import SortableList, { TSortableItem } from 'components/functionnal/SortableList';
import { t } from 'locales/translate';

import styles from './TableActions.module.scss';

interface ITableActionsProps {
    sortableList: Array<TSortableItem>;
    onSortingChange: (items: Array<TSortableItem>) => void;
    onCheckBoxChange: (items: Array<TSortableItem>) => void;
    restoreDefault: () => void;
}

const TableActions = ({
    onCheckBoxChange,
    onSortingChange,
    restoreDefault,
    sortableList,
}: ITableActionsProps): React.ReactElement => (
    <StackLayout className={styles.container}>
        <Popover
            arrowPointAtCenter
            content={
                <>
                    <Button className={styles.restoreDefault} onClick={restoreDefault} type="text">
                        {t('global.tables.actions.restore.defaults')}
                    </Button>
                    <SortableList
                        data={sortableList.filter((item) => item.movable)}
                        onChange={(items) => {
                            const newItems = [...items];

                            sortableList.forEach((element: TSortableItem) => {
                                if (!element.movable) {
                                    newItems.splice(element.initialOrder, 0, element);
                                }
                            });
                            onSortingChange(newItems);
                        }}
                        renderItem={(item) => (
                            <Checkbox
                                defaultChecked={!item.hidden}
                                onChange={(e) => {
                                    const newItem = { ...item, hidden: !e.target.checked };
                                    const newItems = [...sortableList];
                                    const index = newItems.findIndex((el) => el.id === item.id);
                                    newItems.splice(index, 1, newItem);
                                    onCheckBoxChange(newItems);
                                }}
                            >
                                {item.title}
                            </Checkbox>
                        )}
                    />
                </>
            }
            overlayClassName="popover-no-arrow"
            placement="bottomRight"
            trigger={'click'}
        >
            <Button className={styles.button}>
                <MdFormatLineSpacing />
            </Button>
        </Popover>
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
