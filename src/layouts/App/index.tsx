import React from 'react';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';

import Header from 'components/interface/Header';

import './Layout.scss';

const Layout: React.FC = ({ children }) => (
    <StackLayout className="layout-app" flexContent vertical>
        <Header />
        <div className="layout-app__content">{children}</div>
    </StackLayout>
);

export default Layout;
