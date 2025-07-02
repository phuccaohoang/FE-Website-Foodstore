
import { Column, Line, Pie } from "@ant-design/charts";
import { ArrowUpOutlined, DollarCircleOutlined, FileDoneOutlined, ProductOutlined, TeamOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons"
import { Card, Col, Row, Statistic, Table } from "antd"
import { useEffect, useState } from "react";
import orderService from "../../../services/orderService";

export const Dashboard = () => {

    const [foods, setFoods] = useState([])
    const [orders, setOrders] = useState([])
    const [customers, setCustomers] = useState([])
    const [revenue, setRevenue] = useState({
        total_orders: 0,
        total_revenue: 0,
    })

    const today = new Date();
    // Hàm format yyyy-mm-dd
    const formatDate = (date) => date.toISOString().slice(0, 10);
    // Ngày đầu tháng đã format
    const startDate = formatDate(new Date(today.getFullYear(), today.getMonth(), 1));
    // Ngày hiện tại đã format
    const endDate = formatDate(today);
    const date = {
        start_date: startDate,
        end_date: endDate
    }

    useEffect(() => {
        const loadStatisticsFoods = async () => {
            const response = await orderService.getStatisticsFoods(date)
            if (response.status) {
                setFoods(response.data.map(item => {
                    return {
                        type: item.food.name,
                        value: Number(item.total_quantity)
                    }
                }))
            }
        }
        const loadStatisticsRevenue = async () => {
            const response = await orderService.getStatisticsRevenue(date)
            if (response.status) {
                setRevenue({
                    total_orders: response.data[0].total_orders,
                    total_revenue: response.data[0].total_revenue,
                })
            }
        }
        const loadStatisticsOrders = async () => {
            const response = await orderService.getStatisticsOrders(date)
            if (response.status) {
                setOrders(response.data.map((item) => {
                    return {
                        type: item.order_status.name,
                        value: item.total_orders
                    }
                }))
            }
        }
        const loadStatisticsCustomers = async () => {
            const response = await orderService.getStatisticsCustomers(date)
            if (response.status) {
                setCustomers(response.data.map((item, idx) => {
                    return {
                        stt: idx + 1,
                        fullname: item.customer.fullname,
                        total_quantity_orders: item.total_quantity_orders,
                        total_money_orders: item.total_money_orders,
                    }
                }))
            }
        }
        //
        loadStatisticsRevenue()
        loadStatisticsCustomers()
        loadStatisticsFoods()
        loadStatisticsOrders()
    }, [])




    const configPie = {
        data: orders,
        angleField: 'value',
        colorField: 'type',
        innerRadius: 0.6,
        label: {
            text: 'value',
            style: {
                fontWeight: 'bold',
                fontSize: '20px'
            },
        },
        legend: {
            color: {
                title: false,
                position: 'right',
                rowPadding: 10,

            },

        },
        annotations: [
            {
                type: 'text',
                data: [],
                style: {
                    text: `Đơn hàng ${orders.length !== 0 ? null : 'chưa có'}`,
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 32,
                    fontStyle: 'bold',
                },
            },
        ],
    };



    const configColumn = {
        data: foods,
        xField: 'type',
        yField: 'value',
        markBackground: {
            style: {
                fill: '#eee',
            },
        },
        scale: {
            y: {
                domain: Array.from({ length: foods.length !== 0 ? (foods[0].value + 1) : 0 }).map((_, item) => {
                    return item
                }).reverse(),
            },
        },
        legend: false,
    };



    return (
        <>
            <div className="Title__Page">
                <h1>Thống kê tháng {today.getMonth() + 1}</h1>
            </div>
            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                <Col span={3}>
                    <Card className="Statistics__Item" variant="borderless">
                        <Statistic
                            className="Item__Top"

                            title="Đơn hàng"
                            value={revenue.total_orders}
                            valueStyle={{ color: 'blue', fontSize: 32 }}
                            prefix={<FileDoneOutlined />}
                            suffix=''
                        />

                    </Card>
                </Col>

                <Col span={7}>
                    <Card className="Statistics__Item" variant="borderless">
                        <Statistic
                            className="Item__Top"

                            title="Doanh thu"
                            value={revenue.total_revenue}
                            precision={2}
                            valueStyle={{ color: 'gold', fontSize: 32 }}
                            prefix={<DollarCircleOutlined />}
                            suffix='VND'
                        />

                    </Card>
                </Col>
                <Col span={8}>
                    <Card className="Statistics__Item" variant="borderless">
                        <Statistic
                            className="Item__Top"
                            title="Món ăn bán chạy"
                            value={`${foods.length !== 0 ? foods[0].type : 'Chưa có dữ liệu'}`}

                            // precision={2}
                            valueStyle={{ color: '#f89880', fontSize: 32 }}
                        />

                    </Card>
                </Col>
                <Col span={6}>
                    <Card className="Statistics__Item" variant="borderless">
                        <Statistic
                            className="Item__Top"

                            title={`Khách hàng của tháng`}
                            value={customers.length !== 0 ? customers[0].fullname : 'Chưa có dữ liệu'}
                            precision={0}
                            valueStyle={{ color: '#7b3f00', fontSize: 32 }}

                        // prefix={<UserOutlined />}
                        />

                    </Card>
                </Col>
            </Row>



            <div className="Title__Page" style={{ marginTop: '20px' }}>
                <h2 className="">Biểu đồ thống kê số lượng món ăn được mua</h2>
            </div>
            {
                foods.length !== 0 ?
                    <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                        <Column {...configColumn} />
                    </Row> : <p style={{ fontSize: 20 }}> Chưa có dữ liệu</p>
            }

            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                <Col span={16}>
                    <h2 style={{ marginTop: '20px' }}>Thống kê khách mua hàng</h2>

                    <Table
                        bordered={true}
                        style={{ marginTop: '20px' }}
                        columns={[
                            {
                                title: 'STT',
                                dataIndex: 'stt'
                            },
                            {
                                title: 'Tên khách hàng',
                                dataIndex: 'fullname'
                            },
                            {
                                title: 'Tổng đơn hàng',
                                dataIndex: 'total_quantity_orders'
                            },
                            {
                                title: 'Tổng giá trị đơn hàng',
                                dataIndex: 'total_money_orders'
                            },
                        ]}

                        dataSource={customers}

                        pagination={{
                            pageSize: 5,
                            total: customers.length
                        }}
                    />
                </Col>
                <Col span={8}>

                    <Pie {...configPie} />
                </Col>
            </Row>



        </>
    )
}