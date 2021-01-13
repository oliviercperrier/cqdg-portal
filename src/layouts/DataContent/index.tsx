import React from 'react';
import { IChildrenProp } from 'types/generic';

import StackLayout from 'components/layouts/StackLayout';

import './DataContent.scss';

interface IDataContentProps extends IChildrenProp {
    summary: React.ReactNode;
    actions: React.ReactNode;
}

const DataContent = ({ actions, children, summary }: IDataContentProps): React.ReactElement => (
    <StackLayout className="data-container" grow vertical>
        <StackLayout className="data-container__header">
            <div className="data-container__header__left">{summary}</div>
            <div className="data-container__header__right">{actions}</div>
        </StackLayout>
        <div className="data-container__content">{children}</div>
    </StackLayout>
);

export default DataContent;
