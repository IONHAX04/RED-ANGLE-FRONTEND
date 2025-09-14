import React, { useEffect, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";

import type {
  DataTableFilterMeta,
  DataTableFilterMetaData,
} from "primereact/datatable";
import { useNavigate } from "react-router-dom";
import AddNewEmployees from "../../components/10-EmployeesComponents/AddNewEmployees/AddNewEmployees";
import SubHeader from "../../components/Header/SubHeader/SubHeader";
import { CalendarCheck, Eye, Plus, Trash2 } from "lucide-react";
import Attendance from "../../components/10-EmployeesComponents/Attendance/Attendance";

interface Employee {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  secondaryMobile?: string;
  doorNo?: string;
  street?: string;
  city?: string;
  district?: string;
  state?: string;
  country?: string;
  workLocation?: string;
  salesType?: string;
  availability?: string;
  experience?: number;
  skills?: string[];
  portfolio?: string;
  reason?: string;
  eventType?: string;
  leadSource?: string;
  budget?: string | number;
  eventDate?: Date | null;
  advance?: string;
  paymentDate?: Date | null;
  notes?: string;
}

const Employees: React.FC = () => {
  const navigate = useNavigate();
  console.log("navigate", navigate);
  const [selectedCustomers, setSelectedCustomers] = useState<Employee[]>([]);
  const [addEmployeeSidebar, setAddEmployeeSidebar] = useState<boolean>(false);
  const [employeeAttendanceSidebar, setEmployeeAttendanceSidebar] =
    useState<boolean>(false);
  const [viewDetailsSidebar, setViewDetailsSidebar] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);

  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    leadSource: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const onGlobalFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilters((prev) => ({
      ...prev,
      global: { ...prev.global, value },
    }));
  };

  const onStatusFilterChange = (value: string | null) => {
    setFilters((prev) => ({
      ...prev,
      status: { ...prev.status, value },
    }));
  };

  const onLeadSourceFilterChange = (value: string | null) => {
    setFilters((prev) => ({
      ...prev,
      leadSource: { ...prev.leadSource, value },
    }));
  };

  const selectionCount = selectedCustomers.length;
  const isAddDisabled = selectionCount > 0;
  const isSingleSelected = selectionCount === 1;
  const isMultiSelected = selectionCount > 1;
  console.log("isMultiSelected", isMultiSelected);

  const rightToolbarTemplate = () => {
    return (
      <div className="flex gap-2">
        <Button
          label="Add"
          icon={<Plus className="" />}
          severity="success"
          className="gap-2"
          disabled={isAddDisabled}
          onClick={() => setAddEmployeeSidebar(true)}
        />
        <Button
          label="Details"
          icon={<Eye className="" />}
          severity="info"
          className="gap-2"
          disabled={!isSingleSelected}
          onClick={() => {
            if (isSingleSelected) {
              setEditEmployee(selectedCustomers[0]);
              setViewDetailsSidebar(true);
            }
          }}
        />
        <Button
          className="gap-2"
          label="Attendance"
          icon={<CalendarCheck className="" />}
          severity="warning"
          disabled={!isSingleSelected}
          onClick={() => setEmployeeAttendanceSidebar(true)}
        />
        <Button
          label="Delete"
          className="gap-2"
          icon={<Trash2 className="" />}
          severity="danger"
          disabled={selectionCount === 0}
        />
      </div>
    );
  };

  const header = (
    <div className="flex gap-3">
      <div className="flex-1">
        <IconField iconPosition="left" className="w-full">
          <InputIcon className="pi pi-search" />
          <InputText
            type="search"
            value={(filters["global"] as any)?.value || ""}
            onChange={onGlobalFilterChange}
            placeholder="Global Search"
          />
        </IconField>
      </div>

      <div className="flex-1">
        <Dropdown
          value={(filters["status"] as DataTableFilterMetaData)?.value || null}
          options={[
            "New",
            "Contacted",
            "Booked",
            "Lost",
            "Awaiting Reply",
            "Proposal sent",
          ]}
          placeholder="All Status"
          className="w-full"
          onChange={(e) => onStatusFilterChange(e.value)}
          showClear
        />
      </div>

      <div className="flex-1">
        <Dropdown
          value={
            (filters["leadSource"] as DataTableFilterMetaData)?.value || null
          }
          options={[
            { label: "Instagram", value: "Instagram" },
            { label: "LinkedIn", value: "Linkedin" },
            { label: "Facebook", value: "Facebook" },
            { label: "Referral", value: "Referral" },
            { label: "Other", value: "other" },
          ]}
          optionLabel="label"
          optionValue="value"
          className="w-full"
          placeholder="All Sources"
          onChange={(e) => onLeadSourceFilterChange(e.value)}
          showClear
        />
      </div>

      <div className="flex-1">
        <Calendar placeholder="Booking Date" className="w-full" />
      </div>
    </div>
  );

  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const storedEmployees = JSON.parse(
      localStorage.getItem("employees") || "[]"
    );
    setEmployees(storedEmployees);
  }, [addEmployeeSidebar]); // refresh when sidebar closes after adding

  return (
    <div>
      <SubHeader
        title="Employee Details"
        subtitle={new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      />
      <div className="p-4">
        <Toolbar right={rightToolbarTemplate} />
        <DataTable
          value={employees}
          paginator
          scrollable
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          header={header}
          filters={filters}
          onFilter={(e) => setFilters(e.filters)}
          selection={selectedCustomers}
          onSelectionChange={(e) => setSelectedCustomers(e.value as Employee[])}
          selectionMode="multiple"
          dataKey="email"
          showGridlines
          className="mt-3 p-datatable-sm"
          emptyMessage="No employees found."
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} employees"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>

          <Column
            header="S.No"
            body={(_, { rowIndex }) => rowIndex + 1}
            style={{ minWidth: "4rem" }}
          />
          <Column
            header="Employee Name"
            body={(row: Employee) => `${row.firstName} ${row.lastName}`}
            style={{ minWidth: "18rem" }}
          />
          <Column
            field="email"
            header="Email"
            sortable
            style={{ minWidth: "12rem" }}
          />
          <Column
            field="mobile"
            header="Mobile"
            style={{ minWidth: "12rem" }}
          />
          <Column
            field="salesType"
            header="Sales Type"
            style={{ minWidth: "12rem", textTransform: "capitalize" }}
          />
        </DataTable>
      </div>
      <Sidebar
        visible={addEmployeeSidebar}
        position="right"
        header="Add New Employee Details"
        style={{ width: "80vw" }}
        onHide={() => setAddEmployeeSidebar(false)}
      >
        <AddNewEmployees onSuccess={() => setAddEmployeeSidebar(false)} />
      </Sidebar>
      <Sidebar
        visible={viewDetailsSidebar}
        position="right"
        header="Update Employee Details"
        style={{ width: "80vw" }}
        onHide={() => setViewDetailsSidebar(false)}
      >
        <AddNewEmployees
          initialData={editEmployee}
          onSuccess={() => setViewDetailsSidebar(false)}
        />
      </Sidebar>

      <Sidebar
        visible={employeeAttendanceSidebar}
        position="right"
        header="Employee Attendance"
        style={{ width: "80vw" }}
        onHide={() => setEmployeeAttendanceSidebar(false)}
      >
        <Attendance />
      </Sidebar>
    </div>
  );
};

export default Employees;
