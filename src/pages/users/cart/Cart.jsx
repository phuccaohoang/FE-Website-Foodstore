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
    const { user, setUser, refresh, setRefresh, setPayment, contextHolder, openNotification } = useSession()



    useEffect(() => {
        const loadCart = async () => {
            const response = await cartService.getCart()
            if (response.status) {
                setCarts(response.data.map((item, idx) => {
                    return {
                        ...item,
                        stt: idx + 1,
                        key: item.id,
                        food: item.food.name,
                        total_price: ((100 - Number(item.food.discount)) / 100) * Number(item.food.price) * Number(item.quantity),
                    }
                }))
            }
        }
        //
        loadCart()
    }, [refresh])


    console.log('user', user)



    return (<>
        {contextHolder}

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
                    { title: 'STT', dataIndex: 'stt' },
                    { title: 'Anh', dataIndex: 'image' },
                    { title: 'Mon an', dataIndex: 'food' },
                    {
                        title: 'So luong', dataIndex: 'quantity', render: (item, record) => {
                            return <>
                                <InputNumber defaultValue={item} min={1} max={10} style={{ width: 60 }} onChange={async (value) => {

                                    const response = await cartService.updateCart(record.id, value)
                                    if (response.status) {
                                        alert(response.message)
                                        setRefresh(!refresh)
                                    }
                                }}
                                />

                            </>
                        }
                    },
                    { title: 'Tong tien', dataIndex: 'total_price' },
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
                                            openNotification('warning', '0 row selected.')
                                        }
                                        else {
                                            const response = await cartService.deleteCarts({ list_id: selectedRows })
                                            if (response.status) {
                                                openNotification('success', 'description.')
                                                setUser(user => {
                                                    return {
                                                        ...user,
                                                        has_carts: user.has_carts - selectedRows.length
                                                    }
                                                })
                                                setSelectedRows([])
                                                setRefresh(!refresh)
                                            } else {
                                                openNotification('error', 'description.')
                                                setSelectedRows([])

                                            }
                                        }
                                    }}
                                >
                                    Xoa
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
                                            openNotification('warning', '0 row selected.')

                                        }
                                    }}
                                >
                                    Thanh toan
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
