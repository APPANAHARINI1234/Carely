import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

const Layout=()=>{
    return(
        <div>
             <Navbar />
            <div style={{minHeight:"100vh"}}>
            <Outlet />
            </div>
          
          
        </div>
    )
}
export default Layout;