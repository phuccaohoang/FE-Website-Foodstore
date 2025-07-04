import { UploadOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Upload } from "antd"
import TextArea from "antd/es/input/TextArea"
import feedbackService from "../../../services/feedbackService"
import { useSession } from "../../../context/SessionContext"


export const ModalAddFeedback = ({ reviewId, open, onCancel }) => {

    const { refresh, setRefresh, openNotification, setLoading } = useSession()
    const [form] = Form.useForm()

    return (
        <>
            <Modal
                title={<p>Phản hồi đánh giá</p>}
                footer={false}
                open={open}
                onCancel={onCancel}
                centered={true}
                width={500}

            >
                <Form
                    name="wrap"
                    form={form}
                    labelCol={{ flex: '120px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                    style={{ width: '100%', marginTop: '20px' }}
                    onFinish={async (item) => {
                        setLoading(true)

                        const response = await feedbackService.storeFeedback(reviewId, item.text)
                        if (response.status) {
                            openNotification('Thành công', 'Phản hồi thành công.', 'success')

                            setRefresh(!refresh)
                            form.resetFields()
                            onCancel()
                        } else {
                            openNotification('Thất bại', 'Phản hồi thất bại.', 'error')

                        }
                        setLoading(false)

                    }}
                >
                    <Row  >

                        <Col span={24}>
                            <Form.Item label="Phản hồi" name="text" rules={[{ required: true }]}>
                                <TextArea rows={5} placeholder="Phản hồi" maxLength={300} />
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