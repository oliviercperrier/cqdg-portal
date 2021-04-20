import React from 'react';

import styles from './DescriptionList.module.scss';
const DescriptionList: React.FC = ({ children }) => <dl className={styles.container}>{children}</dl>;

interface IListItem {
    label: string | React.ReactNode;
}
export const ListItem: React.FC<IListItem> = ({ children, label }) => (
    <>
        <dt className={styles.label}>{label}</dt>
        <dd className={styles.desc}>{children}</dd>
    </>
);

export default DescriptionList;
