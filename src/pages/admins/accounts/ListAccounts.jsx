import { useEffect, useState } from "react";
import { Table, Button, Row, Col, Input, Tooltip, Select } from "antd"
import accountService from "../../../services/accountService";
import { useSession } from "../../../context/SessionContext";




const columns = [
    { title: 'STT', dataIndex: 'stt' },
    {
        title: 'Ảnh đại diện', dataIndex: 'avatar', render: (item) => {
            return <>
                <img style={{ width: 150 }} src={`http://127.0.0.1:8000/${item}`} alt={item} />
            </>
        }
    },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Tên hiển thị', dataIndex: 'fullname' },
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

export const ListAccounts = () => {

    const [accounts, setAccounts] = useState([])

    const [selectedRows, setSelectedRows] = useState([])
    const [status, setStatus] = useState(3)
    const [fullname, setFullname] = useState('')

    const { refresh, setRefresh, openNotification } = useSession()

    const [page, setPage] = useState({
        current_page: 1,
        total: 1,
        last_page: 1,
        per_page: 5,
    })

    useEffect(() => {
        const loadAccounts = async () => {
            const response = await accountService.getAccounts({
                fullname: fullname,
                status: status,
                page: page.current_page,
                per_page: page.per_page,
            });
            if (response.status) {
                setAccounts(response.data.map((item, idx) => {
                    return {
                        ...item,
                        key: item.id,
                        stt: idx + 1,
                        fullname: item.customers[0].fullname,
                        status: item.status === 1 ? 'Hoạt động' : 'Đã khóa',
                    }
                }))
                setPage(response.page)
            }
        }
        //
        loadAccounts()
        //

    }, [refresh])

    const notifications = () => {
        setSelectedRows([])
        setRefresh(!refresh)

    }

    return (
        <>
            <div className="Filter__Table">
                <Row>
                    <h1>Bộ lọc</h1>
                </Row>

                <Row justify='left' align='middle' gutter={[16, 16]}>
                    <Col span={24}>
                        <Input placeholder="Tên hiển thị" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                    </Col>
                    <Col>
                        <Tooltip placement="top" title="Trạng thái tài khoản">

                            <Select
                                defaultValue={3}
                                style={{ width: 120 }}
                                value={status}
                                onChange={(e) => setStatus(e)}
                                options={[
                                    { value: 3, label: 'Tất cả' },
                                    { value: 1, label: 'Hoạt động' },
                                    { value: 0, label: 'Đang khóa' },

                                ]}
                            />
                        </Tooltip>
                    </Col>

                    <Col style={{ marginLeft: 'auto' }}>
                        <Button color="blue" variant="dashed" style={{ marginRight: 10 }} onClick={() => {
                            setStatus(3)
                            setFullname('')
                        }}>Làm mới</Button>
                        <Button color="lime" variant="solid" onClick={() => {
                            setRefresh(!refresh)
                            console.log(status, fullname, page)
                        }}>Tìm kiếm</Button>
                    </Col>

                </Row>
            </div >
            <div className="Title__Page">
                <h1>Danh sách tài khoản khách hàng</h1>


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
                dataSource={accounts}
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
                                <Button style={styleButton} color="lime" variant="solid"
                                    onClick={async () => {
                                        if (selectedRows.length === 0) alert('0 row selected.')
                                        else {
                                            const response = await accountService.updateAccountStatus(selectedRows, 1)
                                            if (response.status) {
                                                notifications()
                                                openNotification('Thành công', 'Mở khóa tài khoản thành công', 'success')

                                            } else {
                                                openNotification('Thất bại', 'Mở khóa tài khoản thất bại', 'error')

                                            }
                                        }
                                    }}
                                >
                                    Mở khóa
                                </Button>
                                <Button style={styleButton} color="danger" variant="solid"
                                    onClick={async () => {
                                        if (selectedRows.length === 0) alert('0 row selected.')
                                        else {
                                            const response = await accountService.updateAccountStatus(selectedRows, 0)
                                            if (response.status) {
                                                notifications()
                                                openNotification('Thành công', 'Khóa tài khoản thành công', 'success')

                                            } else {
                                                openNotification('Thất bại', 'Khóa tài khoản thất bại', 'error')

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