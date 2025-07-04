import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css'
import {
    Button, InputNumber, Typography, Divider, Image, Space, message,
    Table,
    Card,
} from 'antd';
import { EditOutlined, LoadingOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useSession } from '../../../context/SessionContext';
import cartService from '../../../services/cartService';
//
import NoImg from '../../../assets/mon2.jpg'

const { Text, Title } = Typography;


const styleButton = {
    padding: '25px 15px',
    fontSize: '20px',
    borderRadius: '18px'
}
export const Cart = () => {
    const navigate = useNavigate()

    const [selectedRows, setSelectedRows] = useState([])
    const [carts, setCarts] = useState([])
    const { user, setUser, refresh, setRefresh, setPayment, setLoading, openNotification } = useSession()



    useEffect(() => {
        const loadCart = async () => {
            setLoading(true)

            const response = await cartService.getCart()
            if (response.status) {
                setCarts(response.data.map((item, idx) => {
                    return {
                        ...item,
                        stt: idx + 1,
                        key: item.id,
                        food: item.food.name,
                        images: item.food.images,
                        total_price: ((100 - Number(item.food.discount)) / 100) * Number(item.food.price) * Number(item.quantity),
                    }
                }))
            }
            setLoading(false)

        }
        //
        loadCart()
    }, [refresh])


    console.log('user', user)



    return (<>
        {/* {contextHolder} */}

        <Card className="" style={{ width: '', margin: '10px 0' }}>
            <Title level={4} className="cart-title" style={{ fontFamily: 'Montserrat', fontSize: '30px' }}>Giỏ Hàng Của Bạn</Title>
            <Divider />
            <Table
                rowSelection={{
                    selectedRowKeys: selectedRows,
                    onChange: (items) => {
                        console.log('list', items)
                        setSelectedRows(items)
                    }
                }}
                columns={[
                    { title: 'STT', dataIndex: 'stt', width: 50 },
                    {
                        title: 'Ảnh', dataIndex: 'images', render: (images) => {
                            const img = images.length !== 0 ? `http://127.0.0.1:8000/${images[0].img}` : NoImg
                            return <>
                                <img src={img} alt={img} style={{ width: '100%' }} />
                            </>
                        }, width: '200px'
                    },
                    { title: 'Món ăn', dataIndex: 'food' },
                    {
                        title: 'Số lượng', dataIndex: 'quantity', render: (item, record) => {
                            return <>
                                <InputNumber defaultValue={item} min={1} max={10} style={{ width: 60 }} onChange={async (value) => {
                                    setLoading(true)

                                    const response = await cartService.updateCart(record.id, value)
                                    if (response.status) {
                                        openNotification('Thành công', 'Cập nhật số lượng thành công', 'success')
                                        setRefresh(!refresh)
                                    }
                                    else {
                                        openNotification('Thất bại', 'Cập nhật số lượng thất bại', 'error')

                                    }
                                    setLoading(false)

                                }}
                                />

                            </>
                        }
                    },
                    { title: 'Tổng tiền (VND)', dataIndex: 'total_price' },
                ]}
                dataSource={carts}
                pagination={false}

                footer={() => {
                    return (
                        <>
                            <div className="Footer__Table">
                                <Button style={styleButton} color="red" variant="solid"
                                    onClick={async () => {
                                        if (selectedRows.length === 0) {
                                            openNotification('Cảnh báo', 'Hãy chọn món ăn.', 'warning')
                                        }
                                        else {
                                            setLoading(true)

                                            const response = await cartService.deleteCarts({ list_id: selectedRows })
                                            if (response.status) {
                                                openNotification('Thành công', 'Xóa khỏi giỏ thành công', 'success')
                                                setUser(user => {
                                                    return {
                                                        ...user,
                                                        has_carts: user.has_carts - selectedRows.length
                                                    }
                                                })
                                                setSelectedRows([])
                                                setRefresh(!refresh)
                                            } else {
                                                openNotification('Thất bại', 'Xóa khỏi giỏ thất bại', 'error')

                                                setSelectedRows([])

                                            }
                                            setLoading(false)

                                        }
                                    }}
                                >
                                    Xóa
                                </Button>
                                <Button style={styleButton} color="primary" variant="solid"
                                    onClick={() => {
                                        if (selectedRows.length !== 0) {
                                            setPayment(item => {
                                                return {
                                                    ...item,
                                                    cart_ids: selectedRows
                                                }
                                            })
                                            navigate('/payment')
                                        } else {
                                            openNotification('Cảnh báo', 'Hãy chọn món ăn.', 'warning')

                                        }
                                    }}
                                >
                                    Thanh toán
                                </Button>
                            </div>
                        </>
                    )
                }}
            />
        </Card>
    </>
    );
};
