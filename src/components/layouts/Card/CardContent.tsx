import React from 'react';

import { IBasicProp } from 'types/generic';

import './CardContent.scss';

type CardTypeEnum = 'stack' | 'stackCenter' | 'headerFooter' | 'header2Column';
interface ICardContentProps extends IBasicProp {
    cardType?: CardTypeEnum;
}

const CardContent = ({ cardType = 'stack', children, className = '' }: ICardContentProps): React.ReactElement => (
    <div className={`${cardType} ${className}`}>{children}</div>
);

export default CardContent;
