import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { isAuthenticated } from './helper'

const AdminRoutes=()=> {
    let auth=isAuthenticated();
    console.log("auth",auth)
    return (auth && auth.role===1) ?<Outlet/>:<Navigate to="/login" />
}

export default AdminRoutes