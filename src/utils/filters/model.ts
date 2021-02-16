import { t } from 'locales/translate';
import { IFilterModel } from 'types/interface/filters';

export const presetModels = (filters: IFilterModel[]) =>
    filters.map((filter) => ({
        ...filter,
        title: filter.title ? t(filter.title) : t(`facet.${filter.field}`),
    }));
