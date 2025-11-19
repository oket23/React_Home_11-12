import store from "store2";
import type {QueryClient} from "@tanstack/react-query";
import type {NavigateFunction} from "react-router";
import {RouterEnum} from "@/config/RouterEnum.ts";
import type {IAuth} from "@/screens/auth/types/IAuth.ts";

export const handleAuthSuccess = async (data: IAuth, queryClient: QueryClient, navigate: NavigateFunction, redirectTo: RouterEnum) => {
    const {accessToken, refreshToken, user} = data;

    const authStorage = store.get("auth-storage-todo");
    const version = authStorage?.version + 1 || 1;

    store.set("auth-storage-todo", {
        state: {
            user,
            refreshToken,
            accessToken,
        },
        version,
    });

    await queryClient.resetQueries();
    navigate(redirectTo);
};
