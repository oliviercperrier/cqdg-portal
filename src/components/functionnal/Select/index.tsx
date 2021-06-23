import React from 'react';
import { Select, SelectProps, Tag } from 'antd';

import styles from './Select.module.scss';

type TSelect = Omit<SelectProps<any>, 'tagRender'>;
const SelectWithCustomTag: React.FC<TSelect> = ({ children, ...rest }) => (
    <Select
        {...rest}
        getPopupContainer={(trigger) => trigger.parentNode}
        tagRender={({ onClose, value }) => (
            <Tag className={styles.tag} closable onClose={onClose}>
                {value}
            </Tag>
        )}
    >
        {children}
    </Select>
);
export default SelectWithCustomTag;
