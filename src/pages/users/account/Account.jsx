import { use, useState } from "react";
import { Card, Tabs, Form, Input, Button, Upload, Avatar, message, Row, Col, Tooltip } from "antd";
import { PlusCircleFilled, UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useSession } from "../../../context/SessionContext";
import accountService from "../../../services/accountService";

const { TabPane } = Tabs;

export const Account = () => {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const { user, setUser } = useSession()
    const [form] = Form.useForm()

    const handleAvatarChange = (info) => {
        if (info.file.status === "done") {
            const url = URL.createObjectURL(info.file.originFileObj);
            setAvatarUrl(url);
            message.success("Đã cập nhật ảnh đại diện!");
        }
    };





    return (
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
                                alert(response.message)
                            }
                        }}
                        initialValues={{
                            phone: user.info.phone,
                            fullname: user.info.fullname,
                            address: user.info.address,
                        }}
                        className='Form__Account'
                    >
                        <Row gutter={32}>
                            <Col span={8} >
                                <Tooltip title="Click de chon anh" placement="bottom">

                                    <Upload
                                        className="Avatar__Customer"
                                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                        listType="picture-circle"
                                        fileList={[]}
                                        onPreview={null}
                                        onChange={null}
                                        style={{ overflow: "hidden", width: '300px', height: "300px", }}
                                    >

                                        <img style={{ width: '100%', aspectRatio: '1' }} src="https://vcdn1-vnexpress.vnecdn.net/2020/10/13/2-3-1602582609-1529-1602583414.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=HBytwvWn3vKhai8a8Bu_Ig" />
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
                            alert("Mật khẩu xác nhận không khớp!");
                            return;
                        }
                        const response = await accountService.updatePassword(values.newPassword, values.oldPassword)
                        if (response.status) {
                            alert(response.message)
                            form.resetFields()
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
    );
};
