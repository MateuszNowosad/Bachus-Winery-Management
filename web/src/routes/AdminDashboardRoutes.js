import AdminDashboard from "../views/AdminDashboard/AdminDashboard";

const AdminDashboardRoutes = [
    {
        path: "/admindashboard",
        drawerName: "Dashboard",
        navbarName: "Panel administratora",
        component: AdminDashboard
    },
    {redirect: true, path: "/", to: "/admindashboard", navbarName: "Redirect"}
];

export default AdminDashboardRoutes;
