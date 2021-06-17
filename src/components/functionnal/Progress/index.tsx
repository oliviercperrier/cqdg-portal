import { Progress } from 'antd';

import styles from './Progress.module.scss';

interface IProgressComponent {
    value: number;
    total: number;
}
const ProgressComponent: React.FC<IProgressComponent> = ({ total, value }) => (
    <Progress
        className={styles['data-progress']}
        percent={(value / total) * 100}
        showInfo={false}
        strokeLinecap="square"
    />
);

export default ProgressComponent;
