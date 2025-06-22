import { UploadOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Upload } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useEffect, useState } from "react"
import { useSession } from "../../../context/SessionContext"
import orderStatusService from "../../../services/orderStatusService"
import orderService from "../../../services/orderService"


export const ModalUpdateOrder = ({ open, onCancel, orders }) => {
    const [orderStatus, setOrderStatus] = useState([])
    const { refresh, setRefresh } = useSession()

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
                title={<p>Cap nhat trang thai don hang</p>}
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
                            alert(response.message)
                            setRefresh(!refresh)
                            onCancel()
                        }
                    }}
                >
                    <Row  >

                        <Col span={24}>
                            <Form.Item label="Trang thai" name="order_status_id" rules={[{ required: true }]} initialValue={1}>
                                <Select
                                    // defaultValue={1}
                                    options={
                                        orderStatus.map((item, idx) => {
                                            return {
                                                label: item.name,
                                                value: item.id,
                                            }
                                        })
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Button htmlType="submit" color="blue" variant="solid" style={{ width: '100%' }}>Xac nhan</Button>
                        </Col>


                    </Row>
                </Form>
            </Modal>
        </>
    )
}