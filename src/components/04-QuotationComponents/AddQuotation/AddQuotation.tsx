import React, { useEffect, useState, useRef } from "react";
import { Toolbar } from "primereact/toolbar";
import { DataTable, type DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { Toast } from "primereact/toast";
import SubHeader from "../../Header/SubHeader/SubHeader";
import AssignLeadComponents from "../../03-AssignLeads/AssignLeadComponents/AssignLeadComponents";
import CreateQuotation from "../CreateQuotation/CreateQuotation";

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

  const handleAssignEmployees = (employees: any[]) => {
    if (!leadDetails) return;

    // ✅ Update lead status
    const updatedLead = { ...leadDetails, status: "Assigned" };

    // ✅ Save in viewLeads
    const existing = JSON.parse(localStorage.getItem("viewLeads") || "[]");
    existing.push({
      lead: updatedLead,
      employees,
    });
    localStorage.setItem("viewLeads", JSON.stringify(existing));

    // ✅ Update leads array in localStorage
    const leads = JSON.parse(localStorage.getItem("leads") || "[]");
    const updatedLeads = leads.map((l: any) =>
      l.email === leadDetails.email ? { ...l, status: "Assigned" } : l
    );
    localStorage.setItem("leads", JSON.stringify(updatedLeads));

    // ✅ UI update
    setCustomers(
      updatedLeads.map((l: any, i: number) => ({ ...l, id: i + 1 }))
    );
    setAssignSidebar(false);
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Leads assigned",
      life: 3000,
    });
  };

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

  return (
    <div>
      <div>
        <Toast ref={toast} />
        <SubHeader
          title="Quotation"
          subtitle={new Date().toLocaleDateString()}
        />
        <div className="p-4">
          <Toolbar right={rightToolbarTemplate} />
          <DataTable
            value={customers}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            filters={filters}
            onFilter={(e) => setFilters(e.filters)}
            selection={selectedCustomers}
            onSelectionChange={(e) =>
              setSelectedCustomers(e.value as Customer[])
            }
            selectionMode="multiple"
            dataKey="id"
            showGridlines
            scrollable
            className="mt-3 p-datatable-sm"
            emptyMessage="No leads found."
          >
            <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
            <Column
              header="S.No"
              body={(_, { rowIndex }) => rowIndex + 1}
              style={{ minWidth: "4rem" }}
            />
            <Column
              header="Lead Details"
              body={(row: Customer) => (
                <div>
                  <div className="font-bold">
                    {row.firstName} {row.lastName}
                  </div>
                  <div className="text-sm text-gray-600">
                    {row.eventType} - {row.city}, {row.state}
                  </div>
                </div>
              )}
              style={{ minWidth: "12rem" }}
            />
            <Column field="email" header="Email" />
            <Column field="mobile" header="Mobile" />
            <Column field="budget" header="Budget" />
            <Column field="leadSource" header="Lead Source" />
            <Column field="status" header="Status" />
          </DataTable>

          <Sidebar
            visible={assignSidebar}
            position="right"
            header="Assign Employees"
            onHide={() => setAssignSidebar(false)}
            style={{ width: "80vw" }}
          >
            {leadDetails && (
              <CreateQuotation
                lead={leadDetails}
                onAssign={handleAssignEmployees}
              />
            )}
          </Sidebar>
        </div>
      </div>
    </div>
  );
};

export default AddQuotation;
