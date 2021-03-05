import React from 'react';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Divider } from 'antd';

import { IChildrenProp } from 'types/generic';

import styles from './ContentSeparator.module.scss';
const ContentSeparator = ({ children }: IChildrenProp): React.ReactElement => {
    const components = React.Children.toArray(children).filter(Boolean);
    const total = React.Children.count(components);
    return (
        <StackLayout center className={styles.container}>
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
