import { Button, Card, Typography, Rate, Col, Row } from 'antd';
const { Meta } = Card;
import './home.css'
import { Carousel } from 'antd';
const { Title } = Typography;
import bannerimg from '../../../assets/mon1.png'
import bannerimg2 from '../../../assets/mon2.jpg'

const slidesStyle = {
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    aspectRatio: '16 / 6',
    width: '100%',

    objectFit: 'cover',

    margin: 0,
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
export const Home = () => {

    const foodList = [
        {
            id: 1,
            name: 'Cơm gà Hội An',
            image: 'mon8.png',
            price: '50.000 Đồng',
            description: 'Cơm gà với rau răm và nước mắm chua ngọt đặc trưng.',
            rating: 4.5,
            sold: 120
        },

        {
            id: 2,
            name: 'Cơm gà Hội An',
            image: 'mon8.png',
            price: '50.000 Đồng',
            description: 'Cơm gà với rau răm và nước mắm chua ngọt đặc trưng.',
            rating: 4,
            sold: 120

        },
        {
            id: 3,
            name: 'Cơm gà Hội An',
            image: 'mon8.png',
            price: '50.000 Đồng',
            description: 'Cơm gà với rau răm và nước mắm chua ngọt đặc trưng.',
            rating: 4.5,
            sold: 120

        },
        {
            id: 4,
            name: 'Cơm gà Hội An',
            image: 'mon8.png',
            price: '50.000 Đồng',
            description: 'Cơm gà với rau răm và nước mắm chua ngọt đặc trưng.',
            rating: 1,
            sold: 120

        },
        {
            id: 5,
            name: 'Cơm gà Hội An',
            image: 'mon8.png',
            price: '50.000 Đồng',
            description: 'Cơm gà với rau răm và nước mắm chua ngọt đặc trưng.',
            rating: 1,
            sold: 120

        },
        {
            id: 6,
            name: 'Cơm gà Hội An',
            image: 'mon8.png',
            price: '50.000 Đồng',
            description: 'Cơm gà với rau răm và nước mắm chua ngọt đặc trưng.',
            rating: 3,
            sold: 120
        },
        {
            id: 7,
            name: 'Cơm gà Hội An',
            image: 'mon8.png',
            price: '50.000 Đồng',
            description: 'Cơm gà với rau răm và nước mắm chua ngọt đặc trưng.',
            rating: 5,
            sold: 120

        },
        {
            id: 8,
            name: 'Cơm gà Hội An',
            image: 'mon8.png',
            price: '50.000 Đồng',
            description: 'Cơm gà với rau răm và nước mắm chua ngọt đặc trưng.',
            rating: 4,
            sold: 120

        },

    ];


    return (
        <>
            {/* Banner */}
            <div className='Slides'>
                <Carousel autoplay style={{ padding: '0 10%' }} >
                    <div>
                        <img style={slidesStyle} src={bannerimg} />
                    </div>
                    <div>
                        <img style={slidesStyle} src={bannerimg2} />
                    </div>
                    <div>
                        <img style={slidesStyle} src={bannerimg} />
                    </div>
                    <div>
                        <img style={slidesStyle} src={bannerimg2} />
                    </div>

                </Carousel>
            </div>
            <Title level={5} style={{ margin: '5px 325px', fontSize: '30px' }}>Được ưu thích nhất</Title>
            {/* Danh sach */}
            <Row
                style={{ margin: '0 auto', width: '1400px' }}
                wrap={true}
                gutter={[16, 16]}
            >
                <Col span={24}>
                    <Row gutter={[16, 16]}>
                        {foodList.map(item => (
                            <Col
                                span={6}
                            >
                                <Card
                                    hoverable
                                    cover={
                                        <img
                                            alt={item.name}
                                            src={bannerimg}
                                            style={{
                                                height: 150,
                                                objectFit: 'cover',
                                                userSelect: 'none',
                                                WebkitUserSelect: 'none',
                                                MozUserSelect: 'none',
                                                msUserSelect: 'none',
                                                transition: '0.2s all'
                                            }}
                                            className='Image__Food__Item'
                                        />
                                    }
                                    actions={[
                                        <Button type="primary" block>Xem chi tiết</Button>
                                    ]}
                                >
                                    <Meta title={item.name} />
                                    <div style={{ marginTop: 8, fontWeight: 'bold' }}>{item.price}</div>
                                    <div
                                        style={{
                                            marginTop: 8,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 8,
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <Rate allowHalf disabled defaultValue={item.rating} style={{ fontSize: 14 }} />
                                        <span style={{ color: '#555', fontSize: 13 }}>Đã bán {item.sold}</span>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col span={24}>
                    <Row justify={'center'}>
                        <Button color='blue' variant='solid'>Xem them</Button>
                    </Row>
                </Col>
            </Row>

            <Title level={5} style={{ margin: '5px 325px', fontSize: '30px' }}>Có thể bạn sẽ thích</Title>
            <Row
                style={{ margin: '0 auto', width: '1400px' }}
                wrap={true}
                gutter={[16, 16]}
            >
                <Col span={24}>
                    <Row gutter={[16, 16]}>
                        {foodList.map(item => (
                            <Col
                                span={6}
                            >
                                <Card
                                    hoverable
                                    cover={
                                        <img
                                            alt={item.name}
                                            src={bannerimg}
                                            style={{
                                                height: 150,
                                                objectFit: 'cover',
                                                userSelect: 'none',
                                                WebkitUserSelect: 'none',
                                                MozUserSelect: 'none',
                                                msUserSelect: 'none',
                                                transition: '0.2s all'
                                            }}
                                            className='Image__Food__Item'
                                        />
                                    }
                                    actions={[
                                        <Button type="primary" block>Xem chi tiết</Button>
                                    ]}
                                >
                                    <Meta title={item.name} />
                                    <div style={{ marginTop: 8, fontWeight: 'bold' }}>{item.price}</div>
                                    <div
                                        style={{
                                            marginTop: 8,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 8,
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <Rate allowHalf disabled defaultValue={item.rating} style={{ fontSize: 14 }} />
                                        <span style={{ color: '#555', fontSize: 13 }}>Đã bán {item.sold}</span>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col span={24}>
                    <Row justify={'center'}>
                        <Button color='blue' variant='solid'>Xem them</Button>
                    </Row>
                </Col>
            </Row>
        </>
    )
}