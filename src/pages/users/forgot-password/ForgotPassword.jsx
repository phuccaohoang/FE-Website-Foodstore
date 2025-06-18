import { Form, Input, Button, message } from 'antd';
import './forgotpassword.css';

export const ForgotPassword = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const email = values.email.trim().toLowerCase();

        message.success(`Yêu cầu đặt lại mật khẩu đã được gửi tới ${email}`);
        form.resetFields();
    };

    return (
        <div className="forgot-container">
            <Form
                form={form}
                name="forgot-password"
                layout="vertical"
                className="forgot-form"
                onFinish={onFinish}
                autoComplete="off"
            >
                <h2 className="forgot-title">Quên mật khẩu</h2>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Gửi
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
