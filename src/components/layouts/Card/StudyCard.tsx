import React from 'react';
import MultiLabel from '@ferlab/ui/core/components/labels/MultiLabel';

import InternalLink, { IInternalLink } from 'components/functionnal/InternalLink';
import DonorIcon from 'components/interface/Icon/Donor';
import FileIcon from 'components/interface/Icon/File';
import CardContainerNotched from 'components/layouts/Card/CardContainerNotched';
import CardContent from 'components/layouts/Card/CardContent';
import { t } from 'locales/translate';

import './StudyCard.scss';

interface IStudyCardProp {
    title: string;
    headerTitle: string;
    description: string;
    totalDonors: number;
    totalFiles: number;
    detailsLinkProps: IInternalLink;
    donorsLinkProps: IInternalLink;
    filesLinkProps: IInternalLink;
}

const StudyCard = ({
    description,
    detailsLinkProps,
    donorsLinkProps,
    filesLinkProps,
    headerTitle,
    title,
    totalDonors,
    totalFiles,
}: IStudyCardProp): React.ReactElement => (
    <CardContainerNotched className="card-container" type="header">
        <CardContent cardType="headerFooter">
            <header>
                <div className="card-padding">
                    <h2 className="header-title">{headerTitle}</h2>
                    <InternalLink {...detailsLinkProps}>{t('global.cards.details')}</InternalLink>
                </div>
            </header>
            <div className="card-padding">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <div className="card-footer card-padding">
                <InternalLink {...donorsLinkProps} className={`card-footer-link`} type="button">
                    <MultiLabel
                        Icon={<DonorIcon colored={false} />}
                        label={totalFiles.toLocaleString()}
                        subLabel={t('global.donors')}
                    />
                </InternalLink>
                <InternalLink {...filesLinkProps} className={`card-footer-link`} type="button">
                    <MultiLabel
                        Icon={<FileIcon colored={false} />}
                        label={totalDonors.toLocaleString()}
                        subLabel={t('global.files')}
                    />
                </InternalLink>
            </div>
        </CardContent>
    </CardContainerNotched>
);

export default StudyCard;
