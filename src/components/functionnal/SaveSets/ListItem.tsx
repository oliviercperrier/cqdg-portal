import React from 'react';

import styles from './ListItem.module.scss';

interface IItemList {
    label: React.ReactNode;
    total: number;
    Icon?: React.ReactNode;
}
const ListItem: React.FunctionComponent<IItemList> = ({ Icon = null, label, total }) => (
    <span className={styles.listItem}>
        <span className={styles.label}>{label}</span>
        <span className={styles.listTotal}>
            {Icon}
            {total}
        </span>
    </span>
);

export default ListItem;
