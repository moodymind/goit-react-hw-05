import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";

const App = () => (
  <>
    <Navigation />
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  </>
);

export default App;
