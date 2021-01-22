import React from 'react';

import StackLayout from 'components/layouts/StackLayout';
import { IChildrenProp } from 'types/generic';

import './DataContent.scss';

interface IDataContentProps extends IChildrenProp {
    summary: React.ReactNode;
    actions: React.ReactNode;
}

const DataContent = ({ actions, children, summary }: IDataContentProps): React.ReactElement => (
    <StackLayout className="data-container" grow noScroll vertical>
        <StackLayout className="data-container__header">
            <div className="data-container__header__left">{summary}</div>
            <div className="data-container__header__right">{actions}</div>
        </StackLayout>
        <StackLayout className="data-container__content" grow noScroll vertical>
            {children}
        </StackLayout>
    </StackLayout>
);

export default DataContent;
