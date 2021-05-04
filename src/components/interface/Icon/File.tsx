import React from 'react';
import cx from 'classnames';

import { IICon } from 'types/generic';

import styles from './File.module.scss';

const File: React.FC<IICon> = ({ className = '', colored = true, size = 48 }) => (
    <svg
        className={cx(className, { [styles.colored]: colored })}
        fill="currentColor"
        height={size}
        viewBox="0 0 48 48"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path clip-rule="evenodd" d="M38.4 4.5H32.8V3H40V48H3.20001V44.25H4.80001V46.5H38.4V4.5Z" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M32 13.5H4.79999V12H32V13.5Z" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M32 16.5H4.79999V15H32V16.5Z" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M32 19.5H4.79999V18H32V19.5Z" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M16 22.5H4.79999V21H16V22.5Z" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M6.39999 29.25V40.5H4.79999V29.25H6.39999Z" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M9.6 33V40.5H8V33H9.6Z" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M12.8 26.25V40.5H11.2V26.25H12.8Z" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M16 30.75V40.5H14.4V30.75H16Z" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M19.2 27.75V40.5H17.6V27.75H19.2Z" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M22.4 32.25V40.5H20.8V32.25H22.4Z" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M25.6 30.75V40.5H24V30.75H25.6Z" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M28.8 25.5V40.5H27.2V25.5H28.8Z" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M32 27.75V40.5H30.4V27.75H32Z" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M28.8 1.5H30.4V6H35.2V7.5H28.8V1.5Z" fill-rule="evenodd" />
        <path
            clip-rule="evenodd"
            d="M0 0H29.9314L36.8 6.43934V45H0V0ZM1.6 1.5V43.5H35.2V7.06066L29.2686 1.5H1.6Z"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M4.79999 5.25C4.79999 4.83579 5.15816 4.5 5.59999 4.5H24.8C25.2418 4.5 25.6 4.83579 25.6 5.25V9.75C25.6 10.1642 25.2418 10.5 24.8 10.5H5.59999C5.15816 10.5 4.79999 10.1642 4.79999 9.75V5.25ZM6.39999 6V9H24V6H6.39999Z"
            fill-rule="evenodd"
        />
    </svg>
);

export default File;
