
import { Column, Line, Pie } from "@ant-design/charts";
import { ArrowUpOutlined, DollarCircleOutlined, FileDoneOutlined, ProductOutlined, TeamOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons"
import { Card, Col, Row, Statistic, Table } from "antd"

export const Dashboard = () => {



    const configLine = {
        data: [
            { month: 'Jan', value: 3 },
            { month: 'Feb', value: 4 },
            { month: 'Mar', value: 3.5 },
            { month: 'Apr', value: 5 },
            { month: 'May', value: 4.9 },
            { month: 'June', value: 6 },
            { month: 'July', value: 7 },
            { month: 'Aug', value: 9 },
            { month: 'Sep', value: 13 },
            { month: 'Oct', value: 10 },
            { month: 'Nov', value: 7 },
            { month: 'Dec', value: 11 },
        ],
        xField: 'month',
        yField: 'value',
        point: {
            shapeField: 'circle',
            sizeField: 4,
        },
        interaction: {
            tooltip: {
                marker: false,
            },
        },
        style: {
            lineWidth: 2,
        },
    };

    const configPie = {
        data: [
            { type: 'Cho duyet', value: 27 },
            { type: 'Da duyet', value: 25 },
            { type: 'Dang giao', value: 18 },
            { type: 'Da giao', value: 15 },
            { type: 'Da huy', value: 10 },
        ],
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
                    text: 'Don Hang',
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
        data: [
            { type: 'mon an 1', value: 12 },
            { type: 'mon an 2', value: 15 },
            { type: 'mon an 3', value: 2 },
            { type: 'mon an 4', value: 33 },
            { type: 'mon an 5', value: 27 },
            { type: 'mon an 6', value: 12 },
            { type: 'mon an 7', value: 8 },
            { type: 'mon an 8', value: 9 },
        ],
        xField: 'type',
        yField: 'value',
        markBackground: {
            style: {
                fill: '#eee',
            },
        },
        scale: {
            y: {
                domain: Array.from({ length: 34 }).map((_, item) => {
                    return item
                }).reverse(),
            },
        },
        legend: false,
    };

    return (
        <>
            <div className="Title__Page">
                <h1>Dashboard</h1>
            </div>
            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                <Col span={4}>
                    <Card className="Statistics__Item" variant="borderless">
                        <Statistic
                            className="Item__Top"

                            title="Don hang thang 7"
                            value={90}
                            valueStyle={{ color: 'blue', fontSize: 32 }}
                            prefix={<FileDoneOutlined />}
                            suffix=''
                        />
                        <Statistic
                            className="Item__Bot"

                            title=""
                            value={10}
                            precision={2}
                            valueStyle={{ color: 'green', fontSize: 18 }}
                            prefix={<>
                                <FileDoneOutlined />
                                &nbsp;
                                <ArrowUpOutlined />
                            </>}
                            suffix={<>
                                <span>%</span>
                                &nbsp;
                                <span>thang 6</span>
                            </>}
                        />
                    </Card>
                </Col>

                <Col span={8}>
                    <Card className="Statistics__Item" variant="borderless">
                        <Statistic
                            className="Item__Top"

                            title="Doanh thu thang 7"
                            value={12000000}
                            precision={2}
                            valueStyle={{ color: 'gold', fontSize: 32 }}
                            prefix={<DollarCircleOutlined />}
                            suffix='VND'
                        />
                        <Statistic
                            className="Item__Bot"

                            title=""
                            value={17}
                            precision={2}
                            valueStyle={{ color: 'green', fontSize: 18 }}
                            prefix={<>
                                <DollarCircleOutlined />
                                &nbsp;
                                <ArrowUpOutlined />
                            </>}
                            suffix={<>
                                <span>%</span>
                                &nbsp;
                                <span>thang 6</span>
                            </>}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card className="Statistics__Item" variant="borderless">
                        <Statistic
                            className="Item__Top"
                            title="Mon an yeu thich thang 7"
                            value={"Banh mi heo quay quay quay quay quay"}

                            // precision={2}
                            valueStyle={{ color: '#f89880', fontSize: 32 }}
                            // prefix={<ProductOutlined />}
                            suffix=""
                        />
                        <Statistic
                            className="Item__Bot"

                            value={30}
                            precision={0}
                            valueStyle={{ color: 'grey', fontSize: 18 }}
                            prefix={<ProductOutlined />}
                            suffix="/ 90 da ban"
                        />
                    </Card>
                </Col>
                <Col span={4}>
                    <Card className="Statistics__Item" variant="borderless">
                        <Statistic
                            className="Item__Top"

                            title="Khach hang moi thang 7"
                            value={2}
                            precision={0}
                            valueStyle={{ color: '#7b3f00', fontSize: 32 }}

                            prefix={<UserAddOutlined />}
                        />
                        <Statistic
                            className="Item__Bot"

                            value={100}
                            precision={0}
                            valueStyle={{ color: 'grey', fontSize: 18 }}
                            prefix={<TeamOutlined />}

                        />
                    </Card>
                </Col>
            </Row>

            <div className="Title__Page" style={{ marginTop: '20px' }}>
                <h2 className="">Bieu do the hien doanh thu</h2>
            </div>
            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                <Line {...configLine} />
            </Row>

            <div className="Title__Page" style={{ marginTop: '20px' }}>
                <h2 className="">Bieu do thong ke so luong mon an da duoc mua</h2>
            </div>
            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                <Column {...configColumn} />
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                <Col span={16}>
                    <h2 style={{ marginTop: '20px' }}>Thong ke khach hang da mua</h2>

                    <Table
                        bordered={true}
                        style={{ marginTop: '20px' }}
                        columns={[
                            {
                                title: 'STT',
                                dataIndex: 'stt'
                            },
                            {
                                title: 'Ten khach hang',
                                dataIndex: 'fullname'
                            },
                            {
                                title: 'So don hang da mua',
                                dataIndex: 'quantity'
                            },
                            {
                                title: 'Tong gia tri don hang',
                                dataIndex: 'total'
                            },
                        ]}

                        dataSource={[
                            {
                                key: 1,
                                stt: 1,
                                fullname: 'Le Xuan Thinh',
                                quantity: 12,
                                total: '1,200,000'
                            },
                            {
                                key: 2,
                                stt: 2,
                                fullname: 'Pessi',
                                quantity: 10,
                                total: '900,000'
                            },
                            {
                                key: 3,
                                stt: 3,
                                fullname: 'Go Nan Do',
                                quantity: 6,
                                total: '570,000'
                            },
                            {
                                key: 4,
                                stt: 4,
                                fullname: 'Ledimir Puthin',
                                quantity: 4,
                                total: '500,000'
                            },
                            {
                                key: 5,
                                stt: 5,
                                fullname: 'Donal Trung',
                                quantity: 2,
                                total: '200,000'
                            },
                        ]}

                        pagination={false}
                    />
                </Col>
                <Col span={8}>

                    <Pie {...configPie} />
                </Col>
            </Row>



        </>
    )
}