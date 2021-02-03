import React from 'react';
import { Button, Radio } from 'antd';
import get from 'lodash/get';

import StackLayout from 'components/layouts/StackLayout';

import { IFilter, IFilterProps } from '../Filters';

import './SingleChoice.scss';

interface ISingleChoiceProps extends IFilterProps {
    filters: IFilter[];
}

const SingleChoice: React.FC<ISingleChoiceProps> = ({
    dictionary,
    filterGroup,
    filters,
    onChange,
    selectedFilters = [],
}) => {
    const selectedFilter = selectedFilters ? selectedFilters[0] : '';
    const options = filters.map((filter) => ({
        label: filter.name,
        value: filter.key,
    }));
    return (
        <StackLayout className="fui-filter-sc" horizontal>
            <Radio.Group
                defaultValue={selectedFilter}
                onChange={() => onChange(filterGroup, selectedFilter)}
                optionType="button"
                options={options}
            />
            <Button
                className="fui-filter-sc-button"
                onClick={() => onChange(filterGroup, [])}
                onKeyPress={() => onChange(filterGroup, [])}
                tabIndex={0}
                type="text"
            >
                {get(dictionary, 'actions.clear', 'clear')}
            </Button>
        </StackLayout>
    );
};

export default SingleChoice;
