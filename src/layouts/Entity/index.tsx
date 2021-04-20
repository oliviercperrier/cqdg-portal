import React from 'react';

import FooterCompact from 'components/interface/Footer/Compact';
import Header from 'components/interface/Header';

import styles from './Layout.module.scss';

const Layout: React.FC = ({ children }) => (
    <div className={styles.layout}>
        <Header />
        <div className={styles.content}>{children}</div>
        <FooterCompact />
    </div>
);

export default Layout;
