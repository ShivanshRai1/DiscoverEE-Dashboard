import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';

export function ComparePage() {
  const { devices } = useStore();
  const [selectedDevices, setSelectedDevices] = useState([]);

  useEffect(() => {
    // Get IDs from URL query parameters
    const params = new URLSearchParams(window.location.search);
    const idsParam = params.get('ids');
    
    if (idsParam) {
      const ids = idsParam.split(',').map(id => parseInt(id));
      const devicesToCompare = devices.filter(d => ids.includes(d.did));
      setSelectedDevices(devicesToCompare);
    }
  }, [devices]);

  if (selectedDevices.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">No Products Selected</h1>
          <p className="text-gray-600">Please select products from the main dashboard to compare.</p>
        </div>
      </div>
    );
  }

  const specs = [
    { key: 'partno', label: 'Part Number' },
    { key: 'manf', label: 'Manufacturer' },
    { key: 'package', label: 'Package' },
    { key: 'vds', label: 'Breakdown Voltage (V)' },
    { key: 'rdsontyp10vgs25ta', label: 'On-Resistance (Ω)', format: (v) => v?.toExponential(2) },
    { key: 'vthtyp', label: 'Threshold Voltage (V)' },
    { key: 'config', label: 'Configuration' },
    { key: 'channel', label: 'Channel Type' },
    { key: 'mounting', label: 'Mounting' },
    { key: 'material', label: 'Material' },
    { key: 'auto', label: 'Automotive' },
    { key: 'rthja', label: 'RTHJA (°C/W)' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-teal-700 text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Product Comparison - DiscoverEE</h1>
          <button
            onClick={() => window.close()}
            className="bg-white text-teal-700 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 sticky left-0 bg-gray-100 z-10">
                    Specification
                  </th>
                  {selectedDevices.map((device, idx) => (
                    <th
                      key={device.did}
                      className="px-4 py-3 text-left text-sm font-bold text-gray-700 min-w-[200px]"
                    >
                      Product {idx + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specs.map((spec, specIdx) => (
                  <tr
                    key={spec.key}
                    className={`border-b border-gray-200 ${specIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
                  >
                    <td className="px-4 py-3 text-sm font-semibold text-gray-700 sticky left-0 z-10" style={{ backgroundColor: specIdx % 2 === 0 ? 'white' : '#f9fafb' }}>
                      {spec.label}
                    </td>
                    {selectedDevices.map((device) => (
                      <td key={device.did} className="px-4 py-3 text-sm text-gray-900">
                        {spec.format ? spec.format(device[spec.key]) : device[spec.key] || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
