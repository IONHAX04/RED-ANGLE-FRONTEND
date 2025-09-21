import React, { useState } from "react";
import SubHeader from "../../components/Header/SubHeader/SubHeader";
import { Toolbar } from "primereact/toolbar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import RequestPermission from "../../components/13-LeaveRequestRaise/RequestPermission";
import RequestLeave from "../../components/13-LeaveRequestRaise/RequestLeave";

const LeaveRequest: React.FC = () => {
  const [requestPermission, setRequestPermission] = useState<boolean>(false);
  const [requestLeave, setRequestLeave] = useState<boolean>(false);

  const rightToolbarTemplate = () => (
    <div className="flex gap-2">
      <Button
        label="Request Permission"
        icon="pi pi-clock"
        className="p-button-outlined p-button-sm"
        onClick={() => setRequestPermission(true)}
      />
      <Button
        label="Request Leave"
        icon="pi pi-calendar"
        className="p-button-sm"
        onClick={() => setRequestLeave(true)}
      />
    </div>
  );

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
        <Toolbar right={rightToolbarTemplate} />

        <DataTable showGridlines scrollable className="mt-3">
          <Column header="S.No" />
          <Column header="Date" />
          <Column header="Details" />
          <Column header="Type" />
          <Column header="From Time" />
          <Column header="To Time" />
          <Column header="Status" />
        </DataTable>
      </div>

      <Sidebar
        visible={requestPermission}
        position="right"
        style={{ width: "50vw" }}
        header="Request Permission"
        onHide={() => setRequestPermission(false)}
      >
        <RequestPermission />
      </Sidebar>

      <Sidebar
        visible={requestLeave}
        position="right"
        style={{ width: "50vw" }}
        header="Request Leave"
        onHide={() => setRequestLeave(false)}
      >
        <RequestLeave />
      </Sidebar>
    </div>
  );
};

export default LeaveRequest;
