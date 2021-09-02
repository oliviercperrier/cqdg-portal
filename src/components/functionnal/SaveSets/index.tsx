/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from 'react';
import { AiFillSave, AiOutlineDown, AiOutlineInfoCircle, AiOutlinePlus } from 'react-icons/ai';
import { CgPlayListAdd, CgPlayListRemove } from 'react-icons/cg';
import { useIntl } from 'react-intl';
import { ApolloClient, DocumentNode, useApolloClient } from '@apollo/client';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Button, Dropdown, Input, Menu, Modal, notification, Select, Tooltip } from 'antd';
import cx from 'classnames';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { FILE_REPO_CACHE_KEY } from 'config/constants';

import ListItem from 'components/functionnal/SaveSets/ListItem';
import { t } from 'locales/translate';
import {
    GET_ALL_SAVE_SETS,
    GET_DONOR_FILTER_IDS,
    GET_FILE_FILTER_IDS,
    SET_SAVE_SET,
    UPDATE_SAVE_SET,
} from 'store/queries/files/saveSets';
import { noDuplicate } from 'utils/duplicate';
import { useFilters } from 'utils/filters/useFilters';
import { Hits, useLazyResultQuery } from 'utils/graphql/query';

import ManageSets from './ManageSets';

import styles from './SaveSets.module.scss';

type TType = 'saveSetsFile' | 'saveSetsDonor';

type SaveSets = {
    saveSetType?: 'files' | 'donors';
    selectedIds?: string[];
    total: number;
    type: TType;
    Icon: React.ReactNode;
    dictionary: {
        labelType: React.ReactNode;
    };
    qbuilderCacheKey?: string;
};

enum EType {
    ADD = 'add',
    REMOVE = 'remove',
}

interface IUpdateDeleteContentState {
    label: React.ReactNode;
    okText: React.ReactNode;
    show: boolean;
    title: React.ReactNode;
    selectedSet: string | undefined;
    type: EType;
}

type ITypeMapping = {
    [key in TType]: ITypeMappingData;
};

interface ITypeMappingData {
    idsQuery: DocumentNode;
    type: string;
    endpointType: string;
}

const typeMapping: ITypeMapping = {
    saveSetsDonor: {
        endpointType: 'save_sets_donor',
        idsQuery: GET_DONOR_FILTER_IDS,
        type: 'Donor',
    },
    saveSetsFile: {
        endpointType: 'save_sets_file',
        idsQuery: GET_FILE_FILTER_IDS,
        type: 'File',
    },
};
const getIds = async (
    clientApollo: ApolloClient<object>,
    mapping: ITypeMappingData,
    filters: any
): Promise<string[]> => {
    const { data } = await clientApollo.query({ query: mapping.idsQuery, variables: filters });
    const fileIds = get(data, `${mapping.type}.${Hits.COLLECTION}`, []);
    return fileIds.map((item: any) => item.node.id);
};

const MAX_ITEMS = 10000;

