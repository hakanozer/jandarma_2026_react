import axios from "axios";

const config = axios.create({
    baseURL: "https://jsonbulut.com/api/",
    timeout: 10000
})

// interceptors for requests
config.interceptors.request.use(
    config => {
        console.log("Request config çalıştı")
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default config; // dışarıda bir yerlerde görünmesi için export ettik
