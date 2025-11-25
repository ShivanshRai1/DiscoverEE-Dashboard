# DiscoverEE Dashboard - Implementation Summary

## Project Overview
A React + JavaScript dashboard for electronic component discovery and comparison, built with Vite.

**Location:** `D:\DiscoverEE-Dashboard\DiscoverEE-Dashboard`
**Dev Server:** http://localhost:5173

## Data
- **Source:** MariaDB 10.6.24 SQL dump (`datasheet_values_latest_live070222.sql`)
- **Components:** 1,055 electronic components with 322 fields each
- **Format:** Converted to JSON (`src/data/devices.json`)
- **Key Fields:**
  - Basic: `did`, `fname`, `manf`, `partno`, `package`, `channel`, `config`
  - Package Categories: `discoveree_package_cat1`, `discoveree_package_cat2`
  - Specifications: `vds`, `vgs`, `vthtyp`, `rdson1-4max`, `rdsontyp10vgs25ta`, `rthja`
  - Classifications: `mounting`, `auto`, `material`, `part_status`

## Technology Stack
- **Frontend:** React 18 (JavaScript only, NO TypeScript)
- **Build Tool:** Vite 7.2.2
- **State Management:** Zustand
- **Charts:** Recharts
- **Styling:** Tailwind CSS with PostCSS
- **License:** All dependencies are MIT licensed

## Features Implemented

### 1. Filter Panel (Left Sidebar)
Located in `src/components/FilterPanel.jsx`

**Filters Available:**
- **Search Part Number:** Text search for components
- **Manufacturer:** Multi-select with Select/Unselect All (20 colors for chart)
- **Configuration:** Single/Dual/Triple configurations
- **Industry Package Category:** Multi-select dropdown
- **DiscoverEE Package Category:** Searchable checkbox list
- **Qualification:** Automotive / Non-Automotive (based on `auto` field)
- **Material:** Si / GaN (if available in data)
- **Part Status:** Promotion / Non-Promotion
- **Package:** Multi-select with Select/Unselect All
- **Mounting:** Through-hole / Surface Mount / Die
- **Channel Type:** N-Channel / P-Channel
- **VDS Range:** Min/Max voltage inputs
- **On Resistance Range:** Min/Max RDS(on) (uses MIN of rdson1-4max)
- **VTH Range:** Min/Max threshold voltage

**Features:**
- Live filtered count display
- Clear All button to reset filters
- Sticky header for easy access
- Scrollable filter list

### 2. Scatter Plot (Main Chart)
Located in `src/components/ScatterPlot.jsx`

**Features:**
- **X/Y Axis Selection:** Choose from VDS, RDS(on), RTHJA, CISS
- **Display Type Toggle:** Linear / Log scale for Y-axis
- **Zoom Mode:** XY / X Only / Y Only
- **Reset Zoom:** Button to reset chart view
- **Manufacturer Colors:** 20 unique colors for different manufacturers
- **Interactive Tooltips:** Show part number, manufacturer, and values on hover
- **Point Selection:** Click points to select components
- **Legend:** Comprehensive manufacturer legend with color swatches

**Chart Library:** Recharts with ScatterChart, responsive container

### 3. Results Table
Located in `src/components/ResultsTable.jsx`

**Columns:**
- Checkbox (select individual components)
- Part Number
- Manufacturer
- Package
- VDS (V)
- RDS(on) (Ω)
- RTHJA (°C/W)
- Mounting
- Channel (color-coded badges: N-Ch = blue, P-Ch = purple)

**Features:**
- Select All checkbox in header
- Row highlighting on hover and selection
- Selected components summary below table
- Shows count of results and selected items

### 4. State Management (Zustand Store)
Located in `src/store/useStore.js`

**State:**
- `devices`: All 1,055 components
- `filters`: All filter criteria
- `selectedProducts`: Array of selected device IDs
- `chartXAxis`, `chartYAxis`: Chart axis selections
- `displayType`: 'linear' or 'log'
- `zoomMode`: 'xy', 'x', or 'y'

**Key Functions:**
- `getFilteredDevices()`: Applies all filters to device list
- `get*()` methods: Extract unique values for filter options
- `setFilter()`: Update individual filter values
- `resetFilters()`: Clear all filters
- `toggleProductSelection()`: Select/deselect components
- `setDisplayType()`, `setZoomMode()`: Chart controls

