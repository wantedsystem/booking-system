import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/api"
});

axiosInstance.interceptors.request.use(config => {
    if (window !== undefined) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${localStorage.getItem("token")}`
        };
    }
    return config;
});
