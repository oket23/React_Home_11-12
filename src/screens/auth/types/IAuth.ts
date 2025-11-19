export interface IUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
}

export interface IRefresh {
    accessToken: string;
    refreshToken: string;
}

export interface IAuth {
    user: IUser;
    accessToken: string;
    refreshToken: string;
}
