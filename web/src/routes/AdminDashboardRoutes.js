import React from 'react';
import AdminDashboard from '../views/AdminDashboard/AdminDashboard';
import Database from '../views/AdminDashboard/Database';
import News from '../views/AdminDashboard/News';
import Backup from '../views/AdminDashboard/Backup';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import LayersIcon from '@material-ui/icons/Layers';
import DnsIcon from '@material-ui/icons/Dns';
import LocalShipping from '@material-ui/icons/LocalShipping';
import Description from '@material-ui/icons/Description';
import SaveIcon from '@material-ui/icons/Save';
import Flower from '@material-ui/icons/LocalFlorist';
import Bar from '@material-ui/icons/LocalBar';
import UserInfo from '../views/AdminDashboard/UserInfo';
import FaceIcon from '@material-ui/icons/Face';
import TodayIcon from '@material-ui/icons/Today';
import StorageIcon from '@material-ui/icons/Storage';
import DatabaseVineyard from '../views/AdminDashboard/DatabaseSubdirectories/DatabaseVineyard';
import DatabaseProduction from '../views/AdminDashboard/DatabaseSubdirectories/DatabaseProduction';
import DatabaseContactsAndUsers from '../views/AdminDashboard/DatabaseSubdirectories/DatabaseContactsAndUsers';
import DatabaseLogistics from '../views/AdminDashboard/DatabaseSubdirectories/DatabaseLogistics';
import ProductionPlans from '../views/AdminDashboard/ProductionPlans';
import ProductionPlanDetails from '../views/AdminDashboard/Subpages/ProductionPlanDetails';
import DatabaseReports from '../views/AdminDashboard/DatabaseSubdirectories/DatabaseReports';
import Warehouse from '../views/AdminDashboard/Warehouse';

//ADMIN = 1
//PRODUCTION = 2
//WAREHOUSE = 3
//ACCOUNTING = 4
const AdminDashboardRoutes = [
  {
    path: '/admindashboard',
    drawerName: 'Panel administratora',
    navbarName: 'Panel administratora',
    drawerIcon: <DashboardIcon />,
    component: AdminDashboard,
    exact: true,
    role: [1, 2, 3, 4]
  },
  {
    path: '/admindashboard/database',
    drawerName: 'Baza danych',
    navbarName: 'Baza danych',
    drawerIcon: <DnsIcon />,
    component: Database,
    exact: true,
    role: [1, 2, 3, 4],
    childRoutes: [
      {
        path: '/admindashboard/database/winnice',
        drawerName: 'Winnice',
        navbarName: 'Winnice',
        drawerIcon: <Flower />,
        component: DatabaseVineyard,
        exact: false,
        role: [1, 2]
      },
      {
        path: '/admindashboard/database/produkcja',
        drawerName: 'Produkcja',
        navbarName: 'Produkcja',
        drawerIcon: <Bar />,
        component: DatabaseProduction,
        exact: false,
        role: [1, 2]
      },
      {
        path: '/admindashboard/database/personalia',
        drawerName: 'Personalia',
        navbarName: 'Personalia',
        drawerIcon: <PeopleIcon />,
        component: DatabaseContactsAndUsers,
        exact: false,
        role: [1, 4]
      },
      {
        path: '/admindashboard/database/logistyka',
        drawerName: 'Logistyka',
        navbarName: 'Logistyka',
        drawerIcon: <LocalShipping />,
        component: DatabaseLogistics,
        exact: false,
        role: [1, 4, 3]
      },
      {
        path: '/admindashboard/database/raporty',
        drawerName: 'Raporty',
        navbarName: 'Raporty',
        drawerIcon: <Description />,
        component: DatabaseReports,
        exact: false,
        role: [1, 4, 3, 2] //TODO special verification logic in component
      }
    ]
  },
  {
    path: '/admindashboard/warehouse',
    drawerName: 'Magazyn',
    navbarName: 'Magazyn',
    drawerIcon: <StorageIcon />,
    component: Warehouse,
    exact: false,
    role: [1, 4, 3, 2]
  },
  {
    path: '/admindashboard/profile',
    drawerName: 'Twój profil',
    navbarName: 'Twój profil',
    drawerIcon: <FaceIcon />,
    component: UserInfo,
    exact: false,
    role: [1, 4, 3, 2]
  },
  {
    path: '/admindashboard/news',
    drawerName: 'Najnowsze zdarzenia',
    navbarName: 'Najnowsze zdarzenia',
    drawerIcon: <LayersIcon />,
    component: News,
    exact: false,
    role: [1, 4, 3, 2] //TODO special verification logic in component
  },
  // {
  //   path: '/admindashboard/backup',
  //   drawerName: 'Kopie zapasowe',
  //   navbarName: 'Kopie zapasowe',
  //   drawerIcon: <SaveIcon />,
  //   component: Backup,
  //   exact: false,
  //   role: [1]
  // },
  {
    path: '/admindashboard/productionplans',
    drawerName: 'Plany produkcyjne',
    navbarName: 'Plany produkcyjne',
    drawerIcon: <TodayIcon />,
    component: ProductionPlans,
    exact: true,
    role: [1, 4, 2]
  },
  {
    path: '/admindashboard/productionplans/:id',
    component: ProductionPlanDetails,
    hidden: true,
    exact: true,
    role: [1, 4, 2]
  }

  // {redirect: true, path: "/", to: "/login", navbarName: "Redirect"}
];

export default AdminDashboardRoutes;
