import { UploadOutlined } from "@ant-design/icons"
import { Button, Col, Row, Upload, Form, Input, Select, InputNumber } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useEffect, useRef, useState } from "react"
import categoryService from "../../../services/categoryService"
import foodService from "../../../services/foodService"
const { options } = Select

export const AddFood = () => {

    const [form] = Form.useForm()
    const [categories, setCategories] = useState([])

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
                <h1>Them mon an moi</h1>
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

                    const response = await foodService.storeFood(formData)
                    if (response.status) {
                        alert(response.message)
                        form.resetFields()
                    }
                }}
            >
                <Row gutter={[16, 16]}>

                    <Col span={12}>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Ten mon an" name="name" rules={[{ required: true }]} initialValue={null}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Loai mon an" name="category_id" rules={[{ required: true }]}>
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
                                <Form.Item label="Gia ban (VND)" name="price" rules={[{ required: true }]} initialValue={10000}>
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
                                <Form.Item label="Giam gia (%)" name="discount" rules={[{ required: true }]} initialValue={0}>
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
                                <Form.Item label="Mo ta" name="description" rules={[{ required: false }]} initialValue={null}>
                                    <TextArea rows={5} placeholder="Mo ta mon an" maxLength={300} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Trang thai" name="status" rules={[{ required: true }]} initialValue={1}>
                                    <Select
                                        defaultValue={1}
                                        options={[
                                            { value: 0, label: 'An' },
                                            { value: 1, label: 'Hien thi' },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button color="blue" variant="dashed" onClick={() => form.resetFields()}>lam moi</Button>
                                &nbsp;
                                <Button color="blue" variant="solid" htmlType="submit">Xac nhan</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col offset={1} span={11}>
                        <Form.Item label="Anh mon an" name="images" rules={[{ required: true }]}>
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