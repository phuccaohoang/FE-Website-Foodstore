import axiosClient from "./axiosClient";

const orderService = {
    getOrders: (params = {}) => {
        return axiosClient.get('/get/orders', { params })
    },
    updateOrderStatus: (list_id, order_status_id) => {
        return axiosClient.patch('/update/order-status', {
            list_id: list_id,
            order_status_id: order_status_id,
        })
    },
    cancelOrder: (list_id, note) => {
        return axiosClient.put('/update/cancel-order', {
            list_id: list_id,
            note: note,
        })
    }
}



export default orderService;