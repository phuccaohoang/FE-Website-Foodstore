import './order.css'
import { Table, Tag, Button, Card, Typography, Image, Popconfirm, Select, Space, message, Divider } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import mon from '../../../assets/mon2.jpg'
import orderService from '../../../services/orderService';
import { useSession } from '../../../context/SessionContext';
import orderStatusService from '../../../services/orderStatusService';
import { ModalCancelOrder } from '../../../components/modals/modal-cancel-orders/ModalCancelOrders';
import { ModalReview } from '../../../components/modals/modal-review/ModalReview';
const { Option } = Select;

const { Title } = Typography;





export const Order = () => {
    const [filterStatus, setFilterStatus] = useState(0);

    const [orders, setOrders] = useState([]);
    const [orderStatus, setOrderStatus] = useState([]);
    const { refresh, setRefresh } = useSession()
    const [openCancel, setOpenCancel] = useState(false)
    const [openReview, setOpenReview] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const [orderDetailId, setOrderDetailId] = useState(null)

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: 1
        },
        {
            title: "Ten khach hang",
            dataIndex: "fullname",
            key: 2
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: 3
        },
        {
            title: "Dia chi",
            dataIndex: "address",
        },
        {
            title: "Tong don hang",
            dataIndex: "total_amount",
        },
        {
            title: "So luong",
            dataIndex: "quantity",
        },
        {
            title: "Phi van chuyen",
            dataIndex: "delivery_cost",
        },
        {
            title: "Phieu giam gia",
            dataIndex: "coupon_value",
        },
        {
            title: "Ghi chu",
            dataIndex: "note",
        },
        {
            title: "Trang thai",
            dataIndex: "order_status",
        },
        {
            title: "Chức năng",
            key: "action",
            render: (_, record) => {
                return <>

                    <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        disabled={(record.order_status_id === 1 ? false : true)}
                        onClick={() => {
                            setOrderId(record.id)
                            setOpenCancel(true)
                        }}
                    >
                        Hủy đơn
                    </Button>
                </>
            }
        },
    ];

    useEffect(() => {
        const loadOrderStatus = async () => {
            const response = await orderStatusService.getOrderStatus({ all: 1 })
            if (response.status) {
                setOrderStatus(response.data)
            }
        }

        //
        loadOrderStatus()

    }, [])

    useEffect(() => {

        const loadOrders = async () => {
            const response = await orderService.getOrders({ order_status_id: filterStatus })
            if (response.status) {

                setOrders(response.data.map((item, idx) => {

                    return {
                        id: item.id,
                        key: item.id,
                        stt: idx + 1,
                        fullname: item.customer.fullname,
                        phone: item.phone,
                        address: item.address,
                        total_amount: item.total_amount,
                        quantity: item.quantity,
                        delivery_cost: item.delivery_cost,
                        coupon_value: item.coupon ? item.coupon.discount : 0,
                        note: item.note,
                        order_status: item.order_status.name,
                        order_status_id: item.order_status_id,
                        order_details: item.order_details
                    }
                }))
            }
        }
        //
        loadOrders()

    }, [refresh, filterStatus])


    return (
        <>

            <Card style={{
                margin: '4px auto', width: '65%', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)', backgroundColor: '#f9fafc'
            }}>
                <Space style={{ justifyContent: 'space-between', display: 'flex' }}>
                    < Title level={4} style={{ fontFamily: 'sans-serif' }}> Đơn hàng của bạn</Title>
                    <Select
                        value={filterStatus}
                        onChange={value => setFilterStatus(value)}
                        style={{ width: 135 }}
                    >
                        <Option value={0}>Tất cả</Option>
                        {
                            orderStatus.length !== 0 ? <>
                                {
                                    orderStatus.map(item => {
                                        return <Option value={item.id}>{item.name}</Option>
                                    })
                                }
                            </> : null
                        }
                    </Select>
                </Space>


                <Table
                    bordered
                    columns={columns}
                    dataSource={orders}
                    pagination={false}
                    expandable={{
                        expandedRowRender: (value) => {
                            const dataSource = () => {
                                return value.order_details.map((item, idx) => {
                                    return {
                                        ...item,
                                        stt: idx + 1,
                                        food: item.food.name,
                                        order_status_id: value.order_status_id,
                                        total_amount: value.total_amount,
                                        delivery_cost: value.delivery_cost,
                                        coupon_value: value.coupon_value,
                                    }
                                })
                            }

                            return <>
                                <Table
                                    pagination={false}
                                    footer={(record) => {

                                        const total_money = Number(record[0].total_amount) + Number(record[0].delivery_cost) - Number(record[0].coupon_value)
                                        return <>
                                            <strong style={{ display: 'flex', justifyContent: 'right', alignItems: 'end' }}>
                                                Tong don hang: <span style={{ fontSize: '20px', margin: '0 10px' }}> {total_money} </span> VND
                                            </strong>
                                            <Divider />
                                        </>
                                    }}
                                    columns={[
                                        {
                                            title: "STT",
                                            dataIndex: "stt",
                                        },
                                        {
                                            title: "Mon an",
                                            dataIndex: "food",
                                        },
                                        {
                                            title: "So luong",
                                            dataIndex: "quantity",
                                        },
                                        {
                                            title: "Gia (VND)",
                                            dataIndex: "price",
                                        },
                                        {
                                            title: "Giam gia (%)",
                                            dataIndex: "discount",
                                        },
                                        {
                                            title: "Chuc nang",
                                            render: (_, record) => {
                                                return <>
                                                    <Button
                                                        disabled={(record.is_review || record.order_status_id !== 4) ? true : false}
                                                        onClick={() => {
                                                            setOrderDetailId(record.id)
                                                            setOpenReview(true)
                                                        }}
                                                    >
                                                        Danh gia
                                                    </Button>
                                                </>
                                            }
                                        },
                                    ]}
                                    dataSource={dataSource()}

                                />
                            </>

                        },
                        expandedRowOffset: 2
                    }}
                />
            </Card >

            <ModalCancelOrder orders={[orderId]} open={openCancel} onCancel={() => {
                setOpenCancel(false)
            }} />

            <ModalReview
                orderDetailId={orderDetailId} open={openReview} onCancel={() => {
                    setOpenReview(false)
                }}
            />
        </>
    );
};