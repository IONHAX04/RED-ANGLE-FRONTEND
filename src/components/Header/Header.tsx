import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Ripple } from "primereact/ripple";

import "./Header.css";

interface SubMenuItem {
  label: string;
  icon?: string;
  route?: string;
}

interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  subItems?: SubMenuItem[];
}

interface NavProps {
  children: any;
}

// Dynamic menu with routes
const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: "pi pi-home", route: "/dashboard" },
  {
    label: "Leads",
    icon: "pi pi-chart-line",
    subItems: [
      { label: "Add Lead", icon: "pi pi-table", route: "/leads/add" },
      { label: "View Lead", icon: "pi pi-table", route: "/leads/view" },
    ],
  },
  {
    label: "Assign Leads",
    icon: "pi pi-chart-line",
    subItems: [
      { label: "Add Lead", icon: "pi pi-table", route: "/assign/add" },
      { label: "View Lead", icon: "pi pi-table", route: "/assign/view" },
    ],
  },
];

// User info
const userInfo = {
  name: "Amy Elsner",
  avatar: "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png",
};

const Header = ({ children }: NavProps) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({});

  // Toggle menu open/close
  const toggleMenu = (index: number) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Check if route is active
  const isActive = (route?: string) => {
    if (!route) return false;
    return location.pathname === route;
  };

  // Automatically open parent menus if a child route is active
  useEffect(() => {
    const newOpenMenus: Record<number, boolean> = {};
    menuItems.forEach((item, index) => {
      if (item.subItems?.some((subItem) => isActive(subItem.route))) {
        newOpenMenus[index] = true;
      }
    });
    setOpenMenus((prev) => ({ ...prev, ...newOpenMenus }));
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        id="app-sidebar"
        className="surface-section h-full flex-shrink-0 shadow-xl select-none"
        style={{ width: "280px" }}
      >
        <div className="flex flex-col h-full">
          {/* Top: Logo & Toggle */}
          <div className="flex items-center px-3 pt-3 flex-shrink-0">
            <Button
              type="button"
              icon="pi pi-bars"
              text
              className="h-2rem w-2rem"
            />
            <span className="font-semibold text-xl">Menu Bar</span>
          </div>

          {/* Sidebar Menu */}
          <div className="overflow-y-auto flex-1">
            <ul className="list-none p-2 m-0">
              {menuItems.map((item, index) => {
                const hasSub = !!item.subItems?.length;
                const isOpen = !!openMenus[index];

                // Parent active if any child is active or parent route matches
                // const isParentActive =
                //   isActive(item.route) ||
                //   (hasSub &&
                //     item.subItems!.some((subItem) => isActive(subItem.route)));

                return (
                  <li key={index} className="mb-1">
                    {/* Parent menu */}
                    {hasSub ? (
                      // Parent has submenus → do NOT highlight the parent itself
                      <div
                        className="flex items-center justify-between cursor-pointer px-3 py-2 rounded transition-colors duration-150 w-full text-gray-700 hover:bg-gray-100"
                        onClick={() => toggleMenu(index)}
                      >
                        <div className="flex items-center gap-2">
                          {item.icon && <i className={`${item.icon}`}></i>}
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <i
                          className={`pi transition-transform duration-300 ${
                            isOpen ? "pi-chevron-down" : "pi-chevron-right"
                          }`}
                        ></i>
                        <Ripple />
                      </div>
                    ) : (
                      // Parent has no submenu → highlight if active
                      <Link
                        to={item.route!}
                        className={`flex items-center gap-2 px-3 py-2 rounded w-full transition-colors duration-150 ${
                          isActive(item.route)
                            ? "bg-[#3B82F6] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {item.icon && <i className={`${item.icon}`}></i>}
                        <span className="font-medium">{item.label}</span>
                        <Ripple />
                      </Link>
                    )}

                    {/* Submenu */}
                    {hasSub && (
                      <ul
                        className={`overflow-hidden transition-all duration-300 pl-4 ${
                          isOpen ? "max-h-40 mt-1" : "max-h-0"
                        }`}
                      >
                        {item.subItems!.map((subItem, subIndex) => (
                          <li key={subIndex} className="mb-1">
                            <Link
                              to={subItem.route!}
                              className={`flex items-center gap-2 px-3 py-1 rounded w-full transition-colors duration-150 ${
                                isActive(subItem.route)
                                  ? "bg-[#3B82F6] text-white"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {subItem.icon && (
                                <i className={`${subItem.icon}`}></i>
                              )}
                              <span className="font-medium">
                                {subItem.label}
                              </span>
                              <Ripple />
                            </Link>
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
              <span className="font-semibold">{userInfo.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="w-[100%] overflow-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        {children}
      </div>
    </div>
  );
};

export default Header;
