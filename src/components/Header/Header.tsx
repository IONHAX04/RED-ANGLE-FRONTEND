import { useState, useEffect, type JSX } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { Ripple } from "primereact/ripple";
import {
  Home,
  Users,
  UserPlus,
  List,
  Activity,
  Share2,
  FileText,
  FilePlus2,
  ChevronDown,
  ChevronRight,
  IdCard,
  ClipboardList,
  Menu as MenuIcon,
  LogOut,
  Fingerprint,
  CalendarCheck,
} from "lucide-react";

import "./Header.css";
import { Divider } from "primereact/divider";

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

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: <Home size={18} />, route: "/dashboard" },
  {
    label: "Leads",
    icon: <Users size={18} />,
    subItems: [
      { label: "Add Lead", icon: <UserPlus size={18} />, route: "/leads/add" },
      {
        label: "View & Track Lead",
        icon: <List size={18} />,
        route: "/leads/view",
      },
      {
        label: "Status Indicator",
        icon: <Activity size={18} />,
        route: "/leads/status",
      },
    ],
  },
  {
    label: "Assign Leads",
    icon: <Share2 size={18} />,
    subItems: [
      {
        label: "Assign Lead",
        icon: <UserPlus size={18} />,
        route: "/assign/add",
      },
    ],
  },
  {
    label: "Quotation",
    icon: <FileText size={18} />,
    subItems: [
      {
        label: "Add Quotation",
        icon: <FilePlus2 size={18} />,
        route: "/quotation/add",
      },
    ],
  },
  {
    label: "Employees",
    icon: <Users size={18} />,
    subItems: [
      {
        label: "Employee Details",
        icon: <IdCard size={18} />,
        route: "/employees/view",
      },
      {
        label: "Attendance Report",
        icon: <ClipboardList size={18} />,
        route: "/employees/attendance",
      },
      {
        label: "Leave Request",
        icon: <CalendarCheck size={18} />,
        route: "/employees/leave-request",
      },
    ],
  },
  {
    label: "Attendance",
    icon: <Fingerprint size={18} />,
    route: "/attendance",
  },
  {
    label: "Leave Request",
    icon: <CalendarCheck size={18} />,
    route: "/leaveReq",
  },
];

const Header = ({ children }: NavProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({});
  const [userInfo, setUserInfo] = useState<{ name: string; avatar: string }>({
    name: "",
    avatar: "",
  });

  const hideSidebarRoutes = ["/login", "/forgotpassword"];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  useEffect(() => {
    const storedUser = localStorage.getItem("userDetails");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      console.log("parsed", parsed);
      setUserInfo({
        name: `${parsed.firstName} ${parsed.lastName}`,
        avatar:
          "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png",
      });
    }
  }, []);

  const toggleMenu = (index: number) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const isActive = (route?: string) => {
    if (!route) return false;
    return location.pathname === route;
  };

  useEffect(() => {
    const newOpenMenus: Record<number, boolean> = {};
    menuItems.forEach((item, index) => {
      if (item.subItems?.some((subItem) => isActive(subItem.route))) {
        newOpenMenus[index] = true;
      }
    });
    setOpenMenus((prev) => ({ ...prev, ...newOpenMenus }));
  }, [location.pathname]);

  // 👉 If sidebar should be hidden, just render children
  if (shouldHideSidebar) {
    return <div className="w-full h-screen overflow-auto">{children}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        id="app-sidebar"
        className="surface-section h-full flex-shrink-0 shadow-xl select-none"
        style={{ width: "280px" }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center px-3 pt-3 flex-shrink-0 gap-2">
            <MenuIcon size={20} className="text-gray-700" />
            <span className="font-semibold text-xl">Menu Bar</span>
          </div>

          <div className="overflow-y-auto flex-1">
            <ul className="list-none p-2 m-0">
              {menuItems.map((item, index) => {
                const hasSub = !!item.subItems?.length;
                const isOpen = !!openMenus[index];
                return (
                  <li key={index} className="mb-1">
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

          {/* User Profile */}
          <div className="mt-auto">
            <hr className="mb-3 border-none surface-border" />

            {/* Profile info */}
            <div
              className="m-3 flex items-center gap-2 cursor-pointer rounded text-gray-700 hover:bg-gray-100 transition-colors duration-150 p-2"
              onClick={() => navigate("/profile")}
            >
              <Avatar image={userInfo.avatar} shape="circle" />
              <span className="font-semibold">{userInfo.name}</span>
            </div>

            <Divider />

            {/* Logout Button */}
            <div
              className="m-3 flex items-center gap-2 cursor-pointer rounded text-gray-700 hover:bg-gray-100 transition-colors duration-150 p-2"
              onClick={() => {
                localStorage.clear();
                navigate("/login", { replace: true });
              }}
            >
              <LogOut size={18} />
              <span className="font-medium">Logout</span>
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
