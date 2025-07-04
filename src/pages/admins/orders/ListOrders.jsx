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

    const { refresh, setRefresh, setLoading } = useSession()

    //
    const [orderStatusId, setOrderStatusId] = useState(0)
    const [fullname, setFullname] = useState('')
    const [sortBy, setSortBy] = useState('default')
    const [page, setPage] = useState({
        current_page: 1,
        total: 1,
        last_page: 1,
        per_page: 5,
    })

    useEffect(() => {
        const loadOrders = async () => {
            setLoading(true)

            const response = await orderService.getOrders({
                order_status_id: orderStatusId,
                fullname: fullname,
                sort_by: sortBy,
                per_page: page.per_page,
                page: page.current_page
            })
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
                        is_payment: item.is_payment ? 'Đã thanh toán' : 'Chưa thanh toán',
                        total_money: Number(item.total_amount) - Number(discount),
                        created_at: item.created_at.slice(0, 10),
                        total_money_order: Number(item.total_amount) + Number(item.delivery_cost) - Number(item.coupon ? item.coupon.discount : 0)
                    }
                }))
                setPage(response.page)


            }
            setLoading(false)

        }
        //
        loadOrders()
    }, [refresh])

    return (
        <>
            <div className="Filter__Table">
                <Row>
                    <h1>Bộ lọc</h1>
                </Row>

                <Row justify='left' align='middle' gutter={[16, 16]}>
                    <Col span={24}>
                        <Input placeholder="Tên khách hàng" value={fullname} onChange={e => setFullname(e.target.value)} />
                    </Col>

                    <Col offset={0}>
                        <Tooltip placement="top" title="Sắp xếp theo tổng đơn hàng">
                            <Select
                                value={sortBy}
                                onChange={item => setSortBy(item)}
                                style={{ width: 220 }}

                                options={[
                                    { value: 'default', label: 'Mới nhất' },
                                    { value: 'total_amount_desc', label: 'Tổng đơn hàng giảm dần' },
                                    { value: 'total_amount_asc', label: 'Tổng đơn hàng tăng dần' },
                                ]}
                            />

                        </Tooltip>
                    </Col>

                    <Col offset={1}>
                        <Tooltip placement="top" title="Trạng thái đơn hàng">

                            <Select
                                defaultValue={0}
                                style={{ width: 120 }}
                                value={orderStatusId}
                                onChange={value => setOrderStatusId(value)}
                                options={[
                                    { value: 0, label: 'Tất cả' },
                                    { value: 1, label: 'Chưa duyệt' },
                                    { value: 2, label: 'Đã duyệt' },
                                    { value: 3, label: 'Đang giao' },
                                    { value: 4, label: 'Đã giao' },
                                    { value: 5, label: 'Đã hủy' },

                                ]}
                            />
                        </Tooltip>
                    </Col>
                    <Col style={{ marginLeft: 'auto' }}>
                        <Button color="blue" variant="dashed" style={{ marginRight: 10 }} onClick={() => {
                            setFullname('')
                            setOrderStatusId(0)
                            setSortBy('default')
                        }}>Làm mới</Button>
                        <Button color="lime" variant="solid" onClick={() => {
                            setPage(page => {
                                return {
                                    ...page,
                                    current_page: 1
                                }
                            })
                            setRefresh(!refresh)
                        }}>Tìm kiếm</Button>
                    </Col>

                </Row>
            </div >

            <div className="Title__Page">
                <h1>Danh sách đơn hàng</h1>
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
                    { title: 'Tên khách hàng', dataIndex: 'fullname' },
                    { title: 'SDT', dataIndex: 'phone' },
                    { title: 'Địa chỉ', dataIndex: 'address' },
                    { title: 'Ghi chú', dataIndex: 'note' },
                    { title: 'Tổng đơn hàng', dataIndex: 'total_amount' },
                    { title: 'Số lượng món ăn', dataIndex: 'quantity' },
                    { title: 'Giá vận chuyển', dataIndex: 'delivery_cost' },
                    { title: 'Giảm giá', dataIndex: 'discount' },
                    { title: 'Tổng tiền phải trả', dataIndex: 'total_money' },
                    { title: 'Thanh toán', dataIndex: 'is_payment' },
                    { title: 'Trạng thái', dataIndex: 'status' },
                    { title: 'Ngày đặt', dataIndex: 'created_at' },
                    {
                        title: 'Chức năng', dataIndex: 'id',
                        render: (item, record) => {
                            return (
                                <>
                                    <Button color="geekblue" variant="dashed" onClick={() => {
                                        setOrder(record)
                                        setOpenOrderDetail(true)
                                    }}>
                                        Xem chi tiết
                                    </Button>
                                </>
                            )
                        }
                    },
                ]}
                dataSource={orders}
                pagination={{
                    defaultCurrent: 1,
                    total: page.total,
                    pageSize: page.per_page,
                    onChange: (item) => {
                        setPage(page => {
                            return {
                                ...page,
                                current_page: item
                            }
                        })
                        setRefresh(!refresh)
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