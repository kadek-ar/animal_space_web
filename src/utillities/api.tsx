import axios from "axios";

const storeToken = () => {
    const auth = window.localStorage.getItem('auth');
    if (!auth) {
        return null
    }
    const tmp = JSON.parse(auth)
    return tmp.token
}

export const api = axios.create({
    baseURL: 'http://localhost:8081',
});

api.interceptors.request.use(
    async (config) => {
        const token = storeToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

