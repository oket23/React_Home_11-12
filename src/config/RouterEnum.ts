
export const RouterEnum = {
    MAIN: '/',
    TODO: '/todo/:id',
    API_CONFIG: '/api-config',
    LOGIN: '/login',
    REGISTER: '/register',
}

export type RouterEnum = typeof RouterEnum[keyof typeof RouterEnum];