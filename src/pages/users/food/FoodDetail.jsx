import { useState, useRef } from 'react';
import { Button, InputNumber, Typography, message, Tag, Avatar, Rate, List, Space, Card } from 'antd';
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;
import bannerimg from '../../../assets/mon1.png'
import './FoodDetail.css'
const food = {
    name: 'Phở bò Hà Nội',
    image: { bannerimg },
    price: '50.000 Đồng',
    category: 'Món chính',
    description: 'Phở bò với nước dùng hầm xương đậm đà, thơm mùi quế và gừng nướng.'
};

// const sampleList = [
//     {
//         name: "Phở bò Hà Nội",
//         image: "mon8.png",
//         price: "50.000 Đồng",
//         description: "Nước dùng thơm ngon đậm đà.",
//         rating: 4.5,
//         sold: 230
//     },
//     {
//         name: "Bánh mì Sài Gòn",
//         image: "mon8.png",
//         price: "20.000 Đồng",
//         description: "Giòn rụm, kèm pate thơm béo.",
//         rating: 4.7,
//         sold: 320
//     },
//     {
//         name: "Phở bò Hà Nội",
//         image: "mon8.png",
//         price: "50.000 Đồng",
//         description: "Nước dùng thơm ngon đậm đà.",
//         rating: 4.5,
//         sold: 230
//     },
//     {
//         name: "Bánh mì Sài Gòn",
//         image: "mon8.png",
//         price: "20.000 Đồng",
//         description: "Giòn rụm, kèm pate thơm béo.",
//         rating: 4.7,
//         sold: 320
//     },
//     {
//         name: "Phở bò Hà Nội",
//         image: "mon8.png",
//         price: "50.000 Đồng",
//         description: "Nước dùng thơm ngon đậm đà.",
//         rating: 4.5,
//         sold: 230
//     },
//     {
//         name: "Bánh mì Sài Gòn",
//         image: "mon8.png",
//         price: "20.000 Đồng",
//         description: "Giòn rụm, kèm pate thơm béo.",
//         rating: 4.7,
//         sold: 320
//     },
// ];
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


    return (

        <>
            <Title level={5} style={{ margin: '1px 325px', fontSize: '30px' }}>Chi tiết món ăn</Title>

            <div className="food-detail-container" style={{ margin: '0 auto', width: '85%' }}>
                <div className="food-detail-image">
                    <img src={bannerimg} alt={food.name} />
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
            <Title level={5} style={{ margin: '1px 325px', fontSize: '30px' }}>Đánh giá và Bình luận</Title>
            <div style={{ margin: '1% 16%', padding: 24, }}>
                <Typography.Title level={4}>Đánh giá món ăn</Typography.Title>

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

            <Title level={5} style={{ margin: '1px 325px', fontSize: '30px' }}>Các món nổi bậc khác</Title>



        </>
    )
}