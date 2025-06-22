import { useState, useEffect } from 'react';
import {
    Button,
    InputNumber,
    Typography,
    message,
    Tag,
    Avatar,
    Rate,
    List,
    Space,
    Card,
} from 'antd';
import './FoodDetail.css';
import { useParams } from 'react-router-dom';
import { FoodList } from '../../../components/food-list/FoodList';
const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;
import bannerimg from '../../../assets/mon1.png'
import foodService from '../../../services/foodService';






export const FoodDetail = () => {
    // chi tiet
    const [food, setFood] = useState(null)

    const { slug } = useParams()
    useEffect(() => {
        const loadFood = async () => {
            const response = await foodService.getFood(slug)
            if (response.status) {
                setFood(response.data[0])
            }
        }
        loadFood();
    }, [])
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

    const [reviews, setReviews] = useState([
        {
            id: 1,
            name: 'Nguyễn Văn A',
            avatar: 'https://i.pravatar.cc/150?img=1',
            rating: 5,
            comment: 'Món này rất ngon, sẽ quay lại lần sau!',
        },
        {
            id: 2,
            name: 'Trần Thị B',
            avatar: 'https://i.pravatar.cc/150?img=2',
            rating: 4,
            comment: '',
        },
    ]);

    const [quantity, setQuantity] = useState(1);

    const increase = () => setQuantity(prev => prev + 1);
    const decrease = () => setQuantity(prev => Math.max(1, prev - 1));

    const handleAddToCart = () => {
        message.success(`${quantity} ${food.name} đã được thêm vào giỏ hàng.`);
    };
    return (
        <>

            {
                food !== null ?
                    <>
                        {console.log('food', food)}
                        <Title level={5} style={{ margin: '5px 250px', fontSize: '30px' }}>Chi tiết món ăn</Title>

                        <div className="food-detail-container" style={{ margin: '0 auto', width: '93%' }}>
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
                                <div>
                                    <Space>
                                        <Title level={3} className="food-title">{food.name}</Title>
                                        <Rate allowHalf disabled defaultValue={food.rating} />
                                    </Space>

                                    <Title level={3} className="food-title">
                                        <Tag bordered={false} color="cyan" style={{ fontSize: '20px' }}>{food.category.name}</Tag>
                                    </Title>
                                    <Text strong className="food-price">{food.price}VNĐ</Text>
                                    <Paragraph className="food-description">{food.description}</Paragraph>
                                </div>

                                <div className="food-detail-action">
                                    <Space>
                                        <Button onClick={decrease} disabled={quantity <= 1}>-</Button>
                                        <InputNumber min={1} value={quantity} />
                                        <Button onClick={increase}>+</Button>

                                        <Button
                                            type="primary"
                                            block
                                            className="add-to-cart-button"
                                            onClick={handleAddToCart}
                                        >
                                            Thêm vào giỏ hàng
                                        </Button>
                                    </Space>


                                </div>
                            </div>
                        </div>

                        <Title level={5} style={{ margin: '5px 250px', fontSize: '30px' }}>Đánh giá và Bình luận</Title>
                        <div style={{ margin: '1% 12%', padding: 24 }}>
                            <List
                                itemLayout="vertical"
                                dataSource={reviews}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.avatar} />}
                                            title={
                                                <Space>
                                                    <Text strong>{item.name}</Text>
                                                    <Rate disabled value={item.rating} />
                                                </Space>
                                            }
                                            description={item.comment || <Text type="secondary">[Không có bình luận]</Text>}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>

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
