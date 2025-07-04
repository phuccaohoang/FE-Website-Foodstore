import { useEffect, useState } from "react";
import { Table, Button, Row, Col, Tooltip, Select } from "antd"
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import couponService from "../../../services/couponService";
import { useSession } from "../../../context/SessionContext";



const columns = [
    { title: 'STT', dataIndex: 'stt' },
    { title: 'Tên', dataIndex: 'name' },
    { title: 'Mô tả', dataIndex: 'description' },
    { title: 'Đơn hàng tối thiểu', dataIndex: 'min_order_value' },
    { title: 'Giảm giá (vnd)', dataIndex: 'discount' },
    { title: 'Số lượng', dataIndex: 'quantity' },
    { title: 'Ngày hết hạn', dataIndex: 'expire_date' },
    { title: 'Khách hàng áp dụng', dataIndex: 'is_public' },
    { title: 'Trạng thái', dataIndex: 'status' },
];
// const dataSource = Array.from({ length: 10 }).map((_, i) => ({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
// }));

const styleButton = {
    padding: '10px 15px',
}

export const ListCoupons = () => {
    const navigate = useNavigate()

    const [coupons, setCoupons] = useState([])

    const [selectedRows, setSelectedRows] = useState([])
    const { refresh, setRefresh, openNotification } = useSession()

    const [sortBy, setSortBy] = useState('default')
    const [status, setStatus] = useState(2)
    const [page, setPage] = useState({
        current_page: 1,
        total: 1,
        last_page: 1,
        per_page: 5,
    })

    useEffect(() => {
        const loadCoupons = async () => {
            const response = await couponService.getCoupons({
                sort_by: sortBy,
                status: status,
                page: page.current_page,
                per_page: page.per_page
            })

            if (response.status) {
                setCoupons(response.data.map((item, idx) => {
                    return {
                        ...item,
                        key: item.id,
                        stt: idx + 1,
                        is_public: item.is_public === 1 ? 'Tất cả' : 'Giới hạn',
                        status: item.status === 1 ? 'Hoạt động' : 'Đang khóa'
                    }
                }))
                setPage(response.page)
            }
        }
        //
        loadCoupons()
    }, [refresh])

    return (
        <>
            <div className="Filter__Table">
                <Row>
                    <h1>Bộ lọc</h1>
                </Row>

                <Row justify='left' align='middle' gutter={[16, 16]}>
                    <Col offset={0}>
                        <Tooltip placement="top" title="Sắp xếp theo giá trị đơn hàng">

                            <Select
                                style={{ width: 220 }}
                                value={sortBy}
                                onChange={item => setSortBy(item)}
                                options={[
                                    { value: "default", label: 'Mới nhất' },
                                    { value: "min_order_value_desc", label: 'Đơn hàng tối thiểu giảm dần' },
                                    { value: "min_order_value_asc", label: 'Đơn hàng tối thiểu tăng dần' },
                                    { value: "discount_asc", label: 'Giảm giá tăng dần' },
                                    { value: "discount_desc", label: 'Giảm giá giảm dần' },
                                    { value: "quantity_desc", label: 'Số lượng phiếu giảm dần' },
                                    { value: "quantity_asc", label: 'Số lượng phiếu tăng dần' },
                                    { value: "expire_date_desc", label: 'Ngày hết hạn giảm dần' },
                                    { value: "expire_date_asc", label: 'Ngày hết hạn tăng dần' },

                                ]}
                            />
                        </Tooltip>
                    </Col>


                    <Col offset={1}>
                        <Tooltip placement="top" title="Trạng thái phiếu giảm giá">

                            <Select
                                defaultValue={2}
                                style={{ width: 120 }}
                                value={status}
                                onChange={item => setStatus(item)}
                                options={[
                                    { value: 2, label: 'Tất cả' },
                                    { value: 1, label: 'Hoạt động' },
                                    { value: 0, label: 'Đang khóa' },

                                ]}
                            />
                        </Tooltip>
                    </Col>


                    <Col style={{ marginLeft: 'auto' }}>
                        <Button color="blue" variant="dashed" style={{ marginRight: 10 }}
                            onClick={() => {
                                setSortBy('default')
                                setStatus(2)
                            }}
                        >Làm mới</Button>
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

                <h1>Danh sách phiếu giảm giá</h1>
                <Button style={styleButton} color="blue" variant="solid"
                    onClick={() => {
                        navigate('/admin/coupons/add')
                    }}
                >
                    <PlusOutlined style={{ fontSize: '20px' }} />
                </Button>
            </div>
            <Table
                rowSelection={{
                    selectedRowKeys: selectedRows,
                    onChange: (items) => {
                        console.log('list', items)
                        setSelectedRows(items)
                    }
                }}
                columns={columns}
                dataSource={coupons}
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

                                <Button style={styleButton} color="danger" variant="solid"
                                    onClick={async () => {
                                        if (selectedRows.length === 0) openNotification('Cảnh báo', 'Hãy chọn phiếu giảm giá muốn khóa', 'warning')
                                        else {
                                            const response = await couponService.updateCouponStatus(selectedRows);
                                            if (response.status) {
                                                setSelectedRows([])
                                                setRefresh(!refresh)
                                                openNotification('Thành công', 'Khóa phiếu giảm giá thành công', 'success')
                                            } else {
                                                openNotification('Thất bại', 'Khóa phiếu giảm giá thât bại', 'error')

                                            }
                                        }
                                    }}
                                >
                                    Khóa
                                </Button>
                            </div>
                        </>
                    )
                }}
            />
        </>
    )
}