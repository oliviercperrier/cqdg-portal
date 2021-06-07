import React from 'react';
import { AiOutlineDownload } from 'react-icons/ai';
import { RouteComponentProps } from 'react-router-dom';
import MultiLabel from '@ferlab/ui/core/components/labels/MultiLabel';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Card, List, PageHeader, Progress, Spin } from 'antd';

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
import { addFilter } from 'utils/filters/manipulator';
import { useFilters } from 'utils/filters/useFilters';
import { EFileInputType, formatFileSize } from 'utils/formatFileSize';
import { useLazyResultQuery } from 'utils/graphql/query';

import styles from './Donor.module.scss';

const getRandom = (value: number) => Math.floor(Math.random() * value) + 1;

const Study: React.FC<RouteComponentProps<any>> = ({ match: { params } }) => {
    const { id } = params;
    const filters = addFilter(null, 'submitter_donor_id', [id]);
    const { mappedFilters } = useFilters(filters);
    const { result } = useLazyResultQuery<any>(DONOR_PAGE_DATA, {
        variables: mappedFilters,
    });
    if (!result) {
        return <Spin />;
    }

    const donorData = result.Donor.hits.edges[0].node;
    const fileSizeSummary = result.File.aggregations.file_size.stats.sum;
    const fileSizes = formatFileSize(fileSizeSummary, { output: 'object' }, EFileInputType.MB) as Record<string, any>;

    return (
        <div className={styles.container}>
            <PageHeader
                backIcon={<DonorIcon className={styles.backIcon} />}
                extra={[
                    <DownloadClinicalButton filters={filters}>
                        <AiOutlineDownload size={16} />
                        {t('global.tables.actions.clinical.data')}
                    </DownloadClinicalButton>,
                ]}
                onBack={() => null}
                title={donorData.submitter_donor_id}
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
                        <ListItem label={t(`facet.submitter_donor_id`)}>{donorData.submitter_donor_id}</ListItem>
                        <ListItem label={t(`facet.study_id_keyword`)}>
                            <InternalLink
                                params={{ id: donorData.study.hits.edges[0].node.study_id_keyword }}
                                path={Routes.STUDY}
                            >
                                {donorData.study.hits.edges[0].node.study_id_keyword}
                            </InternalLink>
                        </ListItem>
                        <ListItem label={t(`facet.domain`)}>{donorData.study.hits.edges[0].node.domain}</ListItem>
                        <ListItem label={t(`facet.keywords`)}>Cancer</ListItem>
                        <ListItem label={t(`facet.files`)}>
                            <InternalLink filters={filters} path={Routes.FILES} query={{ searchTableTab: 'files' }}>
                                {donorData.files.hits.total}
                            </InternalLink>
                        </ListItem>
                        <ListItem label={t(`facet.creation_date`)}>27/04/2021</ListItem>
                    </DescriptionList>
                    <Card
                        bordered={false}
                        className={`${styles.clinical} ant-inner-card-small`}
                        title={t('entity.title.clinical')}
                    >
                        <List
                            dataSource={[
                                'Diagnosis',
                                'Phenotype',
                                'Exposure',
                                'Treatment',
                                'Follow-up (cancer)',
                                'Family Relationship',
                                'Family History',
                                'Biospecimens',
                            ]}
                            grid={{ gutter: 16 }}
                            renderItem={(item) => (
                                <List.Item>
                                    <Badge
                                        format={EFormat.ICON}
                                        size={ESize.SMALL}
                                        type={getRandom(2) === 1 ? EType.SUCCESS : EType.ERROR}
                                    >
                                        {item}
                                    </Badge>
                                </List.Item>
                            )}
                        />
                    </Card>
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

                <Card className={`${styles.category}`} title={t('entity.title.categories')}>
                    <TableContent
                        columns={[
                            { dataIndex: 'category', title: t('global.category') },
                            { className: 'numerical', dataIndex: 'files', title: t('global.files.title') },
                            {
                                render: (data) => {
                                    if (data.files === 0) {
                                        return '--';
                                    }
                                    return (
                                        <Progress
                                            className={styles['data-progress']}
                                            percent={(data.files / donorData.files.hits.total) * 100}
                                            showInfo={false}
                                            strokeLinecap="square"
                                        />
                                    );
                                },

                                title: `(n=${donorData.files.hits.total})`,
                                width: 85,
                            },
                        ]}
                        dataSource={[
                            {
                                category: 'Sequencing reads',
                                files: getRandom(donorData.files.hits.total),
                            },
                            { category: 'Transcriptome profiling', files: 0 },
                            {
                                category: 'Single nucleotide variation',
                                files: getRandom(donorData.files.hits.total),
                            },
                            { category: 'Copy number variation', files: 0 },
                            {
                                category: 'DNA methylation',
                                files: getRandom(donorData.files.hits.total),
                            },
                            {
                                category: 'Clinical supplements',
                                files: getRandom(donorData.files.hits.total),
                            },
                            {
                                category: 'Biospecimen supplements',
                                files: getRandom(donorData.files.hits.total),
                            },
                        ]}
                        pagination={false}
                    />
                </Card>
                <Card className={`${styles.experimental}`} title={t('entity.title.strategy')}>
                    <TableContent
                        columns={[
                            { dataIndex: 'strategy', title: t('global.strategy') },
                            { className: 'numerical', dataIndex: 'files', title: t('global.files.title') },
                            {
                                render: (data) => {
                                    if (data.files === 0) {
                                        return '--';
                                    }
                                    return (
                                        <Progress
                                            className={styles['data-progress']}
                                            percent={(data.files / donorData.files.hits.total) * 100}
                                            showInfo={false}
                                            strokeLinecap="square"
                                        />
                                    );
                                },

                                title: `(n=${donorData.files.hits.total})`,
                                width: 85,
                            },
                        ]}
                        dataSource={[
                            {
                                files: getRandom(donorData.files.hits.total),
                                strategy: 'WGS',
                            },
                            { files: 0, strategy: 'RNA-seq' },
                            {
                                files: getRandom(donorData.files.hits.total),
                                strategy: 'Genotype array',
                            },
                            { files: 0, strategy: 'miRNA-seq' },
                            {
                                files: getRandom(donorData.files.hits.total),
                                strategy: 'Methylation array',
                            },
                        ]}
                        pagination={false}
                    />
                </Card>
            </div>
        </div>
    );
};

export default Study;
