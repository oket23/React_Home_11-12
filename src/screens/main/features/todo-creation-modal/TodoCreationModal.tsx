import type { ModalProps } from "@/hooks/useModal/useModal.tsx";
import type { FC } from "react";
import Modal from "@/ui/modal/Modal.tsx";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import type { TodoFormData } from "@/types/todo.type.ts";
import { useCreateTodoMutation } from "@/hooks/todos/useTodoMutation.ts";
import StatusSelect from "@/screens/main/components/status-select/StatusSelect.tsx";

const TodoCreationModal: FC<ModalProps> = (props) => {
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<TodoFormData>({
        defaultValues: {
            title: "",
            description: "",
            status: "pending"
        }
    });

    const createTodoMutation = useCreateTodoMutation();

    const onSubmit: SubmitHandler<TodoFormData> = (data) => {
        createTodoMutation.mutate({ data });
        reset();
        props.onClose();
    };

    return (
        <Modal
            {...props}
            className="mx-auto w-full max-w-md max-h-[80vh] overflow-hidden rounded-3xl
                       border border-white/10 bg-slate-950/95 shadow-2xl shadow-sky-900/70"
        >
            <Modal.Title
                onClose={props.onClose}
                className="flex items-center justify-between border-b border-white/10 px-5 py-4 text-sm font-semibold text-slate-50"
            >
                <span>Створити нове завдання</span>
            </Modal.Title>

            <Modal.Body className="px-5 py-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label
                            htmlFor="title"
                            className="mb-1 block text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
                        >
                            Назва
                        </label>
                        <input
                            id="title"
                            type="text"
                            className={`w-full rounded-xl border px-3 py-2 text-sm text-slate-50 shadow-inner shadow-slate-950/70 bg-slate-900/70 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-400 ${
                                errors.title ? "border-red-500/70" : "border-white/10"
                            }`}
                            placeholder="Наприклад: Вивчити TypeScript"
                            {...register("title", {
                                required: "Назва є обов'язковою"
                            })}
                        />
                        {errors.title && (
                            <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="mb-1 block text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
                        >
                            Опис
                        </label>
                        <textarea
                            id="description"
                            rows={4}
                            className={`w-full rounded-xl border px-3 py-2 text-sm text-slate-50 shadow-inner shadow-slate-950/70 bg-slate-900/70 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-400 resize-none ${
                                errors.description ? "border-red-500/70" : "border-white/10"
                            }`}
                            placeholder="Коротко опиши, що потрібно зробити"
                            {...register("description", {
                                required: "Опис є обов'язковим"
                            })}
                        />
                        {errors.description && (
                            <p className="mt-1 text-xs text-red-400">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            className="mb-1 block text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
                        >
                            Статус
                        </label>
                        <Controller
                            control={control}
                            name="status"
                            rules={{ required: "Статус є обов'язковим" }}
                            render={({ field }) => (
                                <StatusSelect
                                    value={field.value as string}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.status && (
                            <p className="mt-1 text-xs text-red-400">
                                {errors.status.message}
                            </p>
                        )}
                    </div>

                    <Modal.Footer className="mt-6 flex justify-end gap-3 border-t border-white/5 pt-4">
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                props.onClose();
                            }}
                            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-slate-900/80 px-5 py-2 text-xs font-medium text-slate-200 shadow-sm shadow-slate-950/60 transition-all hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                        >
                            Скасувати
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-full bg-sky-500/90 px-6 py-2 text-xs font-semibold text-slate-950 shadow-md shadow-sky-500/40 transition-all hover:scale-[1.02] hover:bg-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                        >
                            Створити
                        </button>
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default TodoCreationModal;
