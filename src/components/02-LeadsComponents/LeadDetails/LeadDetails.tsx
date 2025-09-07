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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">
        {data.firstName} {data.lastName}
      </h2>
      <p>
        <strong>Email:</strong> {data.email}
      </p>
      <p>
        <strong>Mobile:</strong> {data.mobile}
      </p>
      <p>
        <strong>Event:</strong> {data.eventType}
      </p>
      <p>
        <strong>Source:</strong> {data.leadSource}
      </p>
      <p>
        <strong>Status:</strong> {data.status}
      </p>
      <p>
        <strong>Budget:</strong> {data.budget}
      </p>
      <p>
        <strong>Notes:</strong> {data.notes}
      </p>
      <p>
        <strong>Address:</strong>{" "}
        {`${data.address.doorNo}, ${data.address.street}, ${data.address.city}, ${data.address.state}, ${data.address.country}`}
      </p>
    </div>
  );
};

export default LeadDetails;
