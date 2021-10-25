import axios from 'axios';
import router from '@/router';

axios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        if (error.response.status === 401) {
            console.log('BAD TOKEN');
            router.push('/');
        }
        return Promise.reject(error);
    }
);

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export default axios;
