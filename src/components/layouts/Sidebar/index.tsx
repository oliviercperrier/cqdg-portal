import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineMenuFold } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { Button, Divider } from 'antd';
import classNames from 'classnames/bind';

import { t } from 'locales/translate';

import './SideBar.scss';

interface ISidebar {
    className?: string;
}

const SideBar: React.FC<ISidebar> = ({ children, className = '' }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const intl = useIntl();

    const isCollapsedClassName = classNames({ 'side-panel-collapsed': isCollapsed });
    return (
        <div className={`side-panel ${isCollapsedClassName} ${className}`}>
            <div className="side-panel-header">
                <Button onClick={() => setIsCollapsed(!isCollapsed)} type="text">
                    {isCollapsed ? <AiOutlineMenu size={24} /> : <AiOutlineMenuFold size={24} />}
                </Button>
            </div>
            <div className="side-panel-content">{children}</div>
            <div className="side-panel-footer">
                <Button className="link" href="mailto:support@cqdg.ca" type="link">
                    {t('short_footer.info')}
                </Button>
                <Divider className="spacer" type="vertical" />
                <Button
                    className="link"
                    href={intl.formatMessage({ id: 'footer.logo.genome.link' })}
                    target="_blank"
                    type="link"
                >
                    Génome Québec
                </Button>
                <Divider className="spacer" type="vertical" />
                <Button
                    className="link"
                    href={intl.formatMessage({ id: 'footer.logo.chusj.link' })}
                    target="_blank"
                    type="link"
                >
                    CHU Sainte-Justine
                </Button>
            </div>
        </div>
    );
};

export default SideBar;
