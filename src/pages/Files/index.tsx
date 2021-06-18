import React, { useState } from 'react';
import { AiFillPieChart } from 'react-icons/ai';
import { MdFileDownload, MdInsertDriveFile, MdPeople } from 'react-icons/md';
import { RouteComponentProps } from 'react-router-dom';
import MultiLabel from '@ferlab/ui/core/components/labels/MultiLabel';
import QueryBuilder from '@ferlab/ui/core/components/QueryBuilder';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Tabs } from 'antd';
import get from 'lodash/get';

import TableContainer from 'components/containers/Table';
import DownloadClinicalButton from 'components/functionnal/DownloadClinicalButton';
import SaveSets from 'components/functionnal/SaveSets';
import CloudStorageIcon from 'components/interface/Icon/CloudStorage';
import DonorIcon from 'components/interface/Icon/Donor';
import FileIcon from 'components/interface/Icon/File';
import StudyIcon from 'components/interface/Icon/Study';
import CardContainerNotched from 'components/layouts/Card/CardContainerNotched';
import QueryLayout from 'layouts/Query';
import { t } from 'locales/translate';
import SideBarContent from 'pages/Files/filters/SideBarContent';
import Summary from 'pages/Files/tabs/Summary';
import { getQueryBuilderCache, setQueryBuilderCache } from 'store/cache/queryBuilder';
import { FILE_PAGE_DATA } from 'store/queries/files/page';
import { getDataWithKey } from 'utils/data/manipulation';
import { getQueryBuilderDictionary } from 'utils/dictionnary';
import { updateQueryFilters } from 'utils/filters';
import { useFilters } from 'utils/filters/useFilters';
import { EFileInputType, formatFileSize } from 'utils/formatFileSize';
import { useLazyResultQuery } from 'utils/graphql/query';
import { readQueryParam, updateQueryParam } from 'utils/url/query';

import { presetDonorsModel } from './tabs/DonorsTable.models';
import { FilesModel } from './tabs/FilesTable.models';

import './Files.scss';

const { TabPane } = Tabs;
const tabKey = 'searchTableTab';

const FileRepo: React.FC<RouteComponentProps<any>> = ({ history }) => {
    const [pageOffsetData, setPageOffsetData] = useState({
        donorFirst: 25,
        donorOffset: 0,
        fileFirst: 25,
        fileOffset: 0,
    });
    const { filters, mappedFilters } = useFilters();
    const { loading, result } = useLazyResultQuery<any>(FILE_PAGE_DATA, {
        variables: { ...pageOffsetData, ...mappedFilters },
    });

    const onTabChange = (activeKey: string) => {
        updateQueryParam(history, tabKey, activeKey);
    };

    const filesTotal = get(result, 'File.hits.total', 0);
    const donorsTotal = get(result, 'Donor.hits.total', 0);
    const studyTotal = get(result, 'Study.hits.total', 0);
    const totalSizes = get(result, `File.aggregations.file_size.stats.sum`, 0);
    const fileSizes = formatFileSize(totalSizes, { output: 'object' }, EFileInputType.MB) as Record<string, any>;

    return (
        <QueryLayout className="file-repo" sidebar={<SideBarContent data={result} history={history} />}>
            <div className="file-repo__wrapper">
                <QueryBuilder
                    IconTotal={<MdInsertDriveFile size={18} />}
                    className="file-repo__query-builder"
                    currentQuery={filters}
                    dictionary={getQueryBuilderDictionary()}
                    initialState={getQueryBuilderCache('file-repo')}
                    onChangeQuery={(_, query) => {
                        updateQueryParam(history, 'filters', query);
                    }}
                    onRemoveFacet={(query) => updateQueryFilters(history, query.content.field, [])}
                    onUpdate={(state) => setQueryBuilderCache('file-repo', state)}
                    total={filesTotal}
                />
                <div className="file-repo__summary">
                    <CardContainerNotched type="shadow">
                        <StackLayout className="file-repo__summary__content">
                            <MultiLabel Icon={<StudyIcon />} label={studyTotal} subLabel={t('global.studies.title')} />
                            <MultiLabel Icon={<DonorIcon />} label={donorsTotal} subLabel={t('global.donors.title')} />
                            <MultiLabel Icon={<FileIcon />} label={filesTotal} subLabel={t('global.files.title')} />
                            <MultiLabel
                                Icon={<CloudStorageIcon />}
                                label={fileSizes.value}
                                subLabel={fileSizes.symbol}
                            />
                        </StackLayout>
                    </CardContainerNotched>
                </div>
                <div>
                    <Tabs
                        activeKey={readQueryParam(tabKey, {
                            defaultValue: 'summary',
                            whiteList: ['files', 'donors', 'summary'],
                        })}
                        className="tabs-container"
                        onChange={onTabChange}
                        type="card"
                    >
                        <TabPane
                            className="tabs-container__panes"
                            key="summary"
                            tab={
                                <div className="tabs-container__panes__tab">
                                    <AiFillPieChart className="icon" /> {t('repo.tabs.summary')}
                                </div>
                            }
                        >
                            <StackLayout fitContent flexContent vertical>
                                <Summary data={result} loading={loading} />
                            </StackLayout>
                        </TabPane>
                        <TabPane
                            className="tabs-container__panes"
                            key="files"
                            tab={
                                <div className="tabs-container__panes__tab">
                                    <MdInsertDriveFile className="icon" />
                                    {t('global.files.title')}
                                </div>
                            }
                        >
                            <TableContainer
                                data={getDataWithKey(result, 'File', 'internal_file_id')}
                                extraActions={(selectedRow) => (
                                    <SaveSets
                                        Icon={<MdInsertDriveFile />}
                                        dictionary={{ labelType: t('global.files') }}
                                        saveSetType="files"
                                        selectedIds={selectedRow}
                                        total={filesTotal}
                                        type="saveSetsFile"
                                    />
                                )}
                                loading={loading}
                                model={FilesModel}
                                setCurrentPage={(filters) =>
                                    setPageOffsetData((s) => ({
                                        ...s,
                                        fileFirst: filters.first,
                                        fileOffset: filters.offset,
                                    }))
                                }
                                tableKey="files-tabs-file"
                                total={filesTotal}
                            />
                        </TabPane>
                        <TabPane
                            className="tabs-container__panes"
                            key="donors"
                            tab={
                                <div className="tabs-container__panes__tab">
                                    <MdPeople className="icon" />
                                    {t('global.donors.title')}
                                </div>
                            }
                        >
                            <TableContainer
                                data={getDataWithKey(result, 'Donor', 'internal_donor_id')}
                                extraActions={(selectedRow) => (
                                    <>
                                        <DownloadClinicalButton className="clinical-download" filters={filters}>
                                            <MdFileDownload size={16} />
                                            {t('global.tables.actions.clinical.data')}
                                        </DownloadClinicalButton>
                                        <SaveSets
                                            Icon={<MdPeople />}
                                            dictionary={{ labelType: t('global.donors') }}
                                            saveSetType="donors"
                                            selectedIds={selectedRow}
                                            total={donorsTotal}
                                            type="saveSetsDonor"
                                        />
                                    </>
                                )}
                                loading={loading}
                                model={presetDonorsModel}
                                setCurrentPage={(filters) =>
                                    setPageOffsetData((s) => ({
                                        ...s,
                                        donorFirst: filters.first,
                                        donorOffset: filters.offset,
                                    }))
                                }
                                tableKey="files-tabs-donor"
                                total={donorsTotal}
                            />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </QueryLayout>
    );
};

export default FileRepo;
