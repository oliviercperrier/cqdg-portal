import React, { useEffect, useState } from 'react';
import { AiFillDelete, AiFillEdit, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { Button, Input, Popconfirm } from 'antd';

import styles from './Item.module.scss';

interface IItem {
    id: string;
    label: string;
    extra?: React.ReactNode;
    dictionary?: {
        actions?: {
            delete?: {
                text: React.ReactNode;
                cancel: React.ReactNode;
                confirm: React.ReactNode;
            };
        };
    };
    onUpdate?: (id: string, label: string) => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    disableActions?: boolean;
}
const Item: React.FC<IItem> = ({
    dictionary,
    extra,
    label,
    onUpdate = (f) => f,
    disableActions = false,
    id,
    onEdit = (f) => f,
    onDelete = (f) => f,
}) => {
    const [isModifying, setIsModifying] = useState(false);
    const [currentLabel, setCurrentLabel] = useState(label);
    useEffect(() => {
        setCurrentLabel(label);
    }, [label]);

    const handleUpdate = () => {
        setIsModifying(false);
        onUpdate(id, currentLabel);
        onEdit(id);
    };

    const handleEdit = () => {
        setIsModifying(true);
        onEdit(id);
    };
    return (
        <div className={styles.container}>
            <div className={styles.label}>
                {isModifying ? (
                    <Input
                        autoFocus
                        onChange={(e) => setCurrentLabel(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                handleUpdate();
                            }
                        }}
                        value={currentLabel}
                    />
                ) : (
                    <>
                        <span className={styles.text}>{currentLabel}</span>
                        {extra && <span className={styles.extra}>{extra}</span>}
                    </>
                )}
            </div>
            <div className={styles.actions}>
                {isModifying ? (
                    <>
                        <Button className={styles.buttons} onClick={() => handleUpdate()} type="text">
                            <AiOutlineCheck size={16} />
                        </Button>
                        <Button
                            className={styles.buttons}
                            onClick={() => {
                                setIsModifying(false);
                                setCurrentLabel(label);
                                onEdit(id);
                            }}
                            type="text"
                        >
                            <AiOutlineClose size={16} />
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            className={styles.buttons}
                            disabled={disableActions}
                            onClick={() => handleEdit()}
                            type="text"
                        >
                            <AiFillEdit size={16} />
                        </Button>
                        <Popconfirm
                            arrowPointAtCenter
                            cancelText={dictionary?.actions?.delete?.cancel || 'No'}
                            disabled={disableActions}
                            okText={dictionary?.actions?.delete?.confirm || 'Yes'}
                            onConfirm={() => {
                                onDelete(id);
                            }}
                            placement="topRight"
                            title={dictionary?.actions?.delete || 'Are you sure you want to delete this set?'}
                        >
                            <Button className={styles.buttons} disabled={disableActions} type="text">
                                <AiFillDelete size={16} />
                            </Button>
                        </Popconfirm>
                    </>
                )}
            </div>
        </div>
    );
};

export default Item;
