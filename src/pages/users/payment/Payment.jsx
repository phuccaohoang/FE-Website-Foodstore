import { Form, Input, Radio, Button, Typography, Divider, Row, Col, Card, Image, Select } from 'antd';
const { TextArea } = Input;


const { Title, Text } = Typography;
import bannerimg from '../../../assets/mon1.png'
import { useSession } from '../../../context/SessionContext';
import { useEffect, useState } from 'react';
import couponService from '../../../services/couponService';
import cartService from '../../../services/cartService';
import orderService from '../../../services/orderService';
import { useNavigate } from "react-router-dom"

//


export const Payment = () => {

    const { user, payment, setPayment } = useSession()
    const [coupons, setCoupons] = useState([])
    const [carts, setCarts] = useState([])
    const [discount, setDiscount] = useState(0)
    const [totalMoney, setTotalMoney] = useState(0)

    const delivery_cost = 15000
    const navigate = useNavigate()

    useEffect(() => {
        if (payment.cart_ids.length === 0) {
            navigate('/my-cart')
        }
        // load phieu giam gia theo khach hang
        const loadCouponsCustomer = async () => {
            const response = await couponService.getCouponsCustomer()
            if (response.status) {
                setCoupons(response.data)
            }
        }
        // load mon an khach hang muon thanh toan
        const loadCartPayment = async () => {
            const response = await cartService.getCartPayment({ list_id: payment.cart_ids })
            if (response.status) {
                setCarts(response.data.carts)
                setTotalMoney(response.data.total_money)
            }
        }
        //
        loadCartPayment()
        loadCouponsCustomer()
    }, [])

    return (
        <Card>
            <Row gutter={32}  >

                <Col xs={24} md={16}>
                    <Card style={{ marginBottom: 24, backgroundColor: '#EEEEEE' }}>
                        <Title level={5}>Thông tin người dùng</Title>
                        <Form layout="vertical"
                            onFinish={async (value) => {
                                console.log('value', value)

                                if (value.pay_method === 'cod') {

                                    setPayment((item) => {
                                        return {
                                            ...item,
                                            phone: value.phone,
                                            address: value.address,
                                            delivery_cost: value.delivery_cost,
                                            note: value.note,
                                            coupon_id: value.coupon_id,
                                        }
                                    })

                                    const response = await orderService.storeOrder({
                                        phone: value.phone,
                                        address: value.address,
                                        delivery_cost: value.delivery_cost,
                                        note: value.note,
                                        coupon_id: value.coupon_id,
                                        cart_ids: payment.cart_ids,
                                    })
                                    if (response.status) {
                                        alert(response.message)
                                        navigate('/my-cart')
                                    }
                                }
                                else {
                                    navigate('/pay-atm')
                                }

                            }}
                        >
                            <Form.Item label="Tên khách hàng">
                                <Input value={user ? user.info.fullname : null} readOnly />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                            >
                                <Input value={user ? user.email : null} readOnly />
                            </Form.Item>

                            <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true }]} initialValue={user ? user.info.phone : null}>
                                <Input placeholder="Nhập số điện thoại của bạn để đặt hàng" defaultValue={user ? user.info.phone : null} />
                            </Form.Item>
                            <Form.Item label="Địa chỉ giao hàng" name="address" rules={[{ required: true }]} initialValue={user ? user.info.address : null}>
                                <Input placeholder="Nhập địa chỉ cần giao cho đơn hàng" defaultValue={user ? user.info.address : null} />
                            </Form.Item>
                            <Form.Item label="Phí giao hàng*" name="delivery_cost" rules={[{ required: true }]} initialValue={delivery_cost}>
                                <Input name="delivery_cost" value={delivery_cost} readOnly />
                            </Form.Item>
                            <Form.Item label="Phieu giam gia" name="coupon_id" rules={[{ required: true }]}>
                                <Select
                                    style={{ width: '100%', }}
                                    onChange={(value) => {
                                        if (value) {

                                            const selectedCoupon = coupons.find(item => item.id === value);
                                            setDiscount(selectedCoupon.discount)
                                        }
                                        else {
                                            setDiscount(0)
                                        }
                                    }}
                                    options={[
                                        ...(coupons.map((item) => {
                                            return {
                                                value: item.id,
                                                label: item.name,
                                            }
                                        })),
                                        {
                                            value: 0,
                                            label: 'Không'
                                        },
                                    ]}

                                />
                            </Form.Item>
                            <Form.Item label="Ghi chú khách hàng" name="note" >
                                <TextArea
                                    placeholder="Nhập ghi chú (nếu có)."
                                    rows={4}
                                />
                            </Form.Item>

                            <Form.Item name="pay_method" initialValue={'cod'}>

                                <Row>
                                    <Title level={5}>Phương thức thanh toán</Title>
                                    <Radio.Group style={{ width: '100%' }} defaultValue="cod">
                                        <Row gutter={[16, 12]}>
                                            <Col span={12}>
                                                <Radio value={'cod'}>COD</Radio>
                                            </Col>
                                            <Col span={12}>
                                                <Radio value={'atm'}>The ATM</Radio>
                                            </Col>
                                        </Row>
                                    </Radio.Group>
                                </Row>
                            </Form.Item>


                            <Button
                                htmlType='submit'
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
                        </Form>
                    </Card>
                </Col>

                <Col xs={24} md={8}>
                    <Card style={{ backgroundColor: '#EEEEEE' }} >
                        <Title level={5}>Đơn Hàng Của Bạn</Title>
                        <div style={{ marginBottom: 16 }}>
                            <div>
                                <Text>Tổng Đơn Hàng: </Text><Text strong>{totalMoney} VND</Text>
                            </div>
                            <div>
                                <Text>Phiếu Giảm Giá: </Text><Text type="danger">{discount} VND</Text>
                            </div>
                            <div>
                                <Text>Phí Giao Hàng: </Text><Text>{delivery_cost} VND</Text>
                            </div>
                            <Divider />
                            <div>
                                <Text strong style={{ color: 'red' }}>Tổng Tiền Phải Trả: </Text>
                                <Text strong style={{ color: 'red' }}>155,000 ₫</Text>
                            </div>
                        </div>

                        {
                            carts.length > 0 ? carts.map((item) => {
                                return <>
                                    <div>
                                        <Text>{item.quantity} x <strong>{item.food.name}</strong></Text>
                                        <div style={{ fontSize: 12 }}>
                                            <p>{item.food.description}</p>
                                        </div>
                                        <Image src={bannerimg} width={100} style={{ marginTop: 8, borderRadius: 6 }} />
                                    </div>
                                </>
                            }) : null
                        }
                    </Card>
                </Col>
            </Row>
        </Card >
    );
};
