import axiosClient from "./axiosClient";

const foodService = {
    getFoods: (params = {}) => {
        return axiosClient.get('/get/foods', { params })
    },
    getFood: ($slug) => {
        return axiosClient.get('/get/food', { params: { slug: $slug } })
    },
    updateFoodStatus: ($list_id, $status) => {
        return axiosClient.patch('/update/food-status', {
            list_id: $list_id,
            status: $status
        })
    }
}



export default foodService;