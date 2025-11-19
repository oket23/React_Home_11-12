import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {TodoFormData, TodoStatus, TodoUpdateFormData} from "@/types/todo.type.ts";
import {TodoService} from "@/services/todo/todo.service.ts";

export const useCreateTodoMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['createTodo'],
        mutationFn: (props: {data: TodoFormData})=>
            TodoService.createTodo(props),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['todos']})
        }

    })
}

export const useUpdateTodoMutation = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['updateTodo'],
        mutationFn: (props: {data: TodoUpdateFormData, id: string}) =>
            TodoService.updateTodo(props),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['todos']})
            await queryClient.invalidateQueries({queryKey: ['todo', id]})
        }
    })
}

export const useChangeStatusTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['changeStatusTodo'],
        mutationFn: (props: {id: string, status: TodoStatus}) =>
            TodoService.changeStatusTodo(props),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['todos']})
        }
    })
}