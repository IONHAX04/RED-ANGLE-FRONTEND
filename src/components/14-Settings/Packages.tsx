import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";

interface Package {
  id: number;
  type: string;
  ref: string;
}

const Packages: React.FC = () => {
  const [packageKey, setPackageKey] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [packages, setPackages] = useState<Package[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchPackages = async () => {
    const res = await axios.get(import.meta.env.VITE_API_URL + "/package/list");
    if (res.data.success) setPackages(res.data.data);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // Add or Update package
  const handleSubmit = async () => {
    if (editingId === null) {
      // Add new package
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/package/add",
        {
          type: packageKey,
          ref: priceRange,
        }
      );
      if (res.data.success) fetchPackages();
    } else {
      // Update existing package
      const res = await axios.put(
        import.meta.env.VITE_API_URL + `/package/update/${editingId}`,
        { type: packageKey, ref: priceRange }
      );
      if (res.data.success) fetchPackages();
      setEditingId(null);
    }

    // Reset form
    setPackageKey("");
    setPriceRange("");
  };

  const handleEdit = (pkg: Package) => {
    setEditingId(pkg.id);
    setPackageKey(pkg.type);
    setPriceRange(pkg.ref);
  };

  const handleDelete = async (id: number) => {
    const res = await axios.delete(
      import.meta.env.VITE_API_URL + `/package/delete/${id}`
    );
    if (res.data.success) fetchPackages();
  };

  return (
    <div>
      {/* Add / Update Form */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="mb-1 font-medium">Package Key</label>
          <InputText
            placeholder="53,999_to_1l"
            value={packageKey}
            onChange={(e) => setPackageKey(e.target.value)}
            className="w-full mt-2"
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 font-medium">Price Range</label>
          <InputText
            placeholder="53,999 - 1,00,000"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full mt-2"
          />
        </div>
        <div className="flex items-end">
          <Button
            label={editingId === null ? "Add Package" : "Update Package"}
            onClick={handleSubmit}
            className={
              editingId === null ? "p-button-primary" : "p-button-success"
            }
          />
        </div>
      </div>

      {/* Packages Table */}
      <DataTable value={packages} showGridlines scrollable className="mt-4">
        <Column header="Key" field="type" />
        <Column header="Range" field="ref" />
        <Column
          header="Actions"
          body={(row) => (
            <div className="flex gap-2">
              <Button label="Edit" onClick={() => handleEdit(row)} />
              <Button
                label="Delete"
                className="p-button-danger"
                onClick={() => handleDelete(row.id)}
              />
            </div>
          )}
        />
      </DataTable>
    </div>
  );
};

export default Packages;
