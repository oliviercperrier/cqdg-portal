import React, { useState } from 'react';
import ScrollView from '@ferlab/ui/core/layout/ScrollView';
import { Divider } from 'antd';

import Item from './Item';

import styles from './EditList.module.scss';

interface IEditList {
    data: IItemData[];
    dictionary?: {
        emptyData?: React.ReactNode;
    };
    onUpdate: (id: string, label: string) => void;
    onDelete: (id: string) => void;
    onChange?: (value: string) => void;
    onValidateItem?: (value: string) => boolean;
}

interface IItemData {
    id: string;
    label: string;
    extra?: React.ReactNode;
}

const EditList: React.FC<IEditList> = ({
    data,
    onDelete,
    onUpdate,
    dictionary = {},
    onChange = (f) => f,
    onValidateItem = () => true,
}) => {
    const [state, setState] = useState<{ isEditing: boolean; key: string | null }>({
        isEditing: false,
        key: null,
    });
    const handleEdit = (id: string) => {
        if (state.isEditing) {
            setState({ isEditing: false, key: null });
            return;
        }

        setState({ isEditing: true, key: id });
    };
    return (
        <ScrollView className={styles.container}>
            {data.length > 0 ? (
                data.map((item, i) => (
                    <>
                        <Item
                            disableActions={state.isEditing && state.key !== item.id}
                            extra={item.extra}
                            id={item.id}
                            label={item.label}
                            onChange={onChange}
                            onDelete={onDelete}
                            onEdit={handleEdit}
                            onUpdate={onUpdate}
                            validate={onValidateItem}
                        />
                        {data.length - 1 > i && <Divider className={styles.divider} />}
                    </>
                ))
            ) : (
                <div className={styles.emptyContainer}>
                    {dictionary?.emptyData ? (
                        dictionary?.emptyData
                    ) : (
                        <span className={styles.emptyText}>No Data Available</span>
                    )}
                </div>
            )}
        </ScrollView>
    );
};

export default EditList;
