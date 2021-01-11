import React from 'react';
import { IBasicProp } from 'types/generic';

import SideBar, { FiltersProp } from 'components/layouts/Sidebar';
import StackLayout from 'components/layouts/StackLayout';

import './Layout.modules.scss';

interface QueryLayoutProps extends IBasicProp {
    filters: FiltersProp;
}

const Layout = ({ children, className = '', filters }: QueryLayoutProps): React.ReactElement => (
    <StackLayout className={`layout-query ${className}`}>
        <SideBar filters={filters} />
        <StackLayout className="layout-query__content" grow vertical>
            {children}
        </StackLayout>
    </StackLayout>
);

export default Layout;
