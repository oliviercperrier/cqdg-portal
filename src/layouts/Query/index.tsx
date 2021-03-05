import React from 'react';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';

import SideBar from 'components/layouts/Sidebar';
import { IBasicProp } from 'types/generic';

import './Layout.scss';

interface QueryLayoutProps extends IBasicProp {
    sidebar: React.ReactNode;
}

const Layout = ({ children, className = '', sidebar }: QueryLayoutProps): React.ReactElement => (
    <StackLayout className={`layout-query ${className}`}>
        <SideBar>{sidebar}</SideBar>
        <StackLayout className="layout-query__content" fitContent flexContent vertical>
            {children}
        </StackLayout>
    </StackLayout>
);

export default Layout;
