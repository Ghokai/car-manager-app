import React from "react";
import "./App.css";
import Routes from "./components/pages";

const App: React.FC = (): React.ReactElement => {
  return (
    <div className="App">
      <Routes></Routes>
    </div>
  );
};

export default App;
