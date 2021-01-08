import React, { useState } from 'react';
import { AiOutlineMenuFold } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { Button, Divider } from 'antd';
import classNames from 'classnames/bind';
import { t } from 'locales/utils';
import { IChildrenProp } from 'types/generic';

import './SideBar.modules.scss';

const SideBar = ({ children }: IChildrenProp): React.ReactElement => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const intl = useIntl();

    const isCollapsedClassName = classNames({ 'side-panel-collapsed': isCollapsed });
    return (
        <div className={`side-panel ${isCollapsedClassName}`}>
            <div className="side-panel-header">
                <Button onClick={() => setIsCollapsed(!isCollapsed)} type="text">
                    <AiOutlineMenuFold />
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
