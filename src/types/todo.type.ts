export interface Todo {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface TodoFormData {
    title: string;
    description: string;
    status?: string;
}

export interface TodoUpdateFormData {
    status?: string;
    title?: string;
    description?: string;
}

export type TodoStatus = 'pending' | 'in-progress' | 'completed';