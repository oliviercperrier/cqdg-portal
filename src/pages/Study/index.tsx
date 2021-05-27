import React, { useState } from 'react';
import { AiOutlineDownload } from 'react-icons/ai';
import { RouteComponentProps } from 'react-router-dom';
import CountWithIcon from '@ferlab/ui/core/components/labels/CountWithIcon';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Button, Card, Modal, PageHeader, Progress, Spin } from 'antd';

import DescriptionList, { ListItem } from 'components/functionnal/DescriptionList';
import DownloadClinicalButton from 'components/functionnal/DownloadClinicalButton';
import InternalLink from 'components/functionnal/InternalLink';
import { TableContent } from 'components/functionnal/TableContent';
import CloudStorageIcon from 'components/interface/Icon/CloudStorage';
import DonorIcon from 'components/interface/Icon/Donor';
import FileIcon from 'components/interface/Icon/File';
import StudyIcon from 'components/interface/Icon/Study';
import CardContainerNotched from 'components/layouts/Card/CardContainerNotched';
import { t } from 'locales/translate';
import { Routes } from 'routes';
import { STUDY_DATA_PAGE } from 'store/queries/study';
import { addFilter } from 'utils/filters/manipulator';
import { useFilters } from 'utils/filters/useFilters';
import { EFileInputType, formatFileSize } from 'utils/formatFileSize';
import { useLazyResultQuery } from 'utils/graphql/query';

import styles from './Study.module.scss';

const getRandom = (value: number) => Math.floor(Math.random() * value) + 1;

