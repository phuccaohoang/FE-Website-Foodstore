import { useState } from "react";
import { Table, Button } from "antd"




const columns = [
    { title: 'STT', dataIndex: 'stt' },
    { title: 'Anh', dataIndex: 'fullname' },
    { title: 'Ten', dataIndex: 'email' },
    { title: 'Loai', dataIndex: 'fullname' },
    { title: 'Mo ta', dataIndex: 'fullname' },
    { title: 'Gia', dataIndex: 'fullname' },
    { title: 'Giam gia (%)', dataIndex: 'fullname' },
    { title: 'Da ban', dataIndex: 'fullname' },
    { title: 'Diem danh gia', dataIndex: 'fullname' },
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

export const ListFoods = () => {
    return (
        <>
            <h1>Danh sach cac mon an</h1>
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