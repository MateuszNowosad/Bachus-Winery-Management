import LoginPage from '../views/LoginPage';
import AdminDashboardLayout from '../layout/AdminDashboardLayout';

const indexRoutes = [
  { path: '/', component: LoginPage, exact: true },
  { path: '/admindashboard', component: AdminDashboardLayout, role: ['admin','useraccounting', 'userwarehouse', 'userproduction', 1] } //App gateway available to all
];

export default indexRoutes;
