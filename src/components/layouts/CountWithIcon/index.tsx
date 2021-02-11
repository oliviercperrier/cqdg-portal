import React from 'react';

import { t } from 'locales/translate';
import { IClassNameProp } from 'types/generic';

import './CountWithIcon.scss';

type CountWithIconTypeEnum = 'inline' | 'stack';

interface ICountWithIconProps extends IClassNameProp {
    Icon: React.ComponentType<any>;
    iconClassName?: string;
    type?: CountWithIconTypeEnum;
    label: string;
    total: number | string;
}

const CountWithIcon = ({
    className = '',
    Icon,
    iconClassName = '',
    label,
    total,
    type = 'stack',
}: ICountWithIconProps): React.ReactElement => {
    const labelTranslated = t(label) || label;
    return (
        <div className={`count__container count__container--${type} ${className}`}>
            <Icon className={`icon ${iconClassName}`} />
            <div className="wrapper__text">
                <span className="count">{total}</span>
                <span className="label">{labelTranslated}</span>
            </div>
        </div>
    );
};

export default CountWithIcon;
