import { useState } from "react";
import { cn } from "@/helpers/cn";
import { getStatusColor } from "@/helpers/getStatusColor";
import type { TodoStatus } from "@/types/todo.type";

interface StatusSelectProps {
    value: string;
    onChange: (status: TodoStatus) => void;
}

const StatusSelect = ({ value, onChange }: StatusSelectProps) => {
    const [open, setOpen] = useState(false);
    const statuses: TodoStatus[] = ["pending", "in-progress", "completed"];

    const formatStatusLabel = (status: string) => status.replace("-", " ");

    return (
        <div
            className="relative inline-block text-xs"
            onClick={(e) => e.stopPropagation()}
        >
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={cn(
                    "inline-flex items-center gap-2 rounded-full border border-white/10",
                    "bg-slate-950/60 px-3 py-1 text-[11px] font-medium text-slate-100",
                    "shadow-md shadow-sky-900/40 backdrop-blur-md",
                    "transition-all hover:-translate-y-px hover:border-sky-400/70 hover:shadow-sky-500/40",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70",
                    "focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                )}
            >
                <span
                    className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                        getStatusColor(value)
                    )}
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                    <span>{formatStatusLabel(value)}</span>
                </span>

                <svg
                    className={cn(
                        "h-3 w-3 text-slate-300 transition-transform",
                        open && "rotate-180"
                    )}
                    viewBox="0 0 20 20"
                    fill="none"
                >
                    <path
                        d="M6 8l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {open && (
                <div
                    className={cn(
                        "absolute left-1/2 top-full z-30 mt-1 w-44 -translate-x-1/2",
                        "rounded-xl border border-white/10 bg-slate-950/95 p-1",
                        "shadow-2xl shadow-sky-900/60 backdrop-blur-xl"
                    )}
                >
                    <ul className="py-1 text-xs">
                        {statuses.map((status) => (
                            <li key={status}>
                                <button
                                    type="button"
                                    className={cn(
                                        "flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-[11px]",
                                        "text-slate-200 transition-colors hover:bg-slate-900/80",
                                        status === value && "bg-slate-900/90"
                                    )}
                                    onClick={() => {
                                        onChange(status);
                                        setOpen(false);
                                    }}
                                >
                                    <span
                                        className={cn(
                                            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                                            getStatusColor(status)
                                        )}
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                                        <span>{formatStatusLabel(status)}</span>
                                    </span>

                                    {status === value && (
                                        <span className="ml-2 text-[10px] text-sky-300">
                                            ✓
                                        </span>
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default StatusSelect;
