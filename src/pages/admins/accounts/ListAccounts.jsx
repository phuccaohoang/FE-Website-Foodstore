import { useState } from "react";
import { Table, Button, Row, Col, Input, Tooltip, Select } from "antd"




const columns = [
    { title: 'STT', dataIndex: 'stt' },
    { title: 'Anh dai dien', dataIndex: 'fullname' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Ho ten', dataIndex: 'fullname' },
    { title: 'Trang thai', dataIndex: 'fullname' },
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

                    onChange: (items) => {
                        console.log('list', items)
                    }
                }}
                columns={columns}
                dataSource={[]}
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
                                <Button style={styleButton} color="lime" variant="solid">Mo khoa</Button>
                                <Button style={styleButton} color="danger" variant="solid">Khoa</Button>
                            </div>
                        </>
                    )
                }}
            />
        </>
    )
}