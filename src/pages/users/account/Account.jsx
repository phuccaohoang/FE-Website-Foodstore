import { use, useState } from "react";
import { Card, Tabs, Form, Input, Button, Upload, Avatar, message, Row, Col } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
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
        <Card style={{ margin: '4px auto', width: '65%  ' }}>
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
                            <Col span={8} style={{ textAlign: 'center' }}>
                                <Avatar
                                    size={200}
                                    src={avatarUrl}
                                    icon={!avatarUrl && <UserOutlined />}
                                    style={{ marginBottom: 16 }}
                                />
                                <br />
                                <Upload
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    onChange={handleAvatarChange}
                                >
                                    <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                                </Upload>
                            </Col>

                            <Col span={16}>
                                <Form.Item
                                    label="Tên"
                                    name="fullname"
                                    rules={[
                                        { required: true }
                                    ]}
                                >
                                    <Input placeholder="Nhập tên " />
                                </Form.Item>
                                <Form.Item
                                    label="Số điện thoại"
                                    name="phone"
                                    rules={[
                                        { required: true }
                                    ]}
                                >
                                    <Input placeholder="Nhập số điện thoại" minLength={10} />
                                </Form.Item>

                                <Form.Item
                                    label="Địa chỉ"
                                    name="address"
                                    rules={[
                                        { required: true }
                                    ]}
                                >
                                    <Input placeholder="Nhập địa chỉ giao hàng" />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ float: "right" }}>
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
                            <Input.Password placeholder="Nhập mật khẩu cũ" />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu mới"
                            name="newPassword"
                            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu mới" minLength={8} />
                        </Form.Item>

                        <Form.Item
                            label="Xác nhận mật khẩu"
                            name="confirmPassword"
                            rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu!" }]}
                        >
                            <Input.Password placeholder="Xác nhận mật khẩu mới" minLength={8} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ float: "right" }}>
                                Đổi mật khẩu
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </Card>
    );
};
