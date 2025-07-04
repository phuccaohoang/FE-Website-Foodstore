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
        //
        loadStatisticsFoods()
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

            <Table
                style={{ marginTop: '20px' }}

                columns={columns}
                dataSource={foods}
                pagination={{
                    defaultCurrent: 1,
                    pageSize: 10,
                    total: foods.length,
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