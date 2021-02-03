import React from 'react';

import FilterContainer from 'components/containers/filters/FilterContainer';
import { VisualType } from 'components/containers/filters/Filters';
import { t } from 'locales/utils';

const FileFilters = () => (
    <>
        <FilterContainer
            filterGroup={{ field: 'bob', title: 'test', type: VisualType.Checkbox }}
            filters={[
                { doc_count: 58, id: 'unique1', key: 'something1', name: 'hello1' },
                { doc_count: 39, id: 'unique2', key: 'something2', name: 'hello2' },
                { doc_count: 3, id: 'unique3', key: 'something3', name: 'hello3' },
                { doc_count: 5, id: 'unique4', key: 'something4', name: 'hello4' },
                { doc_count: 6, id: 'unique5', key: 'something5', name: 'hello5' },
                { doc_count: 235, id: 'unique6', key: 'something6', name: 'hello6' },
                { doc_count: 55, id: 'unique7', key: 'something7', name: 'hello7' },
                { doc_count: 95, id: 'unique8', key: 'something8', name: 'hello8' },
            ]}
            onChange={(fg, f) => true}
            searchEnabled
            title="Study Name"
        />
        <FilterContainer
            filterGroup={{ field: 'bob2', title: 'test2', type: VisualType.Toggle }}
            filters={[
                { doc_count: 58, id: 'unique1', key: 'something1', name: 'hello1' },
                { doc_count: 39, id: 'unique2', key: 'something2', name: 'hello2' },
            ]}
            onChange={(fg, f) => true}
            title="Harmonized"
        />
        <FilterContainer
            filterGroup={{
                field: 'bob3',
                range: {
                    max: 50,
                    min: 0,
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
                title: 'test3',
                type: VisualType.Range,
            }}
            onChange={(fg, f) => true}
            title="Age at diagnosis"
        />
    </>
);

export default FileFilters;
