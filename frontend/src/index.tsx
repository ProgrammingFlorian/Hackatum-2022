import React from 'react';
import ReactDOM, {Root} from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";

// CSS Files
// add bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import DashboardContainer from "./Dashboard/DashboardContainer";
import PageLayout from "./common/PageLayout";

const root: Root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

// add 'bg-black' class to root element for dark background
document.body.classList.add('bg-black');

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageLayout/>}>
                    <Route index element={<DashboardContainer />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();