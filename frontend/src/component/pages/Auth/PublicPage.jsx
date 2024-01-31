import React from 'react';
import '../../styles/App.css'
import '../Home/Home.css'
import Navbar from "../../Navbar/Navbar";
import {Outlet} from "react-router-dom";
const PublicPage = () => {
    return (
        <div className="App">
            <Navbar/>
            <div className='page_char'>
                <Outlet/>
            </div>
        </div>
    );
};

export default PublicPage;