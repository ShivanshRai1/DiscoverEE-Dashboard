import React, { useEffect, useState, useRef } from 'react';
import { useStore } from '../store/useStore';
import MultiSelect from './MultiSelect';
import InfoTooltip from './InfoTooltip';

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
    <div className="bg-gray-50 rounded shadow-sm">
      {/* First Row */}
      <div className="grid grid-cols-7 gap-2 mb-3">
        {/* Manufacturer */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">
            Manufacturer <InfoTooltip content="Select the manufacturer's whose products you would like to view in the dashboard. Only the manufacturer's that are included in your subscription plan are shown here." />
          </label>
          <MultiSelect
            options={manufacturers}
            selected={localFilters.manufacturers || []}
            onChange={(next) => setLocalFilters(prev => ({ ...prev, manufacturers: next }))}
            placeholder={`${manufacturers.length} Manufacturers`}
          />
        </div>

        {/* Industry Package Category */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">Industry Package Category <InfoTooltip content="Filter parts by manufacturer's package name. To select all DPak parts for example, you will have to select DPak, DPAK, D-Pak, TO-252, T0252 etc. To get around this problem, we recommend you to use DiscoverEE Package Category." /></label>
          <MultiSelect
            options={industryPackages}
            selected={localFilters.industryPackage || []}
            onChange={(next) => setLocalFilters(prev => ({ ...prev, industryPackage: next }))}
            placeholder={`${industryPackages.length} Packages`}
          />
        </div>

        {/* DiscoverEE Package Category */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">DiscoverEE Package Category <InfoTooltip content="Filter parts by DiscoverEE's package category which is created based on package specifications to combine similar packages into the same category. This category is based on whether the part is Surface Mount (SMD), Through Hole (THL), Bare Die (DIE), has a thermal pad (ThermalPAD), has dual side cooling (Dual Cool), has extended leads (Leaded or NoLead), Wettable Flanks (WF) and its length and width in millimeter (WxL)." /></label>
          <MultiSelect
            options={discovereePackages}
            selected={localFilters.discovereePackage || []}
            onChange={(next) => setLocalFilters(prev => ({ ...prev, discovereePackage: next }))}
            placeholder={`${discovereePackages.length} Packages`}
          />
        </div>

        {/* Configuration */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">Configuration <InfoTooltip content="Filter parts by their configuration such as Single, Single Plus Schottky, Dual, Dual Complementary, Dual Asymmetric." /></label>
          <MultiSelect
            options={configurations}
            selected={localFilters.configuration || []}
            onChange={(next) => setLocalFilters(prev => ({ ...prev, configuration: next }))}
            placeholder={` ${configurations.length} Config`}
          />
        </div>

        {/* Qualification */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">Qualification <InfoTooltip content="Filter parts by their compliance. AEC Q101 qualified parts are referred to as 'Automotive' and all others are referred to as 'Non-Automotive.' To choose both options, select 'All'." /></label>
          <MultiSelect
            options={["Automotive","Non-Automotive"]}
            selected={localFilters.qualification || []}
            onChange={(next) => setLocalFilters(prev => ({ ...prev, qualification: next }))}
            placeholder={`2 Automotive`}
          />
        </div>

        {/* Material */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">Material <InfoTooltip content="Filter parts by material. Silicon parts are referred to as 'Si', Silicon Carbide parts are referred to as 'SiC' and Gallium Nitride parts are referred to as 'GaN'. To choose all materials, select 'All'." /></label>
          <MultiSelect
            options={materials}
            selected={localFilters.material || []}
            onChange={(next) => setLocalFilters(prev => ({ ...prev, material: next }))}
            placeholder={`Si, GaN`}
          />
        </div>

        {/* Mounting */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">Mounting <InfoTooltip content="Filter parts by mounting. Surface Mount parts are referred to as SMD, Through Hole parts are referred to as THL and Bare Die parts are referred to as DIE. To choose all types, select 'All'." /></label>
          <MultiSelect
            options={mountingTypes}
            selected={localFilters.mounting || []}
            onChange={(next) => setLocalFilters(prev => ({ ...prev, mounting: next }))}
            placeholder={`THL, SMD, DIE`}
          />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-7 gap-2 items-end">{/* RdsonVGS [V] */}
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">RdsonVGS [V] <InfoTooltip content="Filter parts by the absolute value of VGS at which the on-resistance is specified. To combine parts that have similar VGS values, we created several levels between 0 - 17.5V. Selecting a level of 3.5 - 6.49V VGS will only display parts that have on-resistance specified at a VGS between this range in the datasheet. All parts that have VGS value outside the selected range will not be shown on the dashboard. Use this only if you want to narrow down the part selection based on the VGS values specified in the datasheet." /></label>
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
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">Breakdown Voltage Range [V] <InfoTooltip content="Filter parts by their breakdown voltage rating." /></label>
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
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">VTH Range [V] <InfoTooltip content="Filter parts by their threshold voltage rating." /></label>
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
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-700">On Resistance Range [Ohm] <InfoTooltip content="Filter parts by their on-resistance rating. Here we show the minimum value of Rdson(max) found on the datasheet. If Rdson(max) value is not found in the datasheet, then we show the Rdson(typ) value. This mainly happens when a VGS value is selected for which only the Rdson(typ) value is specified in the datasheet." /></label>
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
          <label className="block text-xs font-bold mb-1 text-gray-700">Display Type <InfoTooltip content="Select to view the Y-axis on a Linear or Log scale." /></label>
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
          <label className="block text-xs font-bold mb-1 text-gray-700">Part Status <InfoTooltip content="Select to view the parts by their promotion status. 'Promotion' means that the parts are actively promoted by the manufacturer on their website. 'Non Promotion' means that the parts are not actively promoted although they may not be Obsolete. We consider non-promotion to be an early indicator of obsolescence and possible spec changes." /></label>
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
        <div className="flex gap-2 items-end">
          <button
            onClick={applyFilters}
            className="text-xs font-semibold rounded"
            style={{ backgroundColor: '#16a34a', color: '#ffffff', padding: '8px 14px', borderRadius: '5px', height: '30px' }}
          >
            Update
          </button>
          <button
            onClick={clearAll}
            className="text-xs font-semibold rounded"
            style={{ backgroundColor: '#dc2626', color: '#ffffff', padding: '8px 14px', borderRadius: '5px', height: '30px' }}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
