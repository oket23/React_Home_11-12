export const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const API_URL = `${SERVER_URL}/api`;

//auth
export const postLoginUrl = () => 'auth/login';
export const postAccessTokenUrl = () => 'auth/refresh';
export const postRegisterUrl = () => 'auth/register';
export const getProfileUrl = () => 'auth/profile';

//todo
export const getTodoList = () => '/todos';
export const getTodo = (id: string) => `/todos/${id}`;
export const postCreateTodo = () => '/todos'
export const putEditTodo = (id: string) => `/todos/${id}`;
export const changeStatusTodo = (id: string) => `/todos/${id}/status`;
export const deleteTodo = (id: string) => `/todos/${id}`;

//apiconfig
export const getApiDate = () => '';