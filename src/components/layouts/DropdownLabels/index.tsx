import React from 'react';
import MultiLabel, { MultiLabelIconPositionEnum, MultiLabelProps } from '@ferlab/ui/core/components/labels/MultiLabel';

import styles from './DropdownLabels.module.scss';
const DropdownLabels: React.FC<MultiLabelProps> = (props) => (
    <MultiLabel
        className={styles.container}
        iconPosition={MultiLabelIconPositionEnum.Top}
        labelClassName={styles.label}
        subLabelClassName={styles.subLabel}
        {...props}
    />
);
export default DropdownLabels;
