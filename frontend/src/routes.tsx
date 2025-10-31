import type { RouteObject } from 'react-router'

import LandingPage from './LandingPage.tsx'
import SignUp from './SignUp.tsx'
import Login from './Login.tsx'
import ErrorPage from './ErrorPage.tsx'
import ButtonList from './components/buttonList.tsx'
import Mainview from './Mainview.tsx'
import CreateView from './CreateView.tsx'
import App from './App.tsx'
import RepoView from './RepoView.tsx'
import {newRepoAction} from './actions/newRepoAction.ts'
import PrivateRoute from './PrivateRoutes.tsx'

import {reposLoader} from './loaders/reposLoader.ts'
const isAuthenticated = true; //some auth logic

const routes:RouteObject[] = [
    {
        path: "/",
        element: <LandingPage />,
        errorElement: <ErrorPage />,
        children :[
            {
                index:true,
                element: <ButtonList></ButtonList>
            },
            { 
                path: 'signup',
                element: <SignUp></SignUp>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
        ],

    },
    {
        path:"/app/:userId",
        element: <PrivateRoute isAuthenticated={isAuthenticated}><App /></PrivateRoute>,
        loader: reposLoader,
        errorElement: <ErrorPage />,

        children:[
            {
                index:true,
                element: <Mainview /> //mainview
            },
            {
                path:"createview",
                element:<CreateView />,
                action: newRepoAction,
            },
            {
                path: "repoview/:repoId",
                element: <RepoView />,
                errorElement: <ErrorPage />,
            }
        ]
    }
]
export default routes;