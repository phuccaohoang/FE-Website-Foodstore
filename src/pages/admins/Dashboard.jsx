
import { ArrowDownOutlined, ArrowUpOutlined, DollarCircleOutlined, FileDoneOutlined, ProductOutlined, TeamOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Card, Col, Row, Statistic } from "antd"

export const Dashboard = () => {
    return (
        <>
            <div className="Title__Page">
                <h1>Dashboard</h1>
            </div>
            <Row gutter={[16, 16]}>
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



        </>
    )
}