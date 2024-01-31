import './component/styles/App.css';
import AppRouter from "./component/AppRouter";
import {observer} from "mobx-react-lite";
import React from "react";


function App() {

  return (
        <AppRouter/>
  );
}

export default observer(App);
