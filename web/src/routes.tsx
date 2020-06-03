import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import CreatePonto from "./pages/CreatePonto";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={CreatePonto} path="/create-point" />
    </BrowserRouter>
  );
};

export default Routes;
