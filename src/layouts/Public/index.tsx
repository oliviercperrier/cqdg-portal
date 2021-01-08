import React from 'react';
import { IChildrenProp } from 'types/generic';

import Header from 'components/Header';

import './Layout.modules.scss';

const Layout = ({ children }: IChildrenProp): React.ReactElement => (
    <div className="layout-public">
        <Header className="layout-public__header" />
        <div className="layout-public__content">{children}</div>
    </div>
);

export default Layout;
