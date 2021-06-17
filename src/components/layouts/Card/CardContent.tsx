import React from 'react';

import './CardContent.scss';

type CardTypeEnum = 'stack' | 'stackCenter' | 'headerFooter' | 'header2Column';
interface ICardContentProps {
    cardType?: CardTypeEnum;
    className?: string;
}

const CardContent: React.FC<ICardContentProps> = ({ cardType = 'stack', children, className = '' }) => (
    <div className={`${cardType} ${className}`}>{children}</div>
);

export default CardContent;
