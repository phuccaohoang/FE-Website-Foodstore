import React from 'react';
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

    return (
        <div className="register-container">
            <Form
                form={form}
                name="register"
                layout="vertical"
                className="register-form"
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
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Tên hiển thị"
                    name="name"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu!' },
                        { type: 'name', message: 'Tên không hợp lệ' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Địa chỉ"
                    name="address"

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name="phone"

                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
