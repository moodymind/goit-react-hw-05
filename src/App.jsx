import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";

const App = () => (
  <>
    <Navigation />
    <Outlet />
  </>
);

export default App;
