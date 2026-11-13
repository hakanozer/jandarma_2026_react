import axios from "axios";

const config = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: import.meta.env.VITE_TIMEOUT
})

// interceptors for requests
config.interceptors.request.use(
    config => {
        console.log("Request config çalıştı")
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default config; // dışarıda bir yerlerde görünmesi için export ettik
