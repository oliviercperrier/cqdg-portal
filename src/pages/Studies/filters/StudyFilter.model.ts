import { IFilterGroup, VisualType } from '@ferlab/ui/core/components/filters/types';

import { IFilterModel } from 'types/interface/filters';
import { presetModels } from 'utils/filters/model';

const filters: IFilterModel[] = [
    {
        field: 'short_name_keyword',
        title: 'facet.study.name',
        type: VisualType.Checkbox,
    },
    {
        field: 'domain',
        title: 'facet.study.domain',
        type: VisualType.Checkbox,
    },
    {
        field: 'population',
        type: VisualType.Checkbox,
    },
    {
        field: 'donors.diagnoses.icd_category_keyword',
        type: VisualType.Checkbox,
    },
    {
        field: 'donors.phenotypes.hpo_category_keyword',
        type: VisualType.Checkbox,
    },
    {
        field: 'donors.diagnoses.mondo_term_keyword',
        type: VisualType.Checkbox,
    },
    {
        field: 'files.data_category',
        type: VisualType.Checkbox,
    },
];

const presetFacets: IFilterGroup[] = presetModels(filters);

export default presetFacets;
