import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import App, {loader as AppLoader, action as AppAction} from './App.jsx'
import ErrorPage from './routes/Errorpage.jsx';
import Login, {action as LoginAction} from './routes/Login.jsx';
import Register, {action as RegisterAction}  from './routes/Register.jsx';
import HomePage, {loader as HomeLoader} from './routes/HomePage.jsx';

//-bootstrap
import './scss/styles.scss'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: AppLoader,
    action: AppAction,
    children: [
      {
        index: true,
        element: <Login />,
        action: LoginAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
      {
        path: "register",
        element: <Register />,
        action: RegisterAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
      {
        path: "home",
        element: <HomePage />,
        loader: HomeLoader,
        errorElement: <div>Oops! There was an error.</div>,
      }
    ]
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

