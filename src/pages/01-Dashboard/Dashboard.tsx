import { Avatar } from "primereact/avatar";
import React from "react";
import SubHeader from "../../components/Header/SubHeader/SubHeader";
import { Chip } from "primereact/chip";

// User info
const userInfo = {
  name: "Amy Elsner",
  avatar: "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png",
};

const Dashboard: React.FC = () => {
  return (
    <div className="w-full">
      <SubHeader
        title="Add New Leads"
        subtitle={new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      />
      <div className="flex flex-col p-4">
        <div>
          <h2 className="text-xl font-semibold mb-4">Business Overview</h2>
          <div className="flex gap-4">
            <div className="flex items-center gap-4 bg-white border-l-4 border-blue-500 shadow-md px-4 py-3 rounded-lg flex-1">
              <span className="bg-blue-100 p-3 rounded-full text-blue-600">
                <i className="pi pi-wallet text-3xl"></i>
              </span>
              <div className="flex flex-col">
                <p className="text-gray-500 text-lg bold uppercase font-bold">
                  Revenue
                </p>
                <p className="text-lg font-bold">24.6 K</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white border-l-4 border-blue-500 shadow-md px-4 py-3 rounded-lg flex-1">
              <span className="bg-green-100 p-3 rounded-full text-green-600">
                <i className="pi pi-users text-3xl"></i>
              </span>
              <div className="flex flex-col">
                <p className="text-gray-500 text-lg bold uppercase font-bold">
                  Leads This Week
                </p>
                <p className="text-lg font-bold">05</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white border-l-4 border-blue-500 shadow-md px-4 py-3 rounded-lg flex-1">
              <span className="bg-purple-100 p-3 rounded-full text-purple-600">
                <i className="pi pi-chart-line text-3xl"></i>
              </span>
              <div className="flex flex-col">
                <p className="text-gray-500 text-lg bold uppercase font-bold">
                  Leads This Month
                </p>
                <p className="text-lg font-bold">12</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white border-l-4 border-blue-500 shadow-md px-4 py-3 rounded-lg flex-1">
              <span className="bg-orange-100 p-3 rounded-full text-orange-600">
                <i className="pi pi-percentage text-2xl"></i>
              </span>
              <div className="flex flex-col">
                <p className="text-gray-500 text-lg bold uppercase font-bold">
                  Leads Conversion
                </p>
                <p className="text-lg font-bold">18%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col w-[70%] my-3 bg-white border-l-4 border-blue-500 shadow-md px-4 py-3 rounded-lg gap-3">
            <p className="text-xl font-bold uppercase">Pipeline</p>
            <div className="space-y-5">
              <div>
                <p className="font-medium mb-2">Quotations</p>
                <div className="flex gap-3">
                  <Chip label="1 Pending" />
                  <Chip label="3 Sent" />
                  <Chip label="1 Review" />
                </div>
              </div>

              <div>
                <p className="font-medium mb-2">Approvals</p>
                <div className="flex gap-3">
                  <Chip label="1 Pending" />
                  <Chip label="3 Sent" />
                  <Chip label="1 Review" />
                </div>
              </div>

              <div>
                <p className="font-medium mb-2">Invoices</p>
                <div className="flex gap-3">
                  <Chip label="1 Pending" />
                  <Chip label="3 Sent" />
                  <Chip label="1 Review" />
                </div>
              </div>

              <div>
                <p className="font-medium mb-2">Bookings</p>
                <div className="flex gap-3">
                  <Chip label="1 Pending" />
                  <Chip label="3 Sent" />
                  <Chip label="1 Review" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-[30%] my-3 bg-white border-l-4 border-blue-500 shadow-md px-4 py-3 rounded-lg gap-3">
            <p className="text-xl font-bold uppercase">Assigned Leads</p>
            <div className="flex items-center gap-3 p-3">
              <div className="flex items-center gap-2 cursor-pointer rounded text-gray-700 hover:bg-gray-100 transition-colors duration-150">
                <Avatar image={userInfo.avatar} shape="circle" />
                <p>{userInfo.name}</p>
              </div>
              <p>03</p>
            </div>
            <div className="flex items-center gap-3 p-3">
              <div className="flex items-center gap-2 cursor-pointer rounded text-gray-700 hover:bg-gray-100 transition-colors duration-150">
                <Avatar image={userInfo.avatar} shape="circle" />
                <p>{userInfo.name}</p>
              </div>
              <p>03</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
