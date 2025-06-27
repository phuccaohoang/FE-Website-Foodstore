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
    },
    updateCustomer: (address, phone, fullname) => {
        return axiosClient.put('/update/customer', {
            address: address,
            phone: phone,
            fullname: fullname,
        })
    },
    updatePassword: (password, old_password) => {
        return axiosClient.patch('/auth/update-password', {
            password: password,
            old_password: old_password,
        })
    },
    register: (data) => {
        return axiosClient.post('/auth/register', data)
    },
    forgotPassword: (data) => {
        return axiosClient.post('/auth/forgot-password', data)
    },
    updateAvatar: (data) => {
        return axiosClient.post('/update/avatar', data)
    }
}



export default accountService;