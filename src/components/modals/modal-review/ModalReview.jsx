import { Button, Col, Form, Input, InputNumber, Modal, Rate, Row, Select, Upload } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useSession } from "../../../context/SessionContext"
import reviewService from "../../../services/reviewService"


export const ModalReview = ({ orderDetailId, open, onCancel }) => {

    const { refresh, setRefresh, openNotification } = useSession()
    const [form] = Form.useForm()

    return (
        <>
            <Modal
                title={<p>Đánh giá</p>}
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
                        console.log('review', item)
                        const response = await reviewService.storeReview(orderDetailId, item.text, item.rating)
                        if (response.status) {
                            openNotification('Thành công', 'Đánh giá thành công', 'success')
                            setRefresh(!refresh)
                            form.resetFields()
                            onCancel()
                        } else {
                            openNotification('Thất bại', 'Đánh giá thất bại', 'error')

                        }
                    }}
                >
                    <Row  >

                        <Col span={24}>
                            <Form.Item label="Xếp hạng" name="rating" rules={[{ required: true }]} initialValue={5}>
                                <Rate defaultValue={5} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Đánh giá" name="text" >
                                <TextArea rows={5} placeholder="" maxLength={300} />
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