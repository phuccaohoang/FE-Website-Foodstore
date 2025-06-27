import { Typography, Input, Select, Radio, Space, Pagination, Row, Col, Button, Card } from 'antd';
import { FoodList } from '../../../components/food-list/FoodList';
import { useState, useEffect } from 'react';
import foodService from '../../../services/foodService';
import { SearchOutlined, UndoOutlined } from '@ant-design/icons';
import categoryService from '../../../services/categoryService';

const { Search } = Input;
const handleChange = value => {
    console.log(`selected ${value}`);
};
const onSearch = (value, _e, info) =>
    console.log(info === null || info === void 0 ? void 0 : info.source, value);


export const Explore = () => {
    const [page, setPage] = useState(1);

    const [foods, setFoods] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {

        const loadFoods = async () => {
            const response = await foodService.getFoods();
            if (response.status) {
                setFoods(response.data)
            }
        }
        const loadCategories = async () => {
            const response = await categoryService.getCategories()
            if (response.status) {
                setCategories(response.data)
            }
        }
        loadFoods()
        loadCategories()
    }, [])

    return (
        <>
            {/* FIlter */}
            <Card style={{
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                marginTop: '10px'
            }}>

                <Row gutter={[5]} style={{ marginBottom: '10px' }}>
                    <Col span={24}>
                        <Typography.Title level={4} style={{ fontFamily: 'sans-serif' }}>Loại món ăn</Typography.Title>
                    </Col>
                    <Col span={24}>
                        <Radio.Group size='large' defaultValue={0} style={{ fontSize: '50px' }} className='Input__Filter__Custom'>
                            <Radio.Button value={0}>Tat ca</Radio.Button>
                            {
                                categories.length !== 0 ? <>
                                    {
                                        categories.map((item) => {

                                            return <Radio.Button value={item.id}>{item.name}</Radio.Button>
                                        })
                                    }
                                </> : null
                            }
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
                                <Input size='large' className='Input__Filter__Custom' />
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
                                    className='Input__Filter__Custom'
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
                            <Col className='BTN__Search' span={10} style={{ textAlign: 'right', width: '100%', display: 'flex', justifyContent: 'right', columnGap: '10px' }}>
                                <Button size='large'><UndoOutlined /></Button>
                                <> </>
                                <Button size='large'><SearchOutlined /></Button>
                            </Col>
                        </Row>
                    </Col>


                </Row>


            </Card >
            {/* food lisT */}
            < FoodList
                title={'Danh sách các món'}
                foods={foods}
                openFooter={false}
                pagination={true}
            />

        </>
    )
}