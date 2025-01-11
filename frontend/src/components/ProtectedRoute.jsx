import React from 'react';
import { useSelector} from "react-redux";
import { Navigate,Outlet } from "react-router-dom";
import{RootState}from '../store/store'

const ProtectedRoute=()=>{
    const isAuthenticated=useSelector((state)=>state.user.isAuthenticated);

    return isAuthenticated?<Outlet/>:<Navigate to="/login"/>;
};

export default ProtectedRoute;