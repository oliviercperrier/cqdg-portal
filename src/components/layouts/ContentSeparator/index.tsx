import React from 'react';
import { Divider } from 'antd';
import { IChildrenProp } from 'types/generic';

import StackLayout from 'components/layouts/StackLayout';

import './ContentSeparator.scss';
const ContentSeparator = ({ children }: IChildrenProp): React.ReactElement => {
    const total = React.Children.count(children);
    return (
        <StackLayout center className="separator-container">
            {React.Children.map(children, (child, i) =>
                total - 1 > i ? (
                    <>
                        {child} <Divider className="divider" type="vertical" />
                    </>
                ) : (
                    child
                )
            )}
        </StackLayout>
    );
};

export default ContentSeparator;
