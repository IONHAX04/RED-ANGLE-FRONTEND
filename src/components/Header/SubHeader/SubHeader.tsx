import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Bell, Search } from "lucide-react";

import "./ComponentHeader.css";
import { Sidebar } from "primereact/sidebar";
import QuickNotificationSidebar from "../QuickNotificationSidebar/QuickNotificationSidebar";

interface ComponentHeaderProps {
  title: string;
  subtitle: string;
}

const SubHeader: React.FC<ComponentHeaderProps> = ({ title, subtitle }) => {
  const [visibleRight, setVisibleRight] = useState<boolean>(false);

  return (
    <div className="top-0 right-0 w-full z-50">
      <div className="flex justify-between py-1 px-4 headerIndiv shadow-md bg-white">
        <div className="flex flex-column">
          <p className="text-lg font-bold">{title}</p>
          <p className="text-xs">{subtitle}</p>
        </div>

        {/* Search input with Lucide icon inside */}
        <div className="flex align-items-center gap-3">
          <div className="custom-icon-field">
            <Search className="lucide-search-icon" size={18} />
            <InputText placeholder="Search" className="search-input" />
          </div>
          <Bell
            onClick={() => setVisibleRight(true)}
            className="cursor-pointer"
          />
        </div>

        <Sidebar
          visible={visibleRight}
          position="right"
          onHide={() => setVisibleRight(false)}
        >
          <QuickNotificationSidebar />
        </Sidebar>
      </div>
    </div>
  );
};

export default SubHeader;
