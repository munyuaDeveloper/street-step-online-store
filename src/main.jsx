import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import App from "./App";
import Home from './pages/Home';
import { Provider } from 'react-redux';
import { store } from './store/Index';
import AdminPanel from './pages/AdminPanel';
import Users from './pages/Users';
import Products from './pages/Products';

 export const Routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path:'login',
                element: <Login/>
            },
            {
                path: 'signup',
                element: <SignUp/>
            },
            {
                path: 'admin',
                element: <AdminPanel />,
                children: [
                    {
                        path:'users',
                        element: <Users />
                    },
                    {
                        path:'products',
                        element: <Products />
                    }
                ]
            }
        ]
    }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={Routes} />
    </Provider>
    
  
  </React.StrictMode>,
)
