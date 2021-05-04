import React from 'react';
import CountWithIcon from '@ferlab/ui/core/components/labels/CountWithIcon';

import InternalLink, { IInternalLink } from 'components/functionnal/InternalLink';
import DonorIcon from 'components/interface/Icon/Donor';
import FileIcon from 'components/interface/Icon/File';
import CardContainerNotched from 'components/layouts/Card/CardContainerNotched';
import CardContent from 'components/layouts/Card/CardContent';
import { t } from 'locales/translate';

import './StudyCard.scss';

interface IStudyCardProp {
    title: string;
    description: string;
    totalDonors: number;
    totalFiles: number;
    linkProp: IInternalLink;
}

const StudyCard = ({ description, linkProp, title, totalDonors, totalFiles }: IStudyCardProp): React.ReactElement => (
    <CardContainerNotched className="card-container" type="header">
        <CardContent cardType="headerFooter">
            <header>
                <div className="card-padding">
                    <h2 className="header-title">{title}</h2>
                    <InternalLink {...linkProp}>{t('global.cards.details')}</InternalLink>
                </div>
            </header>
            <div className="card-padding">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <div className="card-footer card-padding">
                <CountWithIcon
                    Icon={<DonorIcon colored={false} />}
                    label={t('global.donors')}
                    total={totalFiles.toLocaleString()}
                />
                <CountWithIcon
                    Icon={<FileIcon colored={false} />}
                    label={t('global.files')}
                    total={totalDonors.toLocaleString()}
                />
            </div>
        </CardContent>
    </CardContainerNotched>
);

export default StudyCard;
