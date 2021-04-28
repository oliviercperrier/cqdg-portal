import get from 'lodash/get';

import InternalLink from 'components/functionnal/InternalLink';
import { t } from 'locales/translate';
import { Routes } from 'routes';

const DonorsModel = [
    {
        hidden: false,
        id: 'submitter_donor_id',
        movable: true,
        render: ({ node }: any) => (
            <InternalLink params={{ id: node.submitter_donor_id }} path={Routes.DONOR}>
                {node.submitter_donor_id}
            </InternalLink>
        ),
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number =>
                a.node.submitter_donor_id.localeCompare(b.node.submitter_donor_id),
            multiple: 3,
        },

        title: t('facet.submitter_donor_id'),
        translate: 'facet.submitter_donor_id',
    },
    {
        dataIndex: ['node', 'study', 'hits', 'edges', '0', 'node', 'name'],
        hidden: false,
        id: 'study.hits.edges[0].node.name',
        movable: true,
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number =>
                a.node.study.hits.edges[0].node.name.localeCompare(b.node.study.hits.edges[0].node.name),
            multiple: 1,
        },
        title: t('facet.study.name'),
        translate: 'facet.study.name',
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
        translate: 'facet.gender',
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
        translate: 'facet.ethnicity',
    },
    {
        dataIndex: ['node', 'vital_status'],
        hidden: true,
        id: 'vital_status',
        movable: true,
        title: t('facet.vital_status'),
        translate: 'facet.vital_status',
    },
    {
        dataIndex: ['node', 'age_at_recruitment'],
        hidden: true,
        id: 'age_at_recruitment',
        movable: true,
        title: t('facet.age_at_recruitment'),
        translate: 'facet.age_at_recruitment',
    },
    {
        download: ({ node }: any) => Math.min(node.diagnoses.hits.edges.map((item: any) => item.node.age_at_diagnosis)),
        hidden: true,
        id: 'age_at_diagnosis',
        movable: true,
        render: ({ node }: any) => Math.min(node.diagnoses.hits.edges.map((item: any) => item.node.age_at_diagnosis)),
        title: t('facet.diagnoses.age_at_diagnosis'),
        translate: 'facet.diagnoses.age_at_diagnosis',
    },
    {
        download: ({ node }: any) => {
            if (!node) {
                return '--';
            }

            const age = Math.min(node.diagnoses.hits.edges.map((item: any) => item.node.age_at_diagnosis));
            const result = node.diagnoses.hits.edges.find((item: any) => item.node.age_at_diagnosis === age);
            return get(result, 'node.icd_term', '--');
        },
        hidden: true,
        id: 'diagnoses.icd_term',
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
        translate: 'facet.diagnoses.icd_term',
    },
    {
        dataIndex: ['node', 'phenotypes', 'hits', 'edges', '0', 'node', 'hpo_term'],
        hidden: true,
        id: 'phenotypes.hits.edges[0].node.hpo_term',
        movable: true,
        title: t('facet.phenotypes.hpo_term'),
        translate: 'facet.phenotypes.hpo_term',
    },
    {
        className: 'numerical',
        dataIndex: ['node', 'files', 'hits', 'total'],
        hidden: false,
        id: 'files.hits.total',
        movable: true,
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number => a.node.file_size - b.node.file_size,
            multiple: 6,
        },
        title: t('facet.files.count'),
        translate: 'facet.files.count',
    },
];

export const presetDonorsModel = DonorsModel.map((item, index) => ({ ...item, initialOrder: index }));
