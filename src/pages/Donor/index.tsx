import React from 'react';
import { AiOutlineDownload } from 'react-icons/ai';
import { RouteComponentProps } from 'react-router-dom';
import MultiLabel from '@ferlab/ui/core/components/labels/MultiLabel';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Card, List, PageHeader, Spin } from 'antd';
import get from 'lodash/get';

import Badge, { EFormat, ESize, EType } from 'components/functionnal/Badge';
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
import { DONOR_PAGE_DATA } from 'store/queries/donor';
import { getDataWithKey } from 'utils/data/manipulation';
import { addFilter } from 'utils/filters/manipulator';
import { useFilters } from 'utils/filters/useFilters';
import { EFileInputType, formatFileSize } from 'utils/formatFileSize';
import { Hits, useLazyResultQuery } from 'utils/graphql/query';

import { dataCategoriesModel, experimentalStrategiesModel } from './Donor.model';

import styles from './Donor.module.scss';

const Study: React.FC<RouteComponentProps<any>> = ({ match: { params } }) => {
    const { id } = params;
    const filters = addFilter(null, 'internal_donor_id', [id]);
    const { mappedFilters } = useFilters('study-repo', filters);
    const { result } = useLazyResultQuery<any>(DONOR_PAGE_DATA, {
        variables: mappedFilters,
    });
    if (!result) {
        return <Spin />;
    }

    const donorData = result.Donor.hits.edges[0].node;
    const studyData = donorData.study.hits.edges[0].node;
    const fileSizeSummary = result.Donor.aggregations.files__file_size.stats.sum;
    const fileSizes = formatFileSize(fileSizeSummary, { output: 'object' }, EFileInputType.MB) as Record<string, any>;
    return (
        <div className={styles.container}>
            <PageHeader
                backIcon={<DonorIcon className={styles.backIcon} />}
                extra={[
                    <DownloadClinicalButton filters={filters} key="downloadClinicalData">
                        <AiOutlineDownload size={16} />
                        {t('global.tables.actions.clinical.data')}
                    </DownloadClinicalButton>,
                ]}
                onBack={() => null}
                title={donorData.internal_donor_id}
            />
            <div className={styles.dataContent}>
                <CardContainerNotched className={styles.dataSummary} type="shadow">
                    <StackLayout className={styles.dataSummaryContent}>
                        <MultiLabel
                            Icon={<StudyIcon />}
                            label={donorData.study.hits.total}
                            subLabel={t('global.studies.title')}
                        />
                        <MultiLabel
                            Icon={<FileIcon />}
                            label={donorData.files.hits.total}
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
                        <ListItem label={t(`facet.internal_donor_id`)}>{donorData.internal_donor_id}</ListItem>
                        <ListItem label={t(`facet.internal_study_id`)}>
                            <InternalLink params={{ id: studyData.internal_study_id }} path={Routes.STUDY}>
                                {studyData.internal_study_id}
                            </InternalLink>
                        </ListItem>
                        <ListItem label={t(`facet.domain`)}>{studyData.domain}</ListItem>
                        <ListItem label={t(`facet.keywords`)}>Cancer</ListItem>
                        <ListItem label={t(`facet.files`)}>
                            <InternalLink filters={filters} path={Routes.FILES} query={{ searchTableTab: 'files' }}>
                                {donorData.files.hits.total}
                            </InternalLink>
                        </ListItem>
                        <ListItem label={t(`facet.creation_date`)}>{donorData.study_version_creation_date}</ListItem>
                    </DescriptionList>
                    <Card
                        bordered={false}
                        className={`${styles.clinical} ant-inner-card-small`}
                        title={t('entity.title.clinical')}
                    >
                        <List
                            dataSource={get(donorData, `summary.clinical_data_available.${Hits.COLLECTION}`, [])}
                            grid={{ gutter: 16 }}
                            renderItem={(item: any) => (
                                <List.Item>
                                    <Badge
                                        className={styles.capitalize}
                                        format={EFormat.ICON}
                                        size={ESize.SMALL}
                                        type={item.node.available ? EType.SUCCESS : EType.ERROR}
                                    >
                                        {item.node.key.replace('_', ' ')}
                                    </Badge>
                                </List.Item>
                            )}
                        />
                    </Card>
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

                <Card className={`${styles.category}`} title={t('entity.title.categories')}>
                    <TableContent
                        columns={dataCategoriesModel(donorData)}
                        dataSource={getDataWithKey(donorData, `summary.data_category`, 'key')}
                        pagination={false}
                    />
                </Card>
                <Card className={`${styles.experimental}`} title={t('entity.title.strategy')}>
                    <TableContent
                        columns={experimentalStrategiesModel(donorData)}
                        dataSource={getDataWithKey(donorData, `summary.experimental_strategy`, 'key')}
                        pagination={false}
                    />
                </Card>
            </div>
        </div>
    );
};

export default Study;
