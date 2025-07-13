import { Button, Col, Form, Input, InputNumber, Modal, Rate, Row, Select, Upload } from "antd"
import { useSession } from "../../../context/SessionContext"
import categoryService from "../../../services/categoryService"



export const AddCategory = () => {

    const { refresh, setRefresh, openNotification, setLoading } = useSession()
    const [form] = Form.useForm();



    return (
        <>
            <div className="Title__Page">
                <h1>Thêm loại món ăn mới</h1>
            </div>
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

                    const response = await categoryService.storeCategory({
                        name: item.name,
                    })
                    if (response.status) {
                        openNotification('Thành công', 'Thêm thành công', 'success')
                        form.resetFields()
                    } else {
                        openNotification('Thất bại', 'Thêm thất bại', 'error')

                    }
                    setLoading(false)

                }}
            >
                <Row  >

                    <Col span={12}>
                        <Form.Item label="Tên loại" name="name" rules={[{ required: true, message: 'Hãy nhập tên loại' }]} initialValue={''}>
                            <Input defaultValue={''} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Button htmlType="submit" color="blue" variant="solid" style={{ width: '100%' }}>Xác nhận</Button>
                    </Col>
                </Row>
            </Form>

        </>
    )
}