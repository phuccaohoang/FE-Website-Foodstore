import { UploadOutlined } from "@ant-design/icons"
import { Button, Col, Row, Upload, Form, Input, Select, InputNumber, Radio, DatePicker } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useEffect, useRef, useState } from "react"
import customerService from "../../../services/customerService"
import dayjs from 'dayjs';
import couponService from "../../../services/couponService"
import { useSession } from "../../../context/SessionContext"

export const AddCoupon = () => {

    const [isLimit, setIsLimit] = useState(1)
    const [form] = Form.useForm()
    const [customers, setCustomers] = useState([])

    const { openNotification, setLoading } = useSession()
    const currentDate = new Date();
    const getDate = () => {
        const result = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getDate()}`
        return result
    }

    useEffect(() => {
        const loadCustomers = async () => {
            setLoading(true)

            const response = await customerService.getCustomers()
            if (response.status) {
                setCustomers(response.data.map((item) => {
                    return {
                        label: item.fullname,
                        value: item.id,
                    }
                }))
            }
            setLoading(false)

        }
        //
        loadCustomers()
    }, [])

    return (
        <>
            <div className="Title__Page">
                <h1>Thêm phiếu giảm giá</h1>
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
                    const data = {
                        ...values,
                        expire_date: `${values.expire_date.$y}-${values.expire_date.$M + 1}-${values.expire_date.$D}`
                    }
                    setLoading(true)
                    const response = await couponService.storeCoupon(data)
                    if (response.status) {
                        openNotification('Thành công', 'Thêm phiếu giảm thành công', 'success')
                        form.resetFields()
                    } else {
                        openNotification('Thất bại', 'Thêm phiếu giảm thất bại', 'error')

                    }
                    setLoading(false)

                }}
            >
                <Row gutter={[16, 16]}>

                    <Col span={12}>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Tên phiếu" name="name" rules={[{ required: true }]}>
                                    <Input type="text" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Mô tả" name="description" rules={[{ required: true }]}>
                                    <TextArea rows={5} placeholder="Mô tả" maxLength={300} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Đơn hàng tối thiếu (VND)" name="min_order_value" rules={[{ required: true }]} initialValue={50000}>
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        defaultValue="50000"
                                        min="50000"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Giảm giá (VND)" name="discount" rules={[{ required: true }]} initialValue={30000}>
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        defaultValue="30000"
                                        min="10000"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Số lượng" name="quantity" rules={[{ required: true }]} initialValue={1}>
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        defaultValue="1"
                                        min="1"
                                        max="100"
                                        step="1"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Ngày hết hạn" name="expire_date" rules={[{ required: true }]}>
                                    <DatePicker minDate={dayjs(getDate(), 'YYYY-MM-DD')} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Form.Item label="" name="is_public" rules={[{ required: true }]} initialValue={1}>

                                    <Radio.Group
                                        onChange={(item) => {
                                            setIsLimit(item.target.value)
                                        }}
                                        block
                                        options={[
                                            {
                                                label: 'Tất cả',
                                                value: 1
                                            },
                                            {
                                                label: 'Giới hạn',
                                                value: 0
                                            }
                                        ]}
                                        defaultValue={1}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item label="Khách hàng áp dụng" name="customers" rules={[{ required: (isLimit ? false : true) }]} initialValue={[]}>
                                    <Select
                                        disabled={isLimit == 1 ? true : false}
                                        mode="multiple"
                                        size={'large'}
                                        placeholder="Hãy chọn"
                                        defaultValue={[]}

                                        style={{ width: '100%', }}
                                        options={customers}
                                        maxTagCount={'responsive'}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>




                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button color="blue" variant="dashed">Làm mới</Button>
                                &nbsp;
                                <Button htmlType="submit" color="blue" variant="solid">Xác nhận</Button>
                            </Col>
                        </Row>
                    </Col>


                </Row>
            </Form>
        </>
    )
}