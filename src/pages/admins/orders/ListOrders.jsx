import { useEffect, useState } from "react";
import { Table, Button, Select, Tooltip, Radio, Input, Row, Col } from "antd"
import { ModalUpdateOrder } from "../../../components/modals/modal-update-orders/ModalUpdateOrders";

import { ModalOrderDetail } from "../../../components/modals/modal-order-detail/ModalOrderDetail";
import { ModalCancelOrder } from "../../../components/modals/modal-cancel-orders/ModalCancelOrders";
import orderService from "../../../services/orderService";
import { useSession } from "../../../context/SessionContext";



const styleButton = {
    padding: '10px 15px',
}

export const ListOrders = () => {

    const [openUpdate, setOpenUpdate] = useState(false)
    const [openCancel, setOpenCancel] = useState(false)
    const [openOrderDetail, setOpenOrderDetail] = useState(false)

    const [orders, setOrders] = useState([])
    const [order, setOrder] = useState({})
    const [selectedRows, setSelectedRows] = useState([])

    const { refresh, setRefresh } = useSession()

    useEffect(() => {
        const loadOrders = async () => {
            const response = await orderService.getOrders()
            if (response.status) {
                setOrders(response.data.map((item, idx) => {
                    let discount = item.coupon ? item.coupon.discount : 0;
                    return {
                        ...item,
                        key: item.id,
                        stt: idx + 1,
                        fullname: item.customer.fullname,
                        status: item.order_status.name,
                        discount: discount,
                        total_money: Number(item.total_amount) - Number(discount)
                    }
                }))
            }
        }
        //
        loadOrders()
    }, [refresh])

    return (
        <>
            <div className="Filter__Table">
                <Row>
                    <h1>Bo loc</h1>
                </Row>

                <Row justify='left' align='middle' gutter={[16, 16]}>
                    <Col span={24}>
                        <Input placeholder="Tu khoa" />
                    </Col>

                    <Col offset={0}>
                        <Tooltip placement="top" title="sap xep theo tong don hang">
                            <Select
                                defaultValue="1"
                                style={{ width: 220 }}

                                options={[
                                    { value: '1', label: 'Tong don hang giam dan' },
                                    { value: '2', label: 'Tong don hang tang dan' },
                                ]}
                            />

                        </Tooltip>
                    </Col>

                    <Col offset={1}>
                        <Tooltip placement="top" title="trang thai don hang">

                            <Select
                                defaultValue="0"
                                style={{ width: 120 }}

                                options={[
                                    { value: '0', label: 'Tat ca' },
                                    { value: '1', label: 'Chua duyet' },
                                    { value: '2', label: 'Da duyet' },
                                    { value: '3', label: 'Dang giao' },
                                    { value: '4', label: 'Da giao' },
                                    { value: '5', label: 'Da huy' },

                                ]}
                            />
                        </Tooltip>
                    </Col>
                    <Col style={{ marginLeft: 'auto' }}>
                        <Button color="blue" variant="dashed" style={{ marginRight: 10 }}>Reset</Button>
                        <Button color="lime" variant="solid">Tim kiem</Button>
                    </Col>

                </Row>
            </div >

            <div className="Title__Page">
                <h1>Danh sach cac don hang</h1>
            </div>
            <Table
                // rowSelection={{
                //     selectedRowKeys: selectedRows,
                //     onChange: (items) => {
                //         console.log('list', items)
                //         setSelectedRows(items)
                //     }
                // }}
                columns={[
                    { title: 'STT', dataIndex: 'stt' },
                    { title: 'Ten khach hang', dataIndex: 'fullname' },
                    { title: 'SDT', dataIndex: 'phone' },
                    { title: 'Dia chi nhan hang', dataIndex: 'address' },
                    { title: 'Ghi chu', dataIndex: 'note' },
                    { title: 'Tong don hang', dataIndex: 'total_amount' },
                    { title: 'So luong mon an', dataIndex: 'quantity' },
                    { title: 'Gia van chuyen', dataIndex: 'delivery_cost' },
                    { title: 'Giam gia', dataIndex: 'discount' },
                    { title: 'Tong tien phai tra', dataIndex: 'total_money' },
                    { title: 'Trang thai', dataIndex: 'status' },
                    {
                        title: 'Chuc nang', dataIndex: 'id',
                        render: (item, record) => {
                            return (
                                <>
                                    <Button color="geekblue" variant="dashed" onClick={() => {
                                        setOrder(record)
                                        setOpenOrderDetail(true)
                                    }}>
                                        Xem chi tiet
                                    </Button>
                                </>
                            )
                        }
                    },
                ]}
                dataSource={orders}
                pagination={{
                    defaultCurrent: 1,
                    total: 50,
                    pageSize: 10,
                    onChange: (item) => {
                        console.log('page', item)
                    }
                }}

            // footer={() => {
            //     return (
            //         <>
            //             <div className="Footer__Table">
            //                 <Button style={styleButton} color="gold" variant="solid"
            //                     onClick={() => {
            //                         if (selectedRows.length > 0) setOpenUpdate(true)
            //                         else {
            //                             alert('0 row selected.')
            //                         }
            //                     }}
            //                 >
            //                     Cap nhat trang thai
            //                 </Button>
            //                 <Button style={styleButton} color="red" variant="solid"
            //                     onClick={() => {
            //                         if (selectedRows.length > 0) setOpenCancel(true)
            //                         else {
            //                             alert('0 row selected.')
            //                         }
            //                     }
            //                     }
            //                 >
            //                     Huy don
            //                 </Button>
            //             </div>
            //         </>
            //     )
            // }}
            />

            <ModalUpdateOrder
                open={openUpdate} onCancel={() => {
                    setOpenUpdate(false)
                    setSelectedRows([])
                }}
                orders={selectedRows}
            />

            <ModalOrderDetail
                order={order} open={openOrderDetail} onCancel={() => {
                    setOpenOrderDetail(false)
                    setOrder({})
                }}
            />

            <ModalCancelOrder
                open={openCancel} onCancel={() => {
                    setOpenCancel(false)
                    setSelectedRows([])

                }}
                orders={selectedRows}
            />
        </>
    )
}