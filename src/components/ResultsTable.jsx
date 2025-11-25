import { useStore } from '../store/useStore';

export function ResultsTable() {
  const { getFilteredDevices, selectedProducts, toggleProductSelection } = useStore();

  const devices = getFilteredDevices();

  if (devices.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Results</h2>
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No components found. Try adjusting your filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Results ({devices.length})</h2>
        <span className="text-sm text-gray-600">
          {selectedProducts.length} selected
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-8">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    // Select all functionality
                    if (e.target.checked) {
                      devices.forEach(d => {
                        if (!selectedProducts.includes(d.did)) {
                          toggleProductSelection(d.did);
                        }
                      });
                    }
                  }}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Part Number</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Manufacturer</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Package</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">VDS (V)</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">RDS(on) (Ω)</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">RTHJA (°C/W)</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Mounting</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Channel</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device, idx) => (
              <tr
                key={device.did}
                className={`border-b border-gray-200 hover:bg-blue-50 transition ${
                  selectedProducts.includes(device.did) ? 'bg-blue-100' : ''
                }`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(device.did)}
                    onChange={() => toggleProductSelection(device.did)}
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{device.partno}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{device.manf}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{device.package}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{device.vds}</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {device.rdsontyp10vgs25ta ? device.rdsontyp10vgs25ta.toFixed(4) : 'N/A'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{device.rthja}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{device.mounting}</td>
                <td className="px-4 py-3 text-sm font-medium">
                  <span className={`px-2 py-1 rounded text-white text-xs font-semibold ${
                    device.channel === 'N' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}>
                    {device.channel === 'N' ? 'N-Ch' : 'P-Ch'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProducts.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Selected Components:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedProducts.map(id => {
              const device = devices.find(d => d.did === id);
              return device ? (
                <span key={id} className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
                  {device.partno}
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
