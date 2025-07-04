import '../../users/login/login.css'
import { Button, Form, Input } from 'antd';
import accountService from '../../../services/accountService';
import { useSession } from '../../../context/SessionContext';

export const LoginAdmin = () => {
    const { setLoading, setUser, openNotification } = useSession()


    return (
        <div className="Login__Admin_container">
            <Form
                name="basic"
                layout="vertical"
                className="lrf-form Form__Input"
                initialValues={{ remember: true }}
                onFinish={async (value) => {
                    setLoading(true)

                    const response = await accountService.login(value.email, value.password, 1)
                    if (response.status) {
                        const response2 = await accountService.me()
                        if (response2.status) {
                            openNotification('Thành công', 'Đăng nhập thành công.', 'success')
                            setUser({ ...response2.data })
                        } else {
                            openNotification('Thất bại', 'Lấy dữ liệu thất bại.', 'error')


                        }

                    } else {
                        openNotification('Thất bại', 'Đăng nhập thất bại.', 'error')

                    }
                    setLoading(false)

                }}

                autoComplete="off"
            >
                <h2 className="login-title" >Đăng Nhập Quản Trị</h2>

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



                <Form.Item>
                    <Button className='Btn__Submit' type="primary" htmlType="submit" block style={{ marginTop: '20px' }}>
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
