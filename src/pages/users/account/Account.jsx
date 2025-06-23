import { useState } from "react";
import { Card, Tabs, Form, Input, Button, Upload, Avatar, message, Row, Col } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

export const Account = () => {
    const [avatarUrl, setAvatarUrl] = useState(null);

    const handleAvatarChange = (info) => {
        if (info.file.status === "done") {
            const url = URL.createObjectURL(info.file.originFileObj);
            setAvatarUrl(url);
            message.success("Đã cập nhật ảnh đại diện!");
        }
    };

    const onProfileFinish = (values) => {
        console.log("Thông tin cá nhân:", values);
        message.success("Cập nhật thông tin cá nhân thành công!");
    };

    const onPasswordFinish = (values) => {
        if (values.newPassword !== values.confirmPassword) {
            message.error("Mật khẩu xác nhận không khớp!");
            return;
        }
        console.log("Đổi mật khẩu:", values);
        message.success("Mật khẩu đã được thay đổi!");
    };

    return (
        <Card style={{ margin: '4px auto', width: '65%  ' }}>
            <Tabs defaultActiveKey="1" tabBarGutter={32}>
                <TabPane tab="Thông tin cá nhân" key="1">
                    <Form
                        layout="vertical"
                        onFinish={onProfileFinish}
                        initialValues={{
                            phone: "0912345678",
                            address: "123 Nguyễn Trãi, Hà Nội",
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
                                    name="name"

                                >
                                    <Input placeholder="Nhập tên " />
                                </Form.Item>
                                <Form.Item
                                    label="Số điện thoại"
                                    name="phone"
                                >
                                    <Input placeholder="Nhập số điện thoại" />
                                </Form.Item>

                                <Form.Item
                                    label="Địa chỉ"
                                    name="address"
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
                    <Form layout="vertical" onFinish={onPasswordFinish}
                        className='Form__Account'>
                        <Form.Item
                            label="Mật khẩu hiện tại"
                            name="currentPassword"
                            rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu cũ" />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu mới"
                            name="newPassword"
                            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu mới" />
                        </Form.Item>

                        <Form.Item
                            label="Xác nhận mật khẩu"
                            name="confirmPassword"
                            rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu!" }]}
                        >
                            <Input.Password placeholder="Xác nhận mật khẩu mới" />
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
