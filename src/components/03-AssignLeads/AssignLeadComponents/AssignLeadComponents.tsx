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

const AssignLeadComponents: React.FC<{
  lead: any;
  onAssign: (employees: Employee[]) => void;
}> = ({ lead, onAssign }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("employees");
    if (stored) {
      try {
        const parsed: Employee[] = JSON.parse(stored);
        const updated = parsed.map((emp, index) => ({ ...emp, id: index + 1 }));
        setEmployees(updated);
      } catch (err) {
        console.error("Error parsing employees:", err);
      }
    }
  }, []);

  const handleAssign = () => {
    if (selectedEmployees.length === 0) {
      console.warn("⚠ No employees selected!");
      return;
    }
    onAssign(selectedEmployees);
  };

  return (
    <div className="p-4">
      <h3 className="font-bold mb-3">
        Assign employees to: {lead.firstName} {lead.lastName}
      </h3>
      <DataTable
        value={employees}
        dataKey="id"
        selection={selectedEmployees}
        onSelectionChange={(e) => setSelectedEmployees(e.value as Employee[])}
        selectionMode="multiple"
        paginator
        rows={5}
        showGridlines
        className="mb-4"
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
        <Column
          header="S.No"
          body={(_, { rowIndex }) => rowIndex + 1}
          style={{ minWidth: "3rem" }}
        />
        <Column
          field="firstName"
          header="First Name"
          style={{ minWidth: "14rem" }}
        />
        <Column
          field="lastName"
          header="Last Name"
          style={{ minWidth: "14rem" }}
        />
        <Column field="email" header="Email" style={{ minWidth: "14rem" }} />
        <Column field="mobile" header="Mobile" style={{ minWidth: "14rem" }} />
        <Column field="city" header="City" style={{ minWidth: "14rem" }} />
        <Column field="state" header="State" style={{ minWidth: "14rem" }} />
        <Column
          field="workLocation"
          header="Work Location"
          style={{ minWidth: "14rem" }}
        />
        <Column
          field="experience"
          header="Experience"
          style={{ minWidth: "14rem" }}
        />
        <Column
          field="skills"
          header="Skills"
          body={(row) => row.skills?.join(", ")}
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
