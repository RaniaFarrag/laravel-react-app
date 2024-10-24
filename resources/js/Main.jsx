import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent.jsx';
import HomeComponent from './components/HomeComponent.jsx';
import RegisterComponent from './components/Auth/RegisterComponent.jsx';
import LoginComponent from './components/Auth/LoginComponent.jsx';
import TruckRequestComponent from './components/TruckRequestComponent.jsx';
import ListTruckRequestComponent from './components/ListTruckRequestComponent.jsx';

function Main () {
    return (
        <BrowserRouter>
        <HeaderComponent />
            <Routes>
                <Route path="/" element={ <HomeComponent/> }/>
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/register" element={<RegisterComponent />} />
                <Route path="/truck_request" element={<TruckRequestComponent />} />
                <Route path="/list_truck_requests" element={<ListTruckRequestComponent />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Main;