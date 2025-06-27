import { use, useState } from "react";
import { Card, Tabs, Form, Input, Button, Upload, Avatar, message, Row, Col, Tooltip } from "antd";
import { PlusCircleFilled, UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useSession } from "../../../context/SessionContext";
import accountService from "../../../services/accountService";
import avatar from "../../../assets/avatar.jpg";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

export const Account = () => {
    const { user, setUser, contextHolder, openNotification } = useSession()
    const [form] = Form.useForm()
    const navigate = useNavigate()


    const baseUrl = 'http://127.0.0.1:8000/'
    const url = user.avatar ? `${baseUrl}${user.avatar}` : avatar


    return (
        <>
            {contextHolder}
            <Card style={{ margin: '10px 0', width: '' }}>
                <Tabs defaultActiveKey="1" tabBarGutter={32}>
                    <TabPane tab="Thông tin cá nhân" key="1">
                        <Form
                            layout="vertical"
                            onFinish={async (value) => {
                                const response = await accountService.updateCustomer(value.address, value.phone, value.fullname)
                                if (response.status) {
                                    setUser(item => {
                                        return {
                                            ...item,
                                            info: {
                                                phone: value.phone,
                                                fullname: value.fullname,
                                                address: value.address,
                                            },
                                        }
                                    })
                                    openNotification('success', 'description')
                                }
                                else {
                                    openNotification('error', 'description')

                                }
                            }}
                            initialValues={{
                                phone: user.phone,
                                fullname: user.fullname,
                                address: user.address,
                            }}
                            className='Form__Account'
                        >
                            <Row gutter={32}>
                                <Col span={8} >
                                    <Tooltip title="Click de chon anh" placement="bottom">

                                        <Upload
                                            className="Avatar__Customer"
                                            showUploadList={false}
                                            multiple={false}
                                            maxCount={1}
                                            onChange={async (value) => {
                                                const formData = new FormData()
                                                formData.append('image', value.file.originFileObj)
                                                const response = await accountService.updateAvatar(formData);
                                                if (response.status) {
                                                    // alert(response.message)
                                                    openNotification('success', 'description')

                                                    navigate(0)
                                                }
                                                else {
                                                    openNotification('error', 'description')

                                                }
                                            }}
                                            style={{ overflow: "hidden", width: '100%', height: "300px", textAlign: 'center' }}
                                        >

                                            <img style={{ height: '100%', aspectRatio: '1', borderRadius: '50%' }} src={url} />
                                        </Upload>
                                    </Tooltip>
                                </Col>

                                <Col span={16}>
                                    <Form.Item
                                        label="Tên"
                                        name="fullname"
                                        rules={[
                                            { required: true }
                                        ]}
                                    >
                                        <Input size="large" placeholder="Nhập tên " />
                                    </Form.Item>
                                    <Form.Item
                                        label="Số điện thoại"
                                        name="phone"
                                        rules={[
                                            { required: true }
                                        ]}
                                    >
                                        <Input size="large" placeholder="Nhập số điện thoại" minLength={10} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Địa chỉ"
                                        name="address"
                                        rules={[
                                            { required: true }
                                        ]}
                                    >
                                        <Input size="large" placeholder="Nhập địa chỉ giao hàng" />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button size="large" type="primary" htmlType="submit" style={{ float: "right" }}>
                                            Lưu thay đổi
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </TabPane>

                    <TabPane tab="Đổi mật khẩu" key="2">
                        <Form layout="vertical" onFinish={async (values) => {
                            if (values.newPassword !== values.confirmPassword) {
                                openNotification('warning', 'description')

                                return;
                            }
                            const response = await accountService.updatePassword(values.newPassword, values.oldPassword)
                            if (response.status) {
                                openNotification('success', 'description')

                                form.resetFields()
                            }
                            else {
                                openNotification('error', 'description')

                            }
                        }}
                            className='Form__Account'
                            form={form}
                        >
                            <Form.Item
                                label="Mật khẩu hiện tại"
                                name="oldPassword"
                                rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
                            >
                                <Input.Password size="large" placeholder="Nhập mật khẩu cũ" />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu mới"
                                name="newPassword"
                                rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
                            >
                                <Input.Password size="large" placeholder="Nhập mật khẩu mới" minLength={8} />
                            </Form.Item>

                            <Form.Item
                                label="Xác nhận mật khẩu"
                                name="confirmPassword"
                                rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu!" }]}
                            >
                                <Input.Password size="large" placeholder="Xác nhận mật khẩu mới" minLength={8} />
                            </Form.Item>

                            <Form.Item>
                                <Button size="large" type="primary" htmlType="submit" style={{ float: "right" }}>
                                    Đổi mật khẩu
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                </Tabs>
            </Card>
        </>
    );
};
