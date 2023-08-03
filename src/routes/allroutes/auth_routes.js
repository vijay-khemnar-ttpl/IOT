import React, { lazy } from 'react';
import Loadable from '../../ui-component/extended/loadable';

const ForgotPassword = Loadable(lazy(() => import('../../views/AuthPages/forgot_password')));
const NewRegister = Loadable(lazy(() => import('../../views/AuthPages/register')));
const Login = Loadable(lazy(() => import('../../views/AuthPages/login')));

export const LoginRoutes = [
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
];
