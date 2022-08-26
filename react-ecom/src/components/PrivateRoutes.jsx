import React from 'react'
import { checkLogin } from '../auth'
import {Outlet,Navigate} from 'react-router-dom'
function PrivateRoutes() {



    if (checkLogin()) {
        return <Outlet />
    } else {
        return <Navigate to="/login" />
    }




}

export default PrivateRoutes