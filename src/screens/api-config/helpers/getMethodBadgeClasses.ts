export const getMethodBadgeClasses = (method: string) => {
    switch (method) {
        case "GET":
            return "border-emerald-400/60 bg-emerald-400/10 text-emerald-200";
        case "POST":
            return "border-sky-400/60 bg-sky-400/10 text-sky-200";
        case "PUT":
            return "border-amber-400/60 bg-amber-400/10 text-amber-200";
        case "PATCH":
            return "border-violet-400/60 bg-violet-400/10 text-violet-200";
        case "DELETE":
            return "border-red-500/70 bg-red-500/10 text-red-200";
        default:
            return "border-slate-500/60 bg-slate-500/10 text-slate-200";
    }
};