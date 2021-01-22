import get from 'lodash/get';

import { t } from 'locales/utils';

const DonorsModel = [
    {
        dataIndex: ['node', 'submitter_donor_id'],
        hidden: false,
        id: 'submitter_donor_id',
        movable: true,
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number =>
                a.node.submitter_donor_id.localeCompare(b.node.submitter_donor_id),
            multiple: 3,
        },
        title: t('facet.submitter_donor_id'),
    },
    {
        dataIndex: ['node', 'study', 'hits', 'edges', '0', 'node', 'name'],
        hidden: false,
        id: 'study_name',
        movable: true,
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number =>
                a.node.study.hits.edges[0].node.name.localeCompare(b.node.study.hits.edges[0].node.name),
            multiple: 1,
        },
        title: t('facet.study.name'),
    },
    {
        dataIndex: ['node', 'gender'],
        hidden: false,
        id: 'gender',
        movable: true,
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number =>
                a.node.gender.localeCompare(b.node.gender),
            multiple: 4,
        },
        title: t('facet.gender'),
    },
    {
        dataIndex: ['node', 'ethnicity'],
        hidden: true,
        id: 'ethnicity',
        movable: true,
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number =>
                a.node.ethnicity.localeCompare(b.node.ethnicity),
            multiple: 5,
        },
        title: t('facet.ethnicity'),
    },
    {
        dataIndex: ['node', 'vital_status'],
        hidden: true,
        id: 'vital_status',
        movable: true,
        title: t('facet.vital_status'),
    },
    {
        dataIndex: ['node', 'age_at_recruitment'],
        hidden: true,
        id: 'age_at_recruitment',
        movable: true,
        title: t('facet.age_at_recruitment'),
    },
    {
        hidden: true,
        id: 'age_at_diagnosis',
        movable: true,
        render: ({ node }: any) => Math.min(node.diagnoses.hits.edges.map((item: any) => item.node.age_at_diagnosis)),
        title: t('facet.diagnoses.age_at_diagnosis'),
    },
    {
        hidden: true,
        id: 'icd_term',
        movable: true,
        render: ({ node }: any) => {
            if (!node) {
                return '--';
            }

            const age = Math.min(node.diagnoses.hits.edges.map((item: any) => item.node.age_at_diagnosis));
            const result = node.diagnoses.hits.edges.find((item: any) => item.node.age_at_diagnosis === age);
            return get(result, 'node.icd_term', '--');
        },
        title: t('facet.diagnoses.icd_term'),
    },
    {
        dataIndex: ['node', 'phenotypes', 'hits', 'edges', '0', 'node', 'hpo_term'],
        hidden: true,
        id: 'hpo_term',
        movable: true,
        title: t('facet.phenotypes.hpo_term'),
    },
    {
        className: 'numerical',
        dataIndex: ['node', 'files', 'hits', 'total'],
        hidden: false,
        id: 'total_files',
        movable: true,
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number => a.node.file_size - b.node.file_size,
            multiple: 6,
        },
        title: t('facet.files.count'),
    },
];

export const presetDonorsModel = DonorsModel.map((item, index) => ({ ...item, initialOrder: index }));
