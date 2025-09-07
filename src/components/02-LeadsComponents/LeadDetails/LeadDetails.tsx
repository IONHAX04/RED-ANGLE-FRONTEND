import { Avatar } from "primereact/avatar";
import { Chip } from "primereact/chip";
import React from "react";

interface LeadDetailsProps {
  data: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    eventType: string;
    leadSource: string;
    budget?: number;
    notes?: string;
    status: string;
    address: {
      doorNo: string;
      street: string;
      city: string;
      state: string;
      country: string;
    };
  };
}

const LeadDetails: React.FC<LeadDetailsProps> = ({ data }) => {
  const userInfo = {
    name: "Amy Elsner",
    avatar: "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png",
  };

  return (
    <div className="px-4">
      <div className="intro flex gap-3 items-center justify-content-between">
        <div className="flex items-center gap-3">
          <Avatar image={userInfo.avatar} shape="circle" />
          <div className="flex flex-col">
            <p>
              {data.firstName} {data.lastName}
            </p>
            <p>{data.eventType}</p>
            <p>Owner: You</p>
          </div>
        </div>
        <div className="flex">
          <Chip
            label="Call"
            icon="pi pi-phone"
            className="bg-green-100 text-green-700"
          />
          <Chip
            label="Email"
            icon="pi pi-envelope"
            className="bg-blue-100 text-blue-700"
          />
          <Chip
            label="Mark Booked"
            icon="pi pi-check-circle"
            className="bg-purple-100 text-purple-700"
          />
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
