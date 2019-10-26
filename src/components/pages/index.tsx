import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import CarInformationsPage from "./CarInformationsPage";
import React from "react";
import Header from "../Header";

export default function Routes() {
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
}
