import axiosClient from "./axiosClient";

const cartService = {
    getCart: () => {
        return axiosClient.get('/get/cart')
    },
    storeCart: (food_id, quantity) => {
        return axiosClient.post('/store/cart', {
            food_id: food_id,
            quantity: quantity,
        })
    },
    deleteCarts: (params = {}) => {
        return axiosClient.delete('/delete/carts', { params })
    },
    updateCart: (id, quantity) => {
        return axiosClient.patch('/update/cart', {
            id: id,
            quantity: quantity,
        })
    },
    getCartPayment: (params = {}) => {
        return axiosClient.get('/get/cart-payment', { params })
    }
}



export default cartService;