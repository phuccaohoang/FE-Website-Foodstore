import './home.css'
import { Carousel } from 'antd';
import bannerimg from '../../../assets/mon1.png'
import bannerimg2 from '../../../assets/mon2.jpg'
import { useEffect, useState, useNavigate } from 'react';

//
import foodService from '../../../services/foodService';
import { FoodList } from '../../../components/food-list/FoodList';

const slidesStyle = {
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    aspectRatio: '16 / 6',
    width: '100%',

    objectFit: 'cover',

    // margin: 0,
    // color: '#fff',
    // lineHeight: '160px',
    // textAlign: 'center',
    // background: '#364d79',
};
export const Home = () => {

    const [foodsAll, setFoodsAll] = useState([])
    const [foodsDiscount, setFoodsDiscount] = useState([])

    useEffect(() => {

        const loadFoodsAll = async () => {
            const response = await foodService.getFoods({
                per_page: 8,
                status: 1,
            });
            if (response.status) {
                setFoodsAll(response.data)
            }
        }
        //
        const loadFoodsDiscount = async () => {
            const response = await foodService.getFoods({
                per_page: 4,
                status: 1,
                sort_by: 'discount_desc',
            });
            if (response.status) {
                setFoodsDiscount(response.data)
            }
        }
        //
        loadFoodsAll()
        loadFoodsDiscount()
    }, [])


    return (
        <>
            {/* Banner */}
            <div className='Slides'>
                <Carousel autoplay style={{
                    padding: '0',
                    marginTop: '5px',
                    borderRadius: '10px',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
                    overflow: "hidden"
                }} >
                    <div>
                        <img style={slidesStyle} src={bannerimg} />
                    </div>
                    <div>
                        <img style={slidesStyle} src={bannerimg2} />
                    </div>
                    <div>
                        <img style={slidesStyle} src={bannerimg} />
                    </div>
                    <div>
                        <img style={slidesStyle} src={bannerimg2} />
                    </div>

                </Carousel>
            </div>
            {/* danh sach */}
            <FoodList
                title={'Món ăn ưu đãi'}
                foods={foodsDiscount}
                openFooter={false}

            />
            {/* danh sach */}
            <FoodList
                title={'Tất cả món ăn'}
                foods={foodsAll}
                openFooter={true}

            />
        </>
    )
}