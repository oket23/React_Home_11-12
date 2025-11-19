import {SERVER_URL} from "@/config/api.config.ts";
import {cn} from "@/helpers/cn.ts";
import {useApiConfigQuery} from "@/screens/api-config/hooks/useApiConfigQuery.ts";
import {getCardRingClasses} from "@/screens/api-config/helpers/getCardRingClasses.ts";
import {getMethodBadgeClasses} from "@/screens/api-config/helpers/getMethodBadgeClasses.ts";
import {parseEndpoint} from "@/screens/api-config/helpers/ParsedEndpoint.ts";
import {getStatusChipClasses} from "@/screens/api-config/helpers/getStatusChipClasses.ts";

const ApiConfig = () => {
    const {data, isLoading, error} = useApiConfigQuery();

    if (isLoading) {
        return (
            <div className="mx-auto max-w-5xl px-4 py-10">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 w-40 rounded bg-slate-800"/>
                    <div className="h-4 w-72 rounded bg-slate-800"/>
                    <div className="h-32 w-full rounded-2xl bg-slate-900"/>
                    <div className="h-32 w-full rounded-2xl bg-slate-900"/>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="mx-auto max-w-5xl px-4 py-10">
                <div className="rounded-xl border border-red-500/40 bg-red-900/20 px-4 py-3 text-sm text-red-200">
                    Не вдалося завантажити конфігурацію API.
                </div>
            </div>
        );
    }

    const authEndpoints = Object.entries(data.authEndpoints).map(
        ([key, description]) => parseEndpoint(key, description),
    );
    const todoEndpoints = Object.entries(data.todoEndpoints).map(
        ([key, description]) => parseEndpoint(key, description),
    );

    return (
        <div className="mx-auto max-w-5xl px-4 py-10">
            <header className="border-b border-white/10 pb-4 mb-6">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-400/80">
                    Internal API
                </p>
                <h1 className="bg-gradient-to-r from-sky-300 via-cyan-200 to-emerald-300 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                    Todo API Documentation
                </h1>

                <p className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-300/90">
                    <span className="text-slate-400">Базовий URL:</span>
                    <code
                        className="rounded-md border border-sky-500/40 bg-slate-950/80 px-2 py-1 font-mono text-[11px] text-sky-100 shadow-sm shadow-sky-900/60">
                        {SERVER_URL}
                    </code>

                    <span
                        className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 px-2 py-0.5 text-[11px] font-medium text-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/>
                        {authEndpoints.length + todoEndpoints.length} endpoints
          </span>

                    {data.note && (
                        <span className="ml-auto text-[11px] text-slate-400">
              {data.note}
            </span>
                    )}
                </p>
            </header>

            <section className="mb-8">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Auth endpoints
                </h2>

                <div className="space-y-4">
                    {authEndpoints.map((ep) => (
                        <article
                            key={ep.key}
                            className={cn(
                                "relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 p-5 shadow-xl shadow-sky-900/60 backdrop-blur-2xl transition-all duration-200 hover:-translate-y-[1px] hover:shadow-sky-500/40",
                                getCardRingClasses(ep.method),
                            )}
                        >
                            <div
                                className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl"/>

                            <div className="mb-3 flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                                        Auth endpoint
                                    </p>
                                    <h3 className="text-sm font-semibold text-slate-50">
                                        {ep.path}
                                    </h3>
                                    <p className="text-xs text-slate-400">{ep.description}</p>
                                </div>

                                <span
                                    className={cn(
                                        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                                        getMethodBadgeClasses(ep.method),
                                    )}
                                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current/80"/>
                                    {ep.method}
                </span>
                            </div>

                            <div className="text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">
                  Повний URL:{" "}
                </span>
                                <code
                                    className="rounded bg-slate-900/80 px-1.5 py-0.5 font-mono text-[11px] text-slate-100">
                                    {SERVER_URL}
                                    {ep.path}
                                </code>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Todo endpoints
                </h2>

                <div className="space-y-4">
                    {todoEndpoints.map((ep) => (
                        <article
                            key={ep.key}
                            className={cn(
                                "relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 p-5 shadow-xl shadow-sky-900/60 backdrop-blur-2xl transition-all duration-200 hover:-translate-y-[1px] hover:shadow-sky-500/40",
                                getCardRingClasses(ep.method),
                            )}
                        >
                            <div
                                className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl"/>

                            <div className="mb-3 flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                                        Todo endpoint
                                    </p>
                                    <h3 className="text-sm font-semibold text-slate-50">
                                        {ep.path}
                                    </h3>
                                    <p className="text-xs text-slate-400">{ep.description}</p>
                                </div>

                                <span
                                    className={cn(
                                        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                                        getMethodBadgeClasses(ep.method),
                                    )}
                                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current/80"/>
                                    {ep.method}
                </span>
                            </div>

                            <div className="text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">
                  Повний URL:{" "}
                </span>
                                <code
                                    className="rounded bg-slate-900/80 px-1.5 py-0.5 font-mono text-[11px] text-slate-100">
                                    {SERVER_URL}
                                    {ep.path}
                                </code>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {data.todoStatuses && data.todoStatuses.length > 0 && (
                <section className="mt-8">
                    <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Todo statuses
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {data.todoStatuses.map((status) => (
                            <span
                                key={status}
                                className={cn(
                                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium shadow-sm shadow-slate-900/60",
                                    "border backdrop-blur-sm",
                                    getStatusChipClasses(status)
                                )}
                            >
          <span className="h-1.5 w-1.5 rounded-full bg-current/80" />
          <span className="capitalize">
            {status.replace("-", " ")}
          </span>
        </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ApiConfig;
