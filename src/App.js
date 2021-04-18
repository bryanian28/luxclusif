import React from "react";
import { Route } from "react-router-dom";

import "./App.module.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <main>
        <Route path="/" component={Login} exact />
        <Route path="/home" component={Home} />
      </main>
    </>
  );
}

export default App;
