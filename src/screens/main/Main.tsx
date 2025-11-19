import {Link} from "react-router";
import {formatDate} from "@/helpers/formatDate.ts";
import {cn} from "@/helpers/cn.ts";
import {useTodoQuery} from "@/hooks/todos/useTodoQuery.ts";
import {useState} from "react";
import {DeleteSvg} from "@/assets";
import useModal from "@/hooks/useModal/useModal.tsx";
import TodoCreationModal from "@/screens/main/features/todo-creation-modal/TodoCreationModal.tsx";
import {useChangeStatusTodo} from "@/hooks/todos/useTodoMutation.ts";
import type {TodoStatus} from "@/types/todo.type.ts";
import StatusSelect from "@/screens/main/components/status-select/StatusSelect.tsx";

const Main = () => {
    const [selectedTodo, setSelectedTodo] = useState<string | null>(null);
    const {data, isLoading} = useTodoQuery();

    const modalTodo = useModal();
    const changeStatusMutation = useChangeStatusTodo();

    const handleStatusChange = (id: string, status: TodoStatus) => {
        changeStatusMutation.mutate({id, status});
    };

    if (isLoading) {
        return (
            <div
                className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950">
                <div className="relative flex h-16 w-16 items-center justify-center">
                    <div
                        className="absolute h-14 w-14 animate-spin rounded-full border-2 border-sky-500/10 border-t-sky-400"/>
                    <div className="h-8 w-8 rounded-full bg-sky-400/80 blur-sm"/>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950">
            <div className="mx-auto max-w-6xl px-4 py-10">
                <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400/70">
                            Dashboard
                        </p>
                        <h1 className="mt-2 bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                            Мої завдання
                        </h1>
                        <p className="mt-3 text-sm text-slate-300/80">
                            Організовуйте свої справи, відстежуйте прогрес та повертайтесь до важливого в будь-який
                            момент.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={modalTodo.onOpen}
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-sky-400/40 bg-sky-500/90 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/40 transition-all hover:scale-[1.02] hover:bg-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                        <span
                            className="absolute inset-0 bg-gradient-to-r from-sky-400/0 via-cyan-300/20 to-emerald-300/0 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"/>
                        <span className="relative flex items-center gap-2">
                            <span>Create Todo</span>
                        </span>
                    </button>
                </div>

                {data && data.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {data.map((todo) => (
                            <div
                                key={todo.id}
                                onClick={() =>
                                    setSelectedTodo(selectedTodo === todo.id ? null : todo.id)
                                }
                                className={cn(
                                    "group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-slate-900/70 p-[1px] shadow-lg shadow-sky-900/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-500/40",
                                    selectedTodo === todo.id &&
                                    "ring-2 ring-sky-400/80 scale-[1.01]"
                                )}
                            >
                                <div
                                    className="relative h-full rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950/90 p-6">
                                    <div
                                        className="pointer-events-none absolute inset-x-0 -top-24 h-40 bg-gradient-to-b from-sky-500/25 via-transparent to-transparent opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"/>

                                    <div className="mb-4 flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <h2
                                                className="truncate text-lg font-semibold text-slate-50"
                                                title={todo.title}
                                            >
                                                {todo.title}
                                            </h2>

                                            <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                                                <span
                                                    className="inline-flex items-center gap-1 rounded-full bg-slate-800/60 px-2 py-0.5">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400"/>
                                                    Task
                                                </span>
                                            </div>
                                        </div>

                                        <div className="shrink-0">
                                            <StatusSelect
                                                value={todo.status}
                                                onChange={(newStatus) => handleStatusChange(todo.id, newStatus)}
                                            />
                                        </div>
                                    </div>

                                    <p className="mb-4 line-clamp-3 text-sm text-slate-300/90">
                                        {todo.description}
                                    </p>

                                    <div className="flex items-center justify-between text-[11px] text-slate-400/80">
                                        <span className="inline-flex items-center gap-1">
                                            <span className="h-1 w-1 rounded-full bg-slate-500"/>
                                            Створено:{" "}
                                            <span className="font-medium text-slate-200">
                                                {formatDate(todo.createdAt)}
                                            </span>
                                        </span>
                                        <span className="inline-flex items-center gap-1">
                                            <span className="h-1 w-1 rounded-full bg-emerald-500"/>
                                            Оновлено:{" "}
                                            <span className="font-medium text-slate-200">
                                                {formatDate(todo.updatedAt)}
                                            </span>
                                        </span>
                                    </div>

                                    <div className="mt-5 flex items-center justify-between gap-2 text-xs">
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-1.5 rounded-full border border-red-500/60 bg-red-500/5 px-3 py-1.5 font-medium text-red-300 transition-colors hover:bg-red-500/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                                        >
                                            <DeleteSvg className="h-3 w-3"/>
                                            Видалити
                                        </button>

                                        <Link
                                            to={`/todo/${todo.id}`}
                                            className="inline-flex items-center gap-2 rounded-full bg-sky-500/90 px-4 py-1.5 text-[11px] font-semibold text-slate-950 shadow-md shadow-sky-500/40 transition-all hover:scale-[1.02] hover:bg-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                                        >
                                            <span>View details</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-16 flex justify-center">
                        <div
                            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/5 bg-slate-900/80 px-8 py-10 text-center shadow-xl shadow-sky-900/40 backdrop-blur-xl">
                            <div
                                className="pointer-events-none absolute -top-24 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-sky-500/25 blur-3xl"/>
                            <svg
                                className="mx-auto h-12 w-12 text-slate-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                            <h3 className="mt-4 text-lg font-semibold text-slate-50">
                                Немає завдань
                            </h3>
                            <p className="mt-2 text-sm text-slate-300/80">
                                Додайте своє перше завдання, щоб почати будувати власний список справ.
                            </p>
                            <button
                                type="button"
                                onClick={modalTodo.onOpen}
                                className="mt-6 inline-flex items-center justify-center rounded-full bg-sky-500/90 px-5 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-sky-500/40 transition-all hover:scale-[1.02] hover:bg-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                            >
                                Створити завдання
                            </button>
                        </div>
                    </div>
                )}
                <TodoCreationModal {...modalTodo} />
            </div>
        </div>
    );
};

export default Main;
