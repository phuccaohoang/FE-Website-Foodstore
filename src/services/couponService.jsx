import axiosClient from "./axiosClient";

const couponService = {
    getCoupons: (params = {}) => {
        return axiosClient.get('/get/coupons', { params })
    },
    updateCouponStatus: ($list_id) => {
        return axiosClient.patch('/update/coupon-status', { list_id: $list_id })
    }
}



export default couponService;