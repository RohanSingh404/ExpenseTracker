export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register", // ✅ FIXED
        GETUSERINFO: "/api/v1/auth/profile"
    },

    DASHBOARD: {
        GETDATA: "/api/v1/dashboard"
    },

    INCOME: {
        ADD_INCOME: "/api/v1/income/add",
        GET_ALL_INCOME: "/api/v1/income/get",
        DELETE_INCOME: (id) => `/api/v1/income/delete/${id}`, // ✅ FIXED
        DOWNLOAD_INCOME: "/api/v1/income/download"
    },

    EXPENSE: {
        ADD_EXPENSE: "/api/v1/expense/add",
        GET_EXPENSE: "/api/v1/expense/get",
        DELETE_EXPENSE: (id) => `/api/v1/expense/delete/${id}`, // ✅ FIXED
        DOWNLOAD_EXPENSE: "/api/v1/expense/download"
    },

    IMAGES: {
        UPLOAD_IMAGE: "/api/v1/auth/uploadimage" // ✅ FIXED
    },
};