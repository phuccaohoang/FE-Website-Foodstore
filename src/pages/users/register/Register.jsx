import { NavLink, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import './register.css';
import accountService from '../../../services/accountService';
import { useSession } from '../../../context/SessionContext';


const existingUsers = ['test@example.com', 'admin@pizza.vn'];

export const Register = () => {
    const [form] = Form.useForm();
    const { contextHolder, openNotification, setLoading } = useSession()

    const onFinish = async (values) => {
        const email = values.email.trim().toLowerCase();
        setLoading(true)
        const response = await accountService.register({
            ...values,
            email: email,
        })
        if (response.status) {
            openNotification('Thành công', 'Mật khẩu đã được gửi về mail của bạn', 'success')
        } else {
            openNotification('Thất bại', 'Đã có lỗi xảy ra vui lòng thử lại', 'error')

        }
        setLoading(false)

        form.resetFields();
    };
    const navigate = useNavigate()
    return (

        <>
            <div className="register-container">
                {contextHolder}
                <Form
                    form={form}
                    name="register"
                    layout="vertical"
                    className="lrf-form Form__Input" // log in- register-for got from
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <h2 className="register-title">Tạo tài khoản</h2>

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
                        label="Tên hiển thị"
                        name="fullname"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu!' },
                            { type: 'name', message: 'Tên không hợp lệ' },
                        ]}
                    >
                        <Input size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ"
                        name="address"

                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"

                    >
                        <Input size="large" />
                    </Form.Item>
                    <div className="form-actions">
                        <NavLink className='Text__Link' to='/login'>Đã có tài khoản</NavLink>
                    </div>
                    <Form.Item>
                        <Button className='Btn__Submit' type="primary" htmlType="submit" block>
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
