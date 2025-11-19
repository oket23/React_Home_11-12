export const getCardRingClasses = (method: string) => {
    switch (method) {
        case "GET":
            return "ring-1 ring-emerald-400/50";
        case "POST":
            return "ring-1 ring-sky-400/60";
        case "PUT":
            return "ring-1 ring-amber-400/60";
        case "PATCH":
            return "ring-1 ring-violet-400/60";
        case "DELETE":
            return "ring-1 ring-red-500/60";
        default:
            return "ring-1 ring-slate-600/60";
    }
};