import axiosClient from "./axiosClient";

const feedbackService = {
    deleteFeedback: (params = {}) => {
        return axiosClient.delete('/delete/feedback', { params })
    },
    storeFeedback: (review_id, text) => {
        return axiosClient.post('/store/feedback', {
            review_id: review_id,
            text: text,
        })
    }
}



export default feedbackService;