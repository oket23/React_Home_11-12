import type { ModalProps } from "@/hooks/useModal/useModal.tsx";
import { useUserDataQuery } from "@/hooks/useData/useUserDataQuery.ts";
import type { FC } from "react";
import Modal from "@/ui/modal/Modal.tsx";
import { logoutUser } from "@/config/logoutUser.ts";

const UserDataModal: FC<ModalProps> = (props) => {
    const { data, isLoading, isError, error } = useUserDataQuery();

    return (
        <Modal
            {...props}
            className="mx-auto w-full max-w-md max-h-[80vh] overflow-hidden rounded-3xl
                       border border-white/10 bg-slate-950/95 shadow-2xl shadow-sky-900/70"
        >
            <Modal.Title
                onClose={props.onClose}
                className="flex items-center justify-between border-b border-white/10 px-5 py-4"
            >
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 to-violet-500 text-slate-950 shadow-md shadow-sky-500/40">
                        <span className="text-sm font-bold">U</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Профіль
                        </span>
                        <span className="text-sm font-semibold text-slate-50">
                            Інформація про користувача
                        </span>
                    </div>
                </div>
            </Modal.Title>

            <Modal.Body className="px-5 py-4">
                {isLoading && (
                    <div className="flex items-center justify-center py-6">
                        <p className="text-sm text-slate-300">Завантаження даних...</p>
                    </div>
                )}

                {isError && (
                    <div className="rounded-2xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
                        <p className="font-medium">Не вдалося завантажити дані користувача</p>
                        {error instanceof Error && (
                            <p className="mt-1 text-xs text-red-300/80">
                                Деталі: {error.message}
                            </p>
                        )}
                    </div>
                )}

                {data && (
                    <div className="space-y-5">
                        <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 px-4 py-3 shadow-inner shadow-slate-950/70">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/90 ring-2 ring-sky-500/60 shadow-md shadow-sky-500/30">
                                <span className="text-base font-semibold text-slate-50">
                                    {data.user.firstName
                                        ? data.user.firstName.charAt(0).toUpperCase()
                                        : data.user.email.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-slate-50">
                                    {data.user.firstName || "Користувач"}
                                </span>
                                <span className="text-xs text-slate-400">
                                    {data.user.email}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3 rounded-2xl border border-white/5 bg-slate-900/70 px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Основна інформація
                            </p>

                            <div className="grid grid-cols-1 gap-3">
                                <div>
                                    <p className="text-[0.68rem] uppercase tracking-[0.2em] text-slate-500">
                                        Ім&apos;я
                                    </p>
                                    <p className="mt-1 text-sm text-slate-100">
                                        {data.user.firstName || "—"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[0.68rem] uppercase tracking-[0.2em] text-slate-500">
                                        Email
                                    </p>
                                    <p className="mt-1 text-sm text-slate-100 break-all">
                                        {data.user.email || "—"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 rounded-2xl border border-slate-800/70 bg-slate-950/60 px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Системна інформація
                            </p>

                            <div className="space-y-2">
                                <div>
                                    <p className="text-[0.68rem] uppercase tracking-[0.2em] text-slate-500">
                                        ID користувача
                                    </p>
                                    <p className="mt-1 text-[0.78rem] text-slate-200 break-all">
                                        {data.user.id}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[0.68rem] uppercase tracking-[0.2em] text-slate-500">
                                        Створено
                                    </p>
                                    <p className="mt-1 text-sm text-slate-100">
                                        {new Date(data.user.createdAt).toLocaleString("uk-UA")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                            <button
                                type="button"
                                onClick={props.onClose}
                                className="inline-flex items-center justify-center rounded-full border border-slate-700/70
                                           bg-slate-900/80 px-4 py-1.5 text-xs font-medium text-slate-200
                                           shadow-sm shadow-slate-950/60 transition-all hover:bg-slate-800
                                           focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/70
                                           focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                            >
                                Закрити
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    props.onClose();
                                    logoutUser();
                                }}
                                className="inline-flex items-center justify-center rounded-full bg-red-500/90 px-4 py-1.5
                                           text-xs font-semibold text-slate-50 shadow-md shadow-red-500/40
                                           transition-all hover:scale-[1.02] hover:bg-red-400
                                           focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400
                                           focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                            >
                                Вийти з акаунта
                            </button>
                        </div>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default UserDataModal;
