import { notification } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons'

export const validationErrors = (errors) => {
    for (const [field, messages] of Object.entries(errors)) {
        messages.forEach(message => {
            notification.error({
                description: message,
                icon: <CloseCircleOutlined style={{ color: "red" }} />,
                duration: 5,
            });
        });
    }
}