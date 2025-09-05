import React from "react";
import { Button } from 'primereact/button';


const Dashboard: React.FC = () => {
  return (
    <div>
      <Button label="Primary" />
      <Button label="Secondary" severity="secondary" />
      <Button label="Success" severity="success" />
      <Button label="Info" severity="info" />
      <Button label="Warning" severity="warning" />
      <Button label="Help" severity="help" />
      <Button label="Danger" severity="danger" />
    </div>
  );
};

export default Dashboard;
