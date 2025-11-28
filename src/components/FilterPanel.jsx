import React, { useEffect, useState, useRef } from 'react';
import { useStore } from '../store/useStore';
import MultiSelect from './MultiSelect';

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

  // Local UI state - user edits go here until they press Update
  const [localFilters, setLocalFilters] = useState(filters);

  // Ensure default 'all selected' behavior on first mount when store filters are empty
  const didInitDefaults = useRef(false);
  useEffect(() => {
    if (didInitDefaults.current) return;
    // Only initialize defaults when store filters are empty (user hasn't customized yet)
    const shouldInit = (
      (!filters.manufacturers || filters.manufacturers.length === 0) &&
      (!filters.industryPackage || filters.industryPackage.length === 0) &&
      (!filters.discovereePackage || filters.discovereePackage.length === 0) &&
      (!filters.configuration || filters.configuration.length === 0) &&
      (!filters.material || filters.material.length === 0) &&
      (!filters.mounting || filters.mounting.length === 0) &&
      (!filters.partStatus || filters.partStatus.length === 0) &&
      (!filters.qualification || filters.qualification.length === 0)
    );

    if (shouldInit) {
      setLocalFilters(prev => ({
        ...prev,
        manufacturers: manufacturers.slice(),
        industryPackage: industryPackages.slice(),
        discovereePackage: discovereePackages.slice(),
        configuration: configurations.slice(),
        material: materials.slice(),
        mounting: mountingTypes.slice(),
        partStatus: partStatuses.slice(),
        qualification: ["Automotive", "Non-Automotive"],
      }));
    }

    didInitDefaults.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync local UI when global filters change (for example after Clear All)
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const applyFilters = () => {
    Object.entries(localFilters).forEach(([key, value]) => {
      setFilter(key, value);
    });
  };

  const clearAll = () => {
    resetFilters();
    setLocalFilters({
      manufacturers: [],
      packages: [],
      mounting: [],
      channelType: [],
      industryPackage: [],
      discovereePackage: [],
      qualification: [],
      material: [],
      partStatus: [],
      configuration: [],
      vdsMin: null,
      vdsMax: null,
      rdsonMin: null,
      rdsonMax: null,
      vthMin: null,
      vthMax: null,
      searchTerm: ''
    });
  };

  return (
    <div className="bg-white border border-gray-300 rounded shadow-sm">
      {/* First Row */}
      <div className="grid grid-cols-6 gap-2 px-3 py-2 border-b border-gray-200">
        {/* Manufacturer */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">Manufacturer <span className="text-blue-600">ⓘ</span></label>
          <MultiSelect
            options={manufacturers}
            selected={localFilters.manufacturers || []}
            onChange={(next) => setLocalFilters(prev => ({ ...prev, manufacturers: next }))}
            placeholder={`${manufacturers.length} Manufacturers`}
          />
        </div>

        {/* Industry Package Category */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">Industry Package Category <span className="text-blue-600">ⓘ</span></label>
          <MultiSelect
            options={industryPackages}
            selected={localFilters.industryPackage || []}
            onChange={(next) => setLocalFilters(prev => ({ ...prev, industryPackage: next }))}
            placeholder={`${industryPackages.length} Packages`}
          />
        </div>

        {/* DiscoverEE Package Category */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">DiscoverEE Package Category <span className="text-blue-600">ⓘ</span></label>
          <MultiSelect
            options={discovereePackages}
            selected={localFilters.discovereePackage || []}
            onChange={(next) => setLocalFilters(prev => ({ ...prev, discovereePackage: next }))}
            placeholder={`${discovereePackages.length} Packages`}
          />
        </div>

        {/* Configuration */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">Configuration <span className="text-blue-600">ⓘ</span></label>
          <MultiSelect
            options={configurations}
            selected={localFilters.configuration || []}
            onChange={(next) => setLocalFilters(prev => ({ ...prev, configuration: next }))}
            placeholder={` ${configurations.length} Config`}
          />
        </div>

        {/* Qualification */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">Qualification <span className="text-blue-600">ⓘ</span></label>
          <MultiSelect
            options={["Automotive","Non-Automotive"]}
            selected={localFilters.qualification || []}
            onChange={(next) => setLocalFilters(prev => ({ ...prev, qualification: next }))}
            placeholder={`2 Automotive`}
          />
        </div>

        {/* Material */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">Material <span className="text-blue-600">ⓘ</span></label>
          <MultiSelect
            options={materials}
            selected={localFilters.material || []}
            onChange={(next) => setLocalFilters(prev => ({ ...prev, material: next }))}
            placeholder={`Si, GaN`}
          />
        </div>

        {/* Mounting */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">Mounting <span className="text-blue-600">ⓘ</span></label>
          <MultiSelect
            options={mountingTypes}
            selected={localFilters.mounting || []}
            onChange={(next) => setLocalFilters(prev => ({ ...prev, mounting: next }))}
            placeholder={`THL, SMD, DIE`}
          />
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
              value={localFilters.vdsMin || ''}
              onChange={(e) => setLocalFilters(prev => ({ ...prev, vdsMin: e.target.value ? parseFloat(e.target.value) : null }))}
              className="w-1/2 text-xs border border-gray-400 rounded px-2 py-1 hover:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              style={{ height: '30px' }}
            />
            <span className="text-xs self-center font-bold">-</span>
            <input
              type="number"
              placeholder="Max"
              value={localFilters.vdsMax || ''}
              onChange={(e) => setLocalFilters(prev => ({ ...prev, vdsMax: e.target.value ? parseFloat(e.target.value) : null }))}
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
              value={localFilters.vthMin || ''}
              onChange={(e) => setLocalFilters(prev => ({ ...prev, vthMin: e.target.value ? parseFloat(e.target.value) : null }))}
              className="w-1/2 text-xs border border-gray-400 rounded px-2 py-1 hover:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              style={{ height: '30px' }}
            />
            <span className="text-xs self-center font-bold">-</span>
            <input
              type="number"
              placeholder="Max"
              value={localFilters.vthMax || ''}
              onChange={(e) => setLocalFilters(prev => ({ ...prev, vthMax: e.target.value ? parseFloat(e.target.value) : null }))}
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
              value={localFilters.rdsonMin || ''}
              onChange={(e) => setLocalFilters(prev => ({ ...prev, rdsonMin: e.target.value ? parseFloat(e.target.value) : null }))}
              className="w-1/2 text-xs border border-gray-400 rounded px-2 py-1 hover:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              style={{ height: '30px' }}
            />
            <span className="text-xs self-center font-bold">-</span>
            <input
              type="number"
              step="0.001"
              placeholder="1"
              value={localFilters.rdsonMax || ''}
              onChange={(e) => setLocalFilters(prev => ({ ...prev, rdsonMax: e.target.value ? parseFloat(e.target.value) : null }))}
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
            value={localFilters.view || 'VDS,RDSON'}
            onChange={(e) => setLocalFilters(prev => ({ ...prev, view: e.target.value }))}
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
            value={localFilters.partStatus && localFilters.partStatus[0] ? localFilters.partStatus[0] : ''}
            onChange={(e) => setLocalFilters(prev => ({ ...prev, partStatus: e.target.value ? [e.target.value] : [] }))}
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
            onClick={applyFilters}
            className="text-xs font-semibold rounded"
            style={{ backgroundColor: '#16a34a', color: '#ffffff', padding: '8px 14px', margin: '4px', borderRadius: '5px' }}
          >
            Update
          </button>
          <button
            onClick={clearAll}
            className="text-xs font-semibold rounded"
            style={{ backgroundColor: '#dc2626', color: '#ffffff', padding: '8px 14px', margin: '4px', borderRadius: '5px' }}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
