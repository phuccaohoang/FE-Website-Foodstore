import { useState, useEffect } from 'react';
import {
    Button, InputNumber, Typography, message, Tag, Avatar, Rate, List, Space, Card,
    Divider,
    Row,
    Col,
    Badge,
    Carousel
} from 'antd';
import './FoodDetail.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FoodList } from '../../../components/food-list/FoodList';
const { Title, Text, Paragraph } = Typography;
import NoImg from '../../../assets/mon1.png'
import NoAvatar from '../../../assets/avatar.jpg'
import foodService from '../../../services/foodService';
import cartService from '../../../services/cartService';
import { useSession } from '../../../context/SessionContext';
import dayjs from 'dayjs';





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
            const response = await foodService.getFoods({
                per_page: 4,
                status: 1,
                sort_by: 'discount_desc',
            });
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
    function getRandomFoodNameColor() {
        const randomIndex = Math.floor(Math.random() * colorFoodName.length);
        return colorFoodName[randomIndex];
    }
    const colorFoodName = [
        '#008B8B',
        'blue',
        '#DC143C',
        '#B8860B',
        '#9400D3',
    ]
    const styleFoodName = () => {
        const color = getRandomFoodNameColor()
        return {
            textShadow: `0px 0px 15px ${color}, 0px 0px 15px ${color}, 0px 0px 15px ${color}, 0px 0px 15px ${color}`,
            color: 'white'
        }
    }

    return (
        <>
            {contextHolder}
            {
                food !== null ?
                    <>
                        <Card style={{ marginTop: '10px' }}>

                            {/* <Title level={5} style={{ margin: '0', fontSize: '30px', fontFamily: 'Montserrat' }}>Chi tiết món ăn</Title>
                            <Divider /> */}
                            <div className="food-detail-container" style={{ margin: '0 auto', }}>
                                {
                                    (food.images.length !== 0) ?
                                        <Carousel className="food-detail-image" arrows infinite autoplay>

                                            {
                                                ...(food.images.map((item) => {
                                                    const image = `http://127.0.0.1:8000/${item.img}`
                                                    return <>
                                                        <img src={image}
                                                            alt={item.img}
                                                        />
                                                    </>
                                                }))
                                            }

                                        </Carousel>
                                        : <div className="food-detail-image">
                                            <img src={NoImg} />
                                        </div>
                                }


                                <div className="food-detail-info">
                                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '15px' }}>
                                        <Row alignItems={'center'}>
                                            <Title level={3} className="food-title Neon__Text" style={{ fontSize: '45px', fontFamily: 'Montserrat', margin: 0, fontWeight: 300, ...styleFoodName() }}>{food.name}</Title>
                                        </Row>
                                        {
                                            (food && food.discount > 0) ? <>
                                                <Badge.Ribbon disabled={true} placement='end' color='red' text={`Giảm giá ${food.discount}%`} style={{ fontSize: '25px', padding: '13px', fontWeight: '500', }}>
                                                    <Row>
                                                        <Tag style={{ fontSize: '25px', padding: '10px 20px', fontWeight: 'bold', margin: 0 }} bordered={true} color={getRandomColor()}>{food.category.name}</Tag>
                                                    </Row>

                                                </Badge.Ribbon>
                                            </> : <Row>
                                                <Tag style={{ fontSize: '25px', padding: '10px 20px', fontWeight: 'bold', margin: 0 }} bordered={true} color={getRandomColor()}>{food.category.name}</Tag>
                                            </Row>
                                        }


                                        <Row className="Food__Price">
                                            {
                                                food.discount > 0 ? <>
                                                    <Text delete style={{ margin: 0, color: 'black', fontSize: '23px' }}>{food.price}</Text>

                                                    <Text style={{ margin: 0 }}>{(100 - food.discount) / 100 * food.price} VNĐ</Text>
                                                </> : <>
                                                    <Text style={{ margin: 0 }}>{food.price} VNĐ</Text>

                                                </>
                                            }
                                        </Row>
                                        <Row justify={'space-between'} className='Row__Detail'>
                                            <Text style={{ margin: 0, fontSize: '21px' }}><Rate count={1} value={1} style={{ fontSize: '30px' }} />{food.rating ? food.rating : 'Chưa có đánh giá'}</Text>
                                            <Text style={{ margin: 0, fontSize: '21px' }}>Đã bán {food.sold}</Text>
                                        </Row>
                                        <Row>
                                            <Paragraph style={{ fontSize: '25px', margin: 0 }} className="food-description">{food.description}</Paragraph>
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
                            <div style={{ margin: '0', padding: 0, maxHeight: 1000, overflowY: 'scroll' }}>
                                {
                                    reviews.length !== 0 ? <>
                                        <List
                                            itemLayout="vertical"
                                            dataSource={reviews}

                                            renderItem={item => {
                                                const baseUrl = 'http://127.0.0.1:8000/'
                                                const reviewAvatar = item.customer.account.avatar ? `${baseUrl}${item.customer.account.avatar}` : NoAvatar
                                                let feedbackAvatar = null
                                                if (item.feedbacks.length !== 0) {
                                                    feedbackAvatar = item.feedbacks[0].administrator.account.avatar ? `${baseUrl}${item.feedbacks[0].administrator.account.avatar}` : NoAvatar
                                                }
                                                return <>
                                                    <Card style={{ marginBottom: '5px' }}>
                                                        <div style={{ display: 'flex', columnGap: '10px', alignItems: 'start' }}>

                                                            <Avatar src={reviewAvatar} size={90} style={{ flexShrink: '0' }} />
                                                            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', rowGap: '5px', flex: '1' }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', columnGap: '10px', flexShrink: '0', fontSize: '20px', justifyContent: 'space-between' }}>
                                                                    <span style={{ fontWeight: 'bold' }}>{item.customer.fullname}</span>
                                                                    <span style={{ fontWeight: 'normal' }}>{dayjs(item.created_at).format('YYYY-MM-DD')}</span>
                                                                </div>

                                                                <div style={{ flexShrink: '0', fontSize: '15px' }}>
                                                                    <Rate value={item.rating} disabled />
                                                                </div>
                                                                <div style={{ flex: '1', fontSize: '23px' }}>
                                                                    {
                                                                        item.status ? <p>{item.text}</p> : <p style={{ fontStyle: 'italic' }}>Bình luận đã bị ẩn do vi phạm nguyên tắc cộng đồng.</p>
                                                                    }

                                                                    {/* //feedbacks */}
                                                                    {
                                                                        item.feedbacks.length !== 0 ? <>
                                                                            <Divider />

                                                                            <div style={{ display: 'flex', columnGap: '10px', alignItems: 'start' }}>
                                                                                <Avatar src={feedbackAvatar} size={60} style={{ flexShrink: '0' }} />
                                                                                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', rowGap: '5px', flex: '1' }}>
                                                                                    <div style={{ display: 'flex', alignItems: 'center', columnGap: '10px', flexShrink: '0', fontSize: '20px', justifyContent: 'space-between' }}>
                                                                                        <span style={{ fontWeight: 'bold' }}>{item.feedbacks[0].administrator.fullname}</span>
                                                                                        <span style={{ fontWeight: 'normal' }}>{dayjs(item.feedbacks[0].created_at).format('YYYY-MM-DD')}</span>
                                                                                    </div>

                                                                                    <div style={{ flex: '1', fontSize: '23px' }}>
                                                                                        <p>{item.feedbacks[0].text}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </> : null
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </Card >
                                                </>
                                            }}
                                        />
                                    </> : <p style={{ fontSize: 23 }}>
                                        Chưa có đánh giá
                                    </p>
                                }

                            </div>
                        </Card>

                        <FoodList
                            title={'Món ăn ưu đãi'}
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
