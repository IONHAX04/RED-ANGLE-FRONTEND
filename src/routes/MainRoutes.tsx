import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Dashboard from "../pages/01-Dashboard/Dashboard";

const MainRoutes: React.FC = () => {
  return (
    <div>
      <Header>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Header>
    </div>
  );
};

export default MainRoutes;
