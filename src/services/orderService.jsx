import axiosClient from "./axiosClient";

const orderService = {
    getOrders: (params = {}) => {
        return axiosClient.get('/get/orders', { params })
    }
}



export default orderService;