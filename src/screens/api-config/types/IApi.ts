import type {TodoStatus} from "@/types/todo.type.ts";


export interface IApiConfig {
    authEndpoints: Record<string, string>;
    todoEndpoints: Record<string, string>;
    todoStatuses: TodoStatus[];
    note: string;
}

export type ParsedEndpoint = {
    key: string;
    method: string;
    path: string;
    description: string;
};