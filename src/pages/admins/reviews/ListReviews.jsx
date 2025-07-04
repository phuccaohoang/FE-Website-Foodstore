import { useEffect, useState } from "react";
import { Table, Button, Row, Col, Input, Tooltip, Select } from "antd"

import { ModalAddFeedback } from "../../../components/modals/modal-add-feedback/ModalAddFeedback";
import reviewService from "../../../services/reviewService";
import { useSession } from "../../../context/SessionContext";
import feedbackService from "../../../services/feedbackService";





const styleButton = {
    padding: '10px 15px',
}

export const ListReviews = () => {

    const [openModal, setOpenModal] = useState(false)
    const [reviews, setReviews] = useState([])
    const [reviewId, setReviewId] = useState(null)
    const [selectedRows, setSelectedRows] = useState([])
    const { refresh, setRefresh, openNotification } = useSession()
    //
    const [sortBy, setSortBy] = useState('default')
    const [status, setStatus] = useState(2)
    const [isFeedback, setIsfeedback] = useState(2)
    const [page, setPage] = useState({
        current_page: 1,
        total: 1,
        last_page: 1,
        per_page: 5,
    })

    useEffect(() => {
        const loadReviews = async () => {
            const response = await reviewService.getReviews({
                is_feedback: isFeedback,
                status: status,
                sort_by: sortBy,
                per_page: page.per_page,
                page: page.current_page
            });
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
                setPage(response.page)

            }
        }
        loadReviews()
    }, [refresh])


    return (
        <>
            <div className="Filter__Table">
                <Row>
                    <h1>Bộ lọc</h1>
                </Row>

                <Row justify='left' align='middle' gutter={[16, 16]}>

                    <Col offset={0}>
                        <Tooltip placement="top" title="Sắp xếp theo xếp hạng">
                            <Select
                                style={{ width: 220 }}
                                value={sortBy}
                                onChange={value => setSortBy(value)}
                                options={[
                                    { value: 'default', label: 'Mới nhất' },
                                    { value: 'rating_desc', label: 'Xếp hạng giảm dần' },
                                    { value: 'rating_asc', label: 'Xếp hạng tăng dần' },
                                ]}
                            />

                        </Tooltip>
                    </Col>

                    <Col offset={1}>
                        <Tooltip placement="top" title="Tình trạng phản hồi">

                            <Select
                                style={{ width: 150 }}
                                value={isFeedback}
                                onChange={value => setIsfeedback(value)}
                                options={[
                                    { value: 2, label: 'Tất cả' },
                                    { value: 1, label: 'Đã phản hồi' },
                                    { value: 0, label: 'Chưa phản hồi' },
                                ]}
                            />
                        </Tooltip>
                    </Col>
                    <Col offset={1}>
                        <Tooltip placement="top" title="Trạng thái đánh giá">

                            <Select
                                style={{ width: 150 }}
                                value={status}
                                onChange={value => setStatus(value)}
                                options={[
                                    { value: 2, label: 'Tất cả' },
                                    { value: 1, label: 'Hiển thị' },
                                    { value: 0, label: 'Bị ẩn' },
                                ]}
                            />
                        </Tooltip>
                    </Col>
                    <Col style={{ marginLeft: 'auto' }}>
                        <Button color="blue" variant="dashed" style={{ marginRight: 10 }} onClick={() => {
                            setSortBy('default')
                            setStatus(2)
                            setIsfeedback(2)
                        }}>Làm mới</Button>
                        <Button color="lime" variant="solid" onClick={() => {
                            setPage(page => {
                                return {
                                    ...page,
                                    current_page: 1
                                }
                            })
                            setRefresh(!refresh)
                        }}>Tìm kiếm</Button>
                    </Col>

                </Row>
            </div >

            <div className="Title__Page">
                <h1>Danh sách đánh giá</h1>
            </div>
            <Table
                rowSelection={{
                    selectedRowKeys: selectedRows,
                    onChange: (items) => {
                        console.log('list', items)
                        setSelectedRows(items)
                    }
                }}
                columns={[
                    { title: 'STT', dataIndex: 'stt' },
                    { title: 'Tên khách hàng', dataIndex: 'fullname' },
                    { title: 'Món ăn', dataIndex: 'food' },
                    { title: 'Xếp hạng', dataIndex: 'rating' },
                    { title: 'Nội dung', dataIndex: 'text' },
                    { title: 'Trạng thái', dataIndex: 'status' },
                    {
                        title: 'Chức năng', dataIndex: 'feedbacks',
                        render: (item, record) => {
                            return (
                                item.length !== 0 ? <>
                                    <Button style={styleButton} color="red" variant="dashed"
                                        onClick={async () => {
                                            const response = await feedbackService.deleteFeedback({ id: item[0].id });
                                            if (response) {
                                                openNotification('Thành công', 'Xóa phản hồi thành công.', 'success')
                                                setRefresh(!refresh)
                                            } else {
                                                openNotification('Thất bại', 'Xóa phản hồi thất bại.', 'error')

                                            }
                                        }}
                                    >
                                        Xóa phản hồi
                                    </Button>
                                </> : <>
                                    <Button style={styleButton} color="lime" variant="dashed"
                                        onClick={() => {
                                            setReviewId(record.id)
                                            setOpenModal(true)
                                        }}
                                    >
                                        Phản hồi
                                    </Button>
                                </>
                            )
                        }
                    },
                ]}
                expandable={{
                    defaultExpandAllRows: false,
                    expandedRowOffset: 3,
                    expandedRowRender: item => {
                        return (
                            <>
                                <p><strong>Phản hồi:</strong> {item.feedbacks.length !== 0 ? item.feedbacks[0].text : "chua co phan hoi."} </p>
                            </>
                        )
                    },

                }}
                dataSource={reviews}
                pagination={{
                    defaultCurrent: 1,
                    total: page.total,
                    pageSize: page.per_page,
                    onChange: (item) => {
                        setPage(page => {
                            return {
                                ...page,
                                current_page: item
                            }
                        })
                        setRefresh(!refresh)
                    }
                }}

                footer={() => {
                    return (
                        <>
                            <div className="Footer__Table">
                                <Button style={styleButton} color="red" variant="solid"
                                    onClick={async () => {
                                        if (selectedRows.length > 0) {
                                            const response = await reviewService.disableReviews(selectedRows)
                                            if (response.status) {
                                                openNotification('Thành công', 'Ẩn đánh giá thành công.', 'success')

                                                setSelectedRows([])
                                                setRefresh(!refresh)
                                            }
                                            else {
                                                openNotification('Thất bại', 'Ẩn đánh giá thất bại.', 'error')

                                            }
                                        }
                                    }}
                                >
                                    Ẩn đánh giá
                                </Button>

                            </div>
                        </>
                    )
                }}
            />

            <ModalAddFeedback reviewId={reviewId} open={openModal} onCancel={() => { setOpenModal(false) }} />
        </>
    )
}