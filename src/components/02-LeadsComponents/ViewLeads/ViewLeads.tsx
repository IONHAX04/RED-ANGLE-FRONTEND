import React, { useState } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Tag } from "primereact/tag";

import type { DataTableFilterMeta } from "primereact/datatable";

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
}

const ViewLeads: React.FC = () => {
  const [customers] = useState<Customer[]>([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      mobile: "999-111-2222",
      eventType: "wedding",
      leadSource: "instagram",
      budget: 50000,
      notes: "Looking for candid shots",
      status: "new",
      country: { name: "India", code: "in" },
      representative: { name: "Amy Elsner", image: "amyelsner.png" },
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      mobile: "888-222-3333",
      eventType: "birthday",
      leadSource: "referral",
      budget: 20000,
      notes: "Outdoor photoshoot",
      status: "qualified",
      country: { name: "USA", code: "us" },
      representative: { name: "Anna Fali", image: "annafali.png" },
    },
  ]);

  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    firstName: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    email: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  });

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const getSeverity = (status: string) => {
    switch (status) {
      case "unqualified":
        return "danger";
      case "qualified":
        return "success";
      case "new":
        return "info";
      case "negotiation":
        return "warning";
      default:
        return null;
    }
  };

  const onGlobalFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const _filters = { ...filters };
    (_filters["global"] as any).value = value;
    setFilters(_filters);
  };

  const header = (
    <IconField iconPosition="left">
      <InputIcon className="pi pi-search" />
      <InputText
        type="search"
        value={(filters["global"] as any)?.value || ""}
        onChange={onGlobalFilterChange}
        placeholder="Global Search"
      />
    </IconField>
  );

  return (
    <div className="p-4">
      <DataTable
        value={customers}
        paginator
        scrollable
        rows={5}
        header={header}
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        selection={selectedCustomer}
        onSelectionChange={(e) => setSelectedCustomer(e.value as Customer)}
        selectionMode="single"
        dataKey="id"
        showGridlines
        className="p-datatable-sm"
        emptyMessage="No leads found."
      >
        <Column
          header="S.No"
          body={(_, { rowIndex }) => rowIndex + 1}
          style={{ minWidth: "4rem" }}
        />
        <Column
          field="firstName"
          header="First Name"
          sortable
          filter
          style={{ minWidth: "14rem" }}
        />
        <Column
          field="lastName"
          header="Last Name"
          sortable
          style={{ minWidth: "14rem" }}
        />
        <Column
          field="email"
          header="Email"
          sortable
          filter
          style={{ minWidth: "12rem" }}
        />
        <Column field="mobile" header="Mobile" style={{ minWidth: "12rem" }} />
        <Column field="budget" header="Budget" style={{ minWidth: "7rem" }} />
        <Column
          field="eventType"
          header="Event Type"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="leadSource"
          header="Lead Source"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="status"
          header="Status"
          style={{ minWidth: "8rem" }}
          body={(row) => (
            <Tag value={row.status} severity={getSeverity(row.status)} />
          )}
        />
      </DataTable>
    </div>
  );
};

export default ViewLeads;
