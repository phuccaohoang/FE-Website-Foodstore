import { useEffect, useState } from "react";
import { Table, Button, Row, Col, DatePicker } from "antd"
import { useSession } from "../../../context/SessionContext";
import orderService from "../../../services/orderService";
const { RangePicker } = DatePicker



const columns = [
    { title: 'STT', dataIndex: 'stt' },

    { title: 'Trạng thái đơn hàng', dataIndex: 'order_status' },
    { title: 'Số lượng đơn hàng', dataIndex: 'total_orders' },
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
    const { refresh, setRefresh, setLoading } = useSession()
    const [orders, setOrders] = useState([])
    const [date, setDate] = useState({
        start_date: null,
        end_date: null,
    })
    useEffect(() => {
        const loadStatisticsOrders = async () => {
            setLoading(true)

            const response = await orderService.getStatisticsOrders(date)
            if (response.status) {
                setOrders(response.data.map((item, idx) => {
                    return {
                        stt: idx + 1,
                        order_status: item.order_status.name,
                        total_orders: item.total_orders
                    }
                }))
            } setLoading(false)

        }
        //
        loadStatisticsOrders()
    }, [refresh])
    return (
        <>
            <div className="Title__Page">
                <h1>Thống kê đơn hàng</h1>
            </div>

            <Row style={{ marginTop: '20px' }} gutter={[16, 16]}>
                <Col>
                    <RangePicker
                        onChange={(values) => {
                            setDate({
                                start_date: `${values[0].$y}-${values[0].$M + 1}-${values[0].$D}`,
                                end_date: `${values[1].$y}-${values[1].$M + 1}-${values[1].$D}`,
                            })
                        }}
                    />
                </Col>
                <Col span={8} offset={1}>
                    <Button color="blue" variant="dashed" onClick={() => setRefresh(!refresh)}>Thống kê</Button>
                </Col>
            </Row>

            <Table
                style={{ marginTop: '20px' }}

                columns={columns}
                dataSource={orders}
                pagination={{
                    defaultCurrent: 1,
                    total: orders.length,
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