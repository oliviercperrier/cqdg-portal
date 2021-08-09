import { notification } from 'antd';

import './Notification.scss';

export enum NotificationType {
    Success = 'success',
    Error = 'error',
}

interface IProgressComponent {
    description?: string;
    message: string;
    type: string;
    duration?: number;
}
const Notification = (props: IProgressComponent) => {
    const { description = null, duration = 10, message, type } = props;
    const notifContent = {
        className: 'clinical-download-error',
        description: description,
        duration: duration,
        message: message,
    };

    if (type === NotificationType.Success) {
        return notification.success(notifContent);
    } else if (type === NotificationType.Error) {
        return notification.error(notifContent);
    }
};

export default Notification;
