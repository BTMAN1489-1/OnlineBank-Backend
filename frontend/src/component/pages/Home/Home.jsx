import React from 'react';
import "../../styles/Common.css"
import CardList from "./CardList";
import '../../styles/App.css'
import './Home.css'
import {Outlet} from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import {observer} from "mobx-react-lite";

const Home = () => {
    return (
        <div className="App">
                <Navbar/>
            <div className="page_char" >
                <CardList/>
                <Outlet/>
            </div>
        </div>
    );
};

export default observer(Home);