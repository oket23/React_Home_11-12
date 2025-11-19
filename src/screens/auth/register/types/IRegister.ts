export interface IRegister_data {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export interface IRegisterFormData extends IRegister_data {
    confirmPassword: string;
}