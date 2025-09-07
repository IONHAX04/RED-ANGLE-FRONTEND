import React, { useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";

import type {
  DataTableFilterMeta,
  DataTableFilterMetaData,
} from "primereact/datatable";

interface Address {
  doorNo: string;
  street: string;
  city: string;
  state: string;
  country: string;
}

interface Country {
  name: string;
  code: string;
}

interface Representative {
  name: string;
  image: string;
}

interface Customer {
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
  country: Country;
  representative: Representative;
  address: Address;
}

const ViewLeads: React.FC = () => {
  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);

  const [customers] = useState<Customer[]>([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      mobile: "999-111-2222",
      eventType: "Wedding",
      leadSource: "instagram",
      budget: 50000,
      notes: "Looking for candid shots",
      status: "New",
      country: { name: "India", code: "in" },
      representative: { name: "Amy Elsner", image: "amyelsner.png" },
      address: {
        doorNo: "12A",
        street: "MG Road",
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
      },
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      mobile: "888-222-3333",
      eventType: "Birthday",
      leadSource: "Referral",
      budget: 20000,
      notes: "Outdoor photoshoot",
      status: "Contacted",
      country: { name: "USA", code: "us" },
      representative: { name: "Anna Fali", image: "annafali.png" },
      address: {
        doorNo: "45",
        street: "Main Street",
        city: "New York",
        state: "NY",
        country: "USA",
      },
    },
    {
      id: 3,
      firstName: "Arun",
      lastName: "Kumar",
      email: "arun@example.com",
      mobile: "777-555-1212",
      eventType: "Engagement",
      leadSource: "Facebook",
      budget: 30000,
      notes: "Indoor studio setup",
      status: "Proposal sent",
      country: { name: "India", code: "in" },
      representative: { name: "John Doe", image: "johndoe.png" },
      address: {
        doorNo: "23B",
        street: "Anna Nagar",
        city: "Chennai",
        state: "Tamil Nadu",
        country: "India",
      },
    },
    {
      id: 4,
      firstName: "Maria",
      lastName: "Gonzalez",
      email: "maria@example.com",
      mobile: "666-444-9999",
      eventType: "Corporate Event",
      leadSource: "Linkedin",
      budget: 80000,
      notes: "Full-day coverage",
      status: "Booked",
      country: { name: "Spain", code: "es" },
      representative: { name: "Anna Fali", image: "annafali.png" },
      address: {
        doorNo: "101",
        street: "Gran Via",
        city: "Madrid",
        state: "Madrid",
        country: "Spain",
      },
    },
  ]);

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

  // --- selection logic ---
  const selectionCount = selectedCustomers.length;
  const isAddDisabled = selectionCount > 0;
  const isSingleSelected = selectionCount === 1;
  const isMultiSelected = selectionCount > 1;
  console.log('isMultiSelected', isMultiSelected)

  // Toolbar buttons
  const rightToolbarTemplate = () => {
    return (
      <div className="flex gap-2">
        <Button
          label="Add"
          icon="pi pi-plus"
          severity="success"
          disabled={isAddDisabled}
        />
        <Button
          label="Edit"
          icon="pi pi-pencil"
          severity="info"
          disabled={!isSingleSelected}
        />
        <Button
          label="Update"
          icon="pi pi-refresh"
          severity="warning"
          disabled={!isSingleSelected}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          disabled={selectionCount === 0}
        />
      </div>
    );
  };

  const header = (
    <div className="flex gap-3 flex-wrap">
      <IconField iconPosition="left" className="flex-1 min-w-[200px]">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          value={(filters["global"] as any)?.value || ""}
          onChange={onGlobalFilterChange}
          placeholder="Global Search"
        />
      </IconField>

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
        className="flex-1 min-w-[200px]"
        onChange={(e) => onStatusFilterChange(e.value)}
        showClear
      />

      <Dropdown
        value={
          (filters["leadSource"] as DataTableFilterMetaData)?.value || null
        }
        options={[
          { label: "Instagram", value: "instagram" },
          { label: "LinkedIn", value: "Linkedin" },
          { label: "Facebook", value: "Facebook" },
          { label: "Referral", value: "Referral" },
          { label: "Other", value: "other" },
        ]}
        optionLabel="label"
        optionValue="value"
        placeholder="All Sources"
        className="flex-1 min-w-[200px]"
        onChange={(e) => onLeadSourceFilterChange(e.value)}
        showClear
      />

      <Calendar placeholder="Booking Date" className="flex-1 min-w-[200px]" />
    </div>
  );

  // Custom template for Name + Event + Address
  const nameTemplate = (row: Customer) => {
    return (
      <div>
        <div className="font-bold">
          {row.firstName} {row.lastName}
        </div>
        <div className="text-sm text-gray-600">{row.eventType}</div>
        <div className="text-xs text-gray-500">
          {row.address.doorNo}, {row.address.street}, {row.address.city},{" "}
          {row.address.state}, {row.address.country}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <Toolbar right={rightToolbarTemplate} />
      <DataTable
        value={customers}
        paginator
        scrollable
        rows={5}
        rowsPerPageOptions={[5, 10, 25]}
        header={header}
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        selection={selectedCustomers}
        onSelectionChange={(e) => setSelectedCustomers(e.value as Customer[])}
        selectionMode="multiple"
        dataKey="id"
        showGridlines
        className="mt-3 p-datatable-sm"
        emptyMessage="No leads found."
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} leads"
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
          header="Lead Details"
          body={nameTemplate}
          style={{ minWidth: "18rem" }}
        />
        <Column
          field="email"
          header="Email"
          sortable
          style={{ minWidth: "12rem" }}
        />
        <Column field="mobile" header="Mobile" style={{ minWidth: "12rem" }} />
        <Column field="budget" header="Budget" style={{ minWidth: "7rem" }} />
        <Column
          field="leadSource"
          header="Lead Source"
          filterField="leadSource"
          style={{ minWidth: "12rem" }}
        />

        <Column
          field="status"
          header="Status"
          filterField="status"
          style={{ minWidth: "10rem" }}
          body={(row) => (
            <Tag value={row.status} severity={getSeverity(row.status)} />
          )}
        />
      </DataTable>
    </div>
  );
};

// Helper for severity
const getSeverity = (status: string) => {
  switch (status.toLowerCase()) {
    case "lost":
      return "danger";
    case "booked":
      return "success";
    case "new":
      return "info";
    case "awaiting reply":
      return "warning";
    case "contacted":
      return "secondary";
    case "proposal sent":
      return "info";
    default:
      return null;
  }
};

export default ViewLeads;
