import React from 'react';
import { IChildrenProp } from 'types/generic';

import Header from 'components/interface/Header';
import StackLayout from 'components/layouts/StackLayout';

import './Layout.scss';

const Layout = ({ children }: IChildrenProp): React.ReactElement => (
    <StackLayout className="layout-app" grow vertical>
        <Header />
        <div className="layout-app__content">{children}</div>
    </StackLayout>
);

export default Layout;
