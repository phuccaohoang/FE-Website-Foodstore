import { Typography, Input, Select, Radio, Space, Pagination, Row, Col, Button, Card } from 'antd';
import { FoodList } from '../../../components/food-list/FoodList';
import { useState, useEffect } from 'react';
import foodService from '../../../services/foodService';
import { SearchOutlined, UndoOutlined } from '@ant-design/icons';
import categoryService from '../../../services/categoryService';




export const Explore = () => {
    const [page, setPage] = useState({
        current_page: 1,
        total: 1,
        last_page: 1,
        per_page: 12,
        onChangePage: () => null,
    });

    const [foods, setFoods] = useState([])
    const [categories, setCategories] = useState([])
    //
    const [categoryId, setCategoryId] = useState(0)
    const [searchName, setSearchName] = useState('')
    const [sortBy, setSortBy] = useState('default')
    //
    const [search, setSearch] = useState(true)

    useEffect(() => {

        const loadFoods = async () => {
            const response = await foodService.getFoods({
                name: searchName,
                category_id: categoryId,
                sort_by: sortBy,
                status: 1,
                page: page.current_page,
                per_page: 8,
            });
            if (response.status) {
                setFoods(response.data)
                setPage(response.page)
            }
        }

        loadFoods()
    }, [search])

    useEffect(() => {
        const loadCategories = async () => {
            const response = await categoryService.getCategories()
            if (response.status) {
                setCategories(response.data)
            }
        }
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
                        <Radio.Group size='large' defaultValue={0} value={categoryId} style={{ fontSize: '50px' }}
                            className='Input__Filter__Custom'
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            <Radio.Button value={0}>Tất cả</Radio.Button>
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
                                <Input size='large' className='Input__Filter__Custom' value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                />
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
                            <Col span={16}>
                                <Select
                                    className='Input__Filter__Custom'
                                    defaultValue="default"
                                    style={{ width: '100%', }}
                                    size='large'
                                    value={sortBy}
                                    onChange={(value) => {
                                        setSortBy(value)
                                    }}
                                    options={[
                                        { value: 'default', label: 'Mới nhất' },
                                        { value: 'price_asc', label: 'Giá Thấp đến Cao' },
                                        { value: 'price_desc', label: 'Giá Cao đến Thấp' },
                                        { value: 'discount_desc', label: 'Giam Giá' },
                                        { value: 'rating_desc', label: 'Xep Hang Mon An' },
                                        { value: 'sold_desc', label: 'So Luong Da Ban' },
                                    ]}
                                />
                            </Col>
                            <Col className='BTN__Search' span={8} style={{ textAlign: 'right', width: '100%', display: 'flex', justifyContent: 'right', columnGap: '10px' }}>
                                <Button size='large'
                                    onClick={() => {
                                        setCategoryId(0)
                                        setSortBy('default')
                                        setSearchName('')
                                    }}
                                >
                                    <UndoOutlined />
                                </Button>
                                <> </>
                                <Button size='large'
                                    onClick={() => {
                                        setPage({
                                            ...page,
                                            current_page: 1,
                                        })
                                        setSearch(!search)
                                    }}
                                >
                                    <SearchOutlined />
                                </Button>
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
                page={
                    {
                        ...page,
                        onChangePage: (value) => {
                            setPage({
                                ...page,
                                current_page: value
                            })
                            setSearch(!search)
                        }
                    }
                }
            />

        </>
    )
}