import { type SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router";
import { RouterEnum } from "@/config/RouterEnum.ts";
import type {IRegister_data, IRegisterFormData,} from "@/screens/auth/register/types/IRegister.ts";
import { useRegisterMutation } from "@/screens/auth/register/hooks/useRegisterMutation.ts";

const Register = () => {
    const {register, handleSubmit, reset, watch, formState: { errors }, setError, clearErrors, } = useForm<IRegisterFormData>();
    const {mutateAsync: mutateAsyncRegister, isPending: isPendingRegister,} = useRegisterMutation();

    const passwordValue = watch("password");

    const onSubmit: SubmitHandler<IRegisterFormData> = async (data) => {
        clearErrors("root.serverError");

        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { confirmPassword, ...payload } = data;
            await mutateAsyncRegister({ data: payload as IRegister_data });
            reset();
        } catch (e) {
            const err = e as Error;
            setError("root.serverError", {
                type: "server",
                message: err.message || "Не вдалося створити обліковий запис. Спробуйте ще раз пізніше.",
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
                            Створити обліковий запис Todo
                        </h1>
                        <p className="max-w-md text-sm text-slate-300">
                            Зареєструйте новий обліковий запис, щоб отримати доступ до Todo
                            застосунку та внутрішнього API.
                        </p>
                    </div>

                    <div className="relative w-full">
                        <div className="pointer-events-none absolute -right-6 -top-8 h-32 w-32 rounded-full bg-sky-500/15 blur-2xl" />

                        <div className="relative w-full rounded-2xl border border-white/10 bg-slate-950/90 p-6 shadow-xl shadow-sky-900/50 backdrop-blur-2xl sm:p-8">
                            <div className="mb-6 text-center lg:text-left">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-400/80">
                                    Registration
                                </p>
                                <h2 className="mt-2 text-2xl font-bold text-slate-50">
                                    Створити обліковий запис
                                </h2>
                                <p className="mt-1 text-xs text-slate-400">
                                    Заповніть форму, щоб зареєструватися в Todo застосунку.
                                </p>
                            </div>

                            <form
                                className="space-y-5"
                                onSubmit={handleSubmit(onSubmit)}
                                noValidate
                            >
                                <div className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="firstName"
                                            className="mb-1 block text-xs font-medium uppercase tracking-[0.12em] text-slate-400"
                                        >
                                            Ім&apos;я
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="firstName"
                                                type="text"
                                                placeholder="Введіть ваше ім'я"
                                                className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-50 shadow-inner shadow-slate-950/60 outline-none ring-0 transition-colors placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                                                {...register("firstName", {
                                                    required: "Ім'я обов'язкове",
                                                    minLength: {
                                                        value: 2,
                                                        message: "Ім'я має містити не менше 2 символів",
                                                    },
                                                })}
                                            />
                                            {errors.firstName && (
                                                <p className="mt-1 text-[11px] text-red-300">
                                                    {errors.firstName.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="lastName"
                                            className="mb-1 block text-xs font-medium uppercase tracking-[0.12em] text-slate-400"
                                        >
                                            Прізвище
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="lastName"
                                                type="text"
                                                placeholder="Введіть ваше прізвище"
                                                className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-50 shadow-inner shadow-slate-950/60 outline-none ring-0 transition-colors placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                                                {...register("lastName", {
                                                    required: "Прізвище обов'язкове",
                                                    minLength: {
                                                        value: 2,
                                                        message:
                                                            "Прізвище має містити не менше 2 символів",
                                                    },
                                                })}
                                            />
                                            {errors.lastName && (
                                                <p className="mt-1 text-[11px] text-red-300">
                                                    {errors.lastName.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="phoneNumber"
                                            className="mb-1 block text-xs font-medium uppercase tracking-[0.12em] text-slate-400"
                                        >
                                            Номер телефону
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="phoneNumber"
                                                type="tel"
                                                placeholder="+380 XX XXX XX XX"
                                                className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-50 shadow-inner shadow-slate-950/60 outline-none ring-0 transition-colors placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                                                {...register("phoneNumber", {
                                                    required: "Номер телефону обов'язковий",
                                                    pattern: {
                                                        value: /^\+?[0-9\s\-()]{7,20}$/,
                                                        message: "Введіть коректний номер телефону",
                                                    },
                                                })}
                                            />
                                            {errors.phoneNumber && (
                                                <p className="mt-1 text-[11px] text-red-300">
                                                    {errors.phoneNumber.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

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
                                                placeholder="Введіть ваш email"
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
                                                placeholder="Придумайте пароль"
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

                                    <div>
                                        <label
                                            htmlFor="confirmPassword"
                                            className="mb-1 block text-xs font-medium uppercase tracking-[0.12em] text-slate-400"
                                        >
                                            Підтвердження пароля
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="confirmPassword"
                                                type="password"
                                                placeholder="Повторіть пароль"
                                                className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-50 shadow-inner shadow-slate-950/60 outline-none ring-0 transition-colors placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                                                {...register("confirmPassword", {
                                                    required: "Підтвердження пароля обов'язкове",
                                                    validate: (value) =>
                                                        value === passwordValue || "Паролі не співпадають",
                                                })}
                                            />
                                            {errors.confirmPassword && (
                                                <p className="mt-1 text-[11px] text-red-300">
                                                    {errors.confirmPassword.message}
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
                                        disabled={isPendingRegister}
                                        className="inline-flex w-full items-center justify-center rounded-lg border border-sky-500/60 bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-900/60 outline-none transition-all hover:from-sky-400 hover:via-cyan-300 hover:to-emerald-300 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {isPendingRegister ? (
                                            <>
                                                <svg className="mr-2 h-4 w-4 animate-spin text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938л3-2.647z"></path>
                                                </svg>
                                                Створення облікового запису...
                                            </>
                                        ) : (
                                            "Зареєструватися"
                                        )}
                                    </button>
                                </div>
                            </form>

                            <div className="mt-5 border-t border-slate-800 pt-4 text-center">
                                <p className="text-xs text-slate-400">
                                    Вже маєте обліковий запис?
                                    <Link
                                        to={RouterEnum.LOGIN}
                                        className="ml-1 font-medium text-sky-300 hover:text-sky-200"
                                    >
                                        Увійти
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

export default Register;
