import React, { useState } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { MdInsertDriveFile, MdPeople } from 'react-icons/md';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { useApolloClient } from '@apollo/client';
import { Button, Modal, notification } from 'antd';
import isEmpty from 'lodash/isEmpty';

import EditList from 'components/functionnal/EditList';
import FileDonorTabs from 'components/functionnal/Tabs/FileDonor';
import { t } from 'locales/translate';
import { DELETE_SAVE_SET, GET_ALL_SAVE_SETS, UPDATE_SAVE_SET } from 'store/queries/files/saveSets';
import { useLazyResultQuery } from 'utils/graphql/query';

import { ISaveSet } from './type';

import styles from './ManageSets.module.scss';
interface IManageSets {
    type?: 'files' | 'donors';
    dictionary?: {
        button?: React.ReactNode;
        title?: React.ReactNode;
        actions?: {
            cancel: React.ReactNode;
            confirm: React.ReactNode;
        };
    };
}

interface IEmptyData {
    type: React.ReactNode;
}
const EmptyData: React.FC<IEmptyData> = ({ type }) => (
    <>
        <h3 className={styles.emptyText}>{t('global.savesets.empty.title', { type })}</h3>
        <span className={styles.emptyText}>{t('global.savesets.empty.description', { type })}</span>
    </>
);

const ManageSets: React.FC<IManageSets> = ({ dictionary, type = 'files' }) => {
    const clientApollo = useApolloClient();
    const intl = useIntl();

    const history = useHistory();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { result } = useLazyResultQuery<any>(GET_ALL_SAVE_SETS);
    const saveSetsFileName = result.saveSetsFile.map((item: ISaveSet) => item.content.name);
    const saveSetsDonorName = result.saveSetsDonor.map((item: ISaveSet) => item.content.name);
    const handleDelete = async (id: string, type: string) => {
        try {
            await clientApollo.mutate({
                mutation: DELETE_SAVE_SET,
                refetchQueries: [{ query: GET_ALL_SAVE_SETS }],
                variables: {
                    id,
                    type,
                },
            });
            notification.success({
                description: intl.formatMessage({ id: 'global.savesets.delete.success.description' }),
                message: intl.formatMessage({ id: 'global.savesets.delete.success.title' }),
            });
        } catch (e) {
            notification.error({
                description: intl.formatMessage({ id: 'global.savesets.delete.error.description' }),
                message: intl.formatMessage({ id: 'global.savesets.delete.error.title' }),
            });
        }
    };
    const handleUpdate = async (id: string, label: string, result: any, type: string) => {
        if (!isEmpty(result.find((item: ISaveSet) => item.content.name === label))) {
            return;
        }
        const dataFound = result.find((item: ISaveSet) => item.id === id);
        try {
            await clientApollo.mutate({
                mutation: UPDATE_SAVE_SET,
                refetchQueries: [{ query: GET_ALL_SAVE_SETS }],
                variables: {
                    content: {
                        ...dataFound.content,
                        name: label,
                    },
                    id,
                    type,
                },
            });
            notification.success({
                message: intl.formatMessage({ id: 'global.savesets.update.success.title' }),
            });
        } catch (e) {
            notification.error({
                description: intl.formatMessage({ id: 'global.savesets.update.error.description' }),
                message: intl.formatMessage({ id: 'global.savesets.update.error.title' }),
            });
        }
    };
    return (
        <>
            <Button
                className={styles.manageSaveSet}
                icon={<AiOutlineSetting className={styles.icon} />}
                onClick={() => setIsModalOpen(true)}
            >
                {dictionary?.button || 'Manage your sets'}
            </Button>
            <Modal
                cancelButtonProps={{ style: { display: 'none' } }}
                destroyOnClose
                okText={dictionary?.actions?.confirm || 'Close'}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => setIsModalOpen(false)}
                title={dictionary?.title || 'Manage your sets'}
                visible={isModalOpen}
            >
                <FileDonorTabs
                    defaultActiveKey={type}
                    donors={
                        <EditList
                            data={
                                result?.saveSetsDonor.map((item: ISaveSet) => ({
                                    extra: (
                                        <>
                                            <MdPeople size={14} />{' '}
                                            <span className={styles.listItemCount}>{item.content.ids.length}</span>
                                        </>
                                    ),
                                    id: item.id,
                                    label: item.content.name,
                                })) || []
                            }
                            dictionary={{ emptyData: <EmptyData type={t('global.donors')} /> }}
                            onDelete={(id) => handleDelete(id, 'Donor')}
                            onUpdate={(id, label) => handleUpdate(id, label, result.saveSetsDonor, 'Donor')}
                            onValidateItem={(value) => !saveSetsDonorName.includes(value)}
                        />
                    }
                    files={
                        <EditList
                            data={
                                result?.saveSetsFile.map((item: ISaveSet) => ({
                                    extra: (
                                        <>
                                            <MdInsertDriveFile size={14} />{' '}
                                            <span className={styles.listItemCount}>{item.content.ids.length}</span>
                                        </>
                                    ),
                                    id: item.id,
                                    label: item.content.name,
                                })) || []
                            }
                            dictionary={{ emptyData: <EmptyData type={t('global.files')} /> }}
                            onDelete={(id) => handleDelete(id, 'File')}
                            onUpdate={(id, label) => handleUpdate(id, label, result.saveSetsFile, 'File')}
                            onValidateItem={(value) => !saveSetsFileName.includes(value)}
                        />
                    }
                    history={history}
                />
            </Modal>
        </>
    );
};

export default ManageSets;
