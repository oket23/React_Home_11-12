import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router";
import {RouterEnum} from "@/config/RouterEnum.ts";
import type {ILogin_Data} from "@/screens/auth/login/types/ILogin.ts";
import {LoginService} from "@/screens/auth/login/services/login.service.ts";
import {handleAuthSuccess} from "@/screens/auth/helpers/auth.helper.ts";
import type {IAuth} from "@/screens/auth/types/IAuth.ts";
import type {IApiResponse} from "@/types/api-response.ts";

export const useLoginMutation = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ['login-post'],
        mutationFn: async (props: { data: ILogin_Data }) => {
            const res = await LoginService.post(props);
            const body: IApiResponse<IAuth> = res.data;

            if (!body.success) {
                throw new Error(body.error || body.message || "Login failed");
            }

            return body.data;
        },
        onSuccess: async ({accessToken, refreshToken, user}) => {
            await handleAuthSuccess({accessToken, refreshToken, user}, queryClient, navigate, RouterEnum.MAIN);
        },
    })
}