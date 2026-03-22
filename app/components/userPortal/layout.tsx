import  { Outlet } from "react-router";
import { Navbar } from "./dashboard/nav-bar";
import { useAuthRedirect } from "~/api/auth";


export default function customerPortalLayout() {
    const user = useAuthRedirect();
    if (!user) return null;
    return (
        <>
        <Navbar />
        <main className="pt-16 px-4 sm:px-6 lg:px-8">
            <Outlet />
        </main>
        </>
    )
}