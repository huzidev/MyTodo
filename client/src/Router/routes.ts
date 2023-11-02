import React from 'react';
import ROUTE_PATHS from './paths';

const HomePage = React.lazy(() => import('pages/notes/todoPage/TodoPage'));
const NotesItems = React.lazy(() => import('pages/notes/notes/NotesItems'));
const Signin = React.lazy(() => import('pages/auth/Form/signin/SingIn'));
const SignUp = React.lazy(() => import('pages/auth/Form/signup/SignUp'));
const SignOut = React.lazy(() => import('pages/auth/signout/SignOut'));
const Contact = React.lazy(() => import('pages/auth/contact'));
const About = React.lazy(() => import('pages/user/about'));
const UpdateUser = React.lazy(() => import('pages/user/update'));

interface AppRoute {
    path: string;
    Component: any;
  }

const routes: AppRoute[] = [
    {
        Component: Home,
        path: ROUTE_PATHS.HOME
    },{
        Component: Signin,
        path: ROUTE_PATHS.SIGNIN
    },
    {
        Component: SignUp,
        path: ROUTE_PATHS.SIGNUP
    },
    {
        Component: SignOut,
        path: ROUTE_PATHS.SINGOUT
    },
    {
        Component: NotesItems,
        path: ROUTE_PATHS.NOTEITEMS
    },
    {
        Component: NotesItems,
        path: ROUTE_PATHS.ADD_NOTE
    },
    {
        Component: NotesItems,
        path: ROUTE_PATHS.COMPLETED_NOTE
    },
    {
        Component: Contact,
        path: ROUTE_PATHS.CONTACT
    },
    {
        Component: About,
        path: ROUTE_PATHS.ABOUT
    },
    {
        Component: UpdateUser,
        path: ROUTE_PATHS.UPDATEUSER
    },
  ]

  export default routes;