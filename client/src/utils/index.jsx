import { notification } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons';

export const validationErrors = (message) => {
    console.log(message)
    notification.error({
        description: message,
        icon: <CloseCircleOutlined style={{ color: "red" }} />,
        duration: 5,
    });
};
