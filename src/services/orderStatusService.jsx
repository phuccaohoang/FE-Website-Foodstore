import axiosClient from "./axiosClient";

const orderStatusService = {
    getOrderStatus: (params = {}) => {
        return axiosClient.get('/get/order-status', { params })
    },

}



export default orderStatusService;