import  { Outlet } from "react-router";
import { Navbar } from "./dashboard/nav-bar";


export default function customerPortalLayout() {
    return (
        <>
        <Navbar />
        <main className="pt-16 px-4 sm:px-6 lg:px-8">
            <Outlet />
        </main>
        </>
    )
}