import { Form, Input, Radio, Button, Typography, Divider, Row, Col, Card, Image, Select, Modal, Result } from 'antd';
const { TextArea } = Input;


const { Title, Text } = Typography;
import NoImg from '../../../assets/mon1.png'
import { useSession } from '../../../context/SessionContext';
import { use, useEffect, useState } from 'react';
import couponService from '../../../services/couponService';
import cartService from '../../../services/cartService';
import orderService from '../../../services/orderService';
import { useNavigate } from "react-router-dom"
const { Option } = Select;
//

export const Payment = () => {

    const { user, setUser, payment, setPayment, setLoading, openNotification } = useSession()
    const [coupons, setCoupons] = useState([])
    const [carts, setCarts] = useState([])
    const [discount, setDiscount] = useState(0)
    const [totalMoney, setTotalMoney] = useState(0)
    const [deliveryCost, setDeliveryCost] = useState(30000)
    const [openMessage, setOpenMessage] = useState(false)

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
        <>
            <Row gutter={32} style={{ margin: '10px 0' }}>

                <Col xs={24} md={16}>
                    <Card style={{ marginBottom: 24, }}>
                        <Title level={6}>Thông tin người dùng</Title>
                        <Form layout="vertical"
                            onFinish={async (value) => {
                                console.log('value', value)


                                setPayment((item) => {
                                    return {
                                        ...item,
                                        phone: value.phone,
                                        address: value.address,
                                        delivery_cost: deliveryCost,
                                        note: value.note,
                                        coupon_id: value.coupon_id,
                                        total_amount: totalMoney + deliveryCost - discount,
                                    }
                                })
                                if (value.pay_method === 'cod') {
                                    setLoading(true)

                                    const response = await orderService.storeOrder({
                                        phone: value.phone,
                                        address: value.address,
                                        delivery_cost: deliveryCost,
                                        note: value.note,
                                        coupon_id: value.coupon_id,
                                        cart_ids: payment.cart_ids,
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
                                        openNotification('Thất bại', 'Thêm đơn hàng thất bại, đã có lỗi xảy ra vui lòng thử lại sau.', 'error')

                                    }
                                    setLoading(false)

                                }
                                else {
                                    navigate('/pay-atm')
                                }

                            }}
                        >
                            <Form.Item label="Tên khách hàng">
                                <Input value={user ? user.fullname : null} readOnly />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                            >
                                <Input value={user ? user.email : null} readOnly />
                            </Form.Item>

                            <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: 'Không được bỏ trống' }]} initialValue={user ? user.phone : null}>
                                <Input placeholder="Nhập số điện thoại của bạn để đặt hàng" defaultValue={user ? user.phone : null} />
                            </Form.Item>
                            <Form.Item label="Địa chỉ giao hàng" rules={[{ required: true, message: 'Không được bỏ trống' }]} name='address'>
                                <Input placeholder="Nhập địa chỉ cần giao cho đơn hàng"
                                    onChange={(e) => {
                                        const address = String(e.target.value).toLowerCase()
                                        const keywords = [
                                            'quận 1',
                                            'quận 3',
                                            'quận 4',
                                            'quận 5',
                                            'quận bình thạnh',
                                            'quận phú nhuận',
                                            'thủ đức'
                                        ];
                                        for (const keyword of keywords) {
                                            if (address.includes(keyword)) {
                                                setDeliveryCost(15000)
                                                return
                                            }
                                        }

                                        setDeliveryCost(30000)
                                        return
                                    }}
                                />
                            </Form.Item>

                            <Form.Item label="Phiếu giảm giá" name="coupon_id" rules={[{ required: true, message: 'Không được bỏ trống' }]}>
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
                                >
                                    <Option value={0}>Khong co</Option>
                                    {
                                        coupons.length !== 0 ? coupons.map((item) => {
                                            return <Option disabled={item.min_order_value > totalMoney} value={item.id}>{`${item.name} - So luong ${item.quantity} - ${item.description}`}</Option>
                                        }) : null
                                    }
                                </Select>
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
                    <Card style={{}} >
                        <Title level={6}>Đơn Hàng Của Bạn</Title>
                        <div style={{ marginBottom: 16 }}>
                            <div>
                                <Text style={{ fontSize: 20 }}>Tổng Đơn Hàng: </Text><Text strong style={{ fontSize: 20 }}>{totalMoney} VND</Text>
                            </div>
                            <div>
                                <Text style={{ fontSize: 20 }}>Phiếu Giảm Giá: </Text ><Text style={{ fontSize: 20 }} type="">{discount} VND</Text>
                            </div>
                            <div>
                                <Text style={{ fontSize: 20 }}>Phí Giao Hàng: </Text><Text style={{ fontSize: 20 }}>{deliveryCost} VND</Text>
                            </div>
                            <Divider />
                            <div >
                                <Text strong style={{ color: 'red', fontSize: 25 }}>Tổng Tiền Phải Trả: </Text>
                                <Text strong style={{ color: 'red', fontSize: 25 }}>{totalMoney + deliveryCost - discount} VND</Text>
                            </div>
                        </div>

                        {
                            carts.length > 0 ? carts.map((item) => {
                                const img = item.food.images.length !== 0 ? `http://127.0.0.1:8000/${item.food.images[0].img}` : NoImg
                                return <>
                                    <div>
                                        <Text style={{ fontSize: 20 }}>{item.quantity} x <strong>{item.food.name}</strong> - <span>{(100 - Number(item.food.discount)) / 100 * Number(item.food.price) * item.quantity} VND</span></Text>
                                        <div style={{ fontSize: 18 }}>
                                            <p>{item.food.description}</p>
                                        </div>
                                        <Image src={img} width={150} style={{ marginTop: 8, borderRadius: 6, }} />
                                    </div>
                                </>
                            }) : null
                        }
                    </Card>
                </Col>
            </Row>
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
