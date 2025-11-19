import instance from "@/services/api/interseptors.api.ts";
import {changeStatusTodo, getTodo, getTodoList, postCreateTodo, putEditTodo} from "@/config/api.config.ts";
import type {TodoFormData, TodoStatus, TodoUpdateFormData} from "@/types/todo.type.ts";


export const TodoService = {
    getAll: () =>
        instance({
            url: getTodoList(),
            method: 'GET',
        }),
    getOne: (id: string) =>
        instance({
            url: getTodo(id),
            method: "GET",
        }),
    createTodo: ({data}: {data: TodoFormData}) =>
        instance({
            method: "POST",
            url: postCreateTodo(),
            data
        }),
    updateTodo: ({data, id}: {data: TodoUpdateFormData, id: string}) =>
        instance({
            method: "PUT",
            url: putEditTodo(id),
            data,
        }),
    changeStatusTodo: ({id, status}: {id: string, status: TodoStatus}) =>
        instance({
            method: "PATCH",
            url: changeStatusTodo(id),
            data: {status},
        }),
}