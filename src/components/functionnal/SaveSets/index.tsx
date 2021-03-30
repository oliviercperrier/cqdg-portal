import React, { useState } from 'react';
import { AiFillFolder, AiOutlineDown, AiOutlineInfoCircle, AiOutlinePlus } from 'react-icons/ai';
import { CgPlayListAdd, CgPlayListRemove } from 'react-icons/cg';
import { useApolloClient } from '@apollo/client';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Button, Dropdown, Input, Menu, Modal, Select, Tooltip } from 'antd';
import get from 'lodash/get';

import { t } from 'locales/translate';
import { GET_ALL_SAVE_SETS, GET_FILE_FILTER_IDS, SET_SAVE_SET } from 'store/queries/files/saveSets';
import { useFilters } from 'utils/filters/useFilters';
import { Hits, useLazyResultQuery } from 'utils/graphql/query';

import styles from './SaveSets.module.scss';

type SaveSets = {
    total: number;
    type: 'saveSetsFile' | 'saveSetsDonor';
    Icon: React.ReactNode;
};

interface IUpdateDeleteContentState {
    label: React.ReactNode;
    okText: React.ReactNode;
    show: boolean;
    title: React.ReactNode;
}
const SaveSets: React.FunctionComponent<SaveSets> = ({ Icon, total, type }) => {
    const [loading, setLoading] = useState(false);
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [inputText, setInputText] = useState('');

    const [updateDeleteModalContent, setUpdateDeleteModalContent] = useState<IUpdateDeleteContentState>({
        label: '',
        okText: '',
        show: false,
        title: '',
    });
    const clientApollo = useApolloClient();
    const { mappedFilters } = useFilters();
    const { result } = useLazyResultQuery<any>(GET_ALL_SAVE_SETS);
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
        const { data } = await clientApollo.query({ query: GET_FILE_FILTER_IDS, variables: mappedFilters });
        const fileIds = get(data, `File.${Hits.COLLECTION}`, []);
        const arrayIds = fileIds.map((item: any) => item.node.id);
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
        setLoading(false);
        setIsCreateModalVisible(false);
    };

    const handleUpdateDelete = async () => {
        setLoading(true);
    };
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
                            onClick={() =>
                                setUpdateDeleteModalContent({
                                    ...updateDeleteModalContent,
                                    label: t('global.savesets.update.label', { type: t('global.files') }),
                                    okText: t('global.savesets.update.confirm'),
                                    show: true,
                                    title: t('global.savesets.update.title', { type: t('global.files') }),
                                })
                            }
                        >
                            <CgPlayListAdd className={styles.icons} size={16} />
                            {t('global.savesets.update')}
                        </Menu.Item>
                        <Menu.Item className={styles.actions}>
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
                okButtonProps={{ loading }}
                okText={t('global.savesets.saveset')}
                onCancel={() => {
                    if (!loading) {
                        setIsCreateModalVisible(false);
                    }
                }}
                onOk={handleSaveNewSet}
                title={t('global.savesets.create.title')}
                visible={isCreateModalVisible}
            >
                <label>{t('global.savesets.create.label')}</label>
                <Input allowClear autoFocus onChange={(e) => setInputText(e.target.value)} value={inputText} />
            </Modal>
            <Modal
                cancelButtonProps={{ disabled: loading }}
                okButtonProps={{ loading }}
                okText={updateDeleteModalContent.okText}
                onCancel={() => {
                    if (!loading) {
                        setUpdateDeleteModalContent({ ...updateDeleteModalContent, show: false });
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
                    options={saveSetOptions}
                    placeholder={t('global.savesets.choose')}
                />
            </Modal>
        </>
    );
};
export default SaveSets;
