import { Button, Col, Form, Input, InputNumber, Modal, Rate, Row, Select, Upload } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useSession } from "../../../context/SessionContext"
import reviewService from "../../../services/reviewService"
import categoryService from "../../../services/categoryService"
import { useEffect } from "react"


export const ModalUpdateCategory = ({ category, open, onCancel }) => {

    const { refresh, setRefresh, openNotification, setLoading } = useSession()
    const [form] = Form.useForm();

    useEffect(() => {
        if (category) {
            form.setFieldsValue({
                name: category.name,
                status: category.status,
            });
        }
    }, [category]);

    return (
        <>
            <Modal
                title={<p>Cập nhật loại</p>}
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

                        const response = await categoryService.updateCategory({
                            id: category?.id,
                            name: item.name,
                            status: item.status
                        })
                        if (response.status) {
                            openNotification('Thành công', 'Cập nhật thành công', 'success')
                            setRefresh(!refresh)

                            onCancel()
                        } else {
                            openNotification('Thất bại', 'Cập nhật thất bại', 'error')

                        }
                        setLoading(false)

                    }}
                >
                    <Row  >

                        <Col span={24}>
                            <Form.Item label="Tên loại" name="name" rules={[{ required: true, message: 'Hãy nhập tên loại' }]} initialValue={category?.name}>
                                <Input defaultValue={category?.name} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Trạng thái" name="status" rules={[{ required: false }]} initialValue={category?.status}>
                                <Select
                                    options={[
                                        {
                                            label: 'Hiển thị',
                                            value: 1
                                        },
                                        {
                                            label: 'Bị ẩn',
                                            value: 0
                                        },
                                    ]}
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