import { UploadOutlined } from "@ant-design/icons"
import { Button, Col, Row, Upload, Form, Input, Select, InputNumber, Radio } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useRef, useState } from "react"


export const AddCoupon = () => {

    const [isLimit, setIsLimit] = useState(0)

    return (
        <>
            <div className="Title__Page">
                <h1>Them phieu giam gia</h1>
            </div>
            <Form
                name="wrap"
                labelCol={{ flex: '120px' }}
                labelAlign="left"
                labelWrap
                wrapperCol={{ flex: 1 }}
                colon={false}
                style={{ width: '100%', marginTop: '20px' }}
            >
                <Row gutter={[16, 16]}>

                    <Col span={12}>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Mo ta" name="description" rules={[{ required: true }]}>
                                    <TextArea rows={5} placeholder="Mo ta mon an" maxLength={300} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Don hang toi thieu (VND)" name="min_value_order" rules={[{ required: true }]}>
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        defaultValue="50.000"
                                        min="1"
                                        step="1.000"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Giam gia (VND)" name="discount" rules={[{ required: true }]}>
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        defaultValue="50.000"
                                        min="1"
                                        step="1.000"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="So luong" name="quantity" rules={[{ required: true }]}>
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        defaultValue="10"
                                        min="1"
                                        max="100"
                                        step="1"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Radio.Group
                                    onChange={(item) => {
                                        setIsLimit(item.target.value)
                                    }}
                                    block
                                    options={[
                                        {
                                            label: 'Tat ca',
                                            value: 0
                                        },
                                        {
                                            label: 'Gioi han',
                                            value: 1
                                        }
                                    ]}
                                    defaultValue={0}
                                />
                            </Col>

                            <Col span={24}>
                                <Form.Item label="Khach hang ap dung" name="customers" rules={[{ required: false }]}>
                                    <Select
                                        disabled={isLimit == 0 ? true : false}
                                        mode="multiple"
                                        size={'large'}
                                        placeholder="Please select"
                                        defaultValue={[]}
                                        m
                                        style={{ width: '100%', }}
                                        options={[

                                            {
                                                label: 'Le Xuan Thinh',
                                                value: 1,
                                            },
                                            {
                                                label: 'Pessi',
                                                value: 2,
                                            },
                                            {
                                                label: 'Go Nan Do',
                                                value: 3,
                                            },
                                            {
                                                label: 'Ledimir Puthin',
                                                value: 4,
                                            },
                                            {
                                                label: 'Donal Trung',
                                                value: 5,
                                            },
                                            {
                                                label: 'Tap Can Thi',
                                                value: 6,
                                            },
                                            {
                                                label: 'Dan Dao Trieu Tien',
                                                value: 7,
                                            },
                                        ]}
                                        maxTagCount={'responsive'}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>




                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button color="blue" variant="dashed">lam moi</Button>
                                &nbsp;
                                <Button color="blue" variant="solid">Xac nhan</Button>
                            </Col>
                        </Row>
                    </Col>


                </Row>
            </Form>
        </>
    )
}