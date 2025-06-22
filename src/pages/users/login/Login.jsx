import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import './login.css';


const onFinish = values => {
    console.log('Success:', values);
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

export const Login = () => {
    const navigate = useNavigate()
    return (
        <div className="login-container">
            <Form
                name="basic"
                layout="vertical"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h2 className="login-title" >Đăng nhập</h2>

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

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu!' },
                        { type: 'password', message: 'Mật khẩu không hợp lệ' },
                    ]}
                >
                    <Input.Password size="large" />
                </Form.Item>

                <div className="login-actions">
                    <div onClick={() => { navigate('/forgot-password') }}>Quên mật khẩu</div>
                    <div onClick={() => { navigate('/register') }}>Tạo tài khoản mới</div>
                </div>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
