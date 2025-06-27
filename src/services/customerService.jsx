import axiosClient from "./axiosClient";

const customerService = {
    getCustomers: () => {
        return axiosClient.get('/get/customers')
    },

}



export default customerService;