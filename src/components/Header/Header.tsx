import { useState, useEffect, type JSX } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { Ripple } from "primereact/ripple";

// Import lucide icons
import {
  Home,
  LineChart,
  Table,
  ChevronDown,
  ChevronRight,
  Menu as MenuIcon,
} from "lucide-react";

import "./Header.css";

interface SubMenuItem {
  label: string;
  icon?: JSX.Element;
  route?: string;
}

interface MenuItem {
  label: string;
  icon?: JSX.Element;
  route?: string;
  subItems?: SubMenuItem[];
}

interface NavProps {
  children: any;
}

// Dynamic menu with routes + lucide icons
const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: <Home size={18} />, route: "/dashboard" },
  {
    label: "Leads",
    icon: <LineChart size={18} />,
    subItems: [
      { label: "Add Lead", icon: <Table size={18} />, route: "/leads/add" },
      { label: "View Lead", icon: <Table size={18} />, route: "/leads/view" },
      {
        label: "Status Indicator",
        icon: <Table size={18} />,
        route: "/leads/status",
      },
    ],
  },
  {
    label: "Assign Leads",
    icon: <LineChart size={18} />,
    subItems: [
      { label: "Assign Lead", icon: <Table size={18} />, route: "/assign/add" },
      { label: "Track Lead", icon: <Table size={18} />, route: "/assign/view" },
    ],
  },
  {
    label: "Quotation",
    icon: <LineChart size={18} />,
    subItems: [
      {
        label: "List Quotation",
        icon: <Table size={18} />,
        route: "/quotation/view",
      },
      {
        label: "Add Quotation",
        icon: <Table size={18} />,
        route: "/quotation/add",
      },
      {
        label: "Preview",
        icon: <Table size={18} />,
        route: "/quotation/preview",
      },
      {
        label: "Send To Client",
        icon: <Table size={18} />,
        route: "/quotation/sent",
      },
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

  // Auto-open parent if child active
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
          <div className="flex items-center px-3 pt-3 flex-shrink-0 gap-2">
            <MenuIcon size={20} className="text-gray-700" />
            <span className="font-semibold text-xl">Menu Bar</span>
          </div>

          {/* Sidebar Menu */}
          <div className="overflow-y-auto flex-1">
            <ul className="list-none p-2 m-0">
              {menuItems.map((item, index) => {
                const hasSub = !!item.subItems?.length;
                const isOpen = !!openMenus[index];

                return (
                  <li key={index} className="mb-1">
                    {/* Parent menu */}
                    {hasSub ? (
                      <div
                        className="flex items-center justify-between cursor-pointer px-3 py-2 rounded transition-colors duration-150 w-full text-gray-700 hover:bg-gray-100"
                        onClick={() => toggleMenu(index)}
                      >
                        <div className="flex items-center gap-2">
                          {item.icon}
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {isOpen ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                        <Ripple />
                      </div>
                    ) : (
                      <Link
                        to={item.route!}
                        className={`flex items-center gap-2 px-3 py-2 rounded w-full transition-colors duration-150 ${
                          isActive(item.route)
                            ? "bg-[#3B82F6] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {item.icon}
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
                              {subItem.icon}
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
