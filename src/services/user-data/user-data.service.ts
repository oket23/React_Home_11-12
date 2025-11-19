import {getProfileUrl} from "@/config/api.config.ts";
import instance from "@/services/api/interseptors.api.ts";
import type {IApiResponse} from "@/types/api-response.ts";
import type {IAuth} from "@/screens/auth/types/IAuth.ts";

export const userDataService = {
    getData: () =>
        instance<IApiResponse<IAuth>>({
            method: 'GET',
            url: getProfileUrl(),
        })
}