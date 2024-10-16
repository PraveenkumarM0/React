import React from "react";
import { Outlet, Link } from "react-router-dom";
import './Layout.css'

export default function Layout()
{
    return(
        <>
        <nav>
            <h3>PK’s Shop </h3>
            <ul>
                <li>
                    <Link to = "/">Home</Link>
                </li>
                <li>
                    <Link to = "/product">Product</Link>
                </li>
                <li>
                    <Link to = "/contact"> Contact</Link>
                </li>
                <li>
                    <Link to = '/login'>Login </Link>
                </li>
                <li>
                    <Link to = '/cart'> Cart </Link>
                </li>
            </ul>
          
        </nav>
        
        <Outlet/>
    
        </>
    )
    
    


}




