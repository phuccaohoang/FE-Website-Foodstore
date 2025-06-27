import axios from 'axios';


const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    headers: {

        'Accept': 'application/json'
    },
    timeout: 15000,
});

axiosClient.interceptors.response.use(
    (response) => {
        console.log('response >>>>>> ', response.data)
        return response.data
    },
    (error) => {
        console.log('error >>>>>> ', error)
        const message = error.response?.message || 'Có lỗi xảy ra!';
        return Promise.resolve({
            status: false,
            data: null,
            message,
        });
    }
)

export default axiosClient;