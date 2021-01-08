import React from 'react';
import { IChildrenProp } from 'types/generic';

import SideBar from 'components/layouts/Sidebar';
import StackLayout from 'components/layouts/StackLayout';

import './Layout.modules.scss';

interface QueryLayoutProps extends IChildrenProp {
    filters: React.ReactNode;
}

const Layout = ({ children, filters }: QueryLayoutProps): React.ReactElement => (
    <StackLayout className="layout-query">
        <SideBar>{filters}</SideBar>
        <StackLayout className="layout-query__content" grow vertical>
            {children}
        </StackLayout>
    </StackLayout>
);

export default Layout;
