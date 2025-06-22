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

    margin: 0,
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
export const Home = () => {

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
            {/* Banner */}
            <div className='Slides'>
                <Carousel autoplay style={{
                    padding: '0 10%',
                    width: '1750px',
                    margin: '0 auto ',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
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
                title={'Được ưu thích nhất'}
                foods={foods}
                openFooter={true}
                onClickFooter={() => {
                    alert('xem them')
                }}
            />
        </>
    )
}