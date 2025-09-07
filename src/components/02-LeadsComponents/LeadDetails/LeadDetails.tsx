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
  return (
    <div className="px-4">
      <div className="flex">
        <img src="" alt="" />
        <div className="flex flex-col">
          <p>
            {data.firstName} {data.lastName}
          </p>
          <p>Owner: You</p>
        </div>
        <p>Call</p>
        <p>Email</p>
        <p>Mark Booked</p>
      </div>
      <div className="flex">
        <div className="flex-1">
          <p>Lead SOurce</p>
          <p>Stage: COntacted or ... status</p>
          <p>Event TYpe</p>
          <p>Budget</p>
          <p>Event Date</p>
        </div>
        <div className="flex-1">
          <p>COntact Details</p>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
