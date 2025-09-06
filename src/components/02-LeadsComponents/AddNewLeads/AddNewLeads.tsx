import { InputText } from "primereact/inputtext";
import React from "react";

const AddNewLeads: React.FC = () => {
  return (
    <div className="p-4">
      <p>Add New Lead</p>
      <div className="flex shadow-md p-3">
        <div className="flex flex-1 flex-column gap-2">
          <label htmlFor="username">Name</label>
          <InputText
            type="text"
            className="p-inputtext-sm md:w-[14rem]"
            placeholder="Enter Full Name"
          />
        </div>
      </div>
    </div>
  );
};

export default AddNewLeads;
