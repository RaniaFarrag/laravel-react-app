import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Main from './Main.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ToastContainer position='top-right'/>
        <Main />
    </React.StrictMode>

);
