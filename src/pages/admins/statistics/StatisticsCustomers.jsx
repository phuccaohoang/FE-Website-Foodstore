import { useEffect, useState } from "react";
import { Table, Button, Row, Col, DatePicker } from "antd"
import { useSession } from "../../../context/SessionContext";
import orderService from "../../../services/orderService";
const { RangePicker } = DatePicker



const columns = [
    { title: 'STT', dataIndex: 'stt' },

    { title: 'Tên khách hàng', dataIndex: 'fullname' },
    { title: 'Tổng đơn hàng đã mua', dataIndex: 'total_quantity_orders' },
    { title: 'Tổng tiền đơn hàng đã mua', dataIndex: 'total_money_orders' },
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

    const { refresh, setRefresh, setLoading } = useSession()
    const [customers, setCustomers] = useState([])
    const [date, setDate] = useState({
        start_date: null,
        end_date: null,
    })
    useEffect(() => {
        const loadStatisticsCustomers = async () => {
            setLoading(true)

            const response = await orderService.getStatisticsCustomers(date)
            if (response.status) {
                setCustomers(response.data.map((item, idx) => {
                    return {
                        stt: idx + 1,
                        fullname: item.customer.fullname,
                        total_money_orders: item.total_money_orders,
                        total_quantity_orders: item.total_quantity_orders,
                    }
                }))
            } setLoading(false)

        }
        //
        loadStatisticsCustomers()
    }, [refresh])
    return (
        <>
            <div className="Title__Page">
                <h1>Thông kê khách mua hàng</h1>
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
                dataSource={customers}
                pagination={{
                    defaultCurrent: 1,
                    total: customers.length,
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