import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { NavLink } from "react-router-dom";

import {
  Menu,
  User,
  Repeat,
  Settings,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import { Accordion, AccordionTab } from "primereact/accordion";

import "./Header.css";

interface Route {
  path?: string;
  name: string;
  icon: any;
  subRoutes?: Route[];
  isBottom?: boolean; // To mark settings/logout for bottom alignment
}

interface NavProps {
  children: any;
}

const routes: Route[] = [
  { path: "/", name: "Dashboard", icon: <LayoutDashboard /> },
  {
    path: "/employee",
    name: "Leads",
    icon: <User />,
  },
  {
    name: "Manage",
    icon: <Repeat />,
    subRoutes: [
      { path: "/manage/assign", name: "Assign Leads", icon: <Repeat /> },
      { path: "/manage/view", name: "View Leads", icon: <Repeat /> },
    ],
  },
  { path: "/settings", name: "Settings", icon: <Settings />, isBottom: true },
  { path: "/logout", name: "Logout", icon: <LogOut />, isBottom: true },
];

const showAnimation: Variants = {
  hidden: { width: 0, opacity: 0, transition: { duration: 0.2 } },
  show: { width: "auto", opacity: 1, transition: { duration: 0.2 } },
};

const Header = ({ children }: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="main_container">
      <motion.div
        animate={{
          width: isOpen ? "250px" : "60px",
          transition: { duration: 0.2, type: "spring", damping: 10 },
        }}
        className="sidebar"
      >
        <div className="top_section">
          <AnimatePresence>
            {isOpen && (
              <motion.h1
                className="logo"
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                Admin Panel
              </motion.h1>
            )}
          </AnimatePresence>
          <div className="bars">
            <Menu onClick={toggle} />
          </div>
        </div>

        <section className="routes">
          {/* Top Routes */}
          {routes
            .filter((r) => !r.isBottom)
            .map((route) =>
              route.subRoutes ? (
                <Accordion
                  key={route.name}
                  multiple
                  className="submenu-accordion"
                >
                  <AccordionTab
                    header={
                      <div className="link">
                        <div className="icon">{route.icon}</div>
                        {isOpen && (
                          <span className="link_text">{route.name}</span>
                        )}
                      </div>
                    }
                  >
                    {route.subRoutes.map((sub) => (
                      <NavLink
                        key={sub.name}
                        to={sub.path!}
                        className="link sublink"
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? "#d0d0d0" : "transparent",
                        })}
                      >
                        <div className="icon">{sub.icon}</div>
                        {isOpen && (
                          <span className="link_text">{sub.name}</span>
                        )}
                      </NavLink>
                    ))}
                  </AccordionTab>
                </Accordion>
              ) : (
                <NavLink
                  key={route.name}
                  to={route.path!}
                  className="link"
                  style={({ isActive }) => ({
                    // backgroundColor: isActive ? "#e0e0e0" : "transparent",
                  })}
                >
                  <div className="icon">{route.icon}</div>
                  {isOpen && <span className="link_text">{route.name}</span>}
                </NavLink>
              )
            )}

          {/* Bottom Routes */}
          <div className="bottom_routes">
            {routes
              .filter((r) => r.isBottom)
              .map((route) => (
                <NavLink
                  key={route.name}
                  to={route.path!}
                  className="link"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#e0e0e0" : "transparent",
                  })}
                >
                  <div className="icon">{route.icon}</div>
                  {isOpen && <span className="link_text">{route.name}</span>}
                </NavLink>
              ))}
          </div>
        </section>
      </motion.div>

      <main style={{ width: isOpen ? "85vw" : "95vw" }}>{children}</main>
    </div>
  );
};

export default Header;
