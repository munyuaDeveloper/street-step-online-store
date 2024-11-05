import "./App.css";
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';
import Users from './pages/Users';
import Products from './pages/Products';
import Dashboard from './pages/Dashboard';
import ProductDetails from './pages/ProductDetails';
import Layout from "./Layout";
export const Routes = createBrowserRouter([
  {
      path: '/',
      element: <Layout />,
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
              element: <SignUp/>,
          },
          {
              path: 'product/:id',
              element: <ProductDetails />
          },
          {
              path: 'admin',
              element: <AdminPanel />,
              children: [
                  {
                      path: 'dashboard',
                      element: <Dashboard />
                  },
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
function App() {
  return (
    <>
        <RouterProvider router={Routes} />
    </>
  );
}

export default App;
