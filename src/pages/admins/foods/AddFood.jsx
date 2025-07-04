import { UploadOutlined } from "@ant-design/icons"
import { Button, Col, Row, Upload, Form, Input, Select, InputNumber } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useEffect, useRef, useState } from "react"
import categoryService from "../../../services/categoryService"
import foodService from "../../../services/foodService"
import { useSession } from "../../../context/SessionContext"
const { options } = Select

export const AddFood = () => {

    const [form] = Form.useForm()
    const [categories, setCategories] = useState([])
    const { openNotification, setLoading } = useSession()

    useEffect(() => {
        const loadCategories = async () => {
            const response = await categoryService.getCategories()
            if (response.status) {
                setCategories(response.data)
            }
        }
        loadCategories()
    }, [])
    return (
        <>
            <div className="Title__Page">
                <h1>Thêm món ăn mới</h1>
            </div>
            <Form
                form={form}
                name="wrap"
                labelCol={{ flex: '120px' }}
                labelAlign="left"
                labelWrap
                wrapperCol={{ flex: 1 }}
                colon={false}
                style={{ width: '100%', marginTop: '20px' }}
                onFinish={async (values) => {
                    console.log(values)
                    const formData = new FormData()
                    formData.append('name', values.name)
                    formData.append('category_id', values.category_id)
                    formData.append('description', values.description)
                    formData.append('discount', values.discount)
                    formData.append('price', values.price)
                    formData.append('status', values.status)
                    values.images.fileList.forEach(file => {
                        formData.append('images[]', file.originFileObj)
                    });
                    setLoading(true)

                    const response = await foodService.storeFood(formData)
                    if (response.status) {
                        openNotification('Thành công', 'Thêm món mới thành công', 'success')
                        form.resetFields()
                    } else {
                        openNotification('Thất bại', 'Thêm món mới thất bại', 'error')

                    }
                    setLoading(false)

                }}
            >
                <Row gutter={[16, 16]}>

                    <Col span={12}>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Tên" name="name" rules={[{ required: true, message: 'Không được bỏ trống' }]} initialValue={null}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Loại món ăn" name="category_id" rules={[{ required: true, message: 'Không được bỏ trống' }]}>
                                    <Select>
                                        {
                                            categories.length !== 0 ? categories.map((item) => {
                                                return <Option value={item.id}>{item.name}</Option>
                                            }) : null
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Giá bán (VND)" name="price" rules={[{ required: true, message: 'Không được bỏ trống' }]} initialValue={10000}>
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        defaultValue="10000"
                                        min="1"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Giảm giá (%)" name="discount" rules={[{ required: true, message: 'Không được bỏ trống' }]} initialValue={0}>
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        defaultValue={0}
                                        min="0"
                                        max="100"
                                        step="1"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Mô tả" name="description" rules={[{ required: false }]} initialValue={null}>
                                    <TextArea rows={5} placeholder="Mo ta mon an" maxLength={300} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Trạng thái" name="status" rules={[{ required: true, message: 'Không được bỏ trống' }]} initialValue={1}>
                                    <Select
                                        defaultValue={1}
                                        options={[
                                            { value: 0, label: 'Ẩn' },
                                            { value: 1, label: 'Hiển thị' },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button color="blue" variant="dashed" onClick={() => form.resetFields()}>Làm mới</Button>
                                &nbsp;
                                <Button color="blue" variant="solid" htmlType="submit">Xác nhận</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col offset={1} span={11}>
                        <Form.Item label="Anh mon an" name="images" rules={[{ required: true, message: 'Không được bỏ trống' }]}>
                            <Upload
                                action=''
                                listType="picture"
                                maxCount={5}
                                multiple

                            >
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </>
    )
}