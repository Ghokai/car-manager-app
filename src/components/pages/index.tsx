import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../Header";
import CarInformationsPage from "./CarInformationsPage";
import Home from "./Home";

const Routes: React.FC = (): React.ReactElement => {
  return (
    <Router>
      <Header></Header>
      <Route path="/" exact component={Home} />
      <Route
        path="/car-informations/:carId"
        exact
        component={CarInformationsPage}
      />
    </Router>
  );
};
export default Routes;
