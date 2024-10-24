import React from 'react';
import ReactDOM from 'react-dom';
import useAuth from './UseAuthComponent';
import Logout from './Auth/LogoutComponent';
import { Link } from 'react-router-dom';


function HeaderComponent() {
    const isAuthenticated = useAuth();
    const logout = Logout();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>

                    {isAuthenticated ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/list_truck_requests">My Requests</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={logout}>
                                    Logout
                                </button>
                            </li>
                    
                        </>) : 
                    
                    (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </>
                    )}
                    
                </ul>
                </div>
            </div>
        </nav>                          
    );

}

export default HeaderComponent;
