import axios from "axios";
import store from "../store";

const api = axios.create({
    baseURL: "https://e-nauli-ussd-backup.herokuapp.com/api/v2.0",
    headers: {
        "Content-Type": "application/json",
    },
});

// request interceptor to add the auth token header to requests
api.interceptors.request.use(
    (config) => {
        config.headers = {
            "x-server-key": "6F44EADC71C3D3DC26E7E8D8DDA41",
        };

        return config;
    },
    (err) => {
        Promise.reject(err);
    }
);

// response interceptor to refresh token on receiving expired token
api.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        if (
            err.response.status === 401 &&
            err.response.statusText === "Unauthorized"
        ) {
            return store.dispatch.AuthLogout.logout();
        }

        return Promise.reject(err);
    }
);
export default api;
