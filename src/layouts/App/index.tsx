import React from 'react';

import Header from 'components/interface/Header';

import './Layout.scss';

const Layout: React.FC = ({ children }) => (
    <div className="layout-app">
        <Header />
        <main className="layout-app__content">{children}</main>
    </div>
);

export default Layout;
