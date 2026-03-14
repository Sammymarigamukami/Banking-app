import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
    index("routes/_index.tsx"),
    route("RegisterAccount", "routes/RegisterAccount.tsx"),
    route("CustomerLogin", "routes/CustomerLogin.tsx"),
    route("EmployeeLogin", "routes/EmployeeLogin.tsx"),
    route("customerPortal", "components/userPortal/layout.tsx", [
        index("components/userPortal/user-home.tsx"),
        route("Accounts", "components/userPortal/account.tsx"),
        route("Analytics", "components/userPortal/analytics.tsx"),
        route("Cards", "components/userPortal/cards.tsx"),
        route("Payments", "components/userPortal/payments.tsx"),
        route("Transactions", "components/userPortal/transaction.tsx"),
        route("Transfer", "components/userPortal/transfer.tsx"),
        route("Settings", "components/userPortal/settings.tsx"),
    ]),
] satisfies RouteConfig
