import { Button, Form, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import './login.css';
import accountService from '../../../services/accountService';
import { useSession } from '../../../context/SessionContext';
import { use } from 'react';


const onFinish = values => {
    console.log('Success:', values);
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

export const Login = () => {
    const navigate = useNavigate()
    const { user, setUser } = useSession()


    return (
        <div className="login-container">
            <Form
                name="basic"
                layout="vertical"
                className="lrf-form Form__Input" // log in- register-for got from
                initialValues={{ remember: true }}
                onFinish={async (value) => {
                    const response = await accountService.login(value.email, value.password)
                    if (response.status) {
                        const response2 = await accountService.me()
                        if (response2.status) {
                            setUser({ ...response2.data })
                        }
                    }
                }}
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

                <div className="form-actions">
                    <NavLink className='Text__Link' to='/forgot-password'>Quên mật khẩu</NavLink>
                    <NavLink className='Text__Link' to='/register'>Tạo tài khoản mới</NavLink>
                </div>

                <Form.Item>
                    <Button className='Btn__Submit' type="primary" htmlType="submit" block>
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
