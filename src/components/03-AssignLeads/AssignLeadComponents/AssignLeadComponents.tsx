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
      <h2 className="text-lg font-semibold mb-4">Assign Employees</h2>

      <DataTable
        value={employees}
        dataKey="id"
        selection={selectedEmployees}
        onSelectionChange={(e) => setSelectedEmployees(e.value as Employee[])}
        selectionMode="multiple"
        paginator
        rows={5}
        className="mb-4"
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column
          header="S.No"
          body={(_, { rowIndex }) => rowIndex + 1}
          style={{ width: "4rem" }}
        />
        <Column field="firstName" header="First Name" />
        <Column field="lastName" header="Last Name" />
        <Column field="email" header="Email" />
        <Column field="mobile" header="Mobile" />
        <Column field="city" header="City" />
        <Column field="state" header="State" />
        <Column field="country" header="Country" />
        <Column field="workLocation" header="Work Location" />
        <Column field="salesType" header="Sales Type" />
        <Column field="availability" header="Availability" />
        <Column field="experience" header="Experience" />
        <Column
          field="skills"
          header="Skills"
          body={(rowData) => rowData.skills?.join(", ")}
        />
      </DataTable>

      <Button
        label="Assign"
        icon="pi pi-check"
        severity="success"
        onClick={handleAssign}
        disabled={employees.length === 0}
      />
    </div>
  );
};

export default AssignLeadComponents;
