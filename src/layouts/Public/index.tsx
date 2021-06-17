import React from 'react';

import Header from 'components/interface/Header';

import './Layout.scss';

const Layout: React.FC = ({ children }) => (
    <div className="layout-public">
        <Header className="layout-public__header" />
        <div className="layout-public__content">{children}</div>
    </div>
);

export default Layout;
