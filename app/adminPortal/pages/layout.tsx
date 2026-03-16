import  { Outlet } from "react-router";
import { AdminLayout } from "../_components/layouts/adminLayout";
import { Navbar } from "../_components/layouts/navbar";



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