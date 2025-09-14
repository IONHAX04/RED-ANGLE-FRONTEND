import React, { useEffect, useState } from "react";
import SubHeader from "../Header/SubHeader/SubHeader";
import { Toolbar } from "primereact/toolbar";
import {
  DataTable,
  type DataTableFilterMeta,
  type DataTableFilterMetaData,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Sidebar } from "primereact/sidebar";
import LeadDetails from "../02-LeadsComponents/LeadDetails/LeadDetails";

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
  country: string;
  doorNo: string;
  street: string;
  city: string;
  state: string;
}

const AssignLeads: React.FC = () => {
  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
  const navigate = useNavigate();
  const [viewDetailsSidebar, setViewDetailsSidebar] = useState(false);
  const [leadDetails, setLeadDetails] = useState<Customer | null>(null);

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

  // Toolbar buttons
  const rightToolbarTemplate = () => {
    return (
      <div className="flex gap-2">
        <Button
          label="Add"
          icon="pi pi-plus"
          severity="success"
          disabled={isAddDisabled}
          onClick={() => navigate("/leads/add")}
        />
        <Button
          label="Details"
          icon="pi pi-eye"
          severity="info"
          disabled={!isSingleSelected}
          onClick={() => {
            if (isSingleSelected) {
              setLeadDetails(selectedCustomers[0]);
              setViewDetailsSidebar(true);
            }
          }}
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

  // Custom template for Name + Event + Address
  const nameTemplate = (row: Customer) => {
    return (
      <div>
        <div className="font-bold">
          {row.firstName} {row.lastName}
        </div>
        <div className="text-sm text-gray-600 line-clamp-1">
          {row.eventType} -{row.doorNo}, {row.street}, {row.city}, {row.state},{" "}
          {row.country}
        </div>
      </div>
    );
  };

  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("leads");
    if (storedData) {
      try {
        const parsed: Customer[] = JSON.parse(storedData);

        // 🔥 Add unique id based on index
        const updated = parsed.map((lead, index) => ({
          ...lead,
          id: index + 1, // make S.No act as unique id
          status: lead.status || "New",
        }));

        setCustomers(updated);
      } catch (err) {
        console.error("Error parsing leads from localStorage:", err);
        setCustomers([]);
      }
    } else {
      setCustomers([]);
    }
  }, []);

  return (
    <div>
      <SubHeader
        title="Assign Leads "
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
          <Column
            field="mobile"
            header="Mobile"
            style={{ minWidth: "12rem" }}
          />
          <Column field="budget" header="Budget" style={{ minWidth: "7rem" }} />
          <Column
            field="leadSource"
            header="Lead Source"
            filterField="leadSource"
            style={{ minWidth: "12rem" }}
          />
        </DataTable>
        <Sidebar
          visible={viewDetailsSidebar}
          position="right"
          onHide={() => setViewDetailsSidebar(false)}
          style={{ width: "80vw" }}
        >
          {leadDetails && <LeadDetails data={leadDetails} />}
        </Sidebar>

        {/* <Sidebar
          visible={updateLeadDetailsSidebar}
          position="right"
          onHide={() => setUpdateLeadDetailsSidebar(false)}
          style={{ width: "80vw" }}
        >
          {leadDetails && <UpdateLeads data={leadDetails} />}
        </Sidebar> */}
      </div>
    </div>
  );
};

export default AssignLeads;
