# DiscoverEE Dashboard - Quick Start Guide

## 🚀 Getting Started

### Starting the Dashboard
```powershell
cd D:\DiscoverEE-Dashboard\DiscoverEE-Dashboard
npm run dev
```
Then open: **http://localhost:5173**

## 🎯 How to Use

### 1. Filtering Components

**Left Sidebar - Filter Panel**

- **Search Part Number:** Type to find specific components (e.g., "tpu60r280d")
  
- **Manufacturer:** Check boxes to filter by manufacturer
  - Click "Select All" to select all manufacturers
  - Click "Unselect All" to clear all selections

- **Configuration:** Filter by Single, Dual, or Triple channel configurations

- **Industry Package Category:** Select from dropdown (can select multiple)

- **DiscoverEE Package Category:** 
  - Use search box to find specific packages
  - Check boxes to select

- **Qualification:**
  - ✓ Automotive (auto = "Yes")
  - ✓ Non-Automotive (auto = "No")

- **Material:** Si (Silicon) or GaN (Gallium Nitride)

- **Part Status:** Promotion or Non-Promotion

- **Package:** Select package types (to252, to263, etc.)

- **Mounting:** 
  - Surface Mount
  - Through-hole
  - Die

- **Channel Type:** N-Channel or P-Channel

- **VDS Range:** Enter Min/Max voltage values

- **On Resistance Range:** Enter Min/Max resistance (uses minimum of rdson1-4max)

- **VTH Range:** Enter Min/Max threshold voltage

- **Clear All:** Reset all filters at once

### 2. Viewing the Scatter Plot

**Chart Controls (Top Row)**

- **X-Axis Dropdown:** Choose what to plot horizontally
  - VDS (V) - Breakdown Voltage
  - RDS(on) (Ω) - On Resistance
  - RTHJA (°C/W) - Thermal Resistance
  - CISS (pF) - Input Capacitance

- **Y-Axis Dropdown:** Choose what to plot vertically
  - Same options as X-Axis

- **Display Type:** Switch between Linear and Log scale

- **Zoom Mode:** Select how to zoom
  - XY - Zoom both axes
  - X Only - Zoom horizontal only
  - Y Only - Zoom vertical only

- **Reset Zoom:** Click to return to default view

**Interacting with the Chart**

- **Hover:** See component details in tooltip
- **Click Points:** Select/deselect components
- **Colors:** Each manufacturer has a unique color (see legend below chart)

### 3. Using the Results Table

**Table Features**

- **Select All Checkbox:** In header, selects all visible components
- **Individual Checkboxes:** Click to select specific components
- **Selected Highlight:** Selected rows turn blue
- **Hover Effect:** Rows highlight on mouse hover

**Table Columns**
1. Checkbox - Select component
2. Part Number - Component identifier
3. Manufacturer - Company name
4. Package - Package type
5. VDS (V) - Voltage rating
6. RDS(on) (Ω) - On-resistance (4 decimal precision)
7. RTHJA (°C/W) - Thermal resistance
8. Mounting - Mount type
9. Channel - N-Ch (blue badge) or P-Ch (purple badge)

**Selected Components Panel**

Below the table, see all selected components as blue chips.

## 💡 Tips & Tricks

### Finding Specific Components
1. Use **Search Part Number** for fastest lookup
2. Combine with manufacturer filter to narrow down
3. Check the filtered count to see how many match

### Comparing Components
1. Apply filters to get a subset
2. Select components in the table (checkbox)
3. View them together on the scatter plot (selected points)
4. Check the "X selected" count

### Analyzing Trends
1. Set X-Axis to VDS, Y-Axis to RDS(on)
2. Toggle between Linear and Log to see different patterns
3. Filter by manufacturer to see company-specific trends
4. Use color legend to identify manufacturers on chart

### Performance Optimization
1. Start with manufacturer or package filters first
2. Apply VDS/RDS(on) ranges to narrow down
3. Use Search for final specific parts
4. Clear All if you get too few results

## 🎨 Visual Guide

### Manufacturer Colors
Each manufacturer has a unique color on the scatter plot:
- Red, Blue, Green, Orange, Purple, Teal, etc.
- See the legend below the chart for the full list
- Colors cycle if there are more than 20 manufacturers

