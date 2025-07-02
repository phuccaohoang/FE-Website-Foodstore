import { UploadOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Upload } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useEffect, useState } from "react"
import { useSession } from "../../../context/SessionContext"
import orderStatusService from "../../../services/orderStatusService"
import orderService from "../../../services/orderService"


export const ModalUpdateOrder = ({ open, onCancel, orders, order_status_id }) => {
    const [orderStatus, setOrderStatus] = useState([])
    const { refresh, setRefresh, openNotification } = useSession()
    // const [statusId, setStatusId] = useState(order_status_id)

    useEffect(() => {
        const loadOrderSatus = async () => {
            const response = await orderStatusService.getOrderStatus()
            if (response.status) {
                setOrderStatus(response.data)
            }
        }
        console.log('asda')
        //
        loadOrderSatus()
    }, [])

    return (
        <>
            <Modal
                title={<p>Cập nhật trạng thái đơn hàng</p>}
                footer={false}
                open={open}
                onCancel={onCancel}
                centered={true}
                width={400}
            >
                <Form
                    name="wrap"
                    labelCol={{ flex: '120px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                    style={{ width: '100%', marginTop: '20px' }}
                    onFinish={async (item) => {
                        const response = await orderService.updateOrderStatus(orders, item.order_status_id)
                        if (response.status) {
                            openNotification('Thành công', 'Cập nhật trạng thái giao hàng thành công', 'success')
                            setRefresh(!refresh)
                            onCancel()
                        } else {
                            openNotification('Thất bại', 'Cập nhật trạng thái giao hàng thất bại', 'error')

                        }
                    }}
                >
                    <Row  >

                        <Col span={24}>
                            <Form.Item label="Trạng thái" name="order_status_id" rules={[{ required: true }]} initialValue={order_status_id}>
                                <Select
                                    defaultValue={order_status_id}
                                    options={
                                        orderStatus.map((item, idx) => {
                                            return {
                                                label: item.name,
                                                value: item.id,
                                                disabled: (order_status_id >= item.id)
                                            }
                                        })
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Button htmlType="submit" color="blue" variant="solid" style={{ width: '100%' }}>Xác nhận</Button>
                        </Col>


                    </Row>
                </Form>
            </Modal>
        </>
    )
}