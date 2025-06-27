import axiosClient from "./axiosClient";

const categoryService = {
    getCategories: () => {
        return axiosClient.get('/get/categories')
    },

}



export default categoryService;