**Filter Logic:**
- VDS/VTH range filters use direct comparisons
- RDS(on) uses MIN of rdson1-4max fields
- Qualification: Automotive = `auto === 'Yes'`, Non-Automotive = `auto === 'No'`
- All filters use AND logic (must pass all active filters)

## File Structure
```
D:\DiscoverEE-Dashboard\DiscoverEE-Dashboard\
├── src/
│   ├── components/
│   │   ├── FilterPanel.jsx       # Left sidebar filters
│   │   ├── ScatterPlot.jsx       # Main chart visualization
│   │   └── ResultsTable.jsx      # Component listing table
│   ├── store/
│   │   └── useStore.js           # Zustand state management
│   ├── data/
│   │   └── devices.json          # 1,055 components (26,377 lines)
│   ├── App.jsx                   # Main layout
│   ├── App.css                   # Tailwind directives + custom styles
│   └── main.jsx                  # React entry point
├── convert_sql_simple.py         # SQL to JSON converter
├── datasheet_values_latest_live070222.sql  # Original SQL dump
├── package.json                  # Dependencies
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind settings
├── postcss.config.js            # PostCSS with @tailwindcss/postcss
└── index.html                   # HTML entry point
```

## Running the Dashboard

1. **Start Development Server:**
   ```powershell
   cd D:\DiscoverEE-Dashboard\DiscoverEE-Dashboard
   npm run dev
   ```

2. **Open in Browser:**
   http://localhost:5173

3. **Build for Production:**
   ```powershell
   npm run build
   ```

## Key Implementation Details

### Manufacturer Color Coding
- 20 distinct colors defined in `MANUFACTURER_COLORS` array
- Colors cycle if more than 20 manufacturers
- Applied to scatter plot points and legend

### RDS(on) Calculation
Minimum value of rdson1max, rdson2max, rdson3max, rdson4max is used for filtering and display

### Responsive Layout
- Mobile: Single column (filters stack above content)
- Desktop: 4-column grid (1 col filters, 3 cols content)
- Tailwind breakpoints: `lg:grid-cols-4`

### Performance Optimizations
- `useMemo` for manufacturer color mapping and device grouping
- Filter functions return new arrays to prevent mutations
- Devices grouped by manufacturer for efficient chart rendering

## Next Steps / Future Enhancements
1. ✅ All core filters implemented
2. ✅ Scatter plot with manufacturer colors
3. ✅ Log/Linear scale toggle
4. ✅ Zoom mode controls
5. ⏳ RdsonVGS dropdown filter (can add based on rdson1-4 fields)
6. ⏳ Export selected components to CSV
7. ⏳ Save/load filter presets
8. ⏳ Component comparison side-by-side view

## Troubleshooting

**Issue:** Dev server won't start
**Solution:** Ensure you're in the correct directory and dependencies are installed
```powershell
cd D:\DiscoverEE-Dashboard\DiscoverEE-Dashboard
npm install
npm run dev
```

**Issue:** TypeScript errors
**Solution:** Project uses JavaScript only. Delete `tsconfig.json` if present.

**Issue:** Tailwind classes not working
**Solution:** Ensure `@tailwindcss/postcss` is installed and configured in `postcss.config.js`

**Issue:** No data showing
**Solution:** Check that `src/data/devices.json` exists and contains 1,055 components. Re-run `python convert_sql_simple.py` if needed.

## Field Mappings Reference
- `manf` = Manufacturer
- `config` = Configuration
- `fname` = Chart display value (NOT partno)
- `discoveree_package_cat1` = Industry Package Category
- `discoveree_package_cat2` = DiscoverEE Package Category
- `mounting` = Mounting type (THL, SMD, DIE)
- `auto` = Qualification (Yes=Automotive, No/blank=Non-Automotive)
- `material` = Material (Si, GaN)
- `vthtyp` = VTH Range
- `rdson1-4max` = For On Resistance Range (use MIN)
- `vds` = Breakdown voltage

---
**Built:** 2025
**Framework:** React + Vite + JavaScript (NO TypeScript)
**Status:** ✅ Fully Functional
