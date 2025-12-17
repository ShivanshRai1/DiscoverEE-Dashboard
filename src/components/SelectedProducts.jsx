import { useStore } from '../store/useStore';

export function SelectedProducts() {
  const { selectedProducts, devices, clearSelection, toggleProductSelection, getManufacturers } = useStore();
  
  const selectedDevices = devices.filter(d => selectedProducts.includes(d.did));
  const manufacturers = getManufacturers();
  
  // Get manufacturer index for each device
  const getManfIndex = (manf) => {
    return manufacturers.indexOf(manf) + 1;
  };

  if (selectedProducts.length === 0) {
    return null;
  }

  const handleCompare = () => {
    // Open comparison in new tab
    const ids = selectedProducts.join(',');
    window.open(`/compare?ids=${ids}`, '_blank');
  };

  return (
    <div className="px-12 py-10 mb-10">
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 w-full mt-10">
          {selectedDevices.map((device) => (
            <div
              key={device.did}
              className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-5 py-2 shadow-sm min-w-[160px] hover:shadow-md transition-all"
              style={{ margin: "0.75rem 0.5rem" }}
            >
              <span className="text-base font-medium text-gray-900 whitespace-nowrap">
                {device.partno} <span className="text-gray-500 font-normal">(Manf-{getManfIndex(device.manf)})</span>
              </span>
              <button
                onClick={() => toggleProductSelection(device.did)}
                className="rounded-full w-6 h-6 flex items-center justify-center text-base font-bold transition-colors"
                style={{ backgroundColor: "#dc2626", color: "white", cursor: "pointer", marginLeft: "0.75rem" }}
                aria-label="Remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-8 mt-10">
          <button
            onClick={handleCompare}
            className="text-white text-sm font-semibold rounded shadow-sm whitespace-nowrap transition-all"
            style={{ backgroundColor: "#2563eb", cursor: "pointer", color: "white", padding: "0.5rem 1.5rem", marginRight: "1rem" }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#1d4ed8"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#2563eb"}
          >
            Compare Selected
          </button>
          <button
            onClick={clearSelection}
            className="text-white text-sm font-semibold rounded shadow-sm whitespace-nowrap transition-all"
            style={{ backgroundColor: "#dc2626", cursor: "pointer", color: "white", padding: "0.5rem 1.5rem" }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#b91c1c"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#dc2626"}
          >
            Clear Selected
          </button>
        </div>
      </div>
    </div>
  );
}
