import React from 'react';

const SignUp1 = React.lazy(() => import('./Demo/Authentication/SignUp/SignUp1'));
const Signin1 = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn1'));
const Login = React.lazy(() => import('./Pages/Login'));
const InquireStocksNoAuth = React.lazy(() => import('./Pages/Stocks/InquireStocksNoAuth'));

const route = [
    // { path: '/auth/signup-1', exact: true, name: 'Signup 1', component: SignUp1 },
    // { path: '/auth/signin-1', exact: true, name: 'Signin 1', component: Signin1 },
    { path: '/login', exact: true, name: 'Login', component: Login },
    //{ path: '/stocks', exact: true, name: 'Inquire Stocks', component: InquireStocksNoAuth },
];

export default route;