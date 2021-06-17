import React from 'react';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';

import './BorderedContainer.scss';

interface IBorderedContainerProps {
    grow?: boolean;
    className?: string;
}

const BorderedContainer: React.FC<IBorderedContainerProps> = ({ children, className = '', grow = false }) => (
    <StackLayout className={`bordered-container ${className}`} flexContent={grow} vertical>
        {children}
    </StackLayout>
);

export default BorderedContainer;
