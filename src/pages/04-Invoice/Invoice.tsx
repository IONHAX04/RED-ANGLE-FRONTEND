import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import axios from "axios";
import SubHeader from "../../components/Header/SubHeader/SubHeader";

interface QuotationLead {
  lead_id: number;
  full_name: string;
  email: string;
  phone_number: string;
  wedding_type: string;
  package: string;
  wedding_location: string;
  event_dates: string[];

  event_id: number;
  event_name: string;
  date_time: string;
  highlights: string;
  event_notes: string;

  payment_id: number;
  payment_type: string;
  amount: string;
  payment_date: string;
  payment_notes: string;

  quotation_package_id: number;
  service_name: string;
  description: string;
  quantity: string;
  price: string;
  quotation_created_at: string;
}

const Invoice: React.FC = () => {
  const [quotationLeads, setQuotationLeads] = useState<QuotationLead[]>([]);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    const fetchQuotationLeads = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/leads/quotation-created"
        );

        if (res.data.success) {
          setQuotationLeads(res.data.data);
        } else {
          toast.current?.show({
            severity: "warn",
            summary: "No Data",
            detail: "No quotation leads found",
            life: 3000,
          });
        }
      } catch (err) {
        console.error("Error fetching quotation leads:", err);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to fetch quotation leads",
          life: 3000,
        });
      }
    };

    fetchQuotationLeads();
  }, []);

  // Template to display human-readable event date
  const eventDateTemplate = (row: QuotationLead) => {
    const date = new Date(row.date_time);
    return date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Template to display lead name + wedding type
  const leadTemplate = (row: QuotationLead) => (
    <div>
      <div className="font-bold">{row.full_name}</div>
      <div className="text-sm text-gray-600">{row.wedding_type}</div>
    </div>
  );

  return (
    <div className="">
      <Toast ref={toast} />
      <SubHeader
        title="Invoice"
        subtitle={new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      />
      <div className="p-4">
        <DataTable
          value={quotationLeads}
          paginator
          rows={5}
          scrollable
          showGridlines
          className="shadow-md rounded-lg"
          emptyMessage="No quotation leads found."
        >
          <Column header="S.No" body={(_, { rowIndex }) => rowIndex + 1} />
          <Column
            header="Lead Details"
            body={leadTemplate}
            style={{ minWidth: "18rem" }}
          />
          <Column field="email" header="Email" style={{ minWidth: "18rem" }} />
          <Column
            field="phone_number"
            header="Mobile"
            style={{ minWidth: "18rem" }}
          />
          <Column
            field="wedding_location"
            header="Wedding Location"
            style={{ minWidth: "18rem" }}
          />
          <Column
            field="event_name"
            header="Event Name"
            style={{ minWidth: "18rem" }}
          />
          <Column
            field="date_time"
            header="Event Date"
            body={eventDateTemplate}
            style={{ minWidth: "18rem" }}
          />
          <Column
            field="amount"
            header="Amount Paid"
            style={{ minWidth: "18rem" }}
          />
          <Column
            field="service_name"
            header="Package Service"
            style={{ minWidth: "18rem" }}
          />
          <Column
            field="description"
            header="Package Description"
            style={{ minWidth: "18rem" }}
          />
          <Column field="quantity" header="Qty" style={{ minWidth: "18rem" }} />
          <Column field="price" header="Price" style={{ minWidth: "18rem" }} />
        </DataTable>
      </div>
    </div>
  );
};

export default Invoice;
