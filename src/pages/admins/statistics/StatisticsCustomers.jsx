import { useState } from "react";
import { Table, Button, Row, Col, DatePicker } from "antd"
const { RangePicker } = DatePicker



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

export const StatisticsCustomers = () => {
    return (
        <>
            <div className="Title__Page">
                <h1>Thong ke khach mua hang</h1>
            </div>

            <Row style={{ marginTop: '20px' }} gutter={[16, 16]}>
                <Col>
                    <RangePicker />
                </Col>
                <Col span={8} offset={1}>
                    <Button color="blue" variant="dashed">Tai lai</Button>
                </Col>
            </Row>

            <Table
                style={{ marginTop: '20px' }}
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

            // footer={() => {
            //     return (
            //         <>
            //             <div className="Footer__Table">
            //                 <Button style={styleButton} type="primary">Them</Button>
            //             </div>
            //         </>
            //     )
            // }}
            />
        </>
    )
}