import { UploadOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Upload } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useEffect, useState } from "react"
import categoryService from "../../../services/categoryService"
import foodService from "../../../services/foodService"
import { useSession } from "../../../context/SessionContext"


export const ModalUpdateFoods = ({ open, onCancel, foods }) => {

    const isItem = foods.length == 1 ? true : false
    const [categories, setCategories] = useState([])
    const [form] = Form.useForm()
    const { refresh, setRefresh, openNotification, setLoading } = useSession()

    useEffect(() => {
        const loadCaregories = async () => {
            const response = await categoryService.getCategories()
            if (response.status) {
                setCategories(response.data.map((item) => {
                    return {
                        value: item.id,
                        label: item.name
                    }
                }))
            }
        }
        //
        loadCaregories()
    }, [])

    const notification = () => {
        setRefresh(!refresh)
        onCancel()
    }

    return (
        <>
            <Modal
                title={<p>Cập nhật thông tin {isItem ? '' : 'danh sách'} món ăn</p>}
                footer={false}
                open={open}
                onCancel={onCancel}
                centered={false}
                width={1000}


            >
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
                        if (!isItem) {
                            if (values.category_id == null && values.discount == null && values.price == null) {
                                openNotification('Cảnh báo', 'Thay đổi ít nhất 1 thuộc tính', 'warning')
                            }

                            const response = await foodService.updateFoods({
                                ...values,
                                list_id: foods
                            })
                            if (response.status) {
                                notification()
                                openNotification('Thành công', 'Cập nhật món ăn thành công', 'success')

                            } else {
                                openNotification('Thất bại', 'Cập nhật món ăn thất bại', 'error')

                            }

                        } else {
                            if (values.category_id == null && values.discount == null && values.price == null && (values.name.trim() == '' || values.name == null) && (values.description == null || values.description.trim() == '') && (values.images == null || values.images.fileList.length === 0)) {
                                openNotification('Cảnh báo', 'Thay đổi ít nhất 1 thuộc tính', 'warning')

                            }
                            else {

                                console.log('values', values, 'foods', foods)
                                const formData = new FormData()
                                if (values.name !== null && values.name !== undefined) {
                                    formData.append('name', values.name)
                                }
                                formData.append('category_id', values.category_id)
                                if (values.name !== null && values.name !== undefined) {
                                    formData.append('description', values.description)
                                }
                                formData.append('discount', values.discount)
                                formData.append('price', values.price)
                                if (values.images !== undefined && values.images !== null && values.images.fileList.length > 0) {
                                    values.images.fileList.forEach(item => {
                                        formData.append('images[]', item.originFileObj)
                                    });
                                }
                                formData.append('id', foods[0])
                                setLoading(true)

                                const response = await foodService.updateFood(formData)
                                if (response.status) {
                                    notification()
                                    openNotification('Thành công', 'Cập nhật món ăn thành công', 'success')

                                } else {
                                    openNotification('Thất bại', 'Cập nhật món ăn thất bại', 'error')

                                }
                                setLoading(false)

                            }
                        }
                        form.resetFields()
                    }}
                >
                    <Row gutter={[16, 16]} >

                        <Col span={isItem ? 12 : 24}>
                            {
                                isItem ? <>
                                    <Row>
                                        <Col span={24}>
                                            <Form.Item label="Tên món ăn" name="name" rules={[{ required: false }]} initialValue={''}>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </> : null
                            }

                            <Row>
                                <Col span={24}>
                                    <Form.Item label="Loại món ăn" name="category_id" rules={[{ required: false }]}>
                                        <Select
                                            options={[
                                                {
                                                    value: null
                                                },
                                                ...categories
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item label="Giá bán (VND)" name="price" rules={[{ required: false }]}>
                                        <InputNumber
                                            style={{ width: '100%' }}
                                            min="10000"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item label="Giảm giá (%)" name="discount" rules={[{ required: false }]} initialValue={null}>
                                        <InputNumber
                                            style={{ width: '100%' }}
                                            min="0"
                                            max="100"
                                            step="1"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            {
                                isItem ? <>
                                    <Row>
                                        <Col span={24}>
                                            <Form.Item label="Mô tả" name="description" rules={[{ required: false }]} initialValue={''}>
                                                <TextArea rows={5} placeholder="Mô tả món ăn" maxLength={300} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </> : null
                            }


                            <Row >
                                <Col span={24} style={{ textAlign: 'right' }}>

                                    <Button htmlType="submit" color="blue" variant="solid">Xác nhận</Button>
                                </Col>
                            </Row>
                        </Col>
                        {
                            isItem ? <>
                                <Col
                                    offset={1} span={11}>
                                    <Form.Item label="Hình ảnh" name="images"   >
                                        <Upload
                                            action=''
                                            listType="picture"
                                            maxCount={4}
                                            multiple
                                            style={{ backgroundColor: 'white' }}
                                        >
                                            <Button icon={<UploadOutlined />}>Upload</Button>
                                        </Upload>
                                    </Form.Item>
                                </Col>
                            </> : null
                        }


                    </Row>
                </Form>
            </Modal>
        </>
    )
}