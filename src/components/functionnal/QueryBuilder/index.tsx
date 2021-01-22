import React, { ReactElement } from 'react';
import { AiOutlineCloseCircle, AiOutlineLeft } from 'react-icons/ai';

import { t } from 'locales/utils';

import './QueryBuilder.scss';

const QueryBuilder = (): ReactElement => {
    const hasCurrentFilters = [].length > 0;
    const containerState = hasCurrentFilters ? 'with-filters' : 'no-filters';
    return (
        <div className={`query-builder query-builder--${containerState}`}>
            <div className="wrapper-builder">
                {!hasCurrentFilters ? (
                    <React.Fragment>
                        <AiOutlineLeft className="left-arrow" />
                        <span className="no-filters-text">{t('repo.search.by.facet.title')}</span>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <AiOutlineCloseCircle className="close-icon" />
                        <div className="wrapper-filters">Nothing</div>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default QueryBuilder;
