import { IFilterGroup, VisualType } from 'components/containers/filters/Filters';
import { t } from 'locales/translate';
import { IFilterModel } from 'types/interface/filters';

const filters: IFilterModel[] = [
    {
        field: 'data_category',
        type: VisualType.Checkbox,
    },
    {
        field: 'data_type',
        type: VisualType.Checkbox,
    },
    {
        field: 'is_harmonized',
        type: VisualType.Toggle,
    },
    {
        field: 'experimental_strategy',
        type: VisualType.Checkbox,
    },
    {
        field: 'file_format',
        type: VisualType.Checkbox,
    },
    {
        field: 'platform',
        type: VisualType.Checkbox,
    },
    {
        field: 'data_access',
        type: VisualType.Checkbox,
    },
];

const presetFacets: IFilterGroup[] = filters.map((filter) => ({
    ...filter,
    title: filter.title ? t(filter.title) : t(`facet.${filter.field}`),
}));

export default presetFacets;
