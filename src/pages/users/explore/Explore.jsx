import { Button, Card, Typography, Rate, Col, Row, Input, Select, Radio, Space, Pagination } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { Meta } = Card;
import { useState } from 'react';
import bannerimg from '../../../assets/mon1.png'
const { Search } = Input;
const handleChange = value => {
    console.log(`selected ${value}`);
};
const onSearch = (value, _e, info) =>
    console.log(info === null || info === void 0 ? void 0 : info.source, value);


export const Explore = () => {
    const [page, setPage] = useState(1);



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
            rating: 4.5,
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

        }
    ];

    return (
        <>
            {/* FIlter */}
            <div style={{
                width: '1380px', margin: '10px auto', userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
            }}>

                <Space style={{ width: '100%', }}>
                    <Typography.Title level={4}>Sắp xếp theo</Typography.Title>

                    <Select
                        defaultValue="up_price"
                        style={{ width: 200, marginLeft: '40px' }}
                        onChange={handleChange}
                        options={[
                            { value: 'down_price', label: 'Giá Thấp đến Cao' },
                            { value: 'up_price', label: 'Giá Cao đến Thấp' },

                        ]}
                    />



                    <Typography.Title level={4}>Loại món ăn</Typography.Title>

                    <Radio.Group defaultValue="">
                        <Radio.Button value="a">Gà</Radio.Button>
                        <Radio.Button value="b">Heo</Radio.Button>
                        <Radio.Button value="c">Bò</Radio.Button>
                        <Radio.Button value="d">Tráng miệng</Radio.Button>
                        <Radio.Button value="e">Đồ uống</Radio.Button>
                    </Radio.Group>
                </Space>
                <Space style={{ width: '100%', }}>
                    <Typography.Title level={4}>Tìm kiếm món ăn</Typography.Title>
                    <Search
                        placeholder="Nhập tên món ăn"
                        allowClear
                        enterButton="Tìm kiếm"
                        size="large"
                        style={{ width: '329%' }}
                        onSearch={onSearch}
                    />
                </Space>


            </div >
            {/* food lisT */}
            <Title level={5} style={{ margin: '5px 250px', fontSize: '30px' }}>Danh sách</Title>
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
            </Row>
            <Pagination
                current={page}
                total={80}
                pageSize={10}
                onChange={(newPage) => setPage(newPage)}
                style={{ margin: ' 5px auto' }}
            />
        </>
    )
}