import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router";
import {RouterEnum} from "@/config/RouterEnum.ts";
import {handleAuthSuccess} from "@/screens/auth/helpers/auth.helper.ts";
import type {IAuth} from "@/screens/auth/types/IAuth.ts";
import type {IApiResponse} from "@/types/api-response.ts";
import {RegisterService} from "@/screens/auth/register/services/register.service.ts";
import type {IRegister_data} from "@/screens/auth/register/types/IRegister.ts";

export const useRegisterMutation = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ['register-post'],
        mutationFn: async (props: { data: IRegister_data }) => {
            const res = await RegisterService.post(props);
            const body: IApiResponse<IAuth> = res.data;

            if (!body.success) {
                throw new Error(
                    body.error || body.message || "Register failed",
                );
            }

            return body.data;
        },
        onSuccess: async ({accessToken, refreshToken, user}) => {
            await handleAuthSuccess({accessToken, refreshToken, user}, queryClient, navigate, RouterEnum.MAIN);
        },
    })
}
