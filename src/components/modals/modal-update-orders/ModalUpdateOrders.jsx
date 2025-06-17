import { UploadOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Upload } from "antd"
import TextArea from "antd/es/input/TextArea"


export const ModalUpdateOrder = ({ open, onCancel, orders }) => {


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
                >
                    <Row  >

                        <Col span={24}>
                            <Form.Item label="Trang thai" name="status" rules={[{ required: true }]}>
                                <Select
                                    defaultValue="1"
                                    options={[
                                        { value: '1', label: 'Chua duyet' },
                                        { value: '2', label: 'Da duyet' },
                                        { value: '3', label: 'Dang giao' },
                                        { value: '4', label: 'Da giao' },
                                        { value: '5', label: 'Da huy' },

                                    ]}
                                />
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