import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Dropdown } from "primereact/dropdown";
import { Chips } from "primereact/chips";
import { InputTextarea } from "primereact/inputtextarea";
import { Divider } from "primereact/divider";
import SubHeader from "../../components/Header/SubHeader/SubHeader";
import { getEmployeeById } from "./Profile.function";

const Profile: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    secondaryMobile: "",
    doorNo: "",
    street: "",
    city: "",
    district: "",
    state: "",
    country: "",
    workLocation: "",
    salesType: "",
    availability: "",
    experience: "",
    skills: [] as string[],
    portfolio: "",
    reason: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("userDetails");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);

      // Fetch employee details using id
      getEmployeeById(parsed.id).then((data: any) => {
        if (data) {
          console.log("data", data);
          setFormData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            mobile: data.mobile || "",
            secondaryMobile: data.secondaryMobile || "",
            doorNo: data.doorNo || "",
            street: data.street || "",
            city: data.city || "",
            district: data.district || "",
            state: data.state || "",
            country: data.country || "",
            workLocation: data.workLocation || "",
            salesType: data.salesType || "",
            availability: data.availability || "",
            experience: data.experience || null,
            skills: data.skills || [],
            portfolio: data.portfolio || "",
            reason: data.reason || "",
          });
        }
      });
    }
  }, []);

  return (
    <div>
      <SubHeader
        title="Profile"
        subtitle={new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      />

      <div className="p-3">
        {/* Basic Details */}
        <p className="underline uppercase font-semibold text-md">
          Basic Details
        </p>
        <div className="flex gap-3">
          <div className="flex flex-1 flex-column gap-2">
            <label>First Name</label>
            <InputText
              value={formData.firstName}
              placeholder="First Name"
              disabled
            />
          </div>
          <div className="flex flex-1 flex-column gap-2">
            <label>Last Name</label>
            <InputText
              value={formData.lastName}
              placeholder="Last Name"
              disabled
            />
          </div>
          <div className="flex-1"></div>
        </div>

        <Divider />

        {/* Communication Details */}
        <p className="mt-2 underline uppercase font-semibold text-md">
          Communication Details
        </p>
        <div className="flex gap-3">
          <div className="flex flex-1 flex-column gap-2">
            <label>Email</label>
            <InputText value={formData.email} placeholder="Email" disabled />
          </div>
          <div className="flex flex-1 flex-column gap-2">
            <label>Mobile</label>
            <InputMask
              mask="999-999-9999"
              value={formData.mobile}
              placeholder="Mobile"
              disabled
            />
          </div>
          <div className="flex flex-1 flex-column gap-2">
            <label>Secondary Mobile</label>
            <InputMask
              mask="999-999-9999"
              value={formData.secondaryMobile}
              placeholder="Secondary Mobile"
              disabled
            />
          </div>
        </div>

        <div className="flex gap-3 mt-3">
          <div className="flex flex-1 flex-column gap-2">
            <label>Door No</label>
            <InputText value={formData.doorNo} placeholder="Door No" disabled />
          </div>
          <div className="flex flex-1 flex-column gap-2">
            <label>Street</label>
            <InputText value={formData.street} placeholder="Street" disabled />
          </div>
          <div className="flex flex-1 flex-column gap-2">
            <label>City</label>
            <InputText value={formData.city} placeholder="City" disabled />
          </div>
        </div>

        <div className="flex gap-3 mt-3">
          <div className="flex flex-1 flex-column gap-2">
            <label>District</label>
            <InputText
              value={formData.district}
              placeholder="District"
              disabled
            />
          </div>
          <div className="flex flex-1 flex-column gap-2">
            <label>State</label>
            <InputText value={formData.state} placeholder="State" disabled />
          </div>
          <div className="flex flex-1 flex-column gap-2">
            <label>Country</label>
            <InputText
              value={formData.country}
              placeholder="Country"
              disabled
            />
          </div>
        </div>

        <Divider />

        {/* Professional Details */}
        <p className="mt-2 underline uppercase font-semibold text-md">
          Professional Details
        </p>
        <div className="flex gap-3">
          <div className="flex flex-1 flex-column gap-2">
            <label>Work Location</label>
            <InputText
              value={formData.workLocation}
              placeholder="Work Location"
              disabled
            />
          </div>
          <div className="flex flex-1 flex-column gap-2">
            <label>Preferred Sales Type</label>
            <Dropdown
              options={[
                { label: "In Person", value: "in_person" },
                { label: "Online", value: "online" },
                { label: "Events", value: "events" },
                { label: "Others", value: "others" },
              ]}
              value={formData.salesType}
              placeholder="Select Sales Type"
              disabled
            />
          </div>
          <div className="flex flex-1 flex-column gap-2">
            <label>Availability</label>
            <Dropdown
              options={[
                { label: "Full-Time", value: "fulltime" },
                { label: "Part-Time", value: "parttime" },
                { label: "Freelance", value: "freelance" },
              ]}
              value={formData.availability}
              placeholder="Select Availability"
              disabled
            />
          </div>
        </div>

        <div className="flex gap-3 mt-3">
          <div className="flex flex-1 flex-column gap-2">
            <label>Years of Experience</label>
            <InputText
              value={formData.experience}
              placeholder="Experience"
              disabled
            />
          </div>
          <div className="flex flex-1 flex-column gap-2">
            <label>Photography Knowledge</label>
            <Chips value={formData.skills} placeholder="Skills" disabled />
          </div>
          <div className="flex flex-1 flex-column gap-2">
            <label>Portfolio / Social Media</label>
            <InputText
              value={formData.portfolio}
              placeholder="Portfolio / Social Media"
              disabled
            />
          </div>
        </div>

        <div className="flex flex-column gap-2 mt-3">
          <label>Why do you want to join us?</label>
          <InputTextarea
            rows={3}
            value={formData.reason}
            placeholder="Reason"
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
