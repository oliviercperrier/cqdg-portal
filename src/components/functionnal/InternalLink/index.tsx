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
}

const InternalLink: React.FC<IInternalLink> = ({ children, filters = {}, path, params = {}, query = {} }) => {
    let realPath = path;
    if (!isEmpty(params)) {
        Object.keys(params).forEach((key) => {
            realPath = realPath.replace(`:${key}`, params[key]);
        });
    }
    if (!isEmpty(filters)) {
        realPath = `${realPath}${createQueryParams({ ...query, filters })}`;
    }
    return (
        <Link className="link" to={realPath}>
            {children}
        </Link>
    );
};

export default InternalLink;
