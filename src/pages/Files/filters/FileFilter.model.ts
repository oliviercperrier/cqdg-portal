import { IFilterGroup, VisualType } from '@ferlab/ui/core/components/filters/types';

import { IFilterModel } from 'types/interface/filters';
import { presetModels } from 'utils/filters/model';

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

const presetFacets: IFilterGroup[] = presetModels(filters);

export default presetFacets;
