import React from 'react';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';

import { IBasicProp } from 'types/generic';

import './BorderedContainer.scss';

interface IBorderedContainerProps extends IBasicProp {
    grow?: boolean;
}

export const BorderedContainer = ({
    children,
    className = '',
    grow = false,
}: IBorderedContainerProps): React.ReactElement => (
    <StackLayout className={`bordered-container ${className}`} flexContent={grow} vertical>
        {children}
    </StackLayout>
);

export default BorderedContainer;
