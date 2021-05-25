import React, { useEffect, useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Alert, Select, Tag } from 'antd';

import ListItem from 'components/functionnal/SaveSets/ListItem';

import styles from './SelectSets.module.scss';
const { OptGroup, Option } = Select;

interface ISelectSets {
    onSelect: (items: ISelectDataContainer[]) => void;
    dictionary?: {
        title: React.ReactNode;
        placeholder: React.ReactNode;
    };
    data: IDataSaveSet[];
}

interface IDataSaveSet {
    selectedValues?: string[];
    values: IItemListSaveSets[];
    indexName: string;
    dictionary?: {
        groupTitle?: React.ReactNode;
        emptyValueTitle: React.ReactNode;
        emptyValueText: React.ReactNode;
    };
}

interface ISelectDataContainer {
    key: string;
    data: string[];
}

interface IItemListSaveSets {
    count: number;
    name: string;
    icon?: React.ReactNode;
}
const SelectSets: React.FunctionComponent<ISelectSets> = ({ data, dictionary, onSelect }) => {
    const [aggData, setAggData] = useState<any>();
    useEffect(() => {
        const aggregatedValues: any = {};
        for (let i = 0; i < data.length; i++) {
            aggregatedValues[data[i].indexName] = data[i].values.map((dataValue) => dataValue.name);
        }
        setAggData(aggregatedValues);
    }, [data]);

    const handleChange = (values: string[]) => {
        const selectedData: any = {};
        data.forEach((item) => (selectedData[item.indexName] = []));
        values.forEach((value) => {
            Object.keys(aggData).forEach((key) => {
                if (aggData[key].includes(value)) {
                    if (!selectedData[key]) {
                        selectedData[key] = [];
                    }
                    selectedData[key].push(value);
                }
            });
        });
        onSelect(Object.keys(selectedData).map((key) => ({ data: selectedData[key], key })));
    };

    const currentValues = data.reduce((acc, item) => [...acc, ...(item.selectedValues || [])], [] as string[]);
    return (
        <StackLayout vertical>
            <label>{dictionary?.title || 'Select'}</label>
            <Select
                listHeight={150}
                maxTagCount="responsive"
                mode="multiple"
                onChange={(value) => handleChange(value)}
                placeholder={dictionary?.placeholder || 'placeholder'}
                suffixIcon={<AiOutlineDown />}
                tagRender={({ onClose, value }) => (
                    <Tag className={styles.tag} closable onClose={onClose}>
                        {value}
                    </Tag>
                )}
                value={currentValues}
            >
                {data.map((dataSaveSet, i) => {
                    const options =
                        dataSaveSet.values.length > 0 ? (
                            dataSaveSet.values.map((item: any, i) => (
                                <Option key={i} value={item.name}>
                                    <ListItem Icon={item.icon} label={item.name} total={item.count} />
                                </Option>
                            ))
                        ) : (
                            <Option disabled key={i} value="empty">
                                <div className={styles.emptyDataContainer}>
                                    <h3 className={styles.emptyDataTitle}>{dataSaveSet.dictionary?.emptyValueTitle}</h3>
                                    <span className={styles.emptyDataText}>
                                        {dataSaveSet.dictionary?.emptyValueText}
                                    </span>
                                </div>
                            </Option>
                        );

                    if (dataSaveSet.dictionary?.groupTitle) {
                        return (
                            <OptGroup key={i} label={dataSaveSet.dictionary?.groupTitle}>
                                {options}
                            </OptGroup>
                        );
                    }

                    return options;
                })}
            </Select>
        </StackLayout>
    );
};

export default SelectSets;
