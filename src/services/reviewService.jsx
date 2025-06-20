import axiosClient from "./axiosClient";

const reviewService = {
    getReviews: (params = {}) => {
        return axiosClient.get('/get/reviews', { params })
    }
}



export default reviewService;