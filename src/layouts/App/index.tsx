import React from 'react';

import Header from 'components/interface/Header';
import StackLayout from 'components/layouts/StackLayout';
import { IChildrenProp } from 'types/generic';

import './Layout.scss';

const Layout = ({ children }: IChildrenProp): React.ReactElement => (
    <StackLayout className="layout-app" grow noScroll vertical>
        <Header />
        <div className="layout-app__content">{children}</div>
    </StackLayout>
);

export default Layout;
