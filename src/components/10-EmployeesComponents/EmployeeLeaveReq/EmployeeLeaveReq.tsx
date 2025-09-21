import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { getAllRequests } from "./EmployeeLeaveReq.function";
import SubHeader from "../../Header/SubHeader/SubHeader";

const EmployeeLeaveReq: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const result = await getAllRequests(); // pass userId to backend
      if (result.success) {
        setRequests(result.data);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Format ISO date/time to human readable
  const formatTime = (timeStr?: string) => {
    if (!timeStr) return "-";
    const date = new Date(timeStr);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Actions column buttons
  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="flex gap-2">
        <Button
          label="Approve"
          className="p-button-success p-button-sm"
          onClick={() => handleAction(rowData.id, "approved")}
        />
        <Button
          label="Reject"
          className="p-button-danger p-button-sm"
          onClick={() => handleAction(rowData.id, "rejected")}
        />
      </div>
    );
  };

  const handleAction = async (id: number, action: string) => {
    console.log(`Action: ${action} on request ${id}`);
    // TODO: Call backend API to approve/reject/check times
  };

  const capitalize = (text: string) => {
    if (!text) return "-";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div>
      <SubHeader
        title="Leave Request"
        subtitle={new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      />

      <div className="m-3 p-3 rounded-lg shadow-lg">
        <DataTable
          value={requests}
          loading={loading}
          showGridlines
          scrollable
          className="mt-3"
        >
          <Column
            header="S.No"
            body={(_, options) => options.rowIndex + 1}
            style={{ width: "70px" }}
          />
          <Column
            header="Date"
            body={(row) =>
              row.date
                ? new Date(row.date).toLocaleDateString()
                : row.fromDate
                ? `${new Date(row.fromDate).toLocaleDateString()} - ${new Date(
                    row.toDate
                  ).toLocaleDateString()}`
                : "-"
            }
          />
          <Column
            header="Details"
            body={(row) => row.reason || row.description || "-"}
          />
          <Column header="Type" body={(row) => capitalize(row.type)} />
          <Column header="From Time" body={(row) => formatTime(row.fromTime)} />
          <Column header="To Time" body={(row) => formatTime(row.toTime)} />
          <Column header="Status" body={(row) => capitalize(row.status)} />
          <Column header="Actions" body={actionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  );
};

export default EmployeeLeaveReq;
