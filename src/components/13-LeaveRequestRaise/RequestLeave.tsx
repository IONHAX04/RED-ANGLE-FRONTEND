import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { addLeaveRequest, updateLeaveRequest } from "./RequestLeave.function";

const RequestLeave: React.FC<{ initialData?: any; onSuccess?: () => void }> = ({
  initialData,
  onSuccess,
}) => {
  const [leaveType, setLeaveType] = useState<string | null>(
    initialData?.leaveType || null
  );
  const [fromDate, setFromDate] = useState<Date | null>(
    initialData?.fromDate || null
  );
  const [toDate, setToDate] = useState<Date | null>(
    initialData?.toDate || null
  );
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const toast = useRef<Toast>(null);
  const isEditMode = !!initialData;

  const leaveOptions = [
    { label: "Sick Leave", value: "sick" },
    { label: "Casual Leave", value: "casual" },
    { label: "Earned Leave", value: "earned" },
    { label: "Work From Home", value: "wfh" },
  ];

  const validateForm = () => {
    if (!leaveType || !fromDate || !toDate) {
      toast.current?.show({
        severity: "warn",
        summary: "Validation",
        detail: "Leave type and dates are required",
      });
      return false;
    }
    return true;
  };

  // 👉 Clear form after successful save
  const handleClear = () => {
    setLeaveType(null);
    setFromDate(null);
    setToDate(null);
    setDescription("");
  };

  const handleSave = async () => {
    try {
      if (!validateForm()) return;

      const payload = {
        type: "leave",
        leaveType,
        fromDate,
        toDate,
        description,
        employeeId: 1, // TODO: get from logged-in user
      };

      let result;
      if (isEditMode) {
        result = await updateLeaveRequest(initialData.id, payload);
      } else {
        result = await addLeaveRequest(payload);
      }

      if (result.success) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: isEditMode
            ? "Leave updated successfully!"
            : "Leave requested successfully!",
        });

        if (!isEditMode) {
          handleClear(); // 👈 reset form if it’s a new leave request
        }

        if (onSuccess) {
          setTimeout(() => onSuccess(), 500);
        }
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: result.message || "Failed to save leave request",
        });
      }
    } catch (error: any) {
      console.error("Error saving leave request:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.message || "Failed to save leave request",
      });
    }
  };

  return (
    <div>
      <Toast ref={toast} />

      <p className="underline font-semibold">
        Plan ahead for full / partial day offs
      </p>

      <div className="flex mt-2">
        <div className="flex-1">
          <p>Leave Type</p>
          <Dropdown
            value={leaveType}
            options={leaveOptions}
            onChange={(e) => setLeaveType(e.value)}
            className="w-full"
            placeholder="Select leave type"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-3">
        <div className="flex-1">
          <p>From Date</p>
          <Calendar
            value={fromDate}
            onChange={(e) => setFromDate(e.value as Date)}
            className="w-full"
            showIcon
          />
        </div>
        <div className="flex-1">
          <p>To Date</p>
          <Calendar
            value={toDate}
            onChange={(e) => setToDate(e.value as Date)}
            className="w-full"
            showIcon
          />
        </div>
      </div>

      <div className="mt-3">
        <p>Reason Description</p>
        <InputTextarea
          autoResize
          rows={4}
          className="w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex justify-end mt-3">
        <Button label="Save" icon="pi pi-check" onClick={handleSave} />
      </div>
    </div>
  );
};

export default RequestLeave;
