import React, { useEffect, useState, useRef } from "react";
import { Toolbar } from "primereact/toolbar";
import { DataTable, type DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { Toast } from "primereact/toast";
import SubHeader from "../../Header/SubHeader/SubHeader";
// import AssignLeadComponents from "../../03-AssignLeads/AssignLeadComponents/AssignLeadComponents";
import CreateQuotation from "../CreateQuotation/CreateQuotation";
import axios from "axios";

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  eventType: string;
  leadSource: string;
  budget?: number | string;
  notes?: string;
  status?: string;
  country: string;
  doorNo: string;
  street: string;
  city: string;
  state: string;
}

const AddQuotation: React.FC = () => {
  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
  const [assignSidebar, setAssignSidebar] = useState(false);
  const [leadDetails, setLeadDetails] = useState<Customer | null>(null);
  console.log('leadDetails', leadDetails)
  const toast = useRef<Toast>(null);

  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    leadSource: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("leads");
    if (storedData) {
      try {
        const parsed: Customer[] = JSON.parse(storedData);
        const updated = parsed.map((lead, index) => ({
          ...lead,
          id: index + 1,
          status: lead.status || "New",
        }));
        setCustomers(updated);
      } catch (err) {
        console.error("Error parsing leads:", err);
      }
    }
  }, []);

  const rightToolbarTemplate = () => {
    const selectionCount = selectedCustomers.length;
    return (
      <div className="flex gap-2">
        <Button
          label="Add"
          icon="pi pi-plus"
          severity="success"
          disabled={selectionCount !== 1}
          onClick={() => {
            if (selectionCount === 1) {
              setLeadDetails(selectedCustomers[0]);
              setAssignSidebar(true);
            }
          }}
        />
      </div>
    );
  };

  const nameTemplate = (row: Customer) => (
    <div>
      <div className="font-bold">
        {row.firstName} {row.lastName}
      </div>
      <div className="text-sm text-gray-600 line-clamp-1">
        {row.eventType}
        {/* {row.doorNo}, {row.street}, {row.city}, {row.state},{" "} */}
        {/* {row.country} */}
      </div>
    </div>
  );

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/leads/getAll"
        );
        if (res.data.success) {
          // Map API data to Customer interface
          const data = res.data.data.map((lead: any) => ({
            id: lead.id,
            firstName: lead.full_name.split(" ")[0] || "",
            lastName: lead.full_name.split(" ").slice(1).join(" ") || "",
            email: lead.email,
            mobile: lead.phone_number,
            eventType: lead.wedding_type,
            leadSource: lead.lead_source || "Other",
            budget: lead.package || undefined,
            notes: lead.notes || "",
            status: lead.status || "New",
            country: lead.country || "",
            doorNo: lead.door_no || "",
            street: lead.street || "",
            city: lead.city || "",
            state: lead.state || "",
          }));
          setCustomers(data);
          console.log("data", data);
        }
      } catch (err) {
        console.error("Error fetching leads:", err);
      }
    };

    fetchLeads();
  }, []);

  return (
    <div>
      <div>
        <Toast ref={toast} />
        <SubHeader
          title="Quotation"
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
            dataKey="id"
            scrollable
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            filters={filters}
            onFilter={(e) => setFilters(e.filters)}
            selection={selectedCustomers}
            onSelectionChange={(e) =>
              setSelectedCustomers(e.value as Customer[])
            }
            selectionMode="multiple"
            showGridlines
            className="mt-3 p-datatable-sm"
            emptyMessage="No leads found."
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} leads"
          >
            <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
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
            <Column
              field="budget"
              header="Budget"
              style={{ minWidth: "7rem" }}
            />
            <Column
              field="leadSource"
              header="Lead Source"
              filterField="leadSource"
              style={{ minWidth: "12rem" }}
            />
          </DataTable>

          <Sidebar
            visible={assignSidebar}
            position="right"
            header="Quotation"
            onHide={() => setAssignSidebar(false)}
            style={{ width: "80vw" }}
          >
            <CreateQuotation
            // lead={leadDetails}
            // onAssign={handleAssignEmployees}
            />
          </Sidebar>
        </div>
      </div>
    </div>
  );
};

export default AddQuotation;
