import React from 'react';
import {createBrowserRouter,RouterProvider,Route} from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import EditUser from './pages/EditUser';
import AddUser from './pages/AddUser';

import './App.css';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
  {
    path: "/adminDashboard",
    element: <AdminDashboard/>
  },
  {
    path: "/admin/userEdit/:id",
    element: <EditUser/>
  },
  {
    path:"/admin/addUser",
    element: <AddUser/>
  },
]);


function App() {
  return (
    <div>
   <RouterProvider router={router} />
   </div>
  );
}

export default App;
