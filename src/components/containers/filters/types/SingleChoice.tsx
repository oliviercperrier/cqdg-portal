import React, { useEffect, useState } from 'react';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Button, Radio } from 'antd';
import cx from 'classnames';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { IFilter, IFilterCount, IFilterProps } from '../Filters';

import './SingleChoice.scss';

interface ISingleChoiceProps extends IFilterProps {
    filters: IFilter<IFilterCount>[];
}

const SingleChoice: React.FC<ISingleChoiceProps> = ({
    dictionary,
    filterGroup,
    filters,
    onChange,
    selectedFilters = [],
}) => {
    const selectedFilter = selectedFilters.length > 0 ? selectedFilters[0].data.key : '';
    const [selected, setSelected] = useState(selectedFilter);

    useEffect(() => {
        setSelected(selectedFilter);
    }, [selectedFilters]);
    const options = filters.map((filter) => ({
        label: filter.name,
        value: filter.data.key,
    }));
    const classNames = cx('fui-filter-sc-button', { 'fui-filter-sc-button-disabled': isEmpty(selectedFilter) });

    return (
        <StackLayout className="fui-filter-sc" horizontal>
            <Radio.Group
                onChange={(e) => {
                    const newSelection = filters.filter((f) => f.data.key === e.target.value);
                    onChange(filterGroup, newSelection);
                }}
                optionType="button"
                options={options}
                value={selected}
            />
            <Button
                className={classNames}
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
