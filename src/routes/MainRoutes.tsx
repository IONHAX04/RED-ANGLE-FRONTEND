import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Dashboard from "../pages/01-Dashboard/Dashboard";
import AddNewLeads from "../components/02-LeadsComponents/AddNewLeads/AddNewLeads";
import ViewLeads from "../components/02-LeadsComponents/ViewLeads/ViewLeads";

const MainRoutes: React.FC = () => {
  return (
    <div>
      <Header>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads/add" element={<AddNewLeads />} />
          <Route path="/leads/view" element={<ViewLeads />} />
        </Routes>
      </Header>
    </div>
  );
};

export default MainRoutes;
