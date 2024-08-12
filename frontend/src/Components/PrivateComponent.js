import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { isAuthenticated } from '../Admin/helper'

const privateRoutes=()=> {
    let auth=isAuthenticated()
    return auth && auth.role===0 ?<Outlet/>:<Navigate to="/" />
}

export default privateRoutes