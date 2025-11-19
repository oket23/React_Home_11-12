import store from "store2";
import {RouterEnum} from "@/config/RouterEnum.ts";

export const logoutUser = () => {
    try {
        store.remove("auth-storage-todo");
        window.location.href = RouterEnum.LOGIN;
    }
    catch (e){
        console.error(e)
    }
}