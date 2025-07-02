import { UploadOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, InputNumber, Modal, Radio, Row, Select, Upload } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useState } from "react"
import orderService from "../../../services/orderService"
import { useSession } from "../../../context/SessionContext"

const reasonCancelAdmin = [
    {
        label: 'Thông tin đơn hàng không hợp lệ',
        value: 'Thông tin đơn hàng không hợp lệ',
    },
    {
        label: 'Món ăn đã hết hàng',
        value: 'Món ăn đã hết hàng',
    },
]
const reasonCancelCustomer = [
    {
        label: 'Muốn thay đổi đơn hàng',
        value: 'Muốn thay đổi đơn hàng',
    },
]
export const ModalCancelOrder = ({ orders, open, onCancel, type = 'admin' }) => {
    const reasonCancel = type === 'admin' ? reasonCancelAdmin : reasonCancelCustomer


    const [disabled, setDisabled] = useState(true)
    const [note, setNote] = useState(reasonCancel[0].value)
    const [textArea, setTextArea] = useState('')
    const { refresh, setRefresh, openNotification } = useSession()

    return (
        <>
            <Modal
                title={<p>Hủy đơn hàng</p>}
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
                >
                    <Row  >
                        <Col span={24}>
                            <Form.Item label="" name="note" rules={[{ required: false }]}>
                                <Radio.Group
                                    style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
                                    defaultValue={reasonCancel[0].value}
                                    onChange={(e) => {
                                        setNote(e.target.value)
                                        if (e.target.value === 0) {
                                            setDisabled(false)
                                        }
                                        else {
                                            setDisabled(true)
                                        }
                                    }}
                                    options={[
                                        ...reasonCancel,
                                        { value: 0, label: 'Khác' },
                                    ]}
                                />
                            </Form.Item>

                        </Col>
                        <Col span={24}>
                            <Form.Item label="" rules={[{ required: false }]}>
                                <TextArea
                                    disabled={disabled}
                                    onChange={(e) => {
                                        setTextArea(e.target.value)
                                    }}
                                    rows={5} placeholder="Lý do hủy đơn" maxLength={300}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Button color="blue" variant="solid" style={{ width: '100%' }}
                                onClick={async () => {
                                    let text = null;
                                    if (note === 0) {
                                        text = textArea;
                                    }
                                    else {
                                        text = note;
                                    }

                                    if (text = text.trim()) {
                                        const response = await orderService.cancelOrder(orders, text)
                                        if (response.status) {
                                            openNotification('success', 'description')
                                            setRefresh(!refresh)
                                            onCancel()
                                        }
                                        else {
                                            openNotification('error', 'description')

                                        }
                                    }
                                    else {
                                        openNotification('warning', 'description')

                                    }

                                }}
                            >
                                Xác nhận
                            </Button>
                        </Col>


                    </Row>
                </Form>
            </Modal>
        </>
    )
}