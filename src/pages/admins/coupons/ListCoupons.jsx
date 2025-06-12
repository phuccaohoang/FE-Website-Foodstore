import { useState } from "react";
import { Table, Button } from "antd"




const columns = [
    { title: 'STT', dataIndex: 'stt' },
    { title: 'Mo ta', dataIndex: 'fullname' },
    { title: 'Dieu kien ap dung', dataIndex: 'email' },
    { title: 'Giam gia (vnd)', dataIndex: 'fullname' },
    { title: 'So luong', dataIndex: 'fullname' },
    { title: 'Ngay het han', dataIndex: 'fullname' },
    { title: 'Khach hang ap dung', dataIndex: 'fullname' },
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

export const ListCoupons = () => {
    return (
        <>
            <h1>Danh sach phieu giam gia</h1>
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
                                <Button style={styleButton} type="primary">Them</Button>
                            </div>
                        </>
                    )
                }}
            />
        </>
    )
}