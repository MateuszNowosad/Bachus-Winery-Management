import React from 'react';
import AdminDashboard from '../views/AdminDashboard/AdminDashboard';
import Database from '../views/AdminDashboard/Database';
import Users from '../views/AdminDashboard/Users';
import Diagnostics from '../views/AdminDashboard/Diagnostics';
import News from '../views/AdminDashboard/News';
import Backup from '../views/AdminDashboard/Backup';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import DnsIcon from '@material-ui/icons/Dns';
import Person from '@material-ui/icons/Person';
import Flower from '@material-ui/icons/LocalFlorist';
import Bar from '@material-ui/icons/LocalBar';

const AdminDashboardRoutes = [
  {
    path: '/admindashboard',
    drawerName: 'Panel administratora',
    navbarName: 'Panel administratora',
    drawerIcon: <DashboardIcon />,
    component: AdminDashboard,
    exact: true
  },
  {
    path: '/admindashboard/database',
    drawerName: 'Baza danych',
    navbarName: 'Baza danych',
    drawerIcon: <DnsIcon />,
    component: Database,
    exact: true,
    childRoutes: [
      {
        path: '/admindashboard/database/winnice',
        drawerName: 'Winnice',
        navbarName: 'Winnice',
        drawerIcon: <Flower />,
        component: Database,
        exact: false
      },
      {
        path: '/admindashboard/database/produkcja',
        drawerName: 'Produkcja',
        navbarName: 'Produkcja',
        drawerIcon: <Bar />,
        component: Database,
        exact: false
      },
      {
        path: '/admindashboard/database/personalia',
        drawerName: 'Personalia',
        navbarName: 'Personalia',
        drawerIcon: <Person />,
        component: Database,
        exact: false
      }
    ]
  },
  {
    path: '/admindashboard/users',
    drawerName: 'Użytkownicy',
    navbarName: 'Użytkownicy',
    drawerIcon: <PeopleIcon />,
    component: Users,
    exact: false
  },
  {
    path: '/admindashboard/diagnostics',
    drawerName: 'Dane Diagnostyczne',
    navbarName: 'Dane Diagnostyczne',
    drawerIcon: <BarChartIcon />,
    component: Diagnostics,
    exact: false
  },
  {
    path: '/admindashboard/news',
    drawerName: 'Najnowsze zdarzenia',
    navbarName: 'Najnowsze zdarzenia',
    drawerIcon: <LayersIcon />,
    component: News,
    exact: false
  },
  {
    path: '/admindashboard/backup',
    drawerName: 'Dashboard',
    navbarName: 'Panel administratora',
    drawerIcon: <LayersIcon />,
    component: Backup,
    exact: false
  }

  // {redirect: true, path: "/", to: "/login", navbarName: "Redirect"}
];

export default AdminDashboardRoutes;
