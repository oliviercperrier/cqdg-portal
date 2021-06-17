import React from 'react';

import styles from './DescriptionList.module.scss';
const DescriptionList: React.FC = ({ children }) => <dl className={styles.container}>{children}</dl>;

interface IListItem {
    label: string | React.ReactNode;
    labelClassName?: string;
}
export const ListItem: React.FC<IListItem> = ({ children, label, labelClassName = '' }) => (
    <>
        <dt className={styles.label}>{label}</dt>
        <dd className={`${styles.desc} ${labelClassName}`}>{children}</dd>
    </>
);

export default DescriptionList;
