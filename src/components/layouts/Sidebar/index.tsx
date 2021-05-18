import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineMenuFold } from 'react-icons/ai';
import { Button } from 'antd';
import classNames from 'classnames/bind';

import FooterCompact from 'components/interface/Footer/Compact';

import './SideBar.scss';

interface ISidebar {
    className?: string;
}

const SideBar: React.FC<ISidebar> = ({ children, className = '' }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const isCollapsedClassName = classNames({ 'side-panel-collapsed': isCollapsed });
    return (
        <aside className={`side-panel ${isCollapsedClassName} ${className}`}>
            <section className="side-panel-header">
                <Button onClick={() => setIsCollapsed(!isCollapsed)} type="text">
                    {isCollapsed ? <AiOutlineMenu size={24} /> : <AiOutlineMenuFold size={24} />}
                </Button>
            </section>
            <section className="side-panel-content">{children}</section>
            {!isCollapsed && <FooterCompact />}
        </aside>
    );
};

export default SideBar;
