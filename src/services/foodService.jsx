import axiosClient from "./axiosClient";

const foodService = {
    getFoods: (params = {}) => {
        return axiosClient.get('/get/foods', { params })
    },
    getFood: (slug) => {
        return axiosClient.get('/get/food', { params: { slug: slug } })
    },
    updateFoodStatus: (list_id, status) => {
        return axiosClient.patch('/update/food-status', {
            list_id: list_id,
            status: status
        })
    },
    updateFoods: (data) => {
        return axiosClient.put('/update/foods', data)
    },
    updateFood: (data) => {
        return axiosClient.post('/update/food', data)
    },
    storeFood: (data) => {
        return axiosClient.post('/store/food', data)
    },
}



export default foodService;