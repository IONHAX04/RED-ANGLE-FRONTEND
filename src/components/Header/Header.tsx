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

import "./Header.css";

interface Route {
  path: string;
  name: string;
  icon: any;
}

interface NavProps {
  children: any;
}

const routes: Route[] = [
  { path: "/", name: "Dashboard", icon: <LayoutDashboard /> },
  { path: "/employee", name: "Employee", icon: <User /> },
  { path: "/manage", name: "Manage Access", icon: <Repeat /> },
  { path: "/settings", name: "Settings", icon: <Settings /> },
  { path: "/logout", name: "Logout", icon: <LogOut /> },
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
          {routes.map((route) => (
            <NavLink
              to={route.path}
              key={route.name}
              className="link"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#e0e0e0" : "transparent",
              })}
            >
              <div className="icon">{route.icon}</div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className="link_text"
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                  >
                    {route.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </section>
      </motion.div>

      <main style={{ width: isOpen ? "85vw" : "95vw" }}>{children}</main>
    </div>
  );
};

export default Header;
