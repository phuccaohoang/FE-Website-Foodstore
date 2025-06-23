import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css'
import {
    Button, InputNumber, Typography, Divider, Image, Space, message,
    Table,
} from 'antd';
import { EditOutlined, LoadingOutlined, PlusCircleOutlined } from '@ant-design/icons';
import logo from '../../../assets/logo.jpg'
import mon from '../../../assets/mon2.jpg'
import { useSession } from '../../../context/SessionContext';
import cartService from '../../../services/cartService';

const { Text, Title } = Typography;


const styleButton = {
    padding: '10px 15px',
}
export const Cart = () => {
    const navigate = useNavigate()

    const [selectedRows, setSelectedRows] = useState([])
    const [carts, setCarts] = useState([])
    const { user, setUser, refresh, setRefresh } = useSession()
    const [disabled, setDisabled] = useState(true)
    const [quantity, setQuantity] = useState(0)



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





    return (
        <div className="cart-container" style={{ width: '65%', margin: '4px auto' }}>
            <Title level={4} className="cart-title" style={{ fontFamily: 'sans-serif' }}>Giỏ Hàng Của Bạn</Title>

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
                                <InputNumber defaultValue={item} min={1} max={10} style={{ width: 60 }} onChange={(value) => {
                                    setDisabled(false)
                                    setQuantity(value)
                                }}
                                />
                                <> </>
                                <Button
                                    disabled={disabled}
                                    onClick={async () => {
                                        const response = await cartService.updateCart(record.id, quantity)
                                        if (response.status) {
                                            alert(response.message)
                                            setRefresh(!refresh)
                                        }
                                    }}
                                >
                                    Cap nhat
                                </Button>
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
                                        if (selectedRows.length === 0) alert('0 row selected.')
                                        else {
                                            const response = await cartService.deleteCarts({ list_id: selectedRows })
                                            if (response.status) {
                                                alert(response.message)
                                                setRefresh(!refresh)
                                                selectedRows([])
                                            }
                                        }
                                    }}
                                >
                                    Xoa
                                </Button>
                                <Button style={styleButton} color="primary" variant="solid"
                                    onClick={() => {
                                        navigate('/payment')
                                    }}
                                >
                                    Thanh toan
                                </Button>
                            </div>
                        </>
                    )
                }}
            />
        </div>
    );
};
