import React, { useEffect, useState } from 'react';
import { AiOutlineDown, AiOutlineEye, AiOutlineEyeInvisible, AiOutlinePlus } from 'react-icons/ai';
import { Button, Dropdown, Menu } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { v4 } from 'uuid';

import StackLayout from 'components/layouts/StackLayout';
import { ISqonGroupFilter } from 'types/interface/filters';

import AndOperator from './icons/AndOperator';
import OrOperator from './icons/OrOperator';
import QueryBar from './QueryBar';
import { IDictionary, TCallbackRemoveAction, TOnChange } from './types';

import styles from './QueryBuilder.module.scss';

interface IQueryBuilderProps {
    className?: string;
    dictionary?: IDictionary;
    total: number | React.ReactNode;
    currentQuery: ISqonGroupFilter;
    onRemoveFacet: TCallbackRemoveAction;
    onChangeQuery: TOnChange;
    loading?: boolean;
    enableCombine?: boolean;
}

interface IQueriesState {
    query: ISqonGroupFilter | Record<string, never>;
    total: number | React.ReactNode;
    id: string;
    name?: string;
}

const QueryBuilder: React.FC<IQueryBuilderProps> = ({
    className = '',
    dictionary = {},
    total,
    currentQuery,
    onRemoveFacet,
    onChangeQuery,
    loading = false,
    enableCombine = false,
}) => {
    const [activeQuery, setActiveQuery] = useState(v4());
    const [showLabels, setShowLabels] = useState(false);
    const [queries, setQueries] = useState<IQueriesState[]>([]);
    const [combination, setCombination] = useState<string[]>([]);

    const noData = queries.length === 1 && isEmpty(currentQuery);
    const hasEmptyQuery = queries.filter((obj) => isEmpty(obj.query)).length >= 1;
    const canCombine = queries.filter((obj) => !isEmpty(obj.query)).length >= 2 && combination.length >= 2;

    useEffect(() => {
        if ((isEmpty(currentQuery) && total === 0) || loading) return;
        if (queries.length === 0) {
            setQueries([{ id: activeQuery, name: '#1', query: currentQuery, total }]);
        } else {
            setQueries(
                queries.map((obj, i) => {
                    if (obj.id === activeQuery) {
                        return { ...obj, name: `#${i + 1}`, query: currentQuery, total };
                    }

                    return { ...obj, name: `#${i + 1}` };
                })
            );
        }
    }, [currentQuery, total, loading]);
    return (
        <StackLayout className={`${styles.container} ${className}`} vertical>
            <StackLayout className={styles.queryBars} vertical>
                {!noData ? (
                    queries.map((obj, i) => (
                        <QueryBar
                            active={obj.id === activeQuery}
                            canDelete={!noData}
                            dictionary={dictionary}
                            id={obj.id}
                            key={obj.id}
                            number={i + 1}
                            onChangeQuery={(id, query) => {
                                setActiveQuery(id);
                                onChangeQuery(id, query);
                            }}
                            onCombineChange={(id, combinator) => {
                                const updatedQueries = [...queries];
                                const currentQueryIndex = queries.findIndex((obj) => obj.id === id);
                                const currentQuery = updatedQueries[currentQueryIndex];
                                const newQuery = { content: currentQuery.query.content, op: combinator };
                                updatedQueries[currentQueryIndex] = { ...currentQuery, query: newQuery };
                                setQueries(updatedQueries);
                                onChangeQuery(id, newQuery);
                            }}
                            onDeleteQuery={(id) => {
                                if (queries.length === 1) {
                                    setQueries([{ id, query: {}, total: 0 }]);
                                    onChangeQuery('', {});
                                    return;
                                }

                                const currentQueryIndex = queries.findIndex((obj) => obj.id === id);
                                const nextSelectedIndex =
                                    currentQueryIndex + 1 > queries.length - 1
                                        ? currentQueryIndex - 1 < queries.length
                                            ? currentQueryIndex - 1
                                            : queries.length - 1
                                        : currentQueryIndex + 1;
                                const nextQuery = queries[nextSelectedIndex];
                                const nextID = nextQuery.id;
                                if (combination.includes(id)) {
                                    setCombination(combination.filter((cId) => cId !== id));
                                }
                                setQueries(queries.filter((obj) => obj.id !== id));
                                setActiveQuery(nextID);
                                onChangeQuery(nextID, nextQuery.query);
                            }}
                            onDuplicate={(id, query) => {
                                const newId = v4();
                                const oldQuery = queries.filter((obj) => obj.id === id)[0];

                                setActiveQuery(newId);
                                setQueries([...queries, { id: newId, query, total: oldQuery.total }]);
                                onChangeQuery(newId, query);
                            }}
                            onRemoveFacet={onRemoveFacet}
                            onSelectBar={(id, toRemove) => {
                                if (toRemove) {
                                    setCombination(combination.filter((cId) => cId !== id));
                                    return;
                                }

                                setCombination([...combination, id]);
                            }}
                            query={obj.query}
                            selected={combination.includes(obj.id)}
                            selectionDisabled={queries.length === 1 || !enableCombine}
                            showLabels={showLabels}
                            total={obj.total}
                        />
                    ))
                ) : (
                    <QueryBar
                        actionDisabled={true}
                        dictionary={dictionary}
                        id={activeQuery}
                        onRemoveFacet={onRemoveFacet}
                        query={{}}
                        selectionDisabled={true}
                        total={total}
                    />
                )}
            </StackLayout>
            <StackLayout className={styles.actions}>
                <Button
                    className={styles.buttons}
                    disabled={noData || hasEmptyQuery}
                    onClick={() => {
                        const id = v4();

                        setActiveQuery(id);
                        setQueries([...queries, { id, query: {}, total: 0 }]);
                        onChangeQuery(id, {});
                    }}
                >
                    <AiOutlinePlus />
                    {dictionary.actions?.addQuery || 'New query'}
                </Button>
                {enableCombine && (
                    <Dropdown
                        disabled={!canCombine}
                        overlay={
                            <Menu>
                                <Menu.Item>
                                    <AndOperator />
                                </Menu.Item>
                                <Menu.Item>
                                    <OrOperator />
                                </Menu.Item>
                            </Menu>
                        }
                        trigger={['click']}
                    >
                        <Button className={styles.buttons}>
                            {dictionary.actions?.combine || 'Combine'} <AiOutlineDown />
                        </Button>
                    </Dropdown>
                )}
                <Button className={styles.buttons} disabled={noData} onClick={() => setShowLabels(!showLabels)}>
                    {showLabels ? (
                        <>
                            <AiOutlineEyeInvisible />
                            {dictionary.actions?.hideLabels || 'Hide labels'}
                        </>
                    ) : (
                        <>
                            <AiOutlineEye />
                            {dictionary.actions?.showLabels || 'Show labels'}
                        </>
                    )}
                </Button>
                {!noData && (
                    <Button
                        className={styles.buttons}
                        onClick={() => {
                            setCombination([]);
                            setQueries([{ id: activeQuery, query: {}, total: 0 }]);
                            onChangeQuery(activeQuery, {});
                        }}
                        type="link"
                    >
                        {dictionary.actions?.clear || 'Clear all'}
                    </Button>
                )}
            </StackLayout>
        </StackLayout>
    );
};

export default QueryBuilder;
