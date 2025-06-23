import axiosClient from "./axiosClient";

const accountService = {
    getAccounts: (params = {}) => {
        return axiosClient.get('/get/accounts', { params })
    },
    updateAccountStatus: (list_id, status) => {
        return axiosClient.patch('/update/account-status', {
            list_id: list_id,
            status: status
        })
    },
    login: (email, password, isAdmin = 0) => {
        return axiosClient.post('/auth/login', {
            email: email,
            password: password,
            is_admin: isAdmin,
        })
    },
    me: () => {
        return axiosClient.get('/me')
    },
    logout: () => {
        return axiosClient.post('/auth/logout')
    }
}



export default accountService;