import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css'
import {
    Button, InputNumber, Typography, Divider, Image, Space, message,
} from 'antd';
import { } from '@ant-design/icons';
import logo from '../../../assets/logo.jpg'
import mon from '../../../assets/mon2.jpg'

const { Text, Title } = Typography;



export const Cart = () => {
    const navigate = useNavigate()

    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Pizza Hải Sản Pesto',
            image: { mon },
            size: 'Cỡ vừa',
            crust: 'Đế viền phô mai',
            price: 245000,
            quantity: 2,
        },
        {
            id: 2,
            name: 'Pizza Gà Phô Mai',
            image: { mon },
            size: 'Cỡ lớn',
            crust: 'Đế dày bột tươi',
            price: 195000,
            quantity: 1,
        },
    ]);



    // xoa gio 
    const remove = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    //luu so luong tam thoi
    const [tempQuantities, setTempQuantities] = useState(() => {
        const initialQuantities = {};
        cartItems.forEach(item => {
            initialQuantities[item.id] = item.quantity;
        });
        return initialQuantities;
    });

    // cap nhat so luong tam 
    const handleQuantityChange = (id, value) => {
        setTempQuantities(prev => ({
            ...prev,
            [id]: value,
        }));
    };

    // cap nhat so luong chinh thuc
    const updateQuantity = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: tempQuantities[id] } : item
            )
        );
        message.success('Cập nhật số lượng thành công!');
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);


    // khi khong co trong gio
    if (cartItems.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: 64, }}>
                <Image
                    src={logo}
                    preview={false}
                    width={200}
                    style={{
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        msUserSelect: 'none'
                    }}
                />
                <Title level={3}>Giỏ Hàng Trống</Title>
                <Text>
                    Hiện Tại Bạn Chưa Có Sản Phẩm Nào Trong Giỏ Hàng. Hãy Dạo Một Vòng Thực Đơn Để Chọn
                    Sản Phẩm Yêu Thích Nhé!
                </Text>
                <div style={{ marginTop: 24 }}>
                    <div   >  <Button type="primary" size="large" style={{ border: '2px solid ' }} onClick={() => { navigate('/') }}>Tiếp Tục Chọn Món</Button></div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container" style={{ width: '65%', margin: '4px auto' }}>
            <Title level={4} className="cart-title">Giỏ Hàng Của Bạn</Title>

            {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                    <Image
                        src={mon}
                        width={120}
                        style={{
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            MozUserSelect: 'none',
                            msUserSelect: 'none'
                        }} />
                    <div className="cart-item-details">
                        <Text strong>{item.name}</Text>
                        <div>{item.size}</div>
                        <div>{item.crust}</div>
                        <Space className="cart-item-actions">
                            <Button size="small" danger type="link" onClick={() => remove(item.id)}>Xóa</Button>
                        </Space>
                    </div>
                    <div className="cart-item-quantity">
                        <InputNumber min={1}
                            style={{ width: 70, textAlign: 'center' }}
                            value={tempQuantities[item.id]}
                            onChange={(value) => handleQuantityChange(item.id, value)} />
                        <Button onClick={() => updateQuantity(item.id)}>Cập Nhật</Button>
                    </div>
                    <Text className="cart-item-price">
                        {(item.price * item.quantity).toLocaleString()}₫
                    </Text>
                </div>
            ))}

            <Divider />



            <div className="cart-summary">
                <div className="cart-summary-text">
                    <Typography.Title level={4}>
                        <Text>Tạm tính: {total.toLocaleString()}₫</Text><br />
                    </Typography.Title>

                </div>

                <Button
                    type="primary"
                    block
                    className="cart-summary-button"
                    style={{ width: '200px', float: 'right' }}
                    onClick={() => { navigate('/payment') }}
                >
                    <div> Thanh Toán </div>
                </Button>
            </div>
        </div>
    );
};
