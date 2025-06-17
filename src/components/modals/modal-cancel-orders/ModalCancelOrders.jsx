import { UploadOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, InputNumber, Modal, Radio, Row, Select, Upload } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useState } from "react"


export const ModalCancelOrder = ({ open, onCancel }) => {

    const [disabled, setDisabled] = useState(true)
    return (
        <>
            <Modal
                title={<p>Huy don hang</p>}
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
                            <Radio.Group
                                style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
                                defaultValue={1}
                                onChange={(e) => {
                                    let value = e.target.value
                                    console.log(e)
                                    if (value == 0) {
                                        setDisabled(false)
                                    }
                                    else {
                                        setDisabled(true)
                                    }
                                }}
                                options={[
                                    { value: 1, label: 'Ly do 1' },
                                    { value: 2, label: 'Ly do 2' },
                                    { value: 3, label: 'Ly do 3' },
                                    { value: 0, label: 'Khac' },
                                ]}
                            />
                        </Col>
                        <Col span={24}>
                            <Form.Item label="" name="note" rules={[{ required: true }]}>
                                <TextArea rows={5} placeholder="Ly do huy don" maxLength={300} disabled={disabled} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Button color="blue" variant="solid" style={{ width: '100%' }}>Xac nhan</Button>
                        </Col>


                    </Row>
                </Form>
            </Modal>
        </>
    )
}