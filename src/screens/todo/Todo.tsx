import { useNavigate, useParams } from "react-router";
import { useOneTodoQuery } from "@/hooks/todos/useTodoQuery.ts";
import TodoNotFound from "@/screens/todo/features/not-found/TodoNotFound.tsx";
import { useState } from "react";
import { cn } from "@/helpers/cn.ts";
import { getStatusColor } from "@/helpers/getStatusColor.ts";
import { formatDate } from "@/helpers/formatDate.ts";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { TodoUpdateFormData } from "@/types/todo.type.ts";
import { useUpdateTodoMutation } from "@/hooks/todos/useTodoMutation.ts";

const Todo = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data, isLoading } = useOneTodoQuery({ id: id! });
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const updateTodoMutation = useUpdateTodoMutation(id!);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isSubmitting },
    } = useForm<TodoUpdateFormData>({
        values: {
            title: data?.title || "",
            description: data?.description || "",
            status: data?.status || "",
        },
    });

    const onSubmit: SubmitHandler<TodoUpdateFormData> = (formData) => {
        if (!id) return null;

        updateTodoMutation.mutate(
            { data: formData, id },
            {
                onSuccess: () => {
                    setIsEditing(false);
                },
            }
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950">
                <div className="relative flex h-16 w-16 items-center justify-center">
                    <div className="absolute h-14 w-14 animate-spin rounded-full border-2 border-sky-500/10 border-t-sky-400" />
                    <div className="h-8 w-8 rounded-full bg-sky-400/80 blur-sm" />
                </div>
            </div>
        );
    }

    if (!data) return <TodoNotFound />;

    return (
        <div className="mx-auto max-w-4xl px-4 py-10">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400/70">
                        Task
                    </p>
                    <h1 className="mt-1 bg-gradient-to-r from-sky-300 via-cyan-200 to-emerald-300 bg-clip-text text-2xl font-bold text-transparent">
                        Деталі завдання
                    </h1>
                </div>

                <div className="space-x-3">
                    <button
                        onClick={() => setIsEditing((prev) => !prev)}
                        className={cn(
                            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                            isEditing
                                ? "bg-slate-800/80 text-slate-200 hover:bg-slate-700 focus-visible:ring-slate-500/70"
                                : "bg-sky-500/90 text-slate-950 shadow-md shadow-sky-500/40 hover:bg-sky-400 focus-visible:ring-sky-400"
                        )}
                    >
                        {isEditing ? (
                            <>
                                <svg
                                    className="h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                                Перегляд
                            </>
                        ) : (
                            <>
                                <svg
                                    className="h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                                Редагувати
                            </>
                        )}
                    </button>

                    <button
                        className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-200 shadow-sm shadow-slate-950/60 transition-all hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                        onClick={() => navigate(-1)}
                    >
                        <svg
                            className="h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Назад
                    </button>
                </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 shadow-xl shadow-sky-900/60 backdrop-blur-2xl">
                {!isEditing ? (
                    <div className="p-6 sm:p-8">
                        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <h2 className="text-xl font-semibold text-slate-50">
                                {data.title}
                            </h2>
                            <span
                                className={cn(
                                    "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
                                    getStatusColor(data.status)
                                )}
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                                <span>{data.status}</span>
                            </span>
                        </div>

                        <div className="mb-6 rounded-2xl bg-slate-900/80 p-4 text-sm text-slate-200 shadow-inner shadow-slate-950/70">
                            <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                Опис
                            </h3>
                            <p className="whitespace-pre-wrap">{data.description}</p>
                        </div>

                        <div className="border-t border-white/10 pt-4">
                            <div className="grid gap-4 text-xs text-slate-300 sm:grid-cols-2">
                                <div>
                                    <p className="mb-1 text-slate-400">Ідентифікатор</p>
                                    <p className="font-medium text-slate-100">{data.id}</p>
                                </div>
                                <div>
                                    <p className="mb-1 text-slate-400">Статус</p>
                                    <p className="font-medium text-slate-100">{data.status}</p>
                                </div>
                                <div>
                                    <p className="mb-1 text-slate-400">Створено</p>
                                    <p className="font-medium text-slate-100">
                                        {formatDate(data.createdAt)}
                                    </p>
                                </div>
                                <div>
                                    <p className="mb-1 text-slate-400">Оновлено</p>
                                    <p className="font-medium text-slate-100">
                                        {formatDate(data.updatedAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-6 sm:p-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="title"
                                    className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-300"
                                >
                                    Назва
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    className={cn(
                                        "w-full rounded-xl border px-3 py-2 text-sm text-slate-50 shadow-inner shadow-slate-950/70 bg-slate-900/70 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-400",
                                        errors.title ? "border-red-500/70" : "border-white/10"
                                    )}
                                    placeholder="Оновлена назва задачі"
                                    {...register("title", {
                                        required: "Назва обов'язкова",
                                    })}
                                />
                                {errors.title && (
                                    <p className="mt-1 text-xs text-red-400">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="description"
                                    className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-300"
                                >
                                    Опис
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    className={cn(
                                        "w-full rounded-xl border px-3 py-2 text-sm text-slate-50 shadow-inner shadow-slate-950/70 bg-slate-900/70 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-400 resize-none",
                                        errors.description
                                            ? "border-red-500/70"
                                            : "border-white/10"
                                    )}
                                    placeholder="Оновлений опис задачі"
                                    {...register("description", {
                                        required: "Опис обов'язковий",
                                    })}
                                />
                                {errors.description && (
                                    <p className="mt-1 text-xs text-red-400">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>

                            <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-white/5">
                                <button
                                    type="button"
                                    onClick={() => {
                                        reset();
                                        setIsEditing(false);
                                    }}
                                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-slate-900/80 px-5 py-2 text-xs font-medium text-slate-200 shadow-sm shadow-slate-950/60 transition-all hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                                >
                                    Скасувати
                                </button>

                                <button
                                    type="submit"
                                    disabled={
                                        !isDirty ||
                                        isSubmitting ||
                                        updateTodoMutation.isPending
                                    }
                                    className="inline-flex items-center justify-center rounded-full bg-sky-500/90 px-6 py-2 text-xs font-semibold text-slate-950 shadow-md shadow-sky-500/40 transition-all hover:scale-[1.02] hover:bg-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isSubmitting || updateTodoMutation.isPending ? (
                                        <>
                                            <svg
                                                className="mr-2 h-4 w-4 animate-spin text-slate-950"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Збереження...
                                        </>
                                    ) : (
                                        "Зберегти зміни"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Todo;