const SaveSets: React.FunctionComponent<SaveSets> = ({
    dictionary,
    Icon,
    selectedIds = [],
    total,
    type,
    saveSetType = 'files',
    qbuilderCacheKey = FILE_REPO_CACHE_KEY,
}) => {
    const intl = useIntl();

    const [loading, setLoading] = useState(false);
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [hasInputError, setHasInputError] = useState(false);
    const [inputText, setInputText] = useState('');

    const [updateDeleteModalContent, setUpdateDeleteModalContent] = useState<IUpdateDeleteContentState>({
        label: '',
        okText: '',
        selectedSet: undefined,
        show: false,
        title: '',
        type: EType.ADD,
    });
    const mappedType = typeMapping[type];
    const clientApollo = useApolloClient();
    const { mappedFilters } = useFilters(qbuilderCacheKey);
    // TODO manage cache and update only 1 entry instead
    const { result } = useLazyResultQuery<any>(GET_ALL_SAVE_SETS);
    const saveSetOptions =
        result && result[type]
            ? result[type].map((item: any) => ({
                  label: <ListItem Icon={Icon} label={item.content.name} total={item.content.ids.length} />,
                  value: item.content.name,
              }))
            : [];
    const handleSaveNewSet = async () => {
        setLoading(true);
        let arrayIds = selectedIds;
        if (isEmpty(arrayIds)) {
            arrayIds = await getIds(clientApollo, mappedType, mappedFilters);
        }
        try {
            await clientApollo.mutate({
                mutation: SET_SAVE_SET,
                refetchQueries: [{ query: GET_ALL_SAVE_SETS }],
                variables: {
                    content: {
                        ids: arrayIds,
                        name: inputText,
                    },
                    type: mappedType.endpointType,
                },
            });
            notification.success({
                description: intl.formatMessage({ id: 'global.savesets.create.success.description' }),
                message: intl.formatMessage({ id: 'global.savesets.create.success.title' }),
            });
        } catch (e) {
            notification.error({
                description: intl.formatMessage({ id: 'global.savesets.create.error.description' }),
                message: intl.formatMessage({ id: 'global.savesets.create.error.title' }),
            });
        }
        setLoading(false);
        setInputText('');
        setIsCreateModalVisible(false);
    };

    const handleUpdateDelete = async () => {
        setLoading(true);

        const saveSetName = updateDeleteModalContent.selectedSet;
        const actionType = updateDeleteModalContent.type;
        let currentFilterIds = selectedIds;
        if (isEmpty(currentFilterIds)) {
            currentFilterIds = await getIds(clientApollo, mappedType, mappedFilters);
        }

        const oldContent = result[type].filter((item: any) => item.content.name === saveSetName)[0];
        let newContent = [];
        if (actionType === EType.ADD) {
            newContent = noDuplicate(currentFilterIds, oldContent.content.ids);
        } else {
            newContent = oldContent.content.ids.filter((id: string) => !currentFilterIds!.includes(id));
        }
        try {
            await clientApollo.mutate({
                mutation: UPDATE_SAVE_SET,
                refetchQueries: [{ query: GET_ALL_SAVE_SETS }],
                variables: {
                    content: {
                        ids: newContent,
                        name: saveSetName,
                    },
                    id: oldContent.id,
                },
            });
            notification.success({
                description: intl.formatMessage({ id: 'global.savesets.update.success.description' }),
                message: intl.formatMessage({ id: 'global.savesets.update.success.title' }),
            });
        } catch (e) {
            notification.error({
                description: intl.formatMessage({ id: 'global.savesets.update.error.description' }),
                message: intl.formatMessage({ id: 'global.savesets.update.error.title' }),
            });
        }
        setLoading(false);
        setUpdateDeleteModalContent({ ...updateDeleteModalContent, selectedSet: undefined, show: false });
    };

    const inputClassName = cx({ [styles.inputError]: hasInputError });
    const totalItems = selectedIds.length > 0 ? selectedIds.length : total;
    const hasMaxItems = totalItems >= MAX_ITEMS;
    return (
        <>
            <Dropdown
                overlay={
                    <Menu className={styles.menu}>
                        <Menu.Item>
                            <StackLayout className={styles.totalContainer}>
                                <div className={cx(styles.text, { [styles.warningText]: hasMaxItems })}>
                                    {totalItems} {dictionary.labelType}
                                </div>
                                <Tooltip
                                    arrowPointAtCenter
                                    className={cx({ [styles.warningText]: hasMaxItems })}
                                    overlay={
                                        hasMaxItems
                                            ? t('global.savesets.warning.exceed', {
                                                  max: MAX_ITEMS.toLocaleString(),
                                              })
                                            : t('global.savesets.warning', { max: MAX_ITEMS.toLocaleString() })
                                    }
                                    overlayClassName={styles.tooltip}
                                    placement="topRight"
                                >
                                    <AiOutlineInfoCircle />
                                </Tooltip>
                            </StackLayout>
                        </Menu.Item>
                        <Menu.Divider className={styles.divider} />
                        <Menu.Item
                            className={styles.actions}
                            onClick={() => {
                                setIsCreateModalVisible(true);
                            }}
                        >
                            <AiOutlinePlus className={styles.icons} size={16} />
                            {t('global.savesets.create', { type: dictionary.labelType })}
                        </Menu.Item>
                        <Menu.Item
                            className={styles.actions}
                            disabled={saveSetOptions.length === 0}
                            onClick={() =>
                                setUpdateDeleteModalContent({
                                    ...updateDeleteModalContent,
                                    label: t('global.savesets.update.label', { type: dictionary.labelType }),
                                    okText: t('global.savesets.update.confirm'),
                                    show: true,
                                    title: t('global.savesets.update.title', { type: dictionary.labelType }),
                                    type: EType.ADD,
                                })
                            }
                        >
                            <CgPlayListAdd className={styles.icons} size={16} />
                            {t('global.savesets.update')}
                        </Menu.Item>
                        <Menu.Item
                            className={styles.actions}
                            disabled={saveSetOptions.length === 0}
                            onClick={() =>
                                setUpdateDeleteModalContent({
                                    ...updateDeleteModalContent,
                                    label: t('global.savesets.delete.label', { type: dictionary.labelType }),
                                    okText: t('global.savesets.delete.confirm'),
                                    show: true,
                                    title: t('global.savesets.delete.title', { type: dictionary.labelType }),
                                    type: EType.REMOVE,
                                })
                            }
                        >
                            <CgPlayListRemove className={styles.icons} size={16} />
                            {t('global.savesets.delete')}
                        </Menu.Item>
                        <Menu.Divider className={styles.divider} />
                        <Menu.Item disabled={saveSetOptions.length === 0}>
                            <ManageSets type={saveSetType} />
                        </Menu.Item>
                    </Menu>
                }
                placement="bottomRight"
                trigger={['click']}
            >
                <div className={styles.buttonContainer}>
                    <Button className={styles.button} icon={<AiFillSave size={16} />}>
                        <span className={styles.text}>{t('global.savesets.save')}</span>
                        <AiOutlineDown size={12} />
                    </Button>
                </div>
            </Dropdown>
            <Modal
                cancelButtonProps={{ disabled: loading }}
                cancelText={t('global.savesets.cancel')}
                destroyOnClose
                okButtonProps={{ disabled: hasInputError || isEmpty(inputText), loading }}
                okText={t('global.savesets.saveset')}
                onCancel={() => {
                    if (!loading) {
                        setIsCreateModalVisible(false);
                        setInputText('');
                    }
                }}
                onOk={handleSaveNewSet}
                title={t('global.savesets.create.title')}
                visible={isCreateModalVisible}
            >
                <label>{t('global.savesets.create.label')}</label>
                <Input
                    allowClear
                    autoFocus
                    className={inputClassName}
                    onChange={(e) => {
                        const { value } = e.target;
                        if (saveSetOptions.filter((item: any) => item.value === value).length > 0) {
                            setHasInputError(true);
                        } else {
                            setHasInputError(false);
                        }
                        setInputText(value);
                    }}
                    value={inputText}
                />
                {hasInputError && (
                    <label className={styles.labelError}>{t('global.savesets.create.label.error')}</label>
                )}
            </Modal>
            <Modal
                cancelButtonProps={{ disabled: loading }}
                cancelText={t('global.savesets.cancel')}
                okButtonProps={{ disabled: !updateDeleteModalContent.selectedSet, loading }}
                okText={updateDeleteModalContent.okText}
                onCancel={() => {
                    if (!loading) {
                        setUpdateDeleteModalContent({
                            ...updateDeleteModalContent,
                            selectedSet: undefined,
                            show: false,
                        });
                    }
                }}
                onOk={handleUpdateDelete}
                title={updateDeleteModalContent.title}
                visible={updateDeleteModalContent.show}
            >
                <label>{updateDeleteModalContent.label}</label>
                <Select
                    allowClear
                    className={styles.select}
                    onChange={(value: string) =>
                        setUpdateDeleteModalContent({ ...updateDeleteModalContent, selectedSet: value })
                    }
                    options={saveSetOptions}
                    placeholder={t('global.savesets.choose')}
                    value={updateDeleteModalContent.selectedSet}
                />
            </Modal>
        </>
    );
};
export default SaveSets;
