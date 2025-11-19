import {useQuery} from "@tanstack/react-query";
import {TodoService} from "@/services/todo/todo.service.ts";
import type {Todo} from "@/types/todo.type.ts";

export const useTodoQuery = () => {
    return useQuery({
        queryKey: ['todos'],
        queryFn: () => TodoService.getAll()
            .then(data => data.data.data as Array<Todo>)
    })
}

export const useOneTodoQuery = ({id}: {id: string}) => {
    return useQuery({
        queryKey: ['todo', id],
        queryFn: () => TodoService.getOne(id)
            .then(data => data.data.data as Todo),
        enabled: !!id
    })
}