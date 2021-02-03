import React from 'react';

import SideBar from 'components/layouts/Sidebar';
import StackLayout from 'components/layouts/StackLayout';
import { IBasicProp } from 'types/generic';

import './Layout.scss';

interface QueryLayoutProps extends IBasicProp {
    sidebar: React.ReactNode;
}

const Layout = ({ children, className = '', sidebar }: QueryLayoutProps): React.ReactElement => (
    <StackLayout className={`layout-query ${className}`} noScroll>
        <SideBar>{sidebar}</SideBar>
        <StackLayout className="layout-query__content" grow noScroll vertical>
            {children}
        </StackLayout>
    </StackLayout>
);

export default Layout;
