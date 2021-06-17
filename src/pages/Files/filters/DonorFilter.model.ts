import { IFilterGroup, VisualType } from '@ferlab/ui/core/components/filters/types';

import { t } from 'locales/translate';
import { IFilterModel } from 'types/interface/filters';
import { presetModels } from 'utils/filters/model';

const filters: IFilterModel[] = [
    {
        field: 'study.name',
        type: VisualType.Checkbox,
    },
    {
        field: 'study.domain',
        type: VisualType.Checkbox,
    },
    {
        field: 'gender',
        type: VisualType.Checkbox,
    },
    {
        field: 'ethnicity',
        type: VisualType.Checkbox,
    },
    {
        config: {
            max: undefined,
            min: undefined,
            rangeTypes: [
                {
                    key: 'years',
                    name: t('facet.range.years'),
                },
                {
                    key: 'days',
                    name: t('facet.range.days'),
                },
            ],
        },
        field: 'age_at_recruitment',
        type: VisualType.Range,
    },
    {
        config: {
            max: undefined,
            min: undefined,
            rangeTypes: [
                {
                    key: 'years',
                    name: t('facet.range.years'),
                },
                {
                    key: 'days',
                    name: t('facet.range.days'),
                },
            ],
        },
        field: 'diagnoses.age_at_diagnosis',
        type: VisualType.Range,
    },
    {
        field: 'vital_status',
        type: VisualType.Checkbox,
    },
    {
        field: 'diagnoses.tagged_icd.main_category',
        title: 'facet.diagnoses.icd_term',
        type: VisualType.Checkbox,
    },
    {
        field: 'diagnoses.tagged_mondo.name',
        title: 'facet.mondo.term',
        type: VisualType.Checkbox,
    },
    {
        field: 'observed_phenotype_tagged.main_category',
        title: 'facet.hpo.category',
        type: VisualType.Checkbox,
    },
    {
        field: 'observed_phenotype_tagged.name',
        title: 'facet.hpo.term',
        type: VisualType.Checkbox,
    },
];

const presetFacets: IFilterGroup[] = presetModels(filters);

export default presetFacets;
