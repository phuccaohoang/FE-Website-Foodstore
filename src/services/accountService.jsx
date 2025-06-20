import axiosClient from "./axiosClient";

const accountService = {
    getAccounts: (params = {}) => {
        return axiosClient.get('/get/accounts', { params })
    }
}



export default accountService;