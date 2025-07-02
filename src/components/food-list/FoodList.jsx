import { useNavigate } from "react-router-dom";
import { FoodCard } from "../food-card/FoodCard"
import { Button, Card, Col, Divider, Pagination, Row, Typography } from "antd"
const { Title } = Typography;


export const FoodList = ({ title, foods, openFooter = false, pagination = false,
    page = {
        current_page: 1,
        total: 1,
        last_page: 1,
        per_page: 12,
        onChangePage: () => null,
    },
}) => {

    const navigate = useNavigate()


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
                                    <FoodCard food={item} />
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
                                onClick={() => {
                                    navigate('/explore')
                                }}
                            >Xem thêm</Button>
                        </Row>
                    </> : null
                }

                {
                    pagination ? <>
                        <Pagination
                            current={page.current_page}
                            total={page.total}
                            pageSize={page.per_page}
                            onChange={page.onChangePage}

                            style={{ marginTop: '20px', justifyContent: 'center' }}
                            showSizeChanger={false}
                        />
                    </> : null
                }

            </Card>
        </>
    )
}