import { Avatar } from "primereact/avatar";
import React from "react";

// User info
const userInfo = {
  name: "Amy Elsner",
  avatar: "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png",
};

const Dashboard: React.FC = () => {
  return (
    <div className="p-3 w-full">
      <div className="flex flex-col">
        <p>Business Overview</p>
        <div className="flex gap-3 w-full">
          <div className="flex-1 flex items-center gap-3 bg-[#3B82F6] px-3 py-2 rounded-lg">
            <p className="bg-white p-2 rounded-full">
              <i className="pi pi-wallet"></i>
            </p>
            <div className="flex flex-col text-white">
              <p>Revenue</p>
              <p>$ 24.6 K</p>
              <p>Total Booking: 32</p>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-3 bg-[#3B82F6] px-3 py-2 rounded-lg">
            <p className="bg-white p-2 rounded-full">
              <i className="pi pi-wallet"></i>
            </p>
            <div className="flex flex-col text-white">
              <p>Leads This Week</p>
              <p>05</p>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-3 bg-[#3B82F6] px-3 py-2 rounded-lg">
            <p className="bg-white p-2 rounded-full">
              <i className="pi pi-wallet"></i>
            </p>
            <div className="flex flex-col text-white">
              <p>Leads This Month</p>
              <p>12</p>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-3 bg-[#3B82F6] px-3 py-2 rounded-lg">
            <p className="bg-white p-2 rounded-full">
              <i className="pi pi-wallet"></i>
            </p>
            <div className="flex flex-col text-white">
              <p>Leads Conversion</p>
              <p>18 %</p>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col w-[70%]">
            <p>Pipeline</p>
            <p>Quotations</p>
            <div className="flex">
              <p>1 Pending</p>
              <p>3 Sent</p>
              <p>1 Review</p>
            </div>
            <p>Approvals</p>
            <div className="flex">
              <p>1 Pending</p>
              <p>3 Sent</p>
              <p>1 Review</p>
            </div>
            <p>Invoices</p>
            <div className="flex">
              <p>1 Pending</p>
              <p>3 Sent</p>
              <p>1 Review</p>
            </div>
            <p>Bookings</p>
            <div className="flex">
              <p>1 Pending</p>
              <p>3 Sent</p>
              <p>1 Review</p>
            </div>
          </div>
          <div className="flex flex-col w-[30%]">
            <p>Assigned Leads</p>
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
