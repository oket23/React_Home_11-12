import {Route, type RouteObject, Routes} from "react-router";
import {RouterEnum} from "@/config/RouterEnum.ts";
import Main from "@/screens/main/Main.tsx";
import ApiConfig from "@/screens/api-config/ApiConfig.tsx";
import Providers from "@/providers/Providers.tsx";
import Todo from "@/screens/todo/Todo.tsx";
import Layout from "@/components/layout/Layout.tsx";
import Login from "@/screens/auth/login/Login.tsx";
import Register from "@/screens/auth/register/Register.tsx";

export default function App() {
    const routes: Array<RouteObject> = [
        {path: RouterEnum.MAIN, element: <Main/>},
        {path: RouterEnum.API_CONFIG, element: <ApiConfig/>},
        {path: RouterEnum.TODO, element: <Todo/>},
        {path: RouterEnum.LOGIN, element: <Login/>},
        {path: RouterEnum.REGISTER, element: <Register/>},
    ];

    if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
    }

    return (
        <Providers>
            <Layout>
                <Routes>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element}/>
                    ))}
                </Routes>
            </Layout>
        </Providers>
    );
}

// Зробити іконку користувача, там вивести дані профіля та кнопку розлогінитися