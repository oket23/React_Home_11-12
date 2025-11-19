import type {IUser} from "@/types/user.types.ts";

export interface IRefresh {
    accessToken: string;
    refreshToken: string;
}

export interface IAuth {
    user: IUser;
    accessToken: string;
    refreshToken: string;
}
