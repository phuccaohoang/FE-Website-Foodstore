import { useEffect, useState } from "react";
import { Table, Button, Row, Col, Input, Tooltip, Select } from "antd"

import { ModalAddFeedback } from "../../../components/modals/modal-add-feedback/ModalAddFeedback";
import reviewService from "../../../services/reviewService";





const styleButton = {
    padding: '10px 15px',
}

export const ListReviews = () => {

    const [openModal, setOpenModal] = useState(false)
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const loadReviews = async () => {
            const response = await reviewService.getReviews();
            if (response.status) {
                setReviews(response.data.map((item, idx) => {
                    return {
                        ...item,
                        key: item.id,
                        stt: idx + 1,
                        fullname: item.customer.fullname,
                        food: item.food.name,
                        status: item.status === 1 ? 'On' : 'Off',
                    }
                }))
            }
        }
        loadReviews()
    }, [])


    return (
        <>
            <div className="Filter__Table">
                <Row>
                    <h1>Bo loc</h1>
                </Row>

                <Row justify='left' align='middle' gutter={[16, 16]}>

                    <Col offset={0}>
                        <Tooltip placement="top" title="sap xep theo diem">
                            <Select
                                defaultValue="1"
                                style={{ width: 220 }}

                                options={[
                                    { value: '1', label: 'Diem giam dan' },
                                    { value: '2', label: 'Diem tang dan' },
                                ]}
                            />

                        </Tooltip>
                    </Col>

                    <Col offset={1}>
                        <Tooltip placement="top" title="tinh trang phan hoi">

                            <Select
                                defaultValue="0"
                                style={{ width: 150 }}

                                options={[
                                    { value: '0', label: 'Tat ca' },
                                    { value: '1', label: 'Da phan hoi' },
                                    { value: '2', label: 'Chua phan hoi' },
                                ]}
                            />
                        </Tooltip>
                    </Col>
                    <Col offset={1}>
                        <Tooltip placement="top" title="trang thai danh gia">

                            <Select
                                defaultValue="0"
                                style={{ width: 150 }}

                                options={[
                                    { value: '0', label: 'Tat ca' },
                                    { value: '1', label: 'Hien thi' },
                                    { value: '2', label: 'An' },
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
                <h1>Danh sach danh gia</h1>
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
                    { title: 'Mon an', dataIndex: 'food' },
                    { title: 'Diem danh gia', dataIndex: 'rating' },
                    { title: 'Noi dung', dataIndex: 'text' },
                    { title: 'Trang thai', dataIndex: 'status' },
                    {
                        title: 'Chuc nang', dataIndex: 'feedbacks',
                        render: (item) => {
                            return (
                                item.length !== 0 ? <>
                                    <Button style={styleButton} color="red" variant="dashed">Xoa phan hoi</Button>
                                </> : <>
                                    <Button style={styleButton} color="lime" variant="dashed"
                                        onClick={() => {
                                            setOpenModal(true)
                                        }}
                                    >
                                        Phan hoi
                                    </Button>
                                </>
                            )
                        }
                    },
                ]}
                expandable={{
                    expandedRowOffset: 3,
                    expandedRowRender: item => {
                        return (
                            <>
                                <p><strong>Phan hoi:</strong> {item.feedbacks.length !== 0 ? item.feedbacks[0].text : "chua co phan hoi."} </p>
                            </>
                        )
                    },
                    defaultExpandAllRows: true
                }}
                dataSource={reviews}
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
                                <Button style={styleButton} color="red" variant="solid">An danh gia</Button>

                            </div>
                        </>
                    )
                }}
            />

            <ModalAddFeedback open={openModal} onCancel={() => { setOpenModal(false) }} />
        </>
    )
}