const Study: React.FC<RouteComponentProps<any>> = ({ match: { params } }) => {
    const [visibleModal, setVisibleModal] = useState({ accessModal: false, manifestModal: false });
    const { id } = params;
    const filters = addFilter(null, 'study_id_keyword', [id]);
    const { mappedFilters } = useFilters(filters);
    const { result } = useLazyResultQuery<any>(STUDY_DATA_PAGE, {
        variables: mappedFilters,
    });
    if (!result) {
        return <Spin />;
    }
    const studyData = result.Study.hits.edges[0].node;
    const fileSizeSummary = result.File.aggregations.file_size.stats.sum;
    const fileSizes = formatFileSize(fileSizeSummary, { output: 'object' }, EFileInputType.MB) as Record<string, any>;
    return (
        <div className={styles.container}>
            <PageHeader
                backIcon={<StudyIcon className={styles.backIcon} />}
                extra={[
                    <DownloadClinicalButton filters={filters}>
                        <AiOutlineDownload size={16} />
                        {t('global.tables.actions.clinical.data')}
                    </DownloadClinicalButton>,
                    <Button
                        className={styles.button}
                        disabled
                        onClick={() => setVisibleModal((prevState) => ({ ...prevState, manifestModal: true }))}
                    >
                        <AiOutlineDownload size={16} />
                        {t('entity.actions.manifest')}
                    </Button>,
                    <Button
                        onClick={() => setVisibleModal((prevState) => ({ ...prevState, accessModal: true }))}
                        type="primary"
                    >
                        {t('entity.actions.access')}
                    </Button>,
                ]}
                onBack={() => null}
                title={studyData.name}
            />
            <div className={styles.dataContent}>
                <CardContainerNotched className={styles.dataSummary} type="shadow">
                    <StackLayout className={styles.dataSummaryContent}>
                        <CountWithIcon
                            Icon={<DonorIcon />}
                            label={t('global.donors.title')}
                            total={studyData.donors.hits.total}
                        />
                        <CountWithIcon
                            Icon={<FileIcon />}
                            label={t('global.files.title')}
                            total={studyData.files.hits.total}
                        />
                        <CountWithIcon Icon={<CloudStorageIcon />} label={fileSizes.symbol} total={fileSizes.value} />
                    </StackLayout>
                </CardContainerNotched>
                <Card
                    className={`${styles.summary} ant-card-body-small`}
                    extra={
                        <InternalLink filters={filters} path={Routes.STUDIES}>
                            {t('entity.actions.link.summary')}
                        </InternalLink>
                    }
                    title={t('entity.title.summary')}
                >
                    <DescriptionList>
                        <ListItem label={t(`facet.study_id`)}>{studyData.study_id_keyword}</ListItem>
                        <ListItem label={t(`facet.study.name`)}>{studyData.name}</ListItem>
                        <ListItem label={t(`facet.abbreviation`)}>Abr.</ListItem>
                        <ListItem label={t(`facet.domain`)}>{studyData.domain}</ListItem>
                        <ListItem label={t(`facet.population`)}>{studyData.population}</ListItem>
                        <ListItem label={t(`facet.keywords`)}>Cancer</ListItem>
                        <ListItem label={t(`facet.donors`)}>
                            <InternalLink filters={filters} path={Routes.FILES} query={{ searchTableTab: 'donors' }}>
                                {studyData.donors.hits.total}
                            </InternalLink>
                        </ListItem>
                        <ListItem label={t(`facet.files`)}>
                            <InternalLink filters={filters} path={Routes.FILES} query={{ searchTableTab: 'files' }}>
                                {studyData.files.hits.total}
                            </InternalLink>
                        </ListItem>
                    </DescriptionList>
                </Card>
                <Card className={`${styles.access} ant-card-body-small`} title={t('entity.title.access')}>
                    <DescriptionList>
                        <ListItem label={t(`facet.access_limitations`)}>
                            Disease-specifc research (DUO 00000007)
                        </ListItem>
                        <ListItem label={t(`facet.access_requirements`)}>
                            Ethics approval required (DUO 00000021) Collaboration required (DUO 00000013)
                        </ListItem>
                        <ListItem label={t(`global.access_authority`)}>data-access@rhmds.ca</ListItem>
                    </DescriptionList>
                </Card>
                <Card className={`${styles.clinical}`} title={t('entity.title.clinical')}>
                    <TableContent
                        columns={[
                            { dataIndex: 'data', title: t('global.data') },
                            { className: 'numerical', dataIndex: 'donors', title: t('global.donors.title') },
                            {
                                render: (data) => {
                                    if (data.donors === 0) {
                                        return '--';
                                    }
                                    return (
                                        <Progress
                                            className={styles['data-progress']}
                                            percent={(data.donors / studyData.donors.hits.total) * 100}
                                            showInfo={false}
                                            strokeLinecap="square"
                                        />
                                    );
                                },
                                title: `(n=${studyData.donors.hits.total})`,
                                width: 85,
                            },
                        ]}
                        dataSource={[
                            {
                                data: 'Diagnostic',
                                donors: 377,
                            },
                            { data: 'Phenotype', donors: 0 },
                            {
                                data: 'Treatement',
                                donors: getRandom(studyData.donors.hits.total),
                            },
                        ]}
                        pagination={false}
                    />
                </Card>
                <Card className={`${styles.category}`} title={t('entity.title.categories')}>
                    <TableContent
                        columns={[
                            { dataIndex: 'category', title: t('global.category') },
                            { className: 'numerical', dataIndex: 'donors', title: t('global.donors.title') },
                            {
                                render: (data) => {
                                    if (data.donors === 0) {
                                        return '--';
                                    }
                                    return (
                                        <Progress
                                            className={styles['data-progress']}
                                            percent={(data.donors / studyData.donors.hits.total) * 100}
                                            showInfo={false}
                                            strokeLinecap="square"
                                        />
                                    );
                                },

                                title: `(n=${studyData.donors.hits.total})`,
                                width: 85,
                            },
                            { className: 'numerical', dataIndex: 'files', title: t('global.files.title') },
                            {
                                render: (data) => {
                                    if (data.files === 0) {
                                        return '--';
                                    }
                                    return (
                                        <Progress
                                            className={styles['data-progress']}
                                            percent={(data.files / studyData.files.hits.total) * 100}
                                            showInfo={false}
                                            strokeLinecap="square"
                                        />
                                    );
                                },

                                title: `(n=${studyData.files.hits.total})`,
                                width: 85,
                            },
                        ]}
                        dataSource={[
                            {
                                category: 'Sequencing reads',
                                donors: getRandom(studyData.donors.hits.total),
                                files: getRandom(studyData.files.hits.total),
                            },
                            { category: 'Transcriptome profiling', donors: 0, files: 0 },
                            {
                                category: 'Single nucleotide variation',
                                donors: getRandom(studyData.donors.hits.total),
                                files: getRandom(studyData.files.hits.total),
                            },
                            { category: 'Copy number variation', donors: 0, files: 0 },
                            {
                                category: 'DNA methylation',
                                donors: getRandom(studyData.donors.hits.total),
                                files: getRandom(studyData.files.hits.total),
                            },
                            {
                                category: 'Clinical supplements',
                                donors: getRandom(studyData.donors.hits.total),
                                files: getRandom(studyData.files.hits.total),
                            },
                            {
                                category: 'Biospecimen supplements',
                                donors: getRandom(studyData.donors.hits.total),
                                files: getRandom(studyData.files.hits.total),
                            },
                        ]}
                        pagination={false}
                    />
                </Card>
                <Card className={`${styles.experimental}`} title={t('entity.title.strategy')}>
                    <TableContent
                        columns={[
                            { dataIndex: 'strategy', title: t('global.strategy') },
                            { className: 'numerical', dataIndex: 'donors', title: t('global.donors.title') },
                            {
                                render: (data) => {
                                    if (data.donors === 0) {
                                        return '--';
                                    }
                                    return (
                                        <Progress
                                            className={styles['data-progress']}
                                            percent={(data.donors / studyData.donors.hits.total) * 100}
                                            showInfo={false}
                                            strokeLinecap="square"
                                        />
                                    );
                                },

                                title: `(n=${studyData.donors.hits.total})`,
                                width: 85,
                            },
                            { className: 'numerical', dataIndex: 'files', title: t('global.files.title') },
                            {
                                render: (data) => {
                                    if (data.files === 0) {
                                        return '--';
                                    }
                                    return (
                                        <Progress
                                            className={styles['data-progress']}
                                            percent={(data.files / studyData.files.hits.total) * 100}
                                            showInfo={false}
                                            strokeLinecap="square"
                                        />
                                    );
                                },

                                title: `(n=${studyData.files.hits.total})`,
                                width: 85,
                            },
                        ]}
                        dataSource={[
                            {
                                donors: getRandom(studyData.donors.hits.total),
                                files: getRandom(studyData.files.hits.total),
                                strategy: 'WGS',
                            },
                            { donors: 0, files: 0, strategy: 'RNA-seq' },
                            {
                                donors: getRandom(studyData.donors.hits.total),
                                files: getRandom(studyData.files.hits.total),
                                strategy: 'Genotype array',
                            },
                            { donors: 0, files: 0, strategy: 'miRNA-seq' },
                            {
                                donors: getRandom(studyData.donors.hits.total),
                                files: getRandom(studyData.files.hits.total),
                                strategy: 'Methylation array',
                            },
                        ]}
                        pagination={false}
                    />
                </Card>
                <Modal
                    okText={t('entity.modal.actions.download')}
                    onCancel={() => setVisibleModal((prevState) => ({ ...prevState, accessModal: false }))}
                    onOk={() => setVisibleModal((prevState) => ({ ...prevState, accessModal: false }))}
                    title={t('entity.modal.access.title')}
                    visible={visibleModal.accessModal}
                >
                    <span>{t('entity.modal.access.desc')}</span>
                </Modal>
                <Modal
                    okText={t('entity.modal.actions.download')}
                    onCancel={() => setVisibleModal((prevState) => ({ ...prevState, manifestModal: false }))}
                    onOk={() => setVisibleModal((prevState) => ({ ...prevState, manifestModal: false }))}
                    title={t('entity.modal.manifest.title')}
                    visible={visibleModal.manifestModal}
                >
                    <span>{t('entity.modal.manifest.desc')}</span>
                </Modal>
            </div>
        </div>
    );
};

export default Study;
