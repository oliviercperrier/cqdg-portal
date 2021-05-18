import React from 'react';

import SideBar from 'components/layouts/Sidebar';
import { IBasicProp } from 'types/generic';

import './Layout.scss';

interface QueryLayoutProps extends IBasicProp {
    sidebar: React.ReactNode;
}

const Layout: React.FC<QueryLayoutProps> = ({ children, className = '', sidebar }) => (
    <div className={`layout-query ${className}`}>
        <SideBar>{sidebar}</SideBar>
        <div className="layout-query__content">{children}</div>
    </div>
);

export default Layout;
