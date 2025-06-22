import { Button, Card, Col, Rate, Tag } from "antd"
import bannerimg from '../../assets/mon1.png'
import { useNavigate } from "react-router-dom"


export const FoodCart = ({ food }) => {
    const navigate = useNavigate();
    return (
        <>
            <Col
                span={6}
            >
                <Card
                    className='Food__Card'
                    hoverable
                    cover={
                        <img

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
                        <Button type="primary" block
                            onClick={() => {
                                navigate(`/foods/${food.slug}`)
                            }}
                        >
                            Xem chi tiết
                        </Button>
                    ]}
                >
                    <p style={{ fontSize: '25px', fontFamily: 'Calibri, sans-serif ' }}>{food.name}</p>
                    <div
                        style={{
                            marginTop: 8,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            justifyContent: 'space-between'
                        }}
                    >
                        <span > <Tag style={{ fontSize: '20px' }} bordered={false} color="cyan">{food.category.name}</Tag></span>
                        <div style={{ marginTop: 8, fontWeight: 'bold' }}>{food.price} VNĐ</div>

                    </div>

                    <div
                        style={{
                            marginTop: 8,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            justifyContent: 'space-between'
                        }}
                    >
                        <Rate allowHalf disabled defaultValue={food.rating} style={{ fontSize: 14 }} />
                        <span style={{ color: '#555', fontSize: 13 }}>Đã bán {food.sold}</span>
                    </div>
                </Card>
            </Col >
        </>
    )
}