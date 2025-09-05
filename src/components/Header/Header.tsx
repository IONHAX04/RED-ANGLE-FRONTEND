import { useState } from "react";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Ripple } from "primereact/ripple";

import "./Header.css";

interface SubMenuItem {
  label: string;
  icon?: string;
}

interface MenuItem {
  label: string;
  icon?: string;
  subItems?: SubMenuItem[];
}

interface NavProps {
  children: any;
}

// Dynamic menu
const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: "pi pi-home" },
  {
    label: "Leads",
    icon: "pi pi-chart-line",
    subItems: [
      { label: "Add Lead", icon: "pi pi-table" },
      { label: "View Lead", icon: "pi pi-table" },
    ],
  },
  {
    label: "Assign Leads",
    icon: "pi pi-chart-line",
    subItems: [
      { label: "Add Lead", icon: "pi pi-table" },
      { label: "View Lead", icon: "pi pi-table" },
    ],
  },
];

// Dynamic user info
const userInfo = {
  name: "Amy Elsner",
  avatar: "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png",
};

const Header = ({ children }: NavProps) => {
  // Track which menus are open
  const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({});

  const toggleMenu = (index: number) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen flex relative lg:static surface-ground">
      {/* Sidebar */}
      <div
        id="app-sidebar"
        className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-10 shadow-xl select-none"
        style={{ width: "280px" }}
      >
        <div className="flex flex-col h-full">
          {/* Top: Logo & Toggle */}
          <div className="flex items-center justify-between px-3 pt-3 flex-shrink-0">
            <Button
              type="button"
              icon="pi pi-bars"
              text
              className="h-2rem w-2rem"
            />
            <span className="font-semibold text-xl">Red Angle Studio</span>
          </div>

          {/* Sidebar Menu */}
          <div className="overflow-y-auto flex-1">
            <ul className="list-none p-2 m-0">
              {menuItems.map((item, index) => {
                const isOpen = !!openMenus[index];
                const hasSub = !!item.subItems?.length;

                return (
                  <li key={index} className="mb-1">
                    <div
                      className="flex items-center justify-between cursor-pointer px-3 py-2 rounded text-gray-700 hover:bg-gray-100 transition-colors duration-150 w-full"
                      onClick={() => hasSub && toggleMenu(index)}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon && <i className={`${item.icon}`}></i>}
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {hasSub && (
                        <i
                          className={`pi transition-transform duration-300 ${
                            isOpen ? "pi-chevron-down" : "pi-chevron-right"
                          }`}
                        ></i>
                      )}
                      <Ripple />
                    </div>

                    {/* Submenu */}
                    {hasSub && (
                      <ul
                        className={`overflow-hidden transition-all duration-300 pl-4 ${
                          isOpen ? "max-h-40 mt-1" : "max-h-0"
                        }`}
                      >
                        {item.subItems!.map((subItem, subIndex) => (
                          <li key={subIndex} className="mb-1">
                            <div className="flex items-center gap-2 cursor-pointer py-1 px-3 rounded text-gray-700 hover:bg-gray-100 transition-colors duration-150">
                              {subItem.icon && (
                                <i className={`${subItem.icon}`}></i>
                              )}
                              <span className="font-medium">
                                {subItem.label}
                              </span>
                              <Ripple />
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Bottom User */}
          <div className="mt-auto">
            <hr className="mb-3 border-none surface-border" />
            <div className="m-3 flex items-center gap-2 cursor-pointer rounded text-gray-700 hover:bg-gray-100 transition-colors duration-150 p-2">
              <Avatar image={userInfo.avatar} shape="circle" />
              <span className="font-bold">{userInfo.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4" style={{ marginLeft: "280px" }}>
        {children}
      </div>
    </div>
  );
};

export default Header;
