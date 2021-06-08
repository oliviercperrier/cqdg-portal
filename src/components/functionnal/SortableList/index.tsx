import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { List } from 'antd';
import cx from 'classnames';

import DragIcon from 'components/interface/Icon/Drag';

import styles from './SortableList.module.scss';

export type TSortableItem = {
    id: string;
    title: React.ReactNode;
    hidden: boolean;
    movable: boolean;
    initialOrder: number;
    translate: string;
};

type TRenderItem = (item: TSortableItem) => React.ReactNode;
type TOnChange = (items: Array<TSortableItem>) => void;

interface ISortableListProps {
    renderItem?: TRenderItem;
    data: Array<TSortableItem>;
    onChange?: TOnChange;
}

const reorder = (list: Array<TSortableItem>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
const SortableList = ({ data, onChange, renderItem }: ISortableListProps): React.ReactElement => {
    const [items, setItems] = useState(data);
    useEffect(() => setItems(data), data);
    const onDragEnd = (result: any) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const newItems = reorder(items, result.source.index, result.destination.index);

        setItems(newItems);
        if (onChange) {
            onChange(newItems);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div {...provided.droppableProps} className={styles.sortable} ref={provided.innerRef}>
                        <List
                            dataSource={items}
                            renderItem={(item, index) => (
                                <Draggable draggableId={item.id} index={index} key={item.id}>
                                    {(provided, snapshot) => (
                                        <div
                                            className={cx(styles['sortable-item'], {
                                                [styles.dragged]: snapshot.isDragging,
                                            })}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                        >
                                            <div {...provided.dragHandleProps}>
                                                <DragIcon className={styles.icon} />
                                            </div>
                                            {renderItem ? renderItem(item) : <span>{item.title}</span>}
                                        </div>
                                    )}
                                </Draggable>
                            )}
                            rowKey={(item) => item.id}
                        />
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default SortableList;
