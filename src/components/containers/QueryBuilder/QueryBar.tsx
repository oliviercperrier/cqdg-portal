import React, { useEffect, useState } from 'react';
import { AiOutlineCopy, AiOutlineDelete } from 'react-icons/ai';
import { Button, Checkbox } from 'antd';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';

import StackLayout from 'components/layouts/StackLayout';
import { ISqonGroupFilter, TSqonGroupOp } from 'types/interface/filters';

import Combiner from './Combiner';
import QueryPill from './QueryPill';
import { IDictionary, TCallbackRemoveAction, TOnChange } from './types';

import styles from './QueryBar.module.scss';

interface IQueryBarProps {
    id: string;
    total: number | React.ReactNode;
    number?: number;
    dictionary?: IDictionary;
    query: ISqonGroupFilter | Record<string, never>;
    actionDisabled?: boolean;
    selectionDisabled?: boolean;
    canDelete?: boolean;
    showLabels?: boolean;
    onRemoveFacet: TCallbackRemoveAction;
    active?: boolean;
    selected?: boolean;
    onChangeQuery?: TOnChange;
    onDeleteQuery?: TOnChange;
    onDuplicate?: TOnChange;
    onSelectBar?: (id: string, toRemove: boolean) => void;
    onCombineChange?: (id: string, combinator: TSqonGroupOp) => void;
}
const QueryBar: React.FC<IQueryBarProps> = ({
    id,
    number,
    total,
    dictionary = {},
    query,
    onRemoveFacet,
    actionDisabled = false,
    selectionDisabled = false,
    canDelete = true,
    showLabels = true,
    active = true,
    selected = false,
    onChangeQuery = (f) => f,
    onDeleteQuery = (f) => f,
    onDuplicate = (f) => f,
    onCombineChange = (f) => f,
    onSelectBar = (f) => f,
}) => {
    const [checked, setChecked] = useState(selected);
    useEffect(() => {
        setChecked(selected);
    }, [selected]);
    const containerClassNames = cx(styles.container, { [styles.selected]: active });

    return (
        <StackLayout
            className={containerClassNames}
            onClick={() => {
                if (!active) onChangeQuery(id, query);
            }}
        >
            {!selectionDisabled && (
                <StackLayout className={styles.selectionWrapper}>
                    <Checkbox
                        checked={checked}
                        className={styles.label}
                        onClick={() => {
                            setChecked(!checked);
                            onSelectBar(id, checked);
                        }}
                    >
                        {String(number).padStart(2, '0')}
                    </Checkbox>
                </StackLayout>
            )}
            <StackLayout className={styles.queryContent}>
                <div className={styles.identifier} />
                {isEmpty(query) ? (
                    <StackLayout>{dictionary.query?.noQuery || 'Use the filters to build a query'}</StackLayout>
                ) : (
                    <StackLayout className={styles.queryValues}>
                        {query.content.map((f, i) => (
                            <StackLayout key={f.content.field}>
                                <QueryPill
                                    currentSelectedQuery={active}
                                    dictionary={dictionary}
                                    onRemove={onRemoveFacet}
                                    query={f}
                                    showLabels={showLabels}
                                />
                                {query.content.length - 1 > i && (
                                    <Combiner onChange={(type) => onCombineChange(id, type)} type={query.op} />
                                )}
                            </StackLayout>
                        ))}
                    </StackLayout>
                )}
                <span className={styles.total}>{total}</span>
            </StackLayout>
            {!actionDisabled && (
                <StackLayout className={styles.actions}>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDuplicate(id, query);
                        }}
                        type="text"
                    >
                        <AiOutlineCopy />
                    </Button>

                    <Button
                        disabled={!canDelete}
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteQuery(id, query);
                        }}
                        type="text"
                    >
                        <AiOutlineDelete />
                    </Button>
                </StackLayout>
            )}
        </StackLayout>
    );
};

export default QueryBar;
