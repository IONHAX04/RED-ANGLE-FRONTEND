import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";

import React from "react";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Divider } from "primereact/divider";

const AddNewLeads: React.FC = () => {
  const eventTypes = [
    { label: "Wedding", value: "wedding" },
    { label: "Engagement", value: "engagement" },
    { label: "Birthday", value: "birthday" },
    { label: "Corporate", value: "corporate" },
    { label: "Other", value: "other" },
  ];

  const leadSources = [
    { label: "Instagram", value: "instagram" },
    { label: "LinkedIn", value: "linkedin" },
    { label: "Facebook", value: "facebook" },
    { label: "Referral", value: "referral" },
    { label: "Other", value: "other" },
  ];

  return (
    <div className="p-3">
      <p className="uppercase font-bold underline text-lg">Add New Lead</p>
      <div className="p-3 shadow-lg rounded-lg">
        <p className="underline uppercase font-semibold text-md">
          Basic Details
        </p>
        <div className="flex gap-3">
          <div className="flex flex-1 flex-column gap-2">
            <label htmlFor="username">First Name</label>
            <InputText
              type="text"
              className="p-inputtext-sm"
              placeholder="Enter First Name"
            />
          </div>
          <div className="flex flex-1 flex-column gap-2">
            <label htmlFor="username">Last Name</label>
            <InputText
              type="text"
              className="p-inputtext-sm"
              placeholder="Enter Last Name"
            />
          </div>{" "}
          <div className="flex-1"></div>
        </div>
        <Divider />
        <p className="mt-2 underline uppercase font-semibold text-md">
          Communication Details
        </p>
        <div className="flex gap-3">
          <div className="flex flex-1 flex-column gap-2">
            <label htmlFor="username">Email</label>
            <InputText
              type="text"
              className="p-inputtext-sm"
              placeholder="Enter Email"
            />
          </div>
          <div className="flex flex-1 flex-column gap-2">
            <label htmlFor="username">Mobile</label>
            <InputMask
              type="text"
              className="p-inputtext-sm"
              mask="999-999-9999"
              placeholder="Enter Mobile"
            />
          </div>
          <div className="flex flex-1 flex-column gap-2">
            <label htmlFor="username">Secondary Mobile</label>
            <InputMask
              type="text"
              className="p-inputtext-sm"
              mask="999-999-9999"
              placeholder="Enter Secondary Mobile"
            />
          </div>
        </div>
        <Divider />

        <p className="mt-2 underline uppercase font-semibold text-md">
          Event Details
        </p>
        <div className="flex gap-3">
          <div className="flex flex-1 flex-column gap-2">
            <label htmlFor="username">Event Type</label>
            <Dropdown
              options={eventTypes}
              placeholder="Select Event Type"
              className="p-inputtext-sm"
            />
          </div>
          <div className="flex flex-1 flex-column gap-2">
            <label htmlFor="username">Lead Source</label>
            <Dropdown
              options={leadSources}
              placeholder="Select Lead Source"
              className="p-inputtext-sm"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-3">
          <div className="flex flex-1 flex-column gap-2">
            <label>Budget (Optional)</label>
            <InputText
              type="number"
              placeholder="Enter Budget"
              className="p-inputtext-sm"
            />
          </div>
          <div className="flex flex-1 flex-column gap-2">
            <label>Event Date</label>
            <Calendar
              placeholder="Choose Event Date"
              className="p-inputtext-sm"
            />
          </div>
        </div>

        <Divider />

        <p className="mt-2 underline uppercase font-semibold text-md">
          Advance Details
        </p>
        <div className="flex gap-3">
          <div className="flex flex-1 flex-column gap-2">
            <label>Advance Payment</label>
            <InputText
              type="number"
              placeholder="Enter Advance"
              className="p-inputtext-sm"
            />
          </div>
          <div className="flex flex-1 flex-column gap-2">
            <label>Payment Date</label>
            <Calendar
              placeholder="Amount Given Date"
              className="p-inputtext-sm"
            />
          </div>
        </div>

        <Divider />

        <p className="mt-2 underline uppercase font-semibold text-md">
          Other Important Notes
          <Editor
            // value={text}
            // onTextChange={(e: EditorTextChangeEvent) => setText(e.htmlValue)}
            style={{ height: "320px" }}
          />
        </p>

        <div className="buttonActions gap-3 flex mt-3 justify-end">
          <Button
            icon="pi pi-times"
            label="Clear"
            outlined
            className="w-[10rem]"
          />
          <Button icon="pi pi-save" label="Save Lead" className="w-[10rem]" />
        </div>
      </div>
    </div>
  );
};

export default AddNewLeads;
