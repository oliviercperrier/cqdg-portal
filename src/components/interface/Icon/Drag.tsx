import React from 'react';

import { IClassNameProp } from 'types/generic';

const Drag = ({ className }: IClassNameProp): React.ReactElement => (
    <svg className={className} fill="currentColor" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 6.006a1.505 1.505 0 113.01-.001 1.505 1.505 0 01-3.01 0zm0 6.369a1.505 1.505 0 113.01 0 1.505 1.505 0 01-3.01 0zm0 6.37a1.505 1.505 0 113.01-.002 1.505 1.505 0 01-3.01.001zm6.832-12.74a1.505 1.505 0 113.01 0 1.505 1.505 0 01-3.01 0zm0 6.37a1.505 1.505 0 113.011 0 1.505 1.505 0 01-3.011 0zm0 6.37a1.505 1.505 0 113.01-.002 1.505 1.505 0 01-3.01.001z" />
    </svg>
);

export default Drag;
