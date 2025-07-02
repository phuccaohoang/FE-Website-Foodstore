import { UploadOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Table, Upload, Typography } from "antd"
const { Text } = Typography
import TextArea from "antd/es/input/TextArea"

import { ModalUpdateOrder } from "../modal-update-orders/ModalUpdateOrders"
import { ModalCancelOrder } from "../modal-cancel-orders/ModalCancelOrders"
import { useState } from "react"

const styleButton = {
    padding: '10px 15px',
}


export const ModalOrderDetail = ({ order, open, onCancel }) => {

    const [openUpdate, setOpenUpdate] = useState(false)
    const [openCancel, setOpenCancel] = useState(false)

    const list = order.order_details;
    let order_details = list ? list.map((item, idx) => {
        return {
            ...item,
            name: item.food.name,
            stt: idx + 1,
            total_money: (1 - (Number(item.discount) / 100)) * item.price * item.quantity

        }
    }) : [];


    return (
        <>
            <Modal
                title={<p>Chi tiết đơn hàng</p>}
                footer={false}
                open={open}
                onCancel={onCancel}
                centered={false}
                width={1000}
            >
                <Form
                    name="wrap"
                    labelCol={{ flex: '120px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                    style={{ width: '100%', marginTop: '20px' }}
                >
                    <Row gutter={[16, 16]}>

                        <Col span={24}>
                            <Row gutter={[10, 10]}>
                                <Col span={8}>
                                    <Text strong>Tên: {order.customer ? order.customer.fullname : null}</Text>
                                </Col>
                                <Col span={8}>
                                    <Text strong>SDT: {order.phone}</Text>
                                </Col>
                                <Col span={8}>
                                    <Text strong>Địa chỉ: {order.address}</Text>
                                </Col>

                            </Row>
                            <Row gutter={[10, 10]} style={{ marginTop: '10px' }}>
                                <Col span={8}>
                                    <Text strong>Tổng số lượng: {order.quantity}</Text>
                                </Col>
                                <Col span={8}>
                                    <Text strong>Giảm giá đơn hàng: {order.coupon ? order.coupon.discount : '0.00'} vnd</Text>
                                </Col>
                                <Col span={8}>
                                    <Text strong>Giá vận chuyển: {order.delivery_cost} vnd</Text>
                                </Col>
                            </Row>
                            <Row gutter={[10, 10]} style={{ marginTop: '10px' }}>
                                <Col span={16}>
                                    <Text strong>Ghi chú: {order.note}</Text>
                                </Col>
                                <Col span={8}>
                                    <Text strong>Trạng thái: {order.order_status ? order.order_status.name : ''}</Text>
                                </Col>

                            </Row>
                        </Col>

                        <Col span={24} style={{ justifyContent: 'right', display: 'flex', columnGap: '10px' }}>
                            <Table
                                style={{ width: '100%' }}
                                columns={[
                                    { title: 'STT', dataIndex: 'stt' },
                                    { title: 'Món ăn', dataIndex: 'name' },
                                    { title: 'Số lượng món ăn', dataIndex: 'quantity' },
                                    { title: 'Giá tiền (VND)', dataIndex: 'price' },
                                    { title: 'Giảm giá (%)', dataIndex: 'discount' },
                                    { title: 'Tổng tiền (VND)', dataIndex: 'total_money' },
                                ]}
                                dataSource={order_details}
                                pagination={false}
                                bordered
                                scroll={{ y: 55 * 5 }}
                                footer={() => {
                                    return (
                                        <>
                                            <Row justify={'end'}>
                                                <Col>
                                                    <strong>Tổng đơn hàng: <span style={{ fontSize: 20, margin: '0 5px' }}>230.000</span> vnd</strong>
                                                </Col>
                                            </Row>
                                        </>
                                    )
                                }}
                            />
                        </Col>
                        {
                            (order.order_status_id != 5 && order.order_status_id != 4) ? <>
                                <Col span={24} style={{ display: 'flex', justifyContent: 'right', columnGap: '10px' }}>
                                    < Button style={styleButton} color="gold" variant="solid" onClick={() => { setOpenUpdate(true) }}>
                                        Cập nhật trạng thái
                                    </Button>
                                    <Button style={styleButton} color="red" variant="solid"
                                        onClick={() => setOpenCancel(true)}
                                    >
                                        Hủy đơn
                                    </Button>
                                </Col>
                            </> : null
                        }



                    </Row>
                </Form>
            </Modal >

            <ModalUpdateOrder
                orders={[order.id]} order_status_id={order.order_status_id} open={openUpdate} onCancel={() => {
                    setOpenUpdate(false)
                    onCancel()
                }}
            />
            <ModalCancelOrder
                orders={[order.id]}
                open={openCancel} onCancel={() => {
                    onCancel()
                    setOpenCancel(false)
                }}

            />
        </>
    )
}