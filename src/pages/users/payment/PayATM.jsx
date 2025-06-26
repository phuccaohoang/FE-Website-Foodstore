import { useState } from 'react';
import { Row, Col, Card, Typography, Input, Button, Tabs, Divider } from 'antd';
import { CreditCardOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.jpg';
const { Title, Text } = Typography;
const { TabPane } = Tabs;

export const PayATM = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    return (
        <>
            <div style={{ maxWidth: '800px', margin: '20px  auto' }}>
                <Card style={{ marginBottom: '20px' }}>
                    <Title style={{ fontSize: '30px' }} level={5}>Thông tin đơn hàng</Title>

                    <Row align="middle" gutter={8} style={{ marginBottom: 12 }}>
                        <Col>
                            <img src={logo} alt="ATM" style={{ height: 24 }} />
                        </Col>
                        <Col>
                            <Text style={{ fontSize: '20px' }} strong>FOODSTORE</Text>
                        </Col>
                    </Row>

                    <Divider style={{}} />

                    <Row style={{ marginBottom: 8, marginBottom: '10px' }}>
                        <Col span={12}><Text style={{ fontSize: '20px' }}>Giá trị đơn hàng:</Text></Col>
                        <Col span={12}><Text style={{ fontSize: '20px' }} strong>₫175.000</Text></Col>
                    </Row>



                    <Row style={{ marginBottom: 8, marginBottom: '10px' }}>

                        <Col span={12}><Text style={{ fontSize: '20px' }}>Mã giao dịch:</Text></Col>
                        <Col span={12}><Text style={{ fontSize: '20px' }}>12345678</Text></Col>
                    </Row>

                    <Row style={{ marginBottom: 8, marginBottom: '10px' }}>
                        <Col span={12}><Text style={{ fontSize: '20px' }}>Nội dung:</Text></Col>
                        <Col span={12}><Text style={{ fontSize: '20px' }}>Thanh toán tại FOODSTORE nè ta nói nó xịn gì đâu ahihi haha huhu</Text></Col>
                    </Row>
                </Card>

                <Card>
                    <Title style={{ fontSize: '30px' }} level={5}>Nhập thông tin thẻ</Title>
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


