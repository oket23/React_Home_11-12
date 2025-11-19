import {useQuery} from "@tanstack/react-query";
import {ApiConfigService} from "@/screens/api-config/services/api-config.service.ts";
import type {IApiResponse} from "@/types/api-response.ts";
import type {IApiConfig} from "@/screens/api-config/types/IApi.ts";

export const useApiConfigQuery = () => {
    return useQuery({
        queryKey: ['api-config'],
        queryFn: async () => {
            const res = await ApiConfigService.get();
            const body: IApiResponse<IApiConfig> = res.data;

            if (!body.success) {
                throw new Error(
                    body.error || body.message || "Failed to load API config",
                );
            }

            return body.data;
        }
    })
}