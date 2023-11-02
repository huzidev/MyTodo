import ROUTE_PATHS from './paths';

 import Contact from '../Pages/Form/contact/ContactUs';
import NotesItems from '../Pages/Todo/notes/NotesItems';
import Home from '../Pages/Todo/todoPage/TodoPage';
import Signin from '../pages/auth/Form/signin/SingIn';
import SignUp from '../pages/auth/Form/signup/SignUp';
import SignOut from '../pages/auth/signout/SignOut';
import About from '../pages/user/about/About';
import UpdateUser from '../pages/user/update/UpdateUser';

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