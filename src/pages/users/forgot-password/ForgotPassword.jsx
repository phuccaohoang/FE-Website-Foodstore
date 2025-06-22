import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './forgotpassword.css';

export const ForgotPassword = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const email = values.email.trim().toLowerCase();

        message.success(`Yêu cầu đặt lại mật khẩu đã được gửi tới ${email}`);
        form.resetFields();
    };
    const navigate = useNavigate()

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
                    <Input size="large" />
                </Form.Item>
                <div className="forgot-actions">
                    <div onClick={() => { navigate('/login') }}>Đăng nhập</div>
                </div>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Gửi
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
