import axiosClient from "./axiosClient";

const couponService = {
    getCoupons: (params = {}) => {
        return axiosClient.get('/get/coupons', { params })
    }
}



export default couponService;