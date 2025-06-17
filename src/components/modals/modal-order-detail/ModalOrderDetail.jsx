import { UploadOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Table, Upload, Typography } from "antd"
const { Text } = Typography
import TextArea from "antd/es/input/TextArea"

import { ModalUpdateOrder } from "../modal-update-orders/ModalUpdateOrders"
import { ModalCancelOrder } from "../modal-cancel-orders/ModalCancelOrders"
import { useState } from "react"

const styleButton = {
    padding: '10px 15px',
}

const dataSource = Array.from({ length: 10 }).map((_, i) => ({
    key: i,
    stt: i,
    fullname: `Edward King ${i}`,
    quantity: { i },
}));


export const ModalOrderDetail = ({ open, onCancel }) => {

    const [openUpdate, setOpenUpdate] = useState(false)
    const [openCancel, setOpenCancel] = useState(false)
    return (
        <>
            <Modal
                title={<p>Chi tiet don hang</p>}
                footer={false}
                open={open}
                onCancel={onCancel}
                centered={false}
                width={1000}
            >
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

                        <Col span={24}>
                            <Row gutter={[10, 10]}>
                                <Col span={8}>
                                    <Text strong>Ten khach hang</Text>
                                </Col>
                                <Col span={8}>
                                    <Text strong>SDT: 0123456789</Text>
                                </Col>
                                <Col span={8}>
                                    <Text strong>Dia chi: Lorem ipsum ...</Text>
                                </Col>

                            </Row>
                            <Row gutter={[10, 10]} style={{ marginTop: '10px' }}>
                                <Col span={8}>
                                    <Text strong>Tong don hang: 9</Text>
                                </Col>
                                <Col span={8}>
                                    <Text strong>Giam gia don hang: 200.000 vnd</Text>
                                </Col>
                                <Col span={8}>
                                    <Text strong>Gia van chuyen: 30.000 vnd</Text>
                                </Col>
                            </Row>
                        </Col>

                        <Col span={24} style={{ justifyContent: 'right', display: 'flex', columnGap: '10px' }}>
                            <Table
                                style={{ width: '100%' }}
                                columns={[
                                    { title: 'STT', dataIndex: 'stt' },
                                    { title: 'Mon an', dataIndex: 'fullname' },
                                    { title: 'So luong mon an', dataIndex: 'quantity' },
                                    { title: 'Gia tien', dataIndex: '' },
                                    { title: 'Giam gia', dataIndex: '' },
                                    { title: 'Tong tien', dataIndex: '' },
                                ]}
                                dataSource={dataSource}
                                pagination={false}
                                bordered
                                scroll={{ y: 55 * 5 }}
                                footer={() => {
                                    return (
                                        <>
                                            <Row justify={'end'}>
                                                <Col>
                                                    <strong>Tong don hang: <span style={{ fontSize: 20, margin: '0 5px' }}>230.000</span> vnd</strong>
                                                </Col>
                                            </Row>
                                        </>
                                    )
                                }}
                            />
                        </Col>
                        <Col span={24} style={{ display: 'flex', justifyContent: 'right', columnGap: '10px' }}>
                            < Button style={styleButton} color="gold" variant="solid" onClick={() => { setOpenUpdate(true) }}>
                                Cap nhat trang thai
                            </Button>
                            <Button style={styleButton} color="red" variant="solid"
                                onClick={() => setOpenCancel(true)}
                            >
                                Huy don
                            </Button>
                        </Col>


                    </Row>
                </Form>
            </Modal >

            <ModalUpdateOrder open={openUpdate} onCancel={() => setOpenUpdate(false)} />
            <ModalCancelOrder open={openCancel} onCancel={() => setOpenCancel(false)} />
        </>
    )
}