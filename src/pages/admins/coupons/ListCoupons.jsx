import { useEffect, useState } from "react";
import { Table, Button, Row, Col, Tooltip, Select } from "antd"
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import couponService from "../../../services/couponService";
import { useSession } from "../../../context/SessionContext";



const columns = [
    { title: 'STT', dataIndex: 'stt' },
    { title: 'Ten', dataIndex: 'name' },
    { title: 'Mo ta', dataIndex: 'description' },
    { title: 'Don hang toi thieu', dataIndex: 'min_order_value' },
    { title: 'Giam gia (vnd)', dataIndex: 'discount' },
    { title: 'So luong', dataIndex: 'quantity' },
    { title: 'Ngay het han', dataIndex: 'expire_date' },
    { title: 'Khach hang ap dung', dataIndex: 'is_public' },
    { title: 'Trang thai', dataIndex: 'status' },
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
    const { refresh, setRefresh } = useSession()

    useEffect(() => {
        const loadCoupons = async () => {
            const response = await couponService.getCoupons()

            if (response.status) {
                setCoupons(response.data.map((item, idx) => {
                    return {
                        ...item,
                        key: item.id,
                        stt: idx + 1,
                        is_public: item.is_public === 1 ? 'All' : 'Limit',
                        status: item.status === 1 ? 'On' : 'Off'
                    }
                }))
            }
        }
        //
        loadCoupons()
    }, [refresh])

    return (
        <>
            <div className="Filter__Table">
                <Row>
                    <h1>Bo loc</h1>
                </Row>

                <Row justify='left' align='middle' gutter={[16, 16]}>
                    <Col offset={0}>
                        <Tooltip placement="top" title="sap xep theo don hang toi thieu">

                            <Select
                                defaultValue="1"
                                style={{ width: 220 }}

                                options={[
                                    { value: '1', label: 'Don hang toi thieu giam dan' },
                                    { value: '2', label: 'Don hang toi thieu tang dan' },

                                ]}
                            />
                        </Tooltip>
                    </Col>

                    <Col offset={1}>
                        <Tooltip placement="top" title="Khach hang ap dung">

                            <Select
                                defaultValue="0"
                                style={{ width: 120 }}

                                options={[
                                    { value: '0', label: 'Tat ca' },
                                    { value: '1', label: 'Moi nguoi' },
                                    { value: '2', label: 'Gioi han' },

                                ]}
                            />
                        </Tooltip>
                    </Col>
                    <Col offset={1}>
                        <Tooltip placement="top" title="trang thai phieu giam gia">

                            <Select
                                defaultValue="0"
                                style={{ width: 120 }}

                                options={[
                                    { value: '0', label: 'Tat ca' },
                                    { value: '1', label: 'Hoat dong' },
                                    { value: '2', label: 'Dang khoa' },

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

                <h1>Danh sach phieu giam gia</h1>
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

                                <Button style={styleButton} color="danger" variant="solid"
                                    onClick={async () => {
                                        if (selectedRows.length === 0) alert('0 row selected.')
                                        else {
                                            const response = await couponService.updateCouponStatus(selectedRows);
                                            if (response.status) {
                                                setSelectedRows([])
                                                setRefresh(!refresh)
                                                alert(response.message)
                                            }
                                        }
                                    }}
                                >
                                    Khoa
                                </Button>
                            </div>
                        </>
                    )
                }}
            />
        </>
    )
}