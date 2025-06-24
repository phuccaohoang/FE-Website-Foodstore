import { Typography, Input, Select, Radio, Space, Pagination, Row, Col, Button } from 'antd';
import { FoodList } from '../../../components/food-list/FoodList';
import { useState, useEffect } from 'react';
import foodService from '../../../services/foodService';
import { SearchOutlined, UndoOutlined } from '@ant-design/icons';

const { Search } = Input;
const handleChange = value => {
    console.log(`selected ${value}`);
};
const onSearch = (value, _e, info) =>
    console.log(info === null || info === void 0 ? void 0 : info.source, value);


export const Explore = () => {
    const [page, setPage] = useState(1);

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

    return (
        <>
            {/* FIlter */}
            <div style={{
                width: '1380px', margin: '10px auto', userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
            }}>

                <Row gutter={[5]} style={{ marginBottom: '10px' }}>
                    <Col span={24}>
                        <Typography.Title level={4} style={{ fontFamily: 'sans-serif' }}>Loại món ăn</Typography.Title>
                    </Col>
                    <Col span={24}>
                        <Radio.Group size='large' defaultValue="">
                            <Radio.Button value="a">Gà</Radio.Button>
                            <Radio.Button value="b">Heo</Radio.Button>
                            <Radio.Button value="c">Bò</Radio.Button>
                            <Radio.Button value="e">Đồ uống</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row gutter={5}>
                    <Col span={16}>
                        <Row gutter={[10, 10]}>
                            <Col span={24}>
                                <Typography.Title level={4} style={{ fontFamily: 'sans-serif' }}>Tìm kiếm</Typography.Title>
                            </Col>
                        </Row>
                        <Row gutter={[10, 10]}>

                            <Col span={24}>
                                <Input size='large' />
                            </Col>

                        </Row>
                    </Col>
                    <Col span={7} offset={1}>
                        <Row gutter={[10, 10]}>
                            <Col span={24}>
                                <Typography.Title level={4} style={{ fontFamily: 'sans-serif' }}>Sắp xếp</Typography.Title>
                            </Col>
                        </Row>

                        <Row gutter={[10, 10]}>
                            <Col span={14}>
                                <Select
                                    defaultValue="up_price"
                                    style={{ width: '100%', }}
                                    size='large'
                                    onChange={handleChange}
                                    options={[
                                        { value: 'down_price', label: 'Giá Thấp đến Cao' },
                                        { value: 'up_price', label: 'Giá Cao đến Thấp' },
                                    ]}
                                />
                            </Col>
                            <Col span={10} style={{ textAlign: 'right', width: '100%' }}>
                                <Button size='large'><UndoOutlined /></Button>
                                <> </>
                                <Button size='large'><SearchOutlined /></Button>
                            </Col>
                        </Row>
                    </Col>


                </Row>


            </div >
            {/* food lisT */}
            <FoodList
                title={'Danh sách các món'}
                foods={foods}
                openFooter={false}

            />
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