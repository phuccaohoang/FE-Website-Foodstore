import { useState } from "react";
import { Table, Button, Select, Tooltip, Radio, Input, Row, Col } from "antd"
import { ModalUpdateOrder } from "../../../components/modals/modal-update-orders/ModalUpdateOrders";

import { ModalOrderDetail } from "../../../components/modals/modal-order-detail/ModalOrderDetail";
import { ModalCancelOrder } from "../../../components/modals/modal-cancel-orders/ModalCancelOrders";

const dataSource = Array.from({ length: 10 }).map((_, i) => ({
    key: i,
    stt: i,
    fullname: `Edward King ${i}`,
    phone: '0123456789',
    address: `London, Park Lane no. ${i}`,
    quantity: { i },
    func: { i }
}));

const styleButton = {
    padding: '10px 15px',
}

export const ListOrders = () => {

    const [openUpdate, setOpenUpdate] = useState(false)
    const [openCancel, setOpenCancel] = useState(false)
    const [openOrderDetail, setOpenOrderDetail] = useState(false)

    return (
        <>
            <div className="Filter__Table">
                <Row>
                    <h1>Bo loc</h1>
                </Row>

                <Row justify='left' align='middle' gutter={[16, 16]}>
                    <Col span={24}>
                        <Input placeholder="Tu khoa" />
                    </Col>

                    <Col offset={0}>
                        <Tooltip placement="top" title="sap xep theo tong don hang">
                            <Select
                                defaultValue="1"
                                style={{ width: 220 }}

                                options={[
                                    { value: '1', label: 'Tong don hang giam dan' },
                                    { value: '2', label: 'Tong don hang tang dan' },
                                ]}
                            />

                        </Tooltip>
                    </Col>

                    <Col offset={1}>
                        <Tooltip placement="top" title="trang thai don hang">

                            <Select
                                defaultValue="0"
                                style={{ width: 120 }}

                                options={[
                                    { value: '0', label: 'Tat ca' },
                                    { value: '1', label: 'Chua duyet' },
                                    { value: '2', label: 'Da duyet' },
                                    { value: '3', label: 'Dang giao' },
                                    { value: '4', label: 'Da giao' },
                                    { value: '5', label: 'Da huy' },

                                ]}
                            />
                        </Tooltip>
                    </Col>
                    <Col style={{ marginLeft: 'auto' }}>
                        <Button color="blue" variant="dashed" style={{ marginRight: 10 }}>Reset</Button>
                        <Button color="lime" variant="solid">Tim kiem</Button>
                    </Col>

                </Row>
            </div >

            <div className="Title__Page">
                <h1>Danh sach cac don hang</h1>
            </div>
            <Table
                rowSelection={{

                    onChange: (items) => {
                        console.log('list', items)
                    }
                }}
                columns={[
                    { title: 'STT', dataIndex: 'stt' },
                    { title: 'Ten khach hang', dataIndex: 'fullname' },
                    { title: 'SDT', dataIndex: 'phone' },
                    { title: 'Dia chi nhan hang', dataIndex: 'address' },
                    { title: 'Tong don hang', dataIndex: 'total_amount' },
                    { title: 'So luong mon an', dataIndex: 'quantity' },
                    { title: 'Gia van chuyen', dataIndex: '' },
                    { title: 'Giam gia', dataIndex: '' },
                    { title: 'Tong tien phai tra', dataIndex: '' },
                    { title: 'Trang thai', dataIndex: 'status' },
                    {
                        title: 'Chuc nang', dataIndex: 'func',
                        render: (item) => {
                            return (
                                <>
                                    <Button color="geekblue" variant="dashed" onClick={() => setOpenOrderDetail(true)}>
                                        Xem chi tiet
                                    </Button>
                                </>
                            )
                        }
                    },
                ]}
                dataSource={dataSource}
                pagination={{
                    defaultCurrent: 1,
                    total: 50,
                    pageSize: 10,
                    onChange: (item) => {
                        console.log('page', item)
                    }
                }}

                footer={() => {
                    return (
                        <>
                            <div className="Footer__Table">
                                <Button style={styleButton} color="gold" variant="solid"
                                    onClick={() => {
                                        setOpenUpdate(true)
                                    }}
                                >
                                    Cap nhat trang thai
                                </Button>
                                <Button style={styleButton} color="red" variant="solid"
                                    onClick={() =>
                                        setOpenCancel(true)
                                    }
                                >
                                    Huy don
                                </Button>
                            </div>
                        </>
                    )
                }}
            />

            <ModalUpdateOrder open={openUpdate} onCancel={() => {
                setOpenUpdate(false)
            }}
                orders={[]}
            />

            <ModalOrderDetail open={openOrderDetail} onCancel={() => {
                setOpenOrderDetail(false)
            }}
            />

            <ModalCancelOrder open={openCancel} onCancel={() => setOpenCancel(false)} />
        </>
    )
}