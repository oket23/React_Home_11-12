import instance from "@/services/api/interseptors.api.ts";
import {getApiDate} from "@/config/api.config.ts";
import type {IApiResponse} from "@/types/api-response.ts";
import type {IApiConfig} from "@/screens/api-config/types/IApi.ts";

export const ApiConfigService = {
    get: async () =>
        instance<IApiResponse<IApiConfig>>({
            url: getApiDate(),
            method: "GET",
        })

}