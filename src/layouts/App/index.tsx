import React from 'react';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';

import Header from 'components/interface/Header';
import { IChildrenProp } from 'types/generic';

import './Layout.scss';

const Layout = ({ children }: IChildrenProp): React.ReactElement => (
    <StackLayout className="layout-app" flexContent vertical>
        <Header />
        <div className="layout-app__content">{children}</div>
    </StackLayout>
);

export default Layout;
