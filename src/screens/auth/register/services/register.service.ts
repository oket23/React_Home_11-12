import type {IRegister_data} from "@/screens/auth/register/types/IRegister.ts";
import instance from "@/services/api/interseptors.api.ts";
import {postRegisterUrl} from "@/config/api.config.ts";
import type {IApiResponse} from "@/types/api-response.ts";
import type {IAuth} from "@/screens/auth/types/IAuth.ts";

export const RegisterService = {
    post: ({data}: {data: IRegister_data})=>
        instance<IApiResponse<IAuth>>({
            url: postRegisterUrl(),
            method: 'POST',
            data
        }),

}