### Channel Badges
- **Blue Badge "N-Ch"** = N-Channel MOSFET
- **Purple Badge "P-Ch"** = P-Channel MOSFET

### Selection Visual Feedback
- **Selected rows:** Light blue background
- **Hover rows:** Darker blue highlight
- **Selected points:** Visible on chart
- **Selected chips:** Blue rounded pills below table

## 📊 Understanding the Data

### Key Specifications

**VDS (Breakdown Voltage):**
- Higher = Can handle more voltage
- Typical range: 20V to 200V
- Filter by your circuit voltage requirements

**RDS(on) (On-Resistance):**
- Lower = Better (less power loss)
- Measured in milliohms (mΩ) or ohms (Ω)
- Dashboard uses MIN of rdson1max, rdson2max, rdson3max, rdson4max

**RTHJA (Thermal Resistance Junction-to-Ambient):**
- Lower = Better heat dissipation
- Measured in °C/W
- Important for power applications

**VTH (Threshold Voltage):**
- Voltage needed to turn on MOSFET
- Typical: 1V to 4V
- Important for logic-level compatibility

## 🔍 Common Workflows

### Workflow 1: Find Automotive-Grade Components
1. Check **Qualification → Automotive**
2. Set VDS range (e.g., 40-100V)
3. Set RDS(on) max (e.g., 0-0.01Ω)
4. Review results in table
5. Select candidates for comparison

### Workflow 2: Compare Manufacturers
1. Clear all filters
2. Set performance criteria (VDS, RDS(on) ranges)
3. View scatter plot colored by manufacturer
4. Check legend to identify best performers
5. Filter by top manufacturer

### Workflow 3: Package Selection
1. Filter by **Mounting → Surface Mount**
2. Select **Industry Package Category** or **DiscoverEE Package Category**
3. Set electrical specs (VDS, RDS(on))
4. Review package options in table
5. Select for detailed comparison

### Workflow 4: Low RDS(on) Hunt
1. Set **On Resistance Range → Max: 0.01**
2. Set VDS to your voltage requirement
3. Sort mentally by reviewing table
4. Use scatter plot to visualize tradeoffs
5. Select top candidates

## 🛠️ Troubleshooting

**Issue:** No components showing
- **Fix:** Click "Clear All" to reset filters
- Check that VDS/RDS(on) ranges aren't too narrow

**Issue:** Too many components
- **Fix:** Add more filters (manufacturer, package, mounting)
- Set tighter VDS/RDS(on) ranges

**Issue:** Can't find a part number
- **Fix:** Check spelling in Search Part Number
- Try searching by manufacturer first

**Issue:** Chart looks weird
- **Fix:** Click "Reset Zoom"
- Try switching Display Type (Linear ↔ Log)
- Change X/Y axes to different parameters

**Issue:** Slow performance
- **Fix:** Apply manufacturer filter first to reduce dataset
- Use specific value ranges instead of wide ranges
- Clear browser cache and refresh

## 📱 Responsive Design

### Desktop View (≥1024px)
- Filters in left sidebar (1/4 width)
- Chart and table in right area (3/4 width)
- Full feature set visible

### Mobile View (<1024px)
- Filters stack on top
- Chart and table stack below
- Horizontal scrolling on table
- All features accessible

## ⌨️ Keyboard Shortcuts

Currently mouse-driven interface. Keyboard shortcuts coming in future version.

## 📖 Additional Resources

- **Implementation Details:** See `README_IMPLEMENTATION.md`
- **Feature Checklist:** See `FEATURE_CHECKLIST.md`
- **Field Mappings:** See README_IMPLEMENTATION.md → Field Mappings Reference

## 🎓 Learning the Interface

**Beginner:** Start with Search Part Number or Manufacturer filter
**Intermediate:** Combine 3-4 filters, use scatter plot
**Advanced:** Use all filters, analyze trends with log scale, compare multiple manufacturers

## 💻 Developer Info

**Framework:** React + JavaScript (NO TypeScript)
**State:** Zustand (check `src/store/useStore.js`)
**Components:** FilterPanel, ScatterPlot, ResultsTable
**Data:** 1,055 components in `src/data/devices.json`

---

## 🎉 You're Ready!

Open http://localhost:5173 and start exploring 1,055 electronic components!

**Need Help?** Check the documentation or inspect the code in `src/components/`

**Happy Component Discovery! 🚀**
