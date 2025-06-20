import { FoodCart } from "../food-card/FoodCard"
import { Button, Col, Row, Typography } from "antd"
const { Title } = Typography;


export const FoodList = ({ title, foods, openFooter = false, onClickFooter = null }) => {


    console.log('foods', foods)
    return (
        <>
            <Title level={5} style={{ margin: '5px 250px', fontSize: '30px' }}>{title}</Title>
            {/* Danh sach */}
            <Row
                style={{ margin: '0 auto', width: '1400px' }}
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
                {
                    openFooter ? <>
                        <Col span={24}>
                            <Row justify={'center'}>
                                <Button color='blue' variant='solid'
                                    onClick={onClickFooter}
                                >Xem them</Button>
                            </Row>
                        </Col>
                    </> : null
                }

            </Row>
        </>
    )
}