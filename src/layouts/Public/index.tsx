import React from 'react';

import Header from 'components/interface/Header';
import { IChildrenProp } from 'types/generic';

import './Layout.scss';

const Layout = ({ children }: IChildrenProp): React.ReactElement => (
    <div className="layout-public">
        <Header className="layout-public__header" />
        <div className="layout-public__content">{children}</div>
    </div>
);

export default Layout;
