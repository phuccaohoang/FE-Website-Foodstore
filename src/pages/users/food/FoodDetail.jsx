import { useState } from 'react';
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
    Row,
    Col
} from 'antd';
import bannerimg from '../../../assets/mon1.png';
import './FoodDetail.css';

const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;

const food = {
    name: 'Phở bò Hà Nội',
    image: bannerimg,
    price: '50.000 Đồng',
    category: 'Món chính',
    description: 'Phở bò với nước dùng hầm xương đậm đà, thơm mùi quế và gừng nướng.'
};

const sampleList = [
    {
        name: "Phở bò Hà Nội",
        image: bannerimg,
        price: "50.000 Đồng",
        description: "Nước dùng thơm ngon đậm đà.",
        rating: 4.5,
        sold: 230
    },
    {
        name: "Bánh mì Sài Gòn",
        image: bannerimg,
        price: "20.000 Đồng",
        description: "Giòn rụm, kèm pate thơm béo.",
        rating: 4.7,
        sold: 320
    },
    {
        name: "Phở bò Hà Nội",
        image: bannerimg,
        price: "50.000 Đồng",
        description: "Nước dùng thơm ngon đậm đà.",
        rating: 4.5,
        sold: 230
    },
    {
        name: "Bánh mì Sài Gòn",
        image: bannerimg,
        price: "20.000 Đồng",
        description: "Giòn rụm, kèm pate thơm béo.",
        rating: 4.7,
        sold: 320
    },
    {
        name: "Phở bò Hà Nội",
        image: bannerimg,
        price: "50.000 Đồng",
        description: "Nước dùng thơm ngon đậm đà.",
        rating: 4.5,
        sold: 230
    },
    {
        name: "Bánh mì Sài Gòn",
        image: bannerimg,
        price: "20.000 Đồng",
        description: "Giòn rụm, kèm pate thơm béo.",
        rating: 4.7,
        sold: 320
    },
];

export const FoodDetail = () => {
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
            <Title level={5} style={{ margin: '5px 250px', fontSize: '30px' }}>Chi tiết món ăn</Title>

            <div className="food-detail-container" style={{ margin: '0 auto', width: '93%' }}>
                <div className="food-detail-image">
                    <img src={food.image} alt={food.name}
                        style={{
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            MozUserSelect: 'none',
                            msUserSelect: 'none',
                        }} />
                </div>

                <div className="food-detail-info">
                    <div>
                        <Tag color="red">{food.category}</Tag>
                        <Title level={3} className="food-title">{food.name}</Title>
                        <Text strong className="food-price">{food.price}</Text>
                        <Paragraph className="food-description">{food.description}</Paragraph>
                    </div>

                    <div className="food-detail-action">
                        <Space>
                            <Button onClick={decrease} disabled={quantity <= 1}>-</Button>
                            <InputNumber min={1} value={quantity} readOnly />
                            <Button onClick={increase}>+</Button>
                        </Space>

                        <Button
                            type="primary"
                            block
                            className="add-to-cart-button"
                            onClick={handleAddToCart}
                        >
                            Thêm vào giỏ hàng
                        </Button>
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

            <Title level={5} style={{ margin: '5px 250px', fontSize: '30px' }}>Có thể bạn sẽ thích</Title>
            <Row
                style={{ margin: '0 auto', width: '1400px' }}
                wrap={true}
                gutter={[16, 16]}
            >
                <Col span={24}>
                    <Row gutter={[16, 16]}>
                        {sampleList.map(item => (
                            <Col
                                span={6}
                            >
                                <Card
                                    hoverable
                                    cover={
                                        <img
                                            alt={item.name}
                                            src={item.image}
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
    );
};
