import React, { useEffect, useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import CountWithIcon from '@ferlab/ui/core/dist/components/labels/CountWithIcon';
import { useKeycloak } from '@react-keycloak/web';
import { Button } from 'antd';
import get from 'lodash/get';

import ResponsiveBar from 'components/charts/Bar';
import ResponsivePie from 'components/charts/Pie';
import Footer from 'components/interface/Footer';
import CloudIcon from 'components/interface/Icon/Cloud';
import CloudStorageIcon from 'components/interface/Icon/CloudStorage';
import DataIcon from 'components/interface/Icon/Data';
import DatabaseIcon from 'components/interface/Icon/Database';
import DocIcon from 'components/interface/Icon/Doc';
import DonorIcon from 'components/interface/Icon/Donor';
import ExomeIcon from 'components/interface/Icon/Exome';
import FileIcon from 'components/interface/Icon/File';
import GenomeIcon from 'components/interface/Icon/Genome';
import StorageIcon from 'components/interface/Icon/Storage';
import StudyIcon from 'components/interface/Icon/Study';
import CardContainerNotched from 'components/layouts/Card/CardContainerNotched';
import CardContent from 'components/layouts/Card/CardContent';
import { t } from 'locales/translate';
import { isAuthenticated } from 'providers/Keycloak/keycloak';
import { getHomeStats } from 'services/api';
import { formatPieChart } from 'utils/formatChartData';
import { EFileInputType, formatFileSize } from 'utils/formatFileSize';
import { Hits } from 'utils/graphql/query';

import './Home.scss';

const Home = (): React.ReactElement => {
    const [data, setData] = useState([]);
    const { keycloak } = useKeycloak();
    useEffect(() => {
        const fetchData = async () => {
            const response = await getHomeStats();
            setData(response);
        };
        fetchData();
    }, []);

    const totalStudies = get(data, `Study.${Hits.ITEM}.total`, 0);
    const totalDonors = get(data, `Donor.${Hits.ITEM}.total`, 0);
    const totalFiles = get(data, `File.${Hits.ITEM}.total`, 0);
    const totalSizes = get(data, `File.aggregations.file_size.stats.sum`, 0);
    const fileSizes = formatFileSize(totalSizes, { output: 'object' }, EFileInputType.MB) as Record<string, any>;

    return (
        <>
            <main className="home">
                <div className="home__contentWrapper">
                    <section className="home__contentWrapper__hero">
                        <div>
                            <div className="description">
                                <h2 className="description__subtitle">{t('home.hero.subtitle')}</h2>
                                <h1 className="description__title">{t('home.hero.title')}</h1>
                                <p>{t('home.hero.text')}</p>
                            </div>
                            <div className="buttons">
                                {!isAuthenticated(keycloak) ? (
                                    <>
                                        <Link to="/login">
                                            <Button className="buttons__login" type="primary">
                                                {t('home.hero.buttons.connection')}{' '}
                                                <AiOutlineArrowRight className="buttons__login__icon" />
                                            </Button>
                                        </Link>
                                        <Button className="buttons__create" type="ghost">
                                            {t('home.hero.buttons.account')}
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/files">
                                            <Button
                                                className={`menu-item`}
                                                icon={<DatabaseIcon className="menu-item-icon" />}
                                                type="primary"
                                            >
                                                {t('nav.file.repo')}
                                            </Button>
                                        </Link>
                                        <Link to="/studies">
                                            <Button
                                                className={`menu-item`}
                                                icon={<StorageIcon className="menu-item-icon" />}
                                                type="primary"
                                            >
                                                {t('nav.studies')}
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="data">
                            <CardContainerNotched>
                                <CardContent cardType="header2Column">
                                    <div className="header2Column__header">
                                        <h2>{t('home.hero.data.header')}</h2>
                                        <span>{t('home.hero.data.subtitle')}</span>
                                    </div>
                                    <CountWithIcon
                                        Icon={<StudyIcon />}
                                        label={t('home.hero.data.groups.study')}
                                        total={totalStudies}
                                    />
                                    <CountWithIcon
                                        Icon={<DonorIcon />}
                                        label={t('home.hero.data.groups.donor')}
                                        total={totalDonors}
                                    />
                                    <CountWithIcon
                                        Icon={<GenomeIcon />}
                                        label={t('home.hero.data.groups.genome')}
                                        total={102}
                                    />
                                    <CountWithIcon
                                        Icon={<ExomeIcon />}
                                        label={t('home.hero.data.groups.exome')}
                                        total={800}
                                    />
                                    <CountWithIcon
                                        Icon={<FileIcon />}
                                        label={t('home.hero.data.groups.file')}
                                        total={totalFiles}
                                    />
                                    <CountWithIcon
                                        Icon={<CloudStorageIcon />}
                                        label={fileSizes.symbol}
                                        total={fileSizes.value}
                                    />
                                </CardContent>
                            </CardContainerNotched>
                        </div>
                    </section>
                    <section className="home__contentWrapper__graphs">
                        <CardContainerNotched className="graph" type="hovered">
                            <CardContent cardType="stack">
                                <div className="graph-content">
                                    <ResponsiveBar
                                        axisLeft={null}
                                        data={formatPieChart(
                                            get(data, 'Donor.aggregations.diagnoses__icd_category_keyword.buckets', []),
                                            'key',
                                            'doc_count',
                                            [
                                                '#D06D5E',
                                                '#36CFC9',
                                                '#F759AB',
                                                '#FFB600',
                                                '#FF7A45',
                                                '#ADC6FF',
                                                '#08979C',
                                                '#00AEEF',
                                                '#FF9C6E',
                                                '#FF85C0',
                                            ]
                                        )}
                                        enableLabel={false}
                                        layout="horizontal"
                                        margin={{ bottom: 40, left: 5, right: 20, top: 0 }}
                                        padding={0.3}
                                        theme={{
                                            fontSize: 10,
                                            textColor: '#486F90',
                                        }}
                                        title={t('home.graphs.graph1.title')}
                                        titleClassName="graph-title"
                                    />
                                </div>
                            </CardContent>
                        </CardContainerNotched>
                        <CardContainerNotched className="graph" type="hovered">
                            <CardContent cardType="stack">
                                <div className="graph-content">
                                    <ResponsivePie
                                        data={formatPieChart(
                                            get(data, 'Study.aggregations.domain.buckets', []),
                                            'key',
                                            'doc_count'
                                        )}
                                        enableRadialLabels={false}
                                        enableSliceLabels={false}
                                        legends={[
                                            { anchor: 'right', direction: 'column', itemHeight: 18, itemWidth: 50 },
                                        ]}
                                        margin={{ bottom: 20, left: -100, right: 100, top: 10 }}
                                        theme={{
                                            fontSize: 10,
                                            textColor: '#486F90',
                                        }}
                                        title={t('home.graphs.graph2.title')}
                                        titleClassName="graph-title"
                                    />
                                </div>
                            </CardContent>
                        </CardContainerNotched>
                        <CardContainerNotched className="graph" type="hovered">
                            <CardContent cardType="stack">
                                <div className="graph-content">
                                    <ResponsiveBar
                                        axisLeft={null}
                                        data={formatPieChart(
                                            get(
                                                data,
                                                'Donor.aggregations.phenotypes__hpo_category_keyword.buckets',
                                                []
                                            ),
                                            'key',
                                            'doc_count',
                                            [
                                                '#D06D5E',
                                                '#36CFC9',
                                                '#F759AB',
                                                '#FFB600',
                                                '#FF7A45',
                                                '#ADC6FF',
                                                '#08979C',
                                                '#00AEEF',
                                                '#FF9C6E',
                                                '#FF85C0',
                                            ]
                                        )}
                                        enableLabel={false}
                                        layout="horizontal"
                                        margin={{ bottom: 40, left: 5, right: 20, top: 10 }}
                                        padding={0.3}
                                        title={t('home.graphs.graph3.title')}
                                        titleClassName="graph-title"
                                    />
                                </div>
                            </CardContent>
                        </CardContainerNotched>
                    </section>
                    <section className="home__contentWrapper__links">
                        <div className="home__contentWrapper__links--text">
                            <h2>{t('home.cards.text.block.title')}</h2>
                            <p>{t('home.cards.text.block.text')}</p>
                        </div>
                        <div className="home__contentWrapper__links--cards">
                            <Button href="https://docs.qa.cqdg.ferlab.bio/" target="_blank" type="link">
                                <CardContainerNotched className="card-container" type="hover">
                                    <CardContent cardType="stackCenter">
                                        <DocIcon />
                                        <h3>{t('home.cards.card1.title')}</h3>
                                        <p>{t('home.cards.card1.text')}</p>
                                    </CardContent>
                                </CardContainerNotched>
                            </Button>
                            <Button href="https://docs.qa.cqdg.ferlab.bio/dictionary/" target="_blank" type="link">
                                <CardContainerNotched className="card-container" type="hover">
                                    <CardContent cardType="stackCenter">
                                        <DataIcon />
                                        <h3>{t('home.cards.card2.title')}</h3>
                                        <p>{t('home.cards.card2.text')}</p>
                                    </CardContent>
                                </CardContainerNotched>
                            </Button>
                            <Button
                                href="https://docs.qa.cqdg.ferlab.bio/docs/submission/submitting-clinical-data/"
                                target="_blank"
                                type="link"
                            >
                                <CardContainerNotched className="card-container" type="hover">
                                    <CardContent cardType="stackCenter">
                                        <CloudIcon />
                                        <h3>{t('home.cards.card3.title')}</h3>
                                        <p>{t('home.cards.card3.text')}</p>
                                    </CardContent>
                                </CardContainerNotched>
                            </Button>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Home;
