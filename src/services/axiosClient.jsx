import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000,
});

axiosClient.interceptors.response.use(
    (response) => {
        console.log('response >>>>>> ', response.data)
        return response.data
    },
    (error) => {
        console.log('error >>>>>> ', error)
    }
)

export default axiosClient;