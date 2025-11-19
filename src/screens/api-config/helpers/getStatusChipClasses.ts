export const getStatusChipClasses = (status: string) => {
    switch (status) {
        case "pending":
            return "border-amber-400/60 bg-amber-400/10 text-amber-200";
        case "in-progress":
            return "border-sky-400/60 bg-sky-400/10 text-sky-200";
        case "completed":
            return "border-emerald-400/60 bg-emerald-400/10 text-emerald-200";
        default:
            return "border-slate-600/60 bg-slate-800/60 text-slate-200";
    }
};