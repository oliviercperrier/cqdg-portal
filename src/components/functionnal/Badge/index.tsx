import React from 'react';
import {
    AiOutlineCheck,
    AiOutlineClose,
    AiOutlineExclamationCircle,
    AiOutlineSync,
    AiOutlineWarning,
} from 'react-icons/ai';
import { BsFillCircleFill } from 'react-icons/bs';
import cx from 'classnames';

import styles from './Badge.module.scss';

export enum EFormat {
    DOT = 'dot',
    ICON = 'icon',
}

export enum ESize {
    SMALL = 'small',
    DEFAULT = 'default',
}

export enum EType {
    DEFAULT = 'default',
    SUCCESS = 'success',
    PROCESSING = 'processing',
    ERROR = 'error',
    WARNING = 'warning',
}

interface IBadge {
    format?: EFormat;
    type?: EType;
    size?: ESize;
}

const classNameMappings = {
    [EType.DEFAULT]: styles.default,
    [EType.SUCCESS]: styles.success,
    [EType.PROCESSING]: styles.processing,
    [EType.ERROR]: styles.error,
    [EType.WARNING]: styles.warning,
};
const getDotComponent = (type: EType, format: EFormat, size: ESize) => {
    const className = cx(styles.iconSpace, classNameMappings[type]);
    const iconSize = size === ESize.DEFAULT ? 24 : 14;
    if (format === EFormat.DOT) {
        return <BsFillCircleFill className={className} size={10} />;
    }

    switch (type) {
        case EType.SUCCESS:
            return <AiOutlineCheck className={className} size={iconSize} />;
        case EType.PROCESSING:
            return <AiOutlineSync className={className} size={iconSize} />;
        case EType.ERROR:
            return <AiOutlineClose className={className} size={iconSize} />;
        case EType.WARNING:
            return <AiOutlineWarning className={className} size={iconSize} />;
        default:
            return <AiOutlineExclamationCircle className={className} size={iconSize} />;
    }
};
const Badge: React.FC<IBadge> = ({ format = EFormat.DOT, type = EType.DEFAULT, children, size = ESize.DEFAULT }) => (
    <div className={styles.container}>
        {getDotComponent(type, format, size)}
        {children}
    </div>
);

export default Badge;
