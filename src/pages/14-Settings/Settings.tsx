import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import SubHeader from "../../components/Header/SubHeader/SubHeader";
import Packages from "../../components/14-Settings/Packages";
import Roles from "../../components/14-Settings/Roles";

const Settings: React.FC = () => {
  const [visibleSidebar, setVisibleSidebar] = useState<
    "packages" | "roles" | null
  >(null);

  const openPackages = () => setVisibleSidebar("packages");
  const openRoles = () => setVisibleSidebar("roles");
  const closeSidebar = () => setVisibleSidebar(null);

  return (
    <div>
      <SubHeader
        title="Settings"
        subtitle={new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      />

      <div className="m-3 p-4 shadow-lg rounded-lg">
        <div className="flex gap-3">
          <div
            className="flex-1 border-1 rounded-md p-4 bg-[#f9fafb] border-[#e5e7eb] cursor-pointer hover:bg-gray-100"
            onClick={openPackages}
          >
            <p>Packages</p>
          </div>
          <div
            className="flex-1 border-1 rounded-md p-4 bg-[#f9fafb] border-[#e5e7eb] cursor-pointer hover:bg-gray-100"
            onClick={openRoles}
          >
            <p>Roles</p>
          </div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
        </div>
      </div>

      {/* Sidebar for Packages */}
      <Sidebar
        visible={visibleSidebar === "packages"}
        onHide={closeSidebar}
        position="right"
        header="Packages"
        style={{ width: "60vw" }}
        baseZIndex={1000}
      >
        <Packages />
      </Sidebar>

      {/* Sidebar for Roles */}
      <Sidebar
        visible={visibleSidebar === "roles"}
        onHide={closeSidebar}
        position="right"
        header="Roles"
        style={{ width: "60vw" }}
        baseZIndex={1000}
      >
        <Roles />
      </Sidebar>
    </div>
  );
};

export default Settings;
