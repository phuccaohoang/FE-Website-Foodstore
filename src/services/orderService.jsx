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
    },
    storeOrder: (phone, address, delivery_cost, coupon_id, note, order_details) => {
        return axiosClient.post('/store/order', {
            phone: phone,
            address: address,
            delivery_cost: delivery_cost,
            coupon_id: coupon_id,
            note: note,
            order_details: order_details,
        })
    }
}



export default orderService;