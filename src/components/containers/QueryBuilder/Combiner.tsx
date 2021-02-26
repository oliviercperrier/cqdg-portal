import React from 'react';
import { Button, Dropdown, Menu } from 'antd';

import StackLayout from 'components/layouts/StackLayout';
import { TSqonGroupOp } from 'types/interface/filters';

import AndOperator from './icons/AndOperator';
import OrOperator from './icons/OrOperator';
import { CombinerEnum } from './types';

import styles from './Combiner.module.scss';

interface ICombinerProps {
    type: TSqonGroupOp;
    onChange: (type: TSqonGroupOp) => void;
}

const Combiner: React.FC<ICombinerProps> = ({ onChange, type }) => (
    <StackLayout className={styles.container}>
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item onClick={() => onChange(CombinerEnum.And)}>
                        <AndOperator />
                    </Menu.Item>
                    <Menu.Item onClick={() => onChange(CombinerEnum.Or)}>
                        <OrOperator />
                    </Menu.Item>
                </Menu>
            }
            trigger={['click']}
        >
            <Button className={styles.button} type="text">
                {type === 'and' ? <AndOperator /> : <OrOperator />}
            </Button>
        </Dropdown>
    </StackLayout>
);

export default Combiner;
