import { Form, Input, Button, message } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import './forgotpassword.css';
import accountService from '../../../services/accountService';

export const ForgotPassword = () => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const email = values.email.trim().toLowerCase();

        const response = await accountService.forgotPassword({
            email: email,
        })
        if (response.status) {
            alert(response.message)
        }
        form.resetFields();
    };
    const navigate = useNavigate()

    return (
        <div className="forgot-container">
            <Form
                form={form}
                name="forgot-password"
                layout="vertical"
                className="lrf-form Form__Input" // log in- register-for got from
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
                <div className="form-actions">
                    <NavLink className='Text__Link' to='/login'>Đã có tài khoản</NavLink>
                </div>
                <Form.Item>
                    <Button className='Btn__Submit' type="primary" htmlType="submit" block>
                        Gửi
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
