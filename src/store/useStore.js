import { create } from 'zustand';
import devicesData from '../data/devices.json';

export const useStore = create((set, get) => ({
  // Data
  devices: devicesData,
  
  // Filter state
  filters: {
    manufacturers: [],
    packages: [],
    mounting: [],
    channelType: [],
    industryPackage: [],
    discovereePackage: [],
    qualification: [], // Automotive / Non-Automotive
    material: [], // Si / GaN
    partStatus: [], // Promotion / Non-Promotion
    configuration: [],
    vdsMin: null,
    vdsMax: null,
    rdsonMin: null,
    rdsonMax: null,
    vthMin: null,
    vthMax: null,
    searchTerm: ''
  },
  
  // UI state
  selectedProducts: [],
  chartXAxis: 'vds',
  chartYAxis: 'rdsontyp10vgs25ta',
  displayType: 'log', // 'linear' or 'log' - DiscoverEE defaults to log
  zoomMode: 'xy', // 'xy', 'x', 'y'
  
  // Get unique values for filters
  getManufacturers: () => {
    const manfs = new Set(get().devices.map(d => d.manf).filter(Boolean));
    return Array.from(manfs).sort();
  },
  
  getPackages: () => {
    const pkgs = new Set(get().devices.map(d => d.package).filter(Boolean));
    return Array.from(pkgs).sort();
  },
  
  getMountingTypes: () => {
    const mounts = new Set(get().devices.map(d => d.mounting).filter(Boolean));
    return Array.from(mounts).sort();
  },
  
  getChannelTypes: () => {
    const channels = new Set(get().devices.map(d => d.channel).filter(Boolean));
    return Array.from(channels).sort();
  },

  getIndustryPackages: () => {
    const cats = new Set(get().devices.map(d => d.discoveree_package_cat1).filter(Boolean));
    return Array.from(cats).sort();
  },

  getDiscovereePackages: () => {
    const cats = new Set(get().devices.map(d => d.discoveree_package_cat2).filter(Boolean));
    return Array.from(cats).sort();
  },

  getMaterials: () => {
    const mats = new Set(get().devices.map(d => d.material).filter(d => d && d.trim()));
    return Array.from(mats).sort();
  },

  getPartStatuses: () => {
    const statuses = new Set(get().devices.map(d => d.part_status).filter(Boolean));
    return Array.from(statuses).sort();
  },

  getConfigurations: () => {
    const configs = new Set(get().devices.map(d => d.config).filter(Boolean));
    return Array.from(configs).sort();
  },
  
  // Filter operations
  setFilter: (filterName, value) =>
    set((state) => ({
      filters: { ...state.filters, [filterName]: value }
    })),
  
  setSearchTerm: (term) =>
    set((state) => ({
      filters: { ...state.filters, searchTerm: term }
    })),
  
  resetFilters: () =>
    set({
      filters: {
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
      }
    }),

  setDisplayType: (type) => set({ displayType: type }),

  setZoomMode: (mode) => set({ zoomMode: mode }),
  
  // Get filtered devices
  getFilteredDevices: () => {
    const state = get();
    const { filters, devices } = state;
    
    return devices.filter(device => {
      // Search term filter
      if (filters.searchTerm && !device.partno.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }
      
      // Manufacturer filter
      if (filters.manufacturers.length > 0 && !filters.manufacturers.includes(device.manf)) {
        return false;
      }
      
      // Package filter
      if (filters.packages.length > 0 && !filters.packages.includes(device.package)) {
        return false;
      }
      
      // Mounting type filter
      if (filters.mounting.length > 0 && !filters.mounting.includes(device.mounting)) {
        return false;
      }
      
      // Channel type filter
      if (filters.channelType.length > 0 && !filters.channelType.includes(device.channel)) {
        return false;
      }

      // Industry Package Category filter
      if (filters.industryPackage.length > 0 && !filters.industryPackage.includes(device.discoveree_package_cat1)) {
        return false;
      }

      // DiscoverEE Package Category filter
      if (filters.discovereePackage.length > 0 && !filters.discovereePackage.includes(device.discoveree_package_cat2)) {
        return false;
      }

      // Qualification filter (Automotive = auto="Yes", Non-Automotive = auto="No")
      if (filters.qualification.length > 0) {
        const isAutomotive = device.auto === 'Yes';
        if (filters.qualification.includes('Automotive') && !isAutomotive) return false;
        if (filters.qualification.includes('Non-Automotive') && isAutomotive) return false;
      }

      // Material filter
      if (filters.material.length > 0 && (!device.material || !filters.material.includes(device.material))) {
        return false;
      }

      // Part Status filter
      if (filters.partStatus.length > 0 && (!device.part_status || !filters.partStatus.includes(device.part_status))) {
        return false;
      }

      // Configuration filter
      if (filters.configuration.length > 0 && !filters.configuration.includes(device.config)) {
        return false;
      }
      
      // VDS range filter
      if (filters.vdsMin !== null && device.vds < filters.vdsMin) {
        return false;
      }
      if (filters.vdsMax !== null && device.vds > filters.vdsMax) {
        return false;
      }
      
      // RDS(on) range filter - use minimum of rdson1-4max
      const rdsonValues = [device.rdson1max, device.rdson2max, device.rdson3max, device.rdson4max].filter(v => v !== null);
      const minRdson = rdsonValues.length > 0 ? Math.min(...rdsonValues) : device.rdsontyp10vgs25ta;
      
      if (filters.rdsonMin !== null && minRdson < filters.rdsonMin) {
        return false;
      }
      if (filters.rdsonMax !== null && minRdson > filters.rdsonMax) {
        return false;
      }

      // VTH range filter
      if (filters.vthMin !== null && (!device.vthtyp || device.vthtyp < filters.vthMin)) {
        return false;
      }
      if (filters.vthMax !== null && (!device.vthtyp || device.vthtyp > filters.vthMax)) {
        return false;
      }
      
      return true;
    });
  },
  
  // Product selection
  toggleProductSelection: (deviceId) =>
    set((state) => ({
      selectedProducts: state.selectedProducts.includes(deviceId)
        ? state.selectedProducts.filter(id => id !== deviceId)
        : [...state.selectedProducts, deviceId]
    })),
  
  clearSelection: () =>
    set({ selectedProducts: [] }),
  
  // Chart axes
  setChartAxes: (xAxis, yAxis) =>
    set({ chartXAxis: xAxis, chartYAxis: yAxis })
}));
