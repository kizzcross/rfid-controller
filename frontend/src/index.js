import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {UserProvider} from './UserContext'; // Adjust the path as necessary

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {ApiProvider} from "./ApiHook";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <UserProvider>
            <ApiProvider>
                <App/>
            </ApiProvider>
        </UserProvider>
    </React.StrictMode>
);

export const form_api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        "Content-type": "multipart/form-data",
    },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
