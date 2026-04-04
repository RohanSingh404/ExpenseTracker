import axios from "axios";
import {BASE_URL} from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//  Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        //handle common errors globally
        if (error.response) {
            if (error.response.status === 401) {
                // Unauthorized, token might be expired or invalid
                window.location.href = "/login"; // Redirect to login page
            } else if (error.code === "ECONNABORTED") {
                // Request timeout
                alert("The request timed out. Please try again later.");
            } else if (error.response.status === 500) {
                // Server error
                alert("An error occurred on the server. Please try again later.");
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;