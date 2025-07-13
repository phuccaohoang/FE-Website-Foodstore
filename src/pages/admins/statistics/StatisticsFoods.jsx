import { useEffect, useState } from "react";
import { Table, Button, Row, Col, DatePicker } from "antd"
import orderService from "../../../services/orderService";
import { useSession } from "../../../context/SessionContext";
const { RangePicker } = DatePicker



const columns = [
    { title: 'STT', dataIndex: 'stt' },

    { title: 'Tên món ăn', dataIndex: 'food' },
    { title: 'Số lượng đã bán', dataIndex: 'total_quantity' },
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

export const StatisticsFoods = () => {

    const { refresh, setRefresh, setLoading } = useSession()
    const [foods, setFoods] = useState([])
    const [foodsNotOrder, setFoodsNotOrder] = useState([])
    const [date, setDate] = useState({
        start_date: null,
        end_date: null,
    })
    useEffect(() => {
        const loadStatisticsFoods = async () => {
            setLoading(true)

            const response = await orderService.getStatisticsFoods(date)
            if (response.status) {
                setFoods(response.data.map((item, idx) => {
                    return {
                        stt: idx + 1,
                        food: item.food.name,
                        total_quantity: item.total_quantity
                    }
                }))
            } setLoading(false)

        }
        const loadStatisticsFoodsNotOrder = async () => {
            setLoading(true)

            const response = await orderService.getStatisticsFoodsNotOrder(date)
            if (response.status) {
                setFoodsNotOrder(response.data.map((item, idx) => {
                    return {
                        stt: idx + 1,
                        food: item.name,
                    }
                }))
            }
            setLoading(false)

        }
        //
        loadStatisticsFoods()
        loadStatisticsFoodsNotOrder()
    }, [refresh])
    return (
        <>
            <div className="Title__Page">
                <h1>Thống kê món ăn</h1>
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

            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <div className="Title__Page" style={{ marginTop: 20 }}>
                        <h2>Danh sách món ăn đã bán</h2>
                    </div>
                    <Table
                        style={{ marginTop: '20px' }}

                        columns={columns}
                        dataSource={foods}
                        pagination={{
                            defaultCurrent: 1,
                            pageSize: 6,
                            total: foods.length,
                            onChange: (item) => {
                                console.log('page', item)
                            }
                        }}


                    />
                </Col>
                <Col span={12}>
                    <div className="Title__Page" style={{ marginTop: 20 }}>
                        <h2>Danh sách món ăn không có đơn hàng</h2>
                    </div>
                    <Table
                        style={{ marginTop: '20px' }}

                        columns={[
                            { title: 'STT', dataIndex: 'stt' },

                            { title: 'Tên món ăn', dataIndex: 'food' },
                        ]}
                        dataSource={foodsNotOrder}
                        pagination={{
                            defaultCurrent: 1,
                            pageSize: 6,
                            total: foodsNotOrder.length,
                            onChange: (item) => {
                                console.log('page', item)
                            }
                        }}


                    />
                </Col>
            </Row>

        </>
    )
}