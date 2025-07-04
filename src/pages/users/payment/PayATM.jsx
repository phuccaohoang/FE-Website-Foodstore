import { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Input, Button, Tabs, Divider, Result, Modal } from 'antd';
import { CreditCardOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.jpg';
import { useSession } from '../../../context/SessionContext';
import orderService from '../../../services/orderService';
const { Title, Text } = Typography;
const { TabPane } = Tabs;

export const PayATM = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');

    const { user, setUser, contextHolder, openNotification, payment } = useSession()
    const navigate = useNavigate()
    const [openMessage, setOpenMessage] = useState(false)

    useEffect(() => {
        if (payment.cart_ids.length === 0) {
            navigate('/my-cart')
        }
    }, [])
    return (
        <>

            <div style={{ maxWidth: '800px', margin: '20px  auto' }}>
                <Card style={{ marginBottom: '20px' }}>
                    <Title style={{ fontSize: '30px' }} level={5}>Thông tin đơn hàng</Title>

                    <Row align="middle" gutter={8} style={{ marginBottom: 12 }}>
                        <Col>
                            <img src={logo} alt="ATM" style={{ height: 100 }} />
                        </Col>
                        <Col>
                            <Text style={{ fontSize: '20px' }} strong>FOODSTORE</Text>
                        </Col>
                    </Row>

                    <Divider style={{}} />

                    <Row style={{ marginBottom: 8, marginBottom: '10px' }}>
                        <Col span={12}><Text style={{ fontSize: '20px' }}>Giá trị đơn hàng:</Text></Col>
                        <Col span={12}><Text style={{ fontSize: '20px' }} strong>{payment.total_amount} VND</Text></Col>
                    </Row>



                    <Row style={{ marginBottom: 8, marginBottom: '10px' }}>

                        <Col span={12}><Text style={{ fontSize: '20px' }}>Mã giao dịch:</Text></Col>
                        <Col span={12}><Text style={{ fontSize: '20px' }}>TX7583920146</Text></Col>
                    </Row>

                    <Row style={{ marginBottom: 8, marginBottom: '10px' }}>
                        <Col span={12}><Text style={{ fontSize: '20px' }}>Nội dung:</Text></Col>
                        <Col span={12}><Text style={{ fontSize: '20px' }}>{user.fullname} thanh toán đơn hàng giá trị {payment.total_amount} VND</Text></Col>
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
                                        onChange={(e) => setCardName(String(e.target.value).toUpperCase())}
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
                                        onClick={async () => {
                                            const CardATM = [
                                                {
                                                    cardNumber: '1010 1212 1010 1212',
                                                    cardName: 'LE XUAN THINH',
                                                }
                                            ]

                                            for (const item of CardATM) {
                                                if (item.cardNumber !== cardNumber || item.cardName !== cardName) {
                                                    openNotification('Thất bại', 'Thanh toán không thành công', 'error')
                                                    return
                                                }
                                                const response = await orderService.storeOrder({
                                                    phone: payment.phone,
                                                    address: payment.address,
                                                    delivery_cost: payment.delivery_cost,
                                                    note: payment.note,
                                                    coupon_id: payment.coupon_id,
                                                    cart_ids: payment.cart_ids,
                                                    is_payment: 1,
                                                })
                                                if (response.status) {
                                                    setUser(user => {
                                                        return {
                                                            ...user,
                                                            has_carts: user.has_carts - payment.cart_ids.length
                                                        }

                                                    })
                                                    setOpenMessage(true)


                                                }
                                                else {
                                                    openNotification('Thất bại', 'Thanh toán không thành công', 'error')


                                                }
                                            }
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

            <Modal
                footer={false}
                open={openMessage}
                onCancel={() => {
                    setOpenMessage(false)
                    navigate('/my-cart')
                }}
                centered={true}
                width={800}
            >
                <Result
                    status="success"
                    title="Đơn hàng đã đặt thành công!"
                    extra={[
                        <Button type="primary" key="console" style={{ padding: '20px 30px', fontSize: '20px' }} onClick={() => navigate('/my-order')}>
                            Xem đơn hàng
                        </Button>,
                        <Button key="buy" style={{ padding: '20px 30px', fontSize: '20px', marginLeft: 20 }} onClick={() => navigate('/explore')}>Mua tiếp</Button>,
                    ]}
                />
            </Modal>
        </>
    );
};


