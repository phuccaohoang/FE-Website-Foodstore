import { useEffect, useState } from "react";
import { Table, Button, Row, Col, Input, Tooltip, Select } from "antd"
import accountService from "../../../services/accountService";
import { useSession } from "../../../context/SessionContext";




const columns = [
    { title: 'STT', dataIndex: 'stt' },
    { title: 'Anh dai dien', dataIndex: 'avatar' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Ho ten', dataIndex: 'fullname' },
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

export const ListAccounts = () => {

    const [accounts, setAccounts] = useState([])

    const [selectedRows, setSelectedRows] = useState([])

    const { refresh, setRefresh } = useSession()

    useEffect(() => {
        const loadAccounts = async () => {
            const response = await accountService.getAccounts();
            if (response.status) {
                setAccounts(response.data.map((item, idx) => {
                    return {
                        ...item,
                        key: item.id,
                        stt: idx + 1,
                        fullname: item.customers[0].fullname,
                        status: item.status === 1 ? 'On' : 'Off',
                    }
                }))
            }
        }
        //
        loadAccounts()
        //

    }, [refresh])

    const notifications = (response) => {
        setSelectedRows([])
        setRefresh(!refresh)
        alert(response.message)
    }

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
                    <Col>
                        <Tooltip placement="top" title="trang thai tai khoan">

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
                <h1>Danh sach tai khoan khach hang</h1>


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
                                <Button style={styleButton} color="lime" variant="solid"
                                    onClick={async () => {
                                        if (selectedRows.length === 0) alert('0 row selected.')
                                        else {
                                            const response = await accountService.updateAccountStatus(selectedRows, 1)
                                            if (response.status) {
                                                notifications(response)
                                            }
                                        }
                                    }}
                                >
                                    Mo khoa
                                </Button>
                                <Button style={styleButton} color="danger" variant="solid"
                                    onClick={async () => {
                                        if (selectedRows.length === 0) alert('0 row selected.')
                                        else {
                                            const response = await accountService.updateAccountStatus(selectedRows, 0)
                                            if (response.status) {
                                                notifications(response)
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