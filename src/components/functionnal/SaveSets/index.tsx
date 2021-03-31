import React, { useState } from 'react';
import { AiFillFolder, AiOutlineDown, AiOutlineInfoCircle, AiOutlinePlus } from 'react-icons/ai';
import { CgPlayListAdd, CgPlayListRemove } from 'react-icons/cg';
import { ApolloClient, useApolloClient } from '@apollo/client';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Button, Dropdown, Input, Menu, Modal, Select, Tooltip } from 'antd';
import cx from 'classnames';
import get from 'lodash/get';

import { t } from 'locales/translate';
import { GET_ALL_SAVE_SETS, GET_FILE_FILTER_IDS, SET_SAVE_SET, UPDATE_SAVE_SET } from 'store/queries/files/saveSets';
import { useFilters } from 'utils/filters/useFilters';
import { Hits, useLazyResultQuery } from 'utils/graphql/query';

import styles from './SaveSets.module.scss';

type SaveSets = {
    total: number;
    type: 'saveSetsFile' | 'saveSetsDonor';
    Icon: React.ReactNode;
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
// eslint-disable-next-line @typescript-eslint/ban-types
const getIds = async (clientApollo: ApolloClient<object>, type = 'File', filters: any): Promise<string[]> => {
    const { data } = await clientApollo.query({ query: GET_FILE_FILTER_IDS, variables: filters });
    const fileIds = get(data, `${type}.${Hits.COLLECTION}`, []);
    return fileIds.map((item: any) => item.node.id);
};

const SaveSets: React.FunctionComponent<SaveSets> = ({ Icon, total, type }) => {
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
    const clientApollo = useApolloClient();
    const { mappedFilters } = useFilters();
    // TODO manage cache and update only 1 entry instead
    const { refetch: refetchAllSaveSets, result } = useLazyResultQuery<any>(GET_ALL_SAVE_SETS);
    const saveSetOptions =
        result && result[type]
            ? result[type].map((item: any) => ({
                  label: (
                      <span className={styles.listItem}>
                          {item.content.name}
                          <span className={styles.listTotal}>
                              {Icon}
                              {item.content.ids.length}
                          </span>
                      </span>
                  ),
                  value: item.content.name,
              }))
            : [];
    const handleSaveNewSet = async () => {
        setLoading(true);
        const arrayIds = await getIds(clientApollo, 'File', mappedFilters);
        await clientApollo.mutate({
            mutation: SET_SAVE_SET,
            variables: {
                content: {
                    ids: arrayIds,
                    name: inputText,
                },
                type: 'save_sets_file',
            },
        });
        await refetchAllSaveSets();
        setLoading(false);
        setInputText('');
        setIsCreateModalVisible(false);
    };

    const handleUpdateDelete = async () => {
        setLoading(true);

        const saveSetName = updateDeleteModalContent.selectedSet;
        const actionType = updateDeleteModalContent.type;
        const currentFilterIds = await getIds(clientApollo, 'File', mappedFilters);
        const oldContent = result[type].filter((item: any) => item.content.name === saveSetName)[0];
        let newContent = [];
        if (actionType === EType.ADD) {
            newContent = [...new Set<string[]>([...currentFilterIds, ...oldContent.content.ids])];
        } else {
            newContent = oldContent.content.ids.filter((id: string) => !currentFilterIds.includes(id));
        }
        await clientApollo.mutate({
            mutation: UPDATE_SAVE_SET,
            variables: {
                content: {
                    ids: newContent,
                    name: saveSetName,
                },
                id: oldContent.id,
            },
        });
        await refetchAllSaveSets();
        setLoading(false);
        setUpdateDeleteModalContent({ ...updateDeleteModalContent, selectedSet: undefined, show: false });
    };

    const inputClassName = cx({ [styles.inputError]: hasInputError });
    return (
        <>
            <Dropdown
                overlay={
                    <Menu className={styles.menu}>
                        <Menu.Item>
                            <StackLayout className={styles.totalContainer}>
                                <div className={styles.text}>
                                    {total} {t('global.files')}
                                </div>
                                <Tooltip overlay={t('global.savesets.warning')}>
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
                            {t('global.savesets.create')}
                        </Menu.Item>
                        <Menu.Item
                            className={styles.actions}
                            disabled={saveSetOptions.length === 0}
                            onClick={() =>
                                setUpdateDeleteModalContent({
                                    ...updateDeleteModalContent,
                                    label: t('global.savesets.update.label', { type: t('global.files') }),
                                    okText: t('global.savesets.update.confirm'),
                                    show: true,
                                    title: t('global.savesets.update.title', { type: t('global.files') }),
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
                                    label: t('global.savesets.delete.label', { type: t('global.files') }),
                                    okText: t('global.savesets.delete.confirm'),
                                    show: true,
                                    title: t('global.savesets.delete.title', { type: t('global.files') }),
                                    type: EType.REMOVE,
                                })
                            }
                        >
                            <CgPlayListRemove className={styles.icons} size={16} />
                            {t('global.savesets.delete')}
                        </Menu.Item>
                    </Menu>
                }
                placement="bottomRight"
                trigger={['click']}
            >
                <div className={styles.buttonContainer}>
                    <Button className={styles.button} icon={<AiFillFolder size={16} />}>
                        <span className={styles.text}>{t('global.savesets.save')}</span>
                        <AiOutlineDown size={12} />
                    </Button>
                </div>
            </Dropdown>
            <Modal
                cancelButtonProps={{ disabled: loading }}
                destroyOnClose
                okButtonProps={{ disabled: hasInputError, loading }}
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
