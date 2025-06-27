import { FoodCart } from "../food-card/FoodCard"
import { Button, Card, Col, Divider, Pagination, Row, Typography } from "antd"
const { Title } = Typography;


export const FoodList = ({ title, foods, openFooter = false, onClickFooter = null, pagination = false }) => {




    return (
        <>
            <Card style={{ marginTop: '10px' }}>

                <Title level={5} style={{ fontSize: '30px', fontFamily: 'Montserrat' }}>{title}</Title>
                <Divider />
                {/* Danh sach */}
                <Row
                    style={{ margin: '0 auto' }}
                    wrap={true}
                    gutter={[16, 16]}
                >
                    <Col span={24}>
                        <Row gutter={[16, 16]}>
                            {foods.length !== 0 ? foods.map((item, idx) => {
                                return <>
                                    <FoodCart food={item} />
                                </>
                            })
                                : null
                            }
                        </Row>
                    </Col>

                </Row>
                {/* // */}
                {
                    openFooter ? <>
                        <Divider />
                        <Row justify={'center'}>
                            <Button color='default' variant='dashed' style={{ fontSize: '25px', padding: '25px 15px', fontWeight: '400' }}
                                onClick={onClickFooter}
                            >Xem them</Button>
                        </Row>
                    </> : null
                }

                {
                    pagination ? <>
                        <Pagination
                            current={1}
                            total={80}
                            pageSize={10}
                            onChange={(newPage) => setPage(newPage)}
                            style={{ marginTop: '20px', justifyContent: 'center' }}
                            showSizeChanger={false}
                        />
                    </> : null
                }

            </Card>
        </>
    )
}