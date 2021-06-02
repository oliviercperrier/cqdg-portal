import React from 'react';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import { ISqonGroupFilter } from 'types/interface/filters';
import { createQueryParams } from 'utils/url/query';

interface IQueryProp {
    [key: string]: string;
}

type IParamProp = IQueryProp;

export interface IInternalLink {
    path: string;
    params?: IParamProp;
    query?: IQueryProp;
    filters?: ISqonGroupFilter;
    type?: 'button' | 'link';
    className?: string;
}

const InternalLink: React.FC<IInternalLink> = ({
    children,
    filters = {},
    path,
    params = {},
    query = {},
    type = 'link',
    className = '',
}) => {
    let realPath = path;
    const linkClassName = type === 'link' ? 'link' : 'ant-btn';
    if (!isEmpty(params)) {
        Object.keys(params).forEach((key) => {
            realPath = realPath.replace(`:${key}`, params[key]);
        });
    }
    if (!isEmpty(filters)) {
        realPath = `${realPath}${createQueryParams({ ...query, filters })}`;
    }
    return (
        <Link className={`${linkClassName} ${className}`} to={realPath}>
            {children}
        </Link>
    );
};

export default InternalLink;
