import store from "store2";
import axios from "axios";
import {API_URL, postAccessTokenUrl} from "@/config/api.config.ts";
import type {IRefresh} from "@/screens/auth/types/IAuth.ts";

export const getAccessTokenByRefresh = async () => {
    try {
        const authStorage = store.get('auth-storage-todo');
        const refreshTokenStore = authStorage?.state?.refreshToken;
        const version = authStorage?.version;

        const response = await axios.post<string, {data: {data: IRefresh}}>(
            API_URL + postAccessTokenUrl(),
            {refreshToken: refreshTokenStore}
        )

        const {refreshToken, accessToken} = response.data.data;
        store.set('auth-storage-todo', {
            state: {
                refreshToken,
                accessToken,
            },
            version: (version || 1) + 1,
        })
    }catch (e){
        console.error(e)
    }
}