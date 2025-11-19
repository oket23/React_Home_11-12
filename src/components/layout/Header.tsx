import { Link, useLocation } from "react-router";
import { RouterEnum } from "@/config/RouterEnum";
import { cn } from "@/helpers/cn";

const Header = () => {
    const location = useLocation();

    const navItems = [
        { label: "Мої завдання", path: RouterEnum.MAIN },
        { label: "API Документація", path: RouterEnum.API_CONFIG },
    ];

    return (
        <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        T
                    </div>
                    <span className="text-lg font-semibold text-slate-100">
                        Todo App
                    </span>
                </div>

                <nav className="flex gap-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "relative inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                                    isActive
                                        ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/40"
                                        : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-sky-100"
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
};

export default Header;
