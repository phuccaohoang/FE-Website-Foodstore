import { NavLink, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import './register.css';

const existingUsers = ['test@example.com', 'admin@pizza.vn'];

export const Register = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const email = values.email.trim().toLowerCase();
        if (existingUsers.includes(email)) {
            message.error('Email đã tồn tại!');
            return;
        }

        message.success('Tạo tài khoản thành công!');
        console.log('Đăng ký:', values);
        form.resetFields();
    };
    const navigate = useNavigate()
    return (

        <>
            <div className="register-container">
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
                        name="name"
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
