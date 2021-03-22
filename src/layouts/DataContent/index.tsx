import React from 'react';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';

import './DataContent.scss';

interface IDataContentProps {
    summary: React.ReactNode;
    actions: React.ReactNode;
    className?: string;
}

const DataContent: React.FC<IDataContentProps> = ({ actions, children, className = '', summary }) => (
    <StackLayout className={`data-container ${className}`} flexContent vertical>
        <StackLayout className="data-container__header">
            <div className="data-container__header__left">{summary}</div>
            <div className="data-container__header__right">{actions}</div>
        </StackLayout>
        <StackLayout className="data-container__content" flexContent vertical>
            {children}
        </StackLayout>
    </StackLayout>
);

export default DataContent;
