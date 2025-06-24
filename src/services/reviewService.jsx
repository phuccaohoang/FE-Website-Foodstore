import axiosClient from "./axiosClient";

const reviewService = {
    getReviews: (params = {}) => {
        return axiosClient.get('/get/reviews', { params })
    },
    disableReviews: (list_id) => {
        return axiosClient.patch('/update/disable-review', { list_id: list_id })
    },
    storeReview: (order_detail_id, text, rating) => {
        return axiosClient.post('/store/review', {
            order_detail_id: order_detail_id,
            text: text,
            rating: rating,
        })
    },
}



export default reviewService;