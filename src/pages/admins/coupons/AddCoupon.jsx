import { UploadOutlined } from "@ant-design/icons"
import { Button, Col, Row, Upload, Form, Input, Select, InputNumber, Radio, DatePicker } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useEffect, useRef, useState } from "react"
import customerService from "../../../services/customerService"
import dayjs from 'dayjs';
import couponService from "../../../services/couponService"

export const AddCoupon = () => {

    const [isLimit, setIsLimit] = useState(1)
    const [form] = Form.useForm()
    const [customers, setCustomers] = useState([])
    const currentDate = new Date();
    const getDate = () => {
        const result = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getDate()}`
        return result
    }

    useEffect(() => {
        const loadCustomers = async () => {
            const response = await customerService.getCustomers()
            if (response.status) {
                setCustomers(response.data.map((item) => {
                    return {
                        label: item.fullname,
                        value: item.id,
                    }
                }))
            }
        }
        //
        loadCustomers()
    }, [])

    return (
        <>
            <div className="Title__Page">
                <h1>Them phieu giam gia</h1>
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
                    const response = await couponService.storeCoupon(data)
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
                                <Form.Item label="Ten phieu" name="name" rules={[{ required: true }]}>
                                    <Input type="text" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Mo ta" name="description" rules={[{ required: true }]}>
                                    <TextArea rows={5} placeholder="Mo ta mon an" maxLength={300} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Don hang toi thieu (VND)" name="min_order_value" rules={[{ required: true }]} initialValue={50000}>
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
                                <Form.Item label="Giam gia (VND)" name="discount" rules={[{ required: true }]} initialValue={30000}>
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
                                <Form.Item label="So luong" name="quantity" rules={[{ required: true }]} initialValue={1}>
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
                                <Form.Item label="Ngay het han" name="expire_date" rules={[{ required: true }]}>
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
                                                label: 'Tat ca',
                                                value: 1
                                            },
                                            {
                                                label: 'Gioi han',
                                                value: 0
                                            }
                                        ]}
                                        defaultValue={1}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item label="Khach hang ap dung" name="customers" rules={[{ required: (isLimit ? false : true) }]} initialValue={[]}>
                                    <Select
                                        disabled={isLimit == 1 ? true : false}
                                        mode="multiple"
                                        size={'large'}
                                        placeholder="Please select"
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
                                <Button color="blue" variant="dashed">lam moi</Button>
                                &nbsp;
                                <Button htmlType="submit" color="blue" variant="solid">Xac nhan</Button>
                            </Col>
                        </Row>
                    </Col>


                </Row>
            </Form>
        </>
    )
}