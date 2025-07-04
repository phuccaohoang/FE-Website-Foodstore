import { useEffect, useState } from "react";
import { Table, Button, Row, DatePicker, Col } from "antd"
import { useSession } from "../../../context/SessionContext";
import orderService from "../../../services/orderService";
const { RangePicker } = DatePicker;



const columns = [
    { title: 'STT', dataIndex: 'stt' },

    { title: 'Tháng', dataIndex: 'month' },
    { title: 'Năm', dataIndex: 'year' },
    { title: 'Tổng đơn hàng', dataIndex: 'total_orders' },
    { title: 'Doanh thu', dataIndex: 'total_revenue' },
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

export const StatisticsRevenue = () => {

    const { refresh, setRefresh, setLoading } = useSession()
    const [revenue, setRevenue] = useState([])
    const [date, setDate] = useState({
        start_date: null,
        end_date: null,
    })

    useEffect(() => {
        const loadStatisticsRevenue = async () => {
            setLoading(true)

            const response = await orderService.getStatisticsRevenue(date)
            if (response.status) {
                setRevenue(response.data.map((item, idx) => {
                    return {
                        stt: idx + 1,
                        month: item.month,
                        year: item.year,
                        total_revenue: item.total_revenue,
                        total_orders: item.total_orders,
                    }
                }))
            } setLoading(true)

        }
        loadStatisticsRevenue()
    }, [refresh])
    return (
        <>
            <div className="Title__Page">
                <h1>Thống kê doanh thu</h1>
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
                dataSource={revenue}
                pagination={{
                    defaultCurrent: 1,
                    total: revenue.length,
                    pageSize: 10,

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