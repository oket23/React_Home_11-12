import type {ILogin_Data} from "@/screens/auth/login/types/ILogin.ts";
import instance from "@/services/api/interseptors.api.ts";
import {postLoginUrl} from "@/config/api.config.ts";
import type {IApiResponse} from "@/types/api-response.ts";
import type {IAuth} from "@/screens/auth/types/IAuth.ts";

export const LoginService = {
    post: ({data}: {data: ILogin_Data})=>
        instance<IApiResponse<IAuth>>({
            url: postLoginUrl(),
            method: 'POST',
            data
        }),

}