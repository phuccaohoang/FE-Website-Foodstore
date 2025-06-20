import axiosClient from "./axiosClient";

const foodService = {
    getFoods: (params = {}) => {
        return axiosClient.get('/get/foods', { params })
    },
    getFood: ($slug) => {
        return axiosClient.get('/get/food', { params: { slug: $slug } })
    }
}



export default foodService;