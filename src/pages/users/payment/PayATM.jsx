import { useState } from 'react';
import { Row, Col, Card, Typography, Input, Button, Tabs, Divider } from 'antd';
import { CreditCardOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export const PayATM = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    return (
        <>
            <div style={{ maxWidth: '800px', margin: '20px  auto' }}>


                <Card style={{ marginBottom: '20px' }}>
                    <Title level={5}>Thông tin đơn hàng</Title>

                    <Row align="middle" gutter={8} style={{ marginBottom: 12 }}>
                        <Col>
                            <img src="/logo.jpg" alt="ATM" style={{ height: 24 }} />
                        </Col>
                        <Col>
                            <Text strong>FOODSTORE Online</Text>
                        </Col>
                    </Row>

                    <Divider style={{ margin: '12px 0' }} />

                    <Row style={{ marginBottom: 8 }}>
                        <Col span={12}><Text>Giá trị đơn hàng:</Text></Col>
                        <Col span={12}><Text strong>₫175.000</Text></Col>
                    </Row>

                    <Row style={{ marginBottom: 8 }}>
                        <Col span={12}><Text>Số tiền thanh toán:</Text></Col>
                        <Col span={12}><Text strong style={{ color: '#1890ff' }}>₫175.000</Text></Col>
                    </Row>

                    <Divider style={{ margin: '12px 0' }} />

                    <Row style={{ marginBottom: 8 }}>
                        <Col span={12}><Text>Mã giao dịch:</Text></Col>
                        <Col span={12}><Text>12345678</Text></Col>
                    </Row>

                    <Row style={{ marginBottom: 8 }}>
                        <Col span={12}><Text>Nội dung:</Text></Col>
                        <Col span={12}><Text>Thanh toán tại FOODSTORE nè ta nói nó xịn gì đâu ahihi haha huhu</Text></Col>
                    </Row>
                </Card>




                <Card>
                    <Title level={5}>Nhập thông tin thẻ</Title>
                    <Tabs defaultActiveKey="atm">
                        <TabPane tab="Thẻ ATM" key="atm">
                            <Row style={{ marginBottom: 16 }}>
                                <Col span={24}>
                                    <Input
                                        size="large"
                                        placeholder="Nhập số thẻ"
                                        prefix={<CreditCardOutlined />}
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                    />
                                </Col>
                            </Row>

                            <Row style={{ marginBottom: 16 }}>
                                <Col span={24}>
                                    <Input
                                        size="large"
                                        placeholder="Tên trên thẻ (không dấu)"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                    />
                                </Col>
                            </Row>

                            <Row gutter={16} align="middle">

                                <Col span={6} style={{ textAlign: 'left', textDecorationLine: 'underline', textDecorationColor: 'blue' }}>
                                    <NavLink className='Text__Link' to='/'>Hủy giao dịch</NavLink>

                                </Col>
                                <Col span={10} offset={8}>
                                    <Button
                                        type="primary"
                                        size="large"
                                        block
                                        style={{
                                            fontWeight: 'bold',
                                            borderRadius: 6,
                                        }}
                                    >
                                        Thanh toán
                                    </Button>
                                </Col>
                            </Row>
                        </TabPane>
                    </Tabs>
                </Card>




            </div>
        </>
    );
};


