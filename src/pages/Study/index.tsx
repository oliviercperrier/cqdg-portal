import React, { useState } from 'react';
import { AiOutlineDownload } from 'react-icons/ai';
import { RouteComponentProps } from 'react-router-dom';
import MultiLabel from '@ferlab/ui/core/components/labels/MultiLabel';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Button, Card, Modal, PageHeader, Spin } from 'antd';

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
import { getManifestFilesByStudyID, getRequestAccessFilesByStudyID } from 'services/api';
import { STUDY_DATA_PAGE } from 'store/queries/study';
import { getDataWithKey } from 'utils/data/manipulation';
import { addFilter } from 'utils/filters/manipulator';
import { useFilters } from 'utils/filters/useFilters';
import { EFileInputType, formatFileSize } from 'utils/formatFileSize';
import { useLazyResultQuery } from 'utils/graphql/query';
import { STUDY_REPO_CACHE_KEY } from 'config/constants';

import { availableClinicalDataModel, dataCategoriesModel, experimentalStrategiesModel } from './Study.model';

import styles from './Study.module.scss';

const Study: React.FC<RouteComponentProps<any>> = ({ match: { params } }) => {
    const [visibleModal, setVisibleModal] = useState({ accessModal: false, manifestModal: false });
    const [isDownloading, setIsDownloading] = useState(false);
    const { id } = params;
    const filters = addFilter(null, 'internal_study_id', [id]);
    const { mappedFilters } = useFilters(STUDY_REPO_CACHE_KEY, filters);
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
                    // Download clinical api is file centric, only fileFilters should be provided
                    <DownloadClinicalButton filters={mappedFilters.fileFilters} key="downloadClinical">
                        <AiOutlineDownload size={16} />
                        {t('global.tables.actions.clinical.data')}
                    </DownloadClinicalButton>,
                    <Button
                        className={styles.button}
                        key="downloadManifest"
                        onClick={() => setVisibleModal((prevState) => ({ ...prevState, manifestModal: true }))}
                    >
                        <AiOutlineDownload size={16} />
                        {t('entity.actions.manifest')}
                    </Button>,
                    <Button
                        key="requestAccess"
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
                        <MultiLabel
                            Icon={<DonorIcon />}
                            label={studyData.donors.hits.total}
                            subLabel={t('global.donors.title')}
                        />
                        <MultiLabel
                            Icon={<FileIcon />}
                            label={studyData.files.hits.total}
                            subLabel={t('global.files.title')}
                        />
                        <MultiLabel Icon={<CloudStorageIcon />} label={fileSizes.value} subLabel={fileSizes.symbol} />
                    </StackLayout>
                </CardContainerNotched>
                <Card
                    className={`${styles.summary} ant-card-body-small`}
                    extra={
                        <InternalLink filters={filters} path={Routes.FILES} query={{ searchTableTab: 'summary' }}>
                            {t('entity.actions.link.summary')}
                        </InternalLink>
                    }
                    title={t('entity.title.summary')}
                >
                    <DescriptionList>
                        <ListItem label={t(`facet.study_id`)}>{studyData.internal_study_id}</ListItem>
                        <ListItem label={t(`facet.study.name`)}>{studyData.name}</ListItem>
                        <ListItem label={t(`facet.domain`)}>{studyData.domain}</ListItem>
                        <ListItem label={t(`facet.population`)}>{studyData.population}</ListItem>
                        <ListItem label={t(`facet.keywords`)}>{studyData.keyword.split(';').join(',')}</ListItem>
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
                        <ListItem label={t(`facet.access_limitations`)} labelClassName={styles.duoCode}>
                            {studyData.data_access_codes.access_limitations}
                        </ListItem>
                        <ListItem label={t(`facet.access_requirements`)} labelClassName={styles.duoCode}>
                            {studyData.data_access_codes.access_requirements.map((item: string) => (
                                <p key={item}>{item}</p>
                            ))}
                        </ListItem>
                        <ListItem label={t(`global.access_authority`)}>{studyData.access_authority}</ListItem>
                    </DescriptionList>
                </Card>
                <Card className={`${styles.clinical}`} title={t('entity.title.clinical')}>
                    <TableContent
                        columns={availableClinicalDataModel(studyData)}
                        dataSource={getDataWithKey(studyData, `summary.clinical_data_available`, 'key')}
                        pagination={false}
                    />
                </Card>
                <Card className={`${styles.category}`} title={t('entity.title.categories')}>
                    <TableContent
                        columns={dataCategoriesModel(studyData)}
                        dataSource={getDataWithKey(studyData, `summary.data_category`, 'key')}
                        pagination={false}
                    />
                </Card>
                <Card className={`${styles.experimental}`} title={t('entity.title.strategy')}>
                    <TableContent
                        columns={experimentalStrategiesModel(studyData)}
                        dataSource={getDataWithKey(studyData, `summary.experimental_strategy`, 'key')}
                        pagination={false}
                    />
                </Card>
                <Modal
                    okButtonProps={{ loading: isDownloading }}
                    okText={t('entity.modal.actions.download')}
                    onCancel={() => setVisibleModal((prevState) => ({ ...prevState, accessModal: false }))}
                    onOk={async () => {
                        setIsDownloading(true);
                        await getRequestAccessFilesByStudyID(id);
                        setIsDownloading(false);

                        setVisibleModal((prevState) => ({ ...prevState, accessModal: false }));
                    }}
                    title={t('entity.modal.access.title')}
                    visible={visibleModal.accessModal}
                >
                    <span>{t('entity.modal.access.desc')}</span>
                </Modal>
                <Modal
                    okButtonProps={{ loading: isDownloading }}
                    okText={t('entity.modal.actions.download')}
                    onCancel={() => setVisibleModal((prevState) => ({ ...prevState, manifestModal: false }))}
                    onOk={async () => {
                        setIsDownloading(true);
                        await getManifestFilesByStudyID(id);
                        setIsDownloading(false);

                        setVisibleModal((prevState) => ({ ...prevState, manifestModal: false }));
                    }}
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
