import { useRef } from "react";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Ripple } from "primereact/ripple";
import { StyleClass } from "primereact/styleclass";

import "./Header.css";

interface NavProps {
  children: any;
}

const Header = ({ children }: NavProps) => {
  const btnRef2 = useRef<any>(null);

  return (
    <div className="min-h-screen flex relative lg:static surface-ground">
      {/* Sidebar */}
      <div
        id="app-sidebar-2"
        className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none"
        style={{ width: "280px" }}
      >
        <div className="flex flex-column h-full">
          {/* Top: Logo & Toggle */}
          <div className="flex align-items-center justify-content-between px-3 pt-3 flex-shrink-0">
            <span>
              <Button
                type="button"
                icon="pi pi-bars"
                text
                className="h-2rem w-2rem"
              />
            </span>
            <span className="inline-flex align-items-center gap-2">
              <span className="font-semibold text-2xl text-primary">
                Red Angle Studio
              </span>
            </span>
          </div>

          {/* Sidebar Menu */}
          <div className="overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            <ul className="list-none p-2 m-0">
              {/* Example menu items */}
              <li>
                <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                  <i className="pi pi-home mr-2"></i>
                  <span className="font-medium">Dashboard</span>
                  <Ripple />
                </a>
              </li>
              <li>
                <StyleClass
                  nodeRef={btnRef2}
                  selector="@next"
                  enterFromClassName="hidden"
                  enterActiveClassName="slidedown"
                  leaveToClassName="hidden"
                  leaveActiveClassName="slideup"
                >
                  <a
                    ref={btnRef2}
                    className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                  >
                    <i className="pi pi-chart-line mr-2"></i>
                    <span className="font-medium">Reports</span>
                    <i className="pi pi-chevron-down ml-auto mr-1"></i>
                    <Ripple />
                  </a>
                </StyleClass>
                <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                  <li>
                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                      <i className="pi pi-table mr-2"></i>
                      <span className="font-medium">Revenue</span>
                      <Ripple />
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Bottom User */}
          <div className="mt-auto">
            <hr className="mb-3 border-none surface-border" />
            <a className="m-3 flex align-items-center cursor-pointer gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
              <Avatar
                image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
                shape="circle"
              />
              <span className="font-bold">Amy Elsner</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4" style={{ marginLeft: "280px" }}>
        {children}
      </div>
    </div>
  );
};

export default Header;
