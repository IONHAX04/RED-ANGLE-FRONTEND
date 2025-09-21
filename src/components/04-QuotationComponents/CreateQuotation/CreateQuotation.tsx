import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface Package {
  id: number;
  serviceName: string;
  description: string;
  quantity: string;
  price: string;
}

const CreateQuotation: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [form, setForm] = useState<Package>({
    id: Date.now(),
    serviceName: "",
    description: "",
    quantity: "",
    price: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Package
  ) => {
    setForm({
      ...form,
      [field]:
        field === "quantity" || field === "price"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleAdd = () => {
    if (!form.serviceName || !form.description) return;
    setPackages([...packages, { ...form, id: Date.now() }]);
    setForm({
      id: Date.now(),
      serviceName: "",
      description: "",
      quantity: "",
      price: "",
    });
  };

  const handleDelete = (id: number) => {
    setPackages(packages.filter((pkg) => pkg.id !== id));
  };

  const handleEdit = (pkg: Package) => {
    setForm(pkg);
    setPackages(packages.filter((p) => p.id !== pkg.id)); // remove temporarily
  };

  const handleCreatePackage = () => {
    console.log("Final Packages:", packages);
    alert("Packages created! Check console.");
  };

  return (
    <div className="p-3">
      {/* Add New Package */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Create Quotation</h2>
        <Button
          label="Add Another Package"
          icon="pi pi-plus"
          onClick={handleAdd}
        />
      </div>

      {/* Input Row */}
      <div className="flex gap-3 mb-4">
        <InputText
          placeholder="Service Name"
          className="flex-1"
          value={form.serviceName}
          onChange={(e) => handleChange(e, "serviceName")}
        />
        <InputText
          placeholder="Description"
          className="flex-1"
          value={form.description}
          onChange={(e) => handleChange(e, "description")}
        />
        <InputText
          placeholder="Quantity"
          className="flex-1"
          type="number"
          value={form.quantity}
          onChange={(e) => handleChange(e, "quantity")}
        />
        <InputText
          placeholder="Price"
          className="flex-1"
          type="number"
          value={form.price}
          onChange={(e) => handleChange(e, "price")}
        />
      </div>

      {/* DataTable */}
      <DataTable
        value={packages}
        paginator
        showGridlines
        scrollable
        rows={5}
        className="shadow-md rounded-lg"
      >
        <Column field="serviceName" header="Service Name" />
        <Column field="description" header="Description" />
        <Column field="quantity" header="Qty" />
        <Column field="price" header="Price" />
        <Column
          header="Actions"
          body={(rowData: Package) => (
            <div className="flex gap-2">
              <Button
                icon="pi pi-pencil"
                rounded
                text
                severity="info"
                onClick={() => handleEdit(rowData)}
              />
              <Button
                icon="pi pi-trash"
                rounded
                severity="danger"
                onClick={() => handleDelete(rowData.id)}
              />
            </div>
          )}
        />
      </DataTable>

      {/* Bottom Button */}
      <div className="flex justify-end mt-6">
        <Button
          label="Create Package"
          icon="pi pi-check"
          severity="success"
          onClick={handleCreatePackage}
        />
      </div>
    </div>
  );
};

export default CreateQuotation;
