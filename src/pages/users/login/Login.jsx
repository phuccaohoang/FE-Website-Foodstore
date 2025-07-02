import { Button, Form, Input, notification } from 'antd';
import { NavLink } from 'react-router-dom';
import './login.css';
import accountService from '../../../services/accountService';
import { useSession } from '../../../context/SessionContext';




const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

export const Login = () => {
    const { user, setUser } = useSession()
    const [api, contextHolder] = notification.useNotification()

    const openNotification = (message, description, type = 'info') => {
        api[type]({
            message: message,
            description: description,
            showProgress: true,
            pauseOnHover: false,
            placement: 'topLeft'
        })
    }

    return (
        <>
            {contextHolder}
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
                            } else {
                                openNotification('Thất bại', 'Lấy thông tin tài khoản thất bại', 'error')

                            }
                        } else {

                            openNotification('Thất bại', 'Đăng nhập thất bại, kiểm tra tài khoản hoặc mật khẩu', 'error')

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
        </>
    );

};
