import { UploadOutlined } from "@ant-design/icons"
import { Button, Col, Row, Upload, Form, Input, Select, InputNumber } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useRef } from "react"


export const AddFood = () => {

    return (
        <>
            <div className="Title__Page">
                <h1>Them mon an moi</h1>
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
                                <Form.Item label="Ten mon an" name="name" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Loai mon an" name="category" rules={[{ required: true }]}>
                                    <Select
                                        defaultValue="1"
                                        options={[
                                            { value: '1', label: 'Loai 1' },
                                            { value: '2', label: 'Loai 2' },
                                            { value: '3', label: 'Loai 3' },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Gia ban (VND)" name="price" rules={[{ required: true }]}>
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
                                <Form.Item label="Giam gia (%)" name="discount" rules={[{ required: true }]}>
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        defaultValue="0"
                                        min="0"
                                        max="100"
                                        step="1"
                                    />
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
                                <Form.Item label="Trang thai" name="status" rules={[{ required: true }]}>
                                    <Select
                                        defaultValue="0"
                                        options={[
                                            { value: '0', label: 'An' },
                                            { value: '1', label: 'Hien thi' },
                                        ]}
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
                    <Col offset={1} span={11}>
                        <Form.Item label="Anh mon an" name="images[]" rules={[{ required: true }]}>
                            <Upload
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                listType="picture"
                                maxCount={10}
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