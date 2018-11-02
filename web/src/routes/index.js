import LoginPage from "../views/LoginPage";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";

const indexRoutes = [{path: "/", component: LoginPage, exact: true},
    {path: "/admindashboard", component: AdminDashboardLayout}];

export default indexRoutes;