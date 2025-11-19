import { type SubmitHandler, useForm } from "react-hook-form";
import type { ILogin_Data } from "@/screens/auth/login/types/ILogin.ts";
import { useLoginMutation } from "@/screens/auth/login/hooks/useLoginMutation.ts";
import { Link } from "react-router";
import { RouterEnum } from "@/config/RouterEnum.ts";

const Login = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm<ILogin_Data>();

    const {
        mutateAsync: mutateAsyncLogin,
        isPending: isPendingLogin,
    } = useLoginMutation();

    const onSubmit: SubmitHandler<ILogin_Data> = async (data) => {
        clearErrors("root.serverError");

        try {
            await mutateAsyncLogin({ data });
            reset();
        } catch (e) {
            const err = e as Error;
            setError("root.serverError", {
                type: "server",
                message: err.message || "Не вдалося виконати вхід",
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-50 overflow-x-hidden">
            <div className="relative mx-auto flex min-h-screen max-w-5xl items-center px-4 py-10">
                <div className="pointer-events-none absolute -left-16 -top-32 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
                <div className="pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />

                <div className="relative z-10 grid w-full gap-10 lg:grid-cols-[1.2fr,1fr]">
                    <div className="hidden flex-col justify-center space-y-4 lg:flex">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-400/80">
                            Internal API
                        </p>
                        <h1 className="bg-gradient-to-r from-sky-300 via-cyan-200 to-emerald-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                            Увійти в Todo API Dashboard
                        </h1>
                        <p className="max-w-md text-sm text-slate-300">
                            Використайте свій обліковий запис, щоб керувати задачами, переглядати
                            статуси та працювати з внутрішнім Todo API.
                        </p>
                    </div>

                    <div className="relative w-full">
                        <div className="pointer-events-none absolute -right-6 -top-8 h-32 w-32 rounded-full bg-sky-500/15 blur-2xl" />

                        <div className="relative w-full rounded-2xl border border-white/10 bg-slate-950/90 p-6 shadow-xl shadow-sky-900/50 backdrop-blur-2xl sm:p-8">
                            <div className="mb-6 text-center lg:text-left">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-400/80">
                                    Authentication
                                </p>
                                <h2 className="mt-2 text-2xl font-bold text-slate-50">
                                    Увійти в систему
                                </h2>
                                <p className="mt-1 text-xs text-slate-400">
                                    Введіть ваш email та пароль для доступу до Todo застосунку.
                                </p>
                            </div>

                            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
                                <div className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-1 block text-xs font-medium uppercase tracking-[0.12em] text-slate-400"
                                        >
                                            Email
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-50 shadow-inner shadow-slate-950/60 outline-none ring-0 transition-colors placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                                                {...register("email", {
                                                    required: "Email обов'язковий",
                                                    pattern: {
                                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                        message: "Введіть коректний email",
                                                    },
                                                })}
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-[11px] text-red-300">
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="mb-1 block text-xs font-medium uppercase tracking-[0.12em] text-slate-400"
                                        >
                                            Пароль
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="password"
                                                type="password"
                                                placeholder="Ваш пароль"
                                                className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-50 shadow-inner shadow-slate-950/60 outline-none ring-0 transition-colors placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                                                {...register("password", {
                                                    required: "Пароль обов'язковий",
                                                    minLength: {
                                                        value: 6,
                                                        message: "Пароль має бути не менше 6 символів",
                                                    },
                                                })}
                                            />
                                            {errors.password && (
                                                <p className="mt-1 text-[11px] text-red-300">
                                                    {errors.password.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {errors.root?.serverError && (
                                    <div className="mb-4 rounded-xl border border-red-500/40 bg-red-900/30 px-3 py-2 text-xs text-red-100">
                                        {errors.root.serverError.message}
                                    </div>
                                )}

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isPendingLogin}
                                        className="inline-flex w-full items-center justify-center rounded-lg border border-sky-500/60 bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-900/60 outline-none transition-all hover:from-sky-400 hover:via-cyan-300 hover:to-emerald-300 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {isPendingLogin ? (
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
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938л3-2.647з"
                                                    ></path>
                                                </svg>
                                                Завантаження...
                                            </>
                                        ) : (
                                            "Увійти"
                                        )}
                                    </button>
                                </div>
                            </form>

                            <div className="mt-5 border-t border-slate-800 pt-4 text-center">
                                <p className="text-xs text-slate-400">
                                    Не маєте облікового запису?
                                    <Link
                                        to={RouterEnum.REGISTER}
                                        className="ml-1 font-medium text-sky-300 hover:text-sky-200"
                                    >
                                        Зареєструватись
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
