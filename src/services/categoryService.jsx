import axiosClient from "./axiosClient";

const categoryService = {
    getCategories: (params = {}) => {
        return axiosClient.get('/get/categories', { params })
    },
    updateCategory: (data) => {
        return axiosClient.put('/update/category', data)
    },
    storeCategory: (data) => {
        return axiosClient.post('/store/category', data)
    },
}



export default categoryService;