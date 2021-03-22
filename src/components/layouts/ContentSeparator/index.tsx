import React from 'react';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Divider } from 'antd';

import styles from './ContentSeparator.module.scss';

interface IContentSeparator {
    className?: string;
}
const ContentSeparator: React.FC<IContentSeparator> = ({ children, className = '' }) => {
    const components = React.Children.toArray(children).filter(Boolean);
    const total = React.Children.count(components);
    return (
        <StackLayout center className={`${styles.container} ${className}`}>
            {React.Children.map(components, (child, i) =>
                total - 1 > i ? (
                    <>
                        {child} <Divider className={styles.divider} type="vertical" />
                    </>
                ) : (
                    child
                )
            )}
        </StackLayout>
    );
};

export default ContentSeparator;
