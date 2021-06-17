import React from 'react';

import SideBar from 'components/layouts/Sidebar';

import './Layout.scss';

interface QueryLayoutProps {
    sidebar: React.ReactNode;
    className?: string;
}

const Layout: React.FC<QueryLayoutProps> = ({ children, className = '', sidebar }) => (
    <div className={`layout-query ${className}`}>
        <SideBar>{sidebar}</SideBar>
        <div className="layout-query__content">{children}</div>
    </div>
);

export default Layout;
