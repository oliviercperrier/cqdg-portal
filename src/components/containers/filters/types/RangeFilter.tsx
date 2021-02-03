import React, { useState } from 'react';
import { Button, Divider, InputNumber, Select } from 'antd';
import get from 'lodash/get';
import isNumber from 'lodash/isNumber';

import StackLayout from 'components/layouts/StackLayout';

import { IFilterProps, IRangeFilterState } from '../Filters';

import './RangeFilter.scss';

const { Option } = Select;

interface IRangeFilterProps extends IFilterProps {
    handleFromChanged?: () => void;
    handleToChanged?: () => void;
    handleUnitChanged?: () => void;
    title: string;
    selectedFilters: IRangeFilterState;
    maxPossibleValue?: number;
    minPossibleValue?: number;
}

const RangeFilter: React.FC<IRangeFilterProps> = ({
    dictionary,
    filterGroup,
    maxPossibleValue = 0,
    minPossibleValue = 0,
    onChange,
    selectedFilters,
}) => {
    const [rangeFilter, setRangeFilter] = useState({
        max: get(selectedFilters, 'max', undefined),
        min: get(selectedFilters, 'min', undefined),
        rangeType: get(selectedFilters, 'rangeType', filterGroup.range!.rangeTypes[0].key),
    });

    const onRangeTypeChanged = (value: string) => {
        setRangeFilter((prevState) => ({
            ...prevState,
            rangeType: value,
        }));
    };

    const onMinChanged = (value: string | number | undefined) => {
        if (!value) return;
        const min = typeof value === 'string' ? parseInt(value, 10) : value;

        if (!(min < minPossibleValue)) {
            setRangeFilter((prevState) => ({ ...prevState, min }));
        }
    };

    const onMaxChanged = (value: string | number | undefined) => {
        if (!value) return;
        const max = typeof value === 'string' ? parseInt(value, 10) : value;

        if (!(max < maxPossibleValue)) {
            setRangeFilter((prevState) => ({ ...prevState, max }));
        }
    };

    const { max, min, rangeType } = rangeFilter;
    const { range } = filterGroup;

    if (!range) {
        return null;
    }
    const dotField = filterGroup.field;
    const buttonActionDisabled = !isNumber(min) && !isNumber(max);
    return (
        <StackLayout className="fui-rf-container" vertical>
            <StackLayout className="fui-rf-grouped" horizontal>
                {range.rangeTypes.length > 0 && (
                    <div className="fui-rf-range-target">
                        <Select className="fui-rf-range-target-select" onChange={onRangeTypeChanged} value={rangeType}>
                            {range.rangeTypes.map((u) => (
                                <Option key={u.key} value={u.key}>
                                    {u.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                )}
                <StackLayout className="fui-rf-grouped-inputs">
                    <InputNumber
                        className="range-input"
                        id={`from-${dotField}`}
                        key={`from-${dotField}`}
                        max={range.max}
                        min={range.min}
                        onChange={onMinChanged}
                        placeholder={get(dictionary, 'range.min', 'min')}
                        title={get(dictionary, 'range.min', 'min')}
                        type="number"
                        value={min}
                    />
                    <Divider className="fui-rf-grouped-inputs-spacer" type="vertical" />
                    <InputNumber
                        className="range-input"
                        id={`to-${dotField}`}
                        key={`to-${dotField}`}
                        max={range.max}
                        min={range.min}
                        onChange={onMaxChanged}
                        placeholder={get(dictionary, 'range.max', 'max')}
                        title={get(dictionary, 'range.max', 'max')}
                        type="number"
                        value={max}
                    />
                </StackLayout>
            </StackLayout>

            <StackLayout className="fui-rf-actions" horizontal>
                <Button
                    disabled={buttonActionDisabled}
                    onClick={() =>
                        onChange(filterGroup, {
                            max: undefined,
                            min: undefined,
                            rangeType: undefined,
                        })
                    }
                    type="text"
                >
                    {get(dictionary, 'actions.none', 'clear')}
                </Button>
                <Button
                    className="fui-rf-actions-apply"
                    disabled={buttonActionDisabled}
                    onClick={() => {
                        onChange(filterGroup, rangeFilter);
                    }}
                >
                    {get(dictionary, 'actions.apply', 'apply')}
                </Button>
            </StackLayout>
        </StackLayout>
    );
};

export default RangeFilter;
