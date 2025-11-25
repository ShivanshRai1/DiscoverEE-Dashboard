import { useStore } from '../store/useStore';

export function FilterPanel() {
  const {
    filters,
    setFilter,
    resetFilters,
    getManufacturers,
    getIndustryPackages,
    getDiscovereePackages,
    getMaterials,
    getPartStatuses,
    getConfigurations,
    getMountingTypes,
    getFilteredDevices,
    displayType,
    setDisplayType
  } = useStore();

  const manufacturers = getManufacturers();
  const industryPackages = getIndustryPackages();
  const discovereePackages = getDiscovereePackages();
  const configurations = getConfigurations();
  const materials = getMaterials();
  const mountingTypes = getMountingTypes();
  const partStatuses = getPartStatuses();
  const filteredCount = getFilteredDevices().length;

  return (
    <div className="bg-white border border-gray-300 rounded shadow-sm">
      {/* First Row */}
      <div className="grid grid-cols-6 gap-2 px-3 py-2 border-b border-gray-200">
        {/* Manufacturer */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">Manufacturer <span className="text-blue-600">ⓘ</span></label>
          <select
            className="w-full text-xs border border-gray-400 rounded px-2 py-1 bg-white hover:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            style={{ height: '30px' }}
          >
            <option value="">{manufacturers.length} Manufacturers</option>
            {manufacturers.map(manf => (
              <option key={manf} value={manf}>{manf}</option>
            ))}
          </select>
        </div>

        {/* Industry Package Category */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">Industry Package Category <span className="text-blue-600">ⓘ</span></label>
          <select
            className="w-full text-xs border border-gray-400 rounded px-2 py-1 bg-white hover:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            style={{ height: '30px' }}
          >
            <option value="">{industryPackages.length} Packages</option>
            {industryPackages.map(pkg => (
              <option key={pkg} value={pkg}>{pkg}</option>
            ))}
          </select>
        </div>

        {/* DiscoverEE Package Category */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">DiscoverEE Package Category <span className="text-blue-600">ⓘ</span></label>
          <select
            className="w-full text-xs border border-gray-400 rounded px-2 py-1 bg-white hover:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            style={{ height: '30px' }}
          >
            <option value="">{discovereePackages.length} Packages</option>
            {discovereePackages.map(pkg => (
              <option key={pkg} value={pkg}>{pkg}</option>
            ))}
          </select>
        </div>

        {/* Configuration */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">Configuration <span className="text-blue-600">ⓘ</span></label>
          <select
            className="w-full text-xs border border-gray-400 rounded px-2 py-1 bg-white hover:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            style={{ height: '30px' }}
          >
            <option value="">5 Config</option>
            {configurations.map(config => (
              <option key={config} value={config}>{config}</option>
            ))}
          </select>
        </div>

        {/* Qualification */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">Qualification <span className="text-blue-600">ⓘ</span></label>
          <select
            className="w-full text-xs border border-gray-400 rounded px-2 py-1 bg-white hover:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            style={{ height: '30px' }}
          >
            <option value="">2 Automotive</option>
            <option value="Automotive">Automotive</option>
            <option value="Non-Automotive">Non-Automotive</option>
          </select>
        </div>

        {/* Material */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">Material <span className="text-blue-600">ⓘ</span></label>
          <select
            className="w-full text-xs border border-gray-400 rounded px-2 py-1 bg-white hover:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            style={{ height: '30px' }}
          >
            <option value="">Si, GaN</option>
            {materials.map(mat => (
              <option key={mat} value={mat}>{mat}</option>
            ))}
          </select>
        </div>

        {/* Mounting */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">Mounting <span className="text-blue-600">ⓘ</span></label>
          <select
            className="w-full text-xs border border-gray-400 rounded px-2 py-1 bg-white hover:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            style={{ height: '30px' }}
          >
            <option value="">THL, SMD, DIE</option>
            {mountingTypes.map(mount => (
              <option key={mount} value={mount}>{mount}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-9 gap-2 px-3 py-2 items-end">
        {/* RdsonVGS [V] */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">RdsonVGS [V] <span className="text-blue-600">ⓘ</span></label>
          <select
            className="w-full text-xs border border-gray-400 rounded px-2 py-1 bg-white hover:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            style={{ height: '30px' }}
          >
            <option value="">All</option>
            <option value="12.3V - 17.49V">12.3V - 17.49V</option>
            <option value="8.5V - 12.49V">8.5V - 12.49V</option>
            <option value="6.5V - 8.49V">6.5V - 8.49V</option>
            <option value="3.5V - 6.49V">3.5V - 6.49V</option>
            <option value="2V - 3.49V">2V - 3.49V</option>
            <option value="1V - 2.99V">1V - 2.99V</option>
            <option value="0V - 0.99V">0V - 0.99V</option>
          </select>
        </div>

        {/* Breakdown Voltage Range [V] */}
        <div className="col-span-2">
          <label className="block text-xs font-bold mb-1 text-gray-700">Breakdown Voltage Range [V] <span className="text-blue-600">ⓘ</span></label>
          <div className="flex gap-1">
            <input
              type="number"
              placeholder="Min"
              value={filters.vdsMin || ''}
              onChange={(e) => setFilter('vdsMin', e.target.value ? parseFloat(e.target.value) : null)}
              className="w-1/2 text-xs border border-gray-400 rounded px-2 py-1 hover:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              style={{ height: '30px' }}
            />
            <span className="text-xs self-center font-bold">-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.vdsMax || ''}
              onChange={(e) => setFilter('vdsMax', e.target.value ? parseFloat(e.target.value) : null)}
              className="w-1/2 text-xs border border-gray-400 rounded px-2 py-1 hover:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              style={{ height: '30px' }}
            />
          </div>
        </div>

        {/* VTH Range [V] */}
        <div className="col-span-2">
          <label className="block text-xs font-bold mb-1 text-gray-700">VTH Range [V] <span className="text-blue-600">ⓘ</span></label>
          <div className="flex gap-1">
            <input
              type="number"
              placeholder="Min"
              value={filters.vthMin || ''}
              onChange={(e) => setFilter('vthMin', e.target.value ? parseFloat(e.target.value) : null)}
              className="w-1/2 text-xs border border-gray-400 rounded px-2 py-1 hover:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              style={{ height: '30px' }}
            />
            <span className="text-xs self-center font-bold">-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.vthMax || ''}
              onChange={(e) => setFilter('vthMax', e.target.value ? parseFloat(e.target.value) : null)}
              className="w-1/2 text-xs border border-gray-400 rounded px-2 py-1 hover:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              style={{ height: '30px' }}
            />
          </div>
        </div>

        {/* On Resistance Range [Ohm] */}
        <div className="col-span-2">
          <label className="block text-xs font-bold mb-1 text-gray-700">On Resistance Range [Ohm] <span className="text-blue-600">ⓘ</span></label>
          <div className="flex gap-1">
            <input
              type="number"
              step="0.001"
              placeholder="0"
              value={filters.rdsonMin || ''}
              onChange={(e) => setFilter('rdsonMin', e.target.value ? parseFloat(e.target.value) : null)}
              className="w-1/2 text-xs border border-gray-400 rounded px-2 py-1 hover:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              style={{ height: '30px' }}
            />
            <span className="text-xs self-center font-bold">-</span>
            <input
              type="number"
              step="0.001"
              placeholder="1"
              value={filters.rdsonMax || ''}
              onChange={(e) => setFilter('rdsonMax', e.target.value ? parseFloat(e.target.value) : null)}
              className="w-1/2 text-xs border border-gray-400 rounded px-2 py-1 hover:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              style={{ height: '30px' }}
            />
          </div>
        </div>

        {/* Display Type */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">Display Type <span className="text-blue-600">ⓘ</span></label>
          <select
            value={displayType}
            onChange={(e) => setDisplayType(e.target.value)}
            className="w-full text-xs border border-gray-400 rounded px-2 py-1 bg-white hover:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            style={{ height: '30px' }}
          >
            <option value="linear">Linear</option>
            <option value="log">Log</option>
          </select>
        </div>

        {/* View */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">View</label>
          <select
            className="w-full text-xs border border-gray-400 rounded px-2 py-1 bg-white hover:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            style={{ height: '30px' }}
          >
            <option value="VDS,RDSON">VDS,RDSON</option>
            <option value="VDS,LOWEST RDSON">VDS,LOWEST RDSON</option>
            <option value="VDS,COSS">VDS,COSS</option>
            <option value="VDS,VTH">VDS,VTH</option>
            <option value="VDS,QG">VDS,QG</option>
            <option value="VDS,QGD">VDS,QGD</option>
            <option value="VDS,RG">VDS,RG</option>
            <option value="VDS,VF">VDS,VF</option>
            <option value="VDS,TRR">VDS,TRR</option>
            <option value="VDS,QRR">VDS,QRR</option>
            <option value="VDS,f*QG">VDS,f*QG</option>
            <option value="VDS,f*COSS">VDS,f*COSS</option>
          </select>
        </div>

        {/* Part Status */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">Part Status <span className="text-blue-600">ⓘ</span></label>
          <select
            className="w-full text-xs border border-gray-400 rounded px-2 py-1 bg-white hover:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            style={{ height: '30px' }}
          >
            <option value="">Promotion</option>
            {partStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700 shadow-sm"
            style={{ height: '30px' }}
          >
            Update
          </button>
          <button
            onClick={resetFilters}
            className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700 shadow-sm"
            style={{ height: '30px' }}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
