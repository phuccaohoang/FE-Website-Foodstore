import axiosClient from "./axiosClient";

const reviewService = {
    getReviews: (params = {}) => {
        return axiosClient.get('/get/reviews', { params })
    },
    disableReviews: (list_id) => {
        return axiosClient.patch('/update/disable-review', { list_id: list_id })
    }
}



export default reviewService;