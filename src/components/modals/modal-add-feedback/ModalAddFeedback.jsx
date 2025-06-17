import { UploadOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Upload } from "antd"
import TextArea from "antd/es/input/TextArea"


export const ModalAddFeedback = ({ open, onCancel }) => {


    return (
        <>
            <Modal
                title={<p>Phan hoi danh gia</p>}
                footer={false}
                open={open}
                onCancel={onCancel}
                centered={true}
                width={500}
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
                            <Form.Item label="Phan hoi" name="text" rules={[{ required: true }]}>
                                <TextArea rows={5} placeholder="Phan hoi" maxLength={300} />
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