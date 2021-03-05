import React from 'react';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';

import { IChildrenProp } from 'types/generic';

import './DataContent.scss';

interface IDataContentProps extends IChildrenProp {
    summary: React.ReactNode;
    actions: React.ReactNode;
}

const DataContent = ({ actions, children, summary }: IDataContentProps): React.ReactElement => (
    <StackLayout className="data-container" flexContent vertical>
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
