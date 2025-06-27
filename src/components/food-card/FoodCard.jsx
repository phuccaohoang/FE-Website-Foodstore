import { Button, Card, Col, Rate, Tag } from "antd"
import bannerimg from '../../assets/mon1.png'
import { useNavigate } from "react-router-dom"
import cartService from "../../services/cartService";
import { useSession } from "../../context/SessionContext";


export const FoodCart = ({ food }) => {
    const navigate = useNavigate();
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

    const { user } = useSession()

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
                            onClick={() => {
                                navigate(`/foods/${food.slug}`)
                            }}
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

                >
                    <p style={{ fontSize: '30px', fontFamily: 'Montserrat' }}>{food.name}</p>
                    <div
                        style={{
                            marginTop: 8,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            justifyContent: 'space-between'
                        }}
                    >
                        <span > <Tag style={{ fontSize: '15px', padding: '5px 15px', fontWeight: 'bold' }} bordered={true} color={getRandomColor()}>{food.category.name}</Tag></span>
                        <div style={{ fontWeight: '500', fontSize: '20px' }}>{food.price} VNĐ</div>

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

                    <div
                        style={{
                            marginTop: 10,
                            display: 'flex',
                            alignItems: 'center',

                        }}
                    >
                        <Button variant="filled" color="orange" style={{ width: '100%', padding: '5px', fontWeight: 500 }}
                            onClick={async () => {
                                if (!user) {
                                    navigate('/login')
                                } else {

                                    const response = await cartService.storeCart(food.id, 1)
                                    if (response.status) {
                                        alert(response.message)
                                    }
                                }
                            }}
                        >
                            Them vao gio
                        </Button>
                    </div>
                </Card>
            </Col >
        </>
    )
}