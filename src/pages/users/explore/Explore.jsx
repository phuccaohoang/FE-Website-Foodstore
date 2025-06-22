import { Typography, Input, Select, Radio, Space, Pagination } from 'antd';
import { FoodList } from '../../../components/food-list/FoodList';
import { useState, useEffect } from 'react';
import foodService from '../../../services/foodService';

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

                <Space style={{ width: '100%', }}>
                    <Typography.Title level={4} style={{ fontFamily: 'sans-serif' }}>Sắp xếp theo</Typography.Title>
                    <Select
                        defaultValue="up_price"
                        style={{ width: 200, marginLeft: '40px' }}
                        onChange={handleChange}
                        options={[
                            { value: 'down_price', label: 'Giá Thấp đến Cao' },
                            { value: 'up_price', label: 'Giá Cao đến Thấp' },

                        ]}
                    />
                    <Typography.Title level={4} style={{ fontFamily: 'sans-serif' }}>Loại món ăn</Typography.Title>
                    <Radio.Group defaultValue="">
                        <Radio.Button value="a">Gà</Radio.Button>
                        <Radio.Button value="b">Heo</Radio.Button>
                        <Radio.Button value="c">Bò</Radio.Button>
                        <Radio.Button value="d">Tráng miệng</Radio.Button>
                        <Radio.Button value="e">Đồ uống</Radio.Button>
                    </Radio.Group>
                </Space>
                <Space style={{ width: '100%', }}>
                    <Typography.Title level={4} style={{ fontFamily: 'sans-serif' }}>Tìm kiếm món ăn</Typography.Title>
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
            <FoodList
                title={'Danh sách các món'}
                foods={foods}
                openFooter={true}
                onClickFooter={() => {
                    alert('xem them')
                }}
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