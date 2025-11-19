import axios from "axios";
import {API_URL, postLoginUrl, postRegisterUrl} from "@/config/api.config.ts";
import store from "store2";
import {RouterEnum} from "@/config/RouterEnum.ts";
import {getAccessTokenByRefresh} from "@/config/getAccessTokenByRefresh.ts";


const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use(async (config) => {
    const authStorage = store.get('auth-storage-todo');
    const accessTokenStore = authStorage?.state?.accessToken || null;

    if (config.headers && accessTokenStore) {
        config.headers.Authorization = `Bearer ${accessTokenStore}`;
    }

    console.log("< REQUEST >", config.url, config.params, config.data);
    return config;
});


instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        console.log(error?.response?.data?.message || error.message);

        const originalRequest = error.config;
        const status = error.response?.status;
        const url: string = originalRequest?.url;

        const isAuthRoute = url?.includes(postLoginUrl()) || url?.includes(postRegisterUrl()) || url?.includes(postRegisterUrl());
        console.log(isAuthRoute);
        if (status === 401 && isAuthRoute) {
            throw error.response?.data || error;
        }

        if (status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            await getAccessTokenByRefresh();
            return instance.request(originalRequest);
        }

        if (status === 401 && originalRequest._isRetry) {
            store.remove("auth-storage-todo");
            window.location.href = RouterEnum.LOGIN;

            throw error.response?.data || error;
        }

        throw error.response?.data || error;
    }
);

export default instance;
