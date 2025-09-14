import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  country: string;
  workLocation: string;
  salesType: string;
  availability: string;
  experience: number;
  skills: string[];
  portfolio: string;
  reason: string;
}

const AssignLeadComponents: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("employees");
    if (stored) {
      try {
        const parsed: Employee[] = JSON.parse(stored);

        // ✅ add unique IDs
        const updated = parsed.map((emp, index) => ({
          ...emp,
          id: index + 1,
        }));

        setEmployees(updated);
      } catch (err) {
        console.error("Error parsing employees from localStorage:", err);
      }
    }
  }, []);

  const handleAssign = () => {
    if (selectedEmployees.length === 0) {
      console.warn("⚠ No employees selected!");
      return;
    }
    console.log("✅ Assigned Employees:", selectedEmployees);
  };

  return (
    <div className="p-4">

      <DataTable
        value={employees}
        dataKey="id"
        selection={selectedEmployees}
        onSelectionChange={(e) => setSelectedEmployees(e.value as Employee[])}
        selectionMode="multiple"
        paginator
        rows={5}
        className="mb-4"
        scrollable
        showGridlines
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ minWidth: "3rem" }}
        ></Column>
        <Column
          header="S.No"
          body={(_, { rowIndex }) => rowIndex + 1}
          style={{ minWidth: "4rem" }}
        />
        <Column
          field="firstName"
          header="First Name"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="lastName"
          header="Last Name"
          style={{ minWidth: "12rem" }}
        />
        <Column field="email" header="Email" style={{ minWidth: "12rem" }} />
        <Column field="mobile" header="Mobile" style={{ minWidth: "12rem" }} />
        <Column field="city" header="City" style={{ minWidth: "12rem" }} />
        <Column field="state" header="State" style={{ minWidth: "12rem" }} />
        <Column
          field="country"
          header="Country"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="workLocation"
          header="Work Location"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="salesType"
          header="Sales Type"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="availability"
          header="Availability"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="experience"
          header="Experience"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="skills"
          header="Skills"
          style={{ minWidth: "12rem" }}
          body={(rowData) => rowData.skills?.join(", ")}
        />
      </DataTable>

      <div className="flex justify-end">
        <Button
          label="Assign"
          icon="pi pi-check"
          severity="success"
          onClick={handleAssign}
          disabled={employees.length === 0}
        />
      </div>
    </div>
  );
};

export default AssignLeadComponents;
