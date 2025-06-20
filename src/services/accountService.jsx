import axiosClient from "./axiosClient";

const accountService = {
    getAccounts: (params = {}) => {
        return axiosClient.get('/get/accounts', { params })
    },
    updateAccountStatus: ($list_id, $status) => {
        return axiosClient.patch('/update/account-status', {
            list_id: $list_id,
            status: $status
        })
    }
}



export default accountService;