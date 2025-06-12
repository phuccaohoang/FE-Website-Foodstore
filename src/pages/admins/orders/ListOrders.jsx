import { useState } from "react";
import { Table, Button } from "antd"




const columns = [
    { title: 'STT', dataIndex: 'stt' },
    { title: 'Ten khach hang', dataIndex: 'fullname' },
    { title: 'SDT', dataIndex: 'email' },
    { title: 'Dia chi nhan hang', dataIndex: 'fullname' },
    { title: 'Tong don hang', dataIndex: 'fullname' },
    { title: 'So luong mon an', dataIndex: 'fullname' },
    { title: 'Gia van chuyen', dataIndex: 'fullname' },
    { title: 'Giam gia', dataIndex: 'fullname' },
    { title: 'Tong tien phai tra', dataIndex: 'fullname' },
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

export const ListOrders = () => {
    return (
        <>
            <h1>Danh sach cac don hang</h1>
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