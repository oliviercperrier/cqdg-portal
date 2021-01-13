import React from 'react';
import { IBasicProp } from 'types/generic';

import StackLayout from 'components/layouts/StackLayout';

import './BorderedContainer.scss';

interface IBorderedContainerProps extends IBasicProp {
    grow?: boolean;
}

export const BorderedContainer = ({
    children,
    className = '',
    grow = false,
}: IBorderedContainerProps): React.ReactElement => (
    <StackLayout className={`bordered-container ${className}`} grow={grow} vertical>
        {children}
    </StackLayout>
);

export default BorderedContainer;
