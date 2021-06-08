import React from 'react';

import { t } from 'locales/translate';
import { IFilterModel } from 'types/interface/filters';

type TPresetModels = Omit<IFilterModel, 'title'> & {
    title: React.ReactNode;
};
export const presetModels = (filters: IFilterModel[]): TPresetModels[] =>
    filters.map((filter) => ({
        ...filter,
        title: filter.title ? t(filter.title) : t(`facet.${filter.field}`),
    }));
