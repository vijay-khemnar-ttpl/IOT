import React, { lazy } from 'react';
import Loadable from '../../ui-component/extended/loadable';

//////////// Auth Routes /////////////

const ForgotPassword = Loadable(lazy(() => import('../../views/AuthPages/forgot_password')));
const NewRegister = Loadable(lazy(() => import('../../views/AuthPages/register')));
const Login = Loadable(lazy(() => import('../../views/AuthPages/login')));

//////////// Main Routes /////////////

const DashboardPage = Loadable(lazy(() => import('../../views/Dashboard')));
const OrganizationPage = Loadable(lazy(() => import('../../views/Organizations')));
const CreateOrganizationPage = Loadable(lazy(() => import('../../views/Organizations/components/CreateOrganization')));
const SitesPage = Loadable(lazy(() => import('../../views/Sites')));
const UserProfilePage = Loadable(lazy(() => import('../../views/UserProfile')));
const CreateSite = Loadable(lazy(() => import('../../views/Sites/components/CreateSite')));
const MyDevices = Loadable(lazy(() => import('../../views/MyDevices')));
const Devices = Loadable(lazy(() => import('../../views/MyDevices/Devices')));
const Gateways = Loadable(lazy(() => import('../../views/MyDevices/Gateways')));


export const AllRoutes = [

    // Auth routes -> 
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/forgot',
        element: <ForgotPassword />,
    },
    {
        path: '/register',
        element: <NewRegister />,
    },

    // Main routes ->
    {
        path: '/dashboard',
        element: <DashboardPage />
    },
    {
        path: '/organizations',
        element: <OrganizationPage />
    },
    {
        path: '/create_organization',
        element: <CreateOrganizationPage />
    },
    {
        path: '/sites',
        element: <SitesPage />
    },
    {
        path: '/user_profile',
        element: <UserProfilePage />
    },
    {
        path: '/create_site',
        element: <CreateSite />
    },
    {
        path: '/my_devices',
        element: <MyDevices />
    },
    {
        path: '/devices',
        element: <Devices />
    },
    {
        path: '/gateways',
        element: <Gateways />
    },
];


