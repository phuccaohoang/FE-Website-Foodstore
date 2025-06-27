import { Badge, Button, Card, Col, Rate, Tag, Typography } from "antd"
import bannerimg from '../../assets/mon1.png'
import { useNavigate } from "react-router-dom"
import cartService from "../../services/cartService";
import { useSession } from "../../context/SessionContext";
const { Text } = Typography;

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

    const { user, setUser, contextHolder, openNotification } = useSession()



    const mainContent = <>
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
                        height: 180,
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
            <p style={{ fontSize: '30px', fontFamily: 'Montserrat', fontWeight: '500' }}>{food.name}</p>
            <div
                style={{
                    marginTop: 8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    justifyContent: 'space-between'
                }}
            >
                <span > <Tag style={{ fontSize: '18px', padding: '5px 15px', fontWeight: 'bold' }} bordered={true} color={getRandomColor()}>{food.category.name}</Tag></span>
                <div style={{ fontWeight: '500', fontSize: '23px' }}>
                    {
                        food.discount > 0 ? <>
                            <Text delete style={{ fontSize: '20px' }}>{food.price}</Text>
                            &nbsp;
                        </> : null
                    }
                    <span style={{ color: 'red' }}>{(100 - food.discount) / 100 * food.price}đ</span>
                </div>

            </div>

            <div
                style={{
                    marginTop: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    justifyContent: 'space-between',

                }}
            >
                {
                    food.rating ? <>
                        <Rate allowHalf disabled defaultValue={food.rating} style={{ fontSize: 16 }} />
                    </> : <>
                        <span style={{ fontSize: 16 }}>Chua co danh gia</span>
                    </>
                }
                <span style={{ color: '#555', fontSize: 16 }}>Đã bán {food.sold}</span>
            </div>

            <div
                style={{
                    marginTop: 10,
                    display: 'flex',
                    alignItems: 'center',

                }}
            >
                <Button variant="filled" color="orange" style={{ width: '100%', padding: '20px 5px', fontWeight: 600, fontSize: '20px' }}
                    onClick={async () => {

                        if (!user) {
                            navigate('/login')
                        } else {

                            const response = await cartService.storeCart(food.id, 1)
                            if (response.status) {
                                openNotification('success', 'description')
                                setUser(user => {
                                    return {
                                        ...user,
                                        has_carts: user.has_carts + 1,
                                    }
                                })
                            } else {
                                openNotification('error', 'description')

                            }
                        }
                    }}
                >
                    Them vao gio
                </Button>
            </div>
        </Card>
    </>
    return (
        <>
            {contextHolder}
            <Col
                span={6}
            >
                {
                    food.discount > 0 ? <>
                        <Badge.Ribbon color="red" disabled
                            text={`SALE ${food.discount}%`} style={{ fontSize: '25px', padding: '8px', fontWeight: '500' }}
                        >
                            {mainContent}
                        </Badge.Ribbon>
                    </> : <>
                        {mainContent}

                    </>
                }

            </Col >
        </>
    )
}