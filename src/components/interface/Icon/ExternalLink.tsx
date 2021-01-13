import React from 'react';
import { IClassNameProp } from 'types/generic';

const ExternalLink = ({ className = '' }: IClassNameProp): React.ReactElement => (
    <svg
        className={className}
        fill="currentColor"
        height="10"
        viewBox="0 0 10 10"
        width="10"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            clipRule="evenodd"
            d="M1.5 1.5V8.5H8.5V5H9.5V8.5C9.5 9.05 9.05 9.5 8.5 9.5H1.5C0.945 9.5 0.5 9.05 0.5 8.5V1.5C0.5 0.95 0.945 0.5 1.5 0.5H5V1.5H1.5ZM6 1.5V0.5H9.5V4H8.5V2.205L3.585 7.12L2.88 6.415L7.795 1.5H6Z"
            fillRule="evenodd"
        />
    </svg>
);

export default ExternalLink;
