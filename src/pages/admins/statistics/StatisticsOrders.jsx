import { useState } from "react";
import { Table, Button } from "antd"




const columns = [
    { title: 'STT', dataIndex: 'stt' },

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

export const StatisticsOrders = () => {
    return (
        <>
            <div className="Title__Page">
                <h1>Thong ke don hang</h1>
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
                                <Button style={styleButton} type="primary">Them</Button>
                            </div>
                        </>
                    )
                }}
            />
        </>
    )
}