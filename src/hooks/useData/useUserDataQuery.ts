import { useQuery } from "@tanstack/react-query";
import { userDataService } from "@/services/user-data/user-data.service.ts";
import type { IApiResponse } from "@/types/api-response.ts";
import type { IAuth } from "@/screens/auth/types/IAuth.ts";
import store from "store2";

export const useUserDataQuery = () => {
    const authStorage = store.get('auth-storage-todo');

    return useQuery<IAuth, Error>({
        queryKey: ["userData"],
        enabled: !!authStorage?.state?.accessToken,
        retry: false,
        queryFn: async () => {
            const res = await userDataService.getData();
            const body: IApiResponse<IAuth> = res.data;

            if (!body.success) {
                throw new Error(body.error || body.message || "Failed to load user data");
            }

            return body.data;
        },
    });
};