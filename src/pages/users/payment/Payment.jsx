import './payment.css'
import { Form, Input, Radio, Button, Typography, Divider, Row, Col, Card, Image, Select, Space } from 'antd';

const { Title, Text } = Typography;
import bannerimg from '../../../assets/mon1.png'

const paymentOptions = [
    { label: 'Ví điện tử', value: 'e-wallet' },
    { label: 'Tiền mặt', value: 'cash' },
];

const handleChange = value => {
    console.log(`selected ${value}`);
};


export const Payment = () => {
    return (
        <div style={{ backgroundColor: '#f6f7f9', width: ' 65%', margin: '4px auto', padding: '24px 60px' }}>
            <Row gutter={32} align="start">

                <Col xs={24} md={16}>
                    <Card style={{ marginBottom: 24, backgroundColor: '#CCCCCC' }}>
                        <Title level={5}>Thông tin người dùng</Title>
                        <Form layout="vertical">
                            <Form.Item label="Tên khách hàng*" name="name" rules={[{ required: true }]}>
                                <Input placeholder="Nhập tên khách hàng" />
                            </Form.Item>
                            <Form.Item
                                label="Email*"
                                name="email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email' },
                                    { type: 'email', message: 'Email không hợp lệ' },
                                ]}>
                                <Input placeholder="Nhập email của bạn" />

                            </Form.Item>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                Kiểm tra đơn hàng ở hộp thư đến hoặc thư mục spam
                            </Text>
                            <Form.Item label="Số điện thoại*" name="phone" rules={[{ required: true }]}>
                                <Input placeholder="Nhập số điện thoại của bạn để đặt hàng" />
                            </Form.Item>
                            <Form.Item label="Địa chỉ giao hàng*" name="adress" rules={[{ required: true }]}>
                                <Input placeholder="Nhập địa chỉ cần giao cho đơn hàng" />
                            </Form.Item>
                            <Form.Item label="Phí giao hàng*" name="adress" rules={[{ required: true }]}>
                                <Title level={5}> 15000 Đồng</Title>
                            </Form.Item>
                        </Form>
                    </Card>

                    <Card style={{ marginBottom: 24, backgroundColor: '#CCCCCC' }}>

                        <Space style={{ width: '100%', }}>
                            <Title level={5}>Mã giảm giá</Title>

                            <Select
                                defaultValue="0"
                                style={{ width: 100, }}
                                onChange={handleChange}
                                options={[
                                    { value: '0', label: 'Không' },
                                    { value: '1', label: 'Giảm 10%' },
                                    { value: '2', label: 'Giảm 20%' },
                                ]}

                            />

                        </Space>
                    </Card>

                    <Card style={{ marginBottom: 24, backgroundColor: '#CCCCCC' }}>
                        <Title level={5}>Phương thức thanh toán</Title>
                        <Radio.Group style={{ width: '100%' }} defaultValue="cash">
                            <Row gutter={[16, 12]}>
                                {paymentOptions.map((method) => (
                                    <Col span={12} key={method.value}>
                                        <Radio value={method.value}>{method.label}</Radio>
                                    </Col>
                                ))}
                            </Row>
                        </Radio.Group>
                    </Card>




                </Col>


                <Col xs={24} md={8}>
                    <Card style={{ backgroundColor: '#CCCCCC' }}>
                        <Title level={5}>Đơn Hàng Của Bạn</Title>
                        <div style={{ marginBottom: 16 }}>
                            <div>
                                <Text>Tổng: </Text><Text strong>155,000₫</Text>
                            </div>
                            <div>
                                <Text>Giảm K.Mãi: </Text><Text type="danger">0₫</Text>
                            </div>
                            <div>
                                <Text>Giảm Vouchers: </Text><Text type="danger">0₫</Text>
                            </div>
                            <div>
                                <Text>Phí Giao Hàng: </Text><Text>0₫</Text>
                            </div>
                            <Divider />
                            <div>
                                <Text strong style={{ color: 'red' }}>Tổng Cộng: </Text>
                                <Text strong style={{ color: 'red' }}>155,000 ₫</Text>
                            </div>
                        </div>

                        <div>
                            <Text>1 x <strong>Pizza Phô Mai Truyền Thống</strong></Text>
                            <div style={{ fontSize: 12 }}>
                                <div>Đế Dày Bột Tươi</div>
                                <div>Cỡ 9 Inch</div>
                            </div>
                            <Image src={bannerimg} width={100} style={{ marginTop: 8, borderRadius: 6 }} />
                        </div>
                        <div>
                            <Text>1 x <strong>Pizza Phô Mai Truyền Thống</strong></Text>
                            <div style={{ fontSize: 12 }}>
                                <div>Đế Dày Bột Tươi</div>
                                <div>Cỡ 9 Inch</div>
                            </div>
                            <Image src={bannerimg} width={100} style={{ marginTop: 8, borderRadius: 6 }} />
                        </div>
                        <div>
                            <Text>1 x <strong>Pizza Phô Mai Truyền Thống</strong></Text>
                            <div style={{ fontSize: 12 }}>
                                <div>Đế Dày Bột Tươi</div>
                                <div>Cỡ 9 Inch</div>
                            </div>
                            <Image src={bannerimg} width={100} style={{ marginTop: 8, borderRadius: 6 }} />
                        </div>
                    </Card>

                    <Button
                        type='primary'
                        block
                        size="large"
                        style={{
                            marginTop: 20,
                            fontWeight: 'bold',
                            borderRadius: 6,
                        }}
                    >
                        HOÀN TẤT THANH TOÁN
                    </Button>
                </Col>
            </Row>
        </div >
    );
};
