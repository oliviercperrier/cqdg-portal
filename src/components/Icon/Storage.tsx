import React from 'react';
import { TClassName } from 'types/generic/TClassname';

const Storage = ({ className = '' }: TClassName): React.ReactElement => (
    <svg
        className={className}
        fill="currentColor"
        height="18"
        viewBox="0 0 18 18"
        width="18"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            clip-rule="evenodd"
            d="M0 10.4062C0 10.2509 0.12592 10.125 0.28125 10.125H17.7188C17.8741 10.125 18 10.2509 18 10.4062V17.7188C18 17.8741 17.8741 18 17.7188 18H0.28125C0.12592 18 0 17.8741 0 17.7188V10.4062ZM0.5625 10.6875V17.4375H17.4375V10.6875H0.5625Z"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M15.822 5.0625H15.4688V4.5H16.2405L17.9881 10.3254L17.4494 10.4871L15.822 5.0625Z"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M1.75935 4.5H2.53111V5.0625H2.17787L0.550496 10.4871L0.0117188 10.3254L1.75935 4.5Z"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M8.35234 0H14.3438V3.9375H13.7812V0.5625H8.52266L6.83516 1.6875H4.21875V3.9375H3.65625V1.125H6.66484L8.35234 0Z"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M3.09375 4.5H14.9062V5.90625H14.3438V5.0625H3.65625V5.90625H3.09375V4.5Z"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M2.53125 6.46875H15.4688V7.59375H14.9062V7.03125H3.09375V7.59375H2.53125V6.46875Z"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M1.96875 8.15625H16.0312V9.5625H15.4688V8.71875H2.53125V9.5625H1.96875V8.15625Z"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M4.78125 12.6562H13.2188V14.3438C13.2188 14.9648 12.7152 15.4688 12.0938 15.4688H5.90625C5.28523 15.4688 4.78125 14.9652 4.78125 14.3438V12.6562ZM5.34375 13.2188V14.3438C5.34375 14.6544 5.59577 14.9062 5.90625 14.9062H12.0938C12.4044 14.9062 12.6562 14.6542 12.6562 14.3438V13.2188H5.34375Z"
            fill-rule="evenodd"
        />
        <path clip-rule="evenodd" d="M3.09375 13.7812H3.65625V14.3438H3.09375V13.7812Z" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M14.3438 13.7812H14.9062V14.3438H14.3438V13.7812Z" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M11.5312 14.3438H6.46875V13.7812H11.5312V14.3438Z" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M13.2188 2.25H10.4062V1.6875H13.2188V2.25Z" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M13.2188 3.375H4.78125V2.8125H13.2188V3.375Z" fill-rule="evenodd" />
    </svg>
);

export default Storage;
