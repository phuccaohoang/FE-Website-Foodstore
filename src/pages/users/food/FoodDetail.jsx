import { useState, useEffect } from 'react';
import {
    Button, InputNumber, Typography, message, Tag, Avatar, Rate, List, Space, Card,
    Divider,
    Row,
    Col
} from 'antd';
import './FoodDetail.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FoodList } from '../../../components/food-list/FoodList';
const { Title, Text, Paragraph } = Typography;
import bannerimg from '../../../assets/mon1.png'
import foodService from '../../../services/foodService';
import cartService from '../../../services/cartService';
import { useSession } from '../../../context/SessionContext';






export const FoodDetail = () => {
    // chi tiet
    const [food, setFood] = useState(null)

    const { slug } = useParams()
    useEffect(() => {
        const loadFood = async () => {
            const response = await foodService.getFood(slug)
            if (response.status) {
                setFood(response.data[0])
                setReviews(response.data[0].reviews)
            }
        }
        loadFood();
    }, [slug])
    // danh gia


    // danh sach 
    const [foods, setFoods] = useState([])

    useEffect(() => {

        const loadFoods = async () => {
            const response = await foodService.getFoods();
            if (response.status) {
                setFoods(response.data)
            }
        }
        loadFoods()
    }, [])

    const [reviews, setReviews] = useState([]);

    const [quantity, setQuantity] = useState(1);

    const { user, setUser, contextHolder, openNotification } = useSession()
    const navigate = useNavigate()

    const handleAddToCart = async () => {
        if (user) {
            const response = await cartService.storeCart(food.id, quantity)
            if (response.status) {
                openNotification('success', "description")
                setUser(user => {
                    return {
                        ...user,
                        has_carts: user.has_carts + 1,
                    }
                })
            } else {
                openNotification('error', "description")
            }
        } else {
            navigate('/login')
        }
    };

    const colorButton = [
        'magenta',
        'red',
        'volcano',
        'orange',
        'gold',
        'lime',
        'green',
        'blue',
        'geekblue',
        'purple',
    ];
    function getRandomColor() {
        const randomIndex = Math.floor(Math.random() * colorButton.length);
        return colorButton[randomIndex];
    }
    return (
        <>
            {contextHolder}
            {
                food !== null ?
                    <>
                        <Card style={{ marginTop: '10px' }}>

                            <Title level={5} style={{ margin: '0', fontSize: '30px', fontFamily: 'Montserrat' }}>Chi tiết món ăn</Title>
                            <Divider />
                            <div className="food-detail-container" style={{ margin: '0 auto', }}>
                                <div className="food-detail-image">
                                    <img src={bannerimg}
                                        style={{
                                            userSelect: 'none',
                                            WebkitUserSelect: 'none',
                                            MozUserSelect: 'none',
                                            msUserSelect: 'none',
                                        }} />
                                </div>

                                <div className="food-detail-info">
                                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '15px' }}>
                                        <Row alignItems={'center'}>
                                            <Title level={3} className="food-title" style={{ fontSize: '35px', fontFamily: 'Montserrat', margin: 0 }}>{food.name}</Title>
                                        </Row>
                                        <Row>
                                            <Tag style={{ fontSize: '20px', padding: '10px 20px', fontWeight: 'bold', margin: 0 }} bordered={true} color={getRandomColor()}>{food.category.name}</Tag>
                                        </Row>

                                        <Row>
                                            <Text strong className="food-price" style={{ margin: 0 }}>{food.price}VNĐ</Text>
                                        </Row>
                                        <Row>
                                            <Paragraph style={{ fontSize: '20px', margin: 0 }} className="food-description">{food.description}</Paragraph>
                                        </Row>
                                    </div>

                                    <div className="food-detail-action">
                                        <Row justify={'space-between'} align={'center'} style={{ padding: '10px' }}>
                                            <Col>
                                                <InputNumber style={{ fontSize: '30px', fontFamily: 'Montserrat' }} min={1} value={quantity} max={10} onChange={(value) => {
                                                    setQuantity(value)
                                                }} />
                                            </Col>
                                            <Col>

                                                <Button
                                                    type="primary"
                                                    block
                                                    size='large'
                                                    style={{ padding: '30px', fontSize: '30px', fontFamily: 'Montserrat', borderRadius: '14px' }}
                                                    onClick={handleAddToCart}
                                                >
                                                    Thêm vào giỏ hàng
                                                </Button>
                                            </Col>

                                        </Row>


                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card style={{ marginTop: '10px' }}>

                            <Title level={5} style={{ margin: '0', fontSize: '30px', fontFamily: 'Montserrat' }}>Đánh giá và Bình luận</Title>
                            <Divider />
                            <div style={{ margin: '0', padding: 0 }}>
                                <List
                                    itemLayout="vertical"
                                    dataSource={reviews}
                                    renderItem={item => {
                                        return <>
                                            <Card style={{ marginBottom: '5px' }}>
                                                <div style={{ display: 'flex', columnGap: '10px', alignItems: 'start' }}>

                                                    <Avatar src={bannerimg} size={80} style={{ flexShrink: '0' }} />
                                                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', rowGap: '5px', flex: '1' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', columnGap: '10px', flexShrink: '0', fontSize: '20px' }}>
                                                            <span style={{ fontWeight: 'bold' }}>{item.customer.fullname}</span>
                                                            <span style={{ fontWeight: 'normal' }}>{item.created_at}</span>
                                                        </div>

                                                        <div style={{ flexShrink: '0', fontSize: '15px' }}>
                                                            <Rate value={item.rating} disabled />
                                                        </div>
                                                        <div style={{ flex: '1', fontSize: '18px' }}>
                                                            <p>{item.text}</p>
                                                            {/* //feedbacks */}
                                                            {
                                                                item.feedbacks.length !== 0 ? <>
                                                                    <Divider />

                                                                    <div style={{ display: 'flex', columnGap: '10px', alignItems: 'start' }}>
                                                                        <Avatar src={bannerimg} size={50} style={{ flexShrink: '0' }} />
                                                                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', rowGap: '5px', flex: '1' }}>
                                                                            <div style={{ display: 'flex', alignItems: 'center', columnGap: '10px', flexShrink: '0', fontSize: '20px' }}>
                                                                                <span style={{ fontWeight: 'bold' }}>{item.feedbacks[0].administrator.fullname}</span>
                                                                                <span style={{ fontWeight: 'normal' }}>{item.feedbacks[0].created_at}</span>
                                                                            </div>

                                                                            <div style={{ flex: '1', fontSize: '18px' }}>
                                                                                <p>{item.feedbacks[0].text}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </> : null
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                            </Card>
                                        </>
                                    }}
                                />
                            </div>
                        </Card>

                        <FoodList
                            title={'Có thể bạn sẽ thích'}
                            foods={foods}
                            openFooter={true}
                            onClickFooter={() => {
                                alert('xem them')
                            }}
                        />
                    </>
                    : null
            }
        </>

    );
};
