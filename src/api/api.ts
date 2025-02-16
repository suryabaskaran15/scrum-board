import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:5000", // Base URL for all API calls
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
