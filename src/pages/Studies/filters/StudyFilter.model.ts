import { IFilterGroup, VisualType } from '@ferlab/ui/core/components/filters/types';

import { IFilterModel } from 'types/interface/filters';
import { presetModels } from 'utils/filters/model';

const filters: IFilterModel[] = [
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
        field: 'donors.diagnoses.tagged_icd.main_category',
        type: VisualType.Checkbox,
    },
    {
        field: 'donors.observed_phenotype_tagged.main_category',
        type: VisualType.Checkbox,
    },
    {
        field: 'donors.diagnoses.tagged_mondo.main_category',
        title: 'facet.donors.diagnoses.mondo_term_keyword',
        type: VisualType.Checkbox,
    },
    {
        field: 'files.data_category',
        type: VisualType.Checkbox,
    },
];

const presetFacets: IFilterGroup[] = presetModels(filters);

export default presetFacets;
