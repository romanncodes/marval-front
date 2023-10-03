import { Outlet } from "react-router-dom";

export const HomePage = () => {
    return (
        <main>
            <div>
                <Outlet></Outlet>
            </div>
        </main>
    )
}