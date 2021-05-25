import React, { useState } from 'react';
import { Divider } from 'antd';

import Item from './Item';

import styles from './EditList.module.scss';

interface IEditList {
    data: IItemData[];
    dictonary?: {
        emptyData?: React.ReactNode;
    };
    onUpdate: (id: string, label: string) => void;
    onDelete: (id: string) => void;
}

interface IItemData {
    id: string;
    label: string;
    extra?: React.ReactNode;
}

const EditList: React.FC<IEditList> = ({ data, onDelete, onUpdate, dictonary = {} }) => {
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
        <div className={styles.container}>
            {data.length > 0 ? (
                data.map((item, i) => (
                    <>
                        <Item
                            disableActions={state.isEditing && state.key !== item.id}
                            extra={item.extra}
                            id={item.id}
                            label={item.label}
                            onDelete={onDelete}
                            onEdit={handleEdit}
                            onUpdate={onUpdate}
                        />
                        {data.length - 1 > i && <Divider className={styles.divider} />}
                    </>
                ))
            ) : (
                <div className={styles.emptyContainer}>
                    {dictonary?.emptyData ? (
                        dictonary?.emptyData
                    ) : (
                        <span className={styles.emptyText}>No Data Available</span>
                    )}
                </div>
            )}
        </div>
    );
};

export default EditList;
