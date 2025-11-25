import { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { useStore } from '../store/useStore';

// Color palette for manufacturers
const MANUFACTURER_COLORS = [
  '#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6',
  '#1abc9c', '#e67e22', '#34495e', '#c0392b', '#2980b9',
  '#27ae60', '#f1c40f', '#8e44ad', '#16a085', '#d35400',
  '#2c3e50', '#e84393', '#00b894', '#0984e3', '#6c5ce7'
];

export function ScatterPlot() {
  const { 
    getFilteredDevices, 
    chartXAxis, 
    chartYAxis,
    displayType,
    getManufacturers
  } = useStore();

  const devices = getFilteredDevices();
  const manufacturers = getManufacturers();

  const axisLabels = {
    vds: 'VDS (V)',
    rdsontyp10vgs25ta: 'RDS(on) (Ω)',
    rthja: 'RTHJA (°C/W)',
    cisstyp: 'CISS (pF)'
  };

  // Create manufacturer to color mapping
  const manfColorMap = useMemo(() => {
    const map = {};
    manufacturers.forEach((manf, idx) => {
      map[manf] = MANUFACTURER_COLORS[idx % MANUFACTURER_COLORS.length];
    });
    return map;
  }, [manufacturers]);

  // Prepare data for Plotly - one trace per manufacturer
  const plotData = useMemo(() => {
    const traces = [];
    
    manufacturers.forEach((manf, idx) => {
      const manfDevices = devices.filter(d => d.manf === manf);
      const xData = [];
      const yData = [];
      const textData = [];
      
      manfDevices.forEach(device => {
        const xVal = device[chartXAxis];
        const yVal = device[chartYAxis];
        
        if (xVal != null && yVal != null && !isNaN(xVal) && !isNaN(yVal) && xVal > 0 && yVal > 0) {
          xData.push(xVal);
          yData.push(yVal);
          textData.push(`${device.partno}<br>Manufacturer: ${device.manf}<br>Package: ${device.package || 'N/A'}`);
        }
      });
      
      if (xData.length > 0) {
        traces.push({
          x: xData,
          y: yData,
          mode: 'markers',
          type: 'scatter',
          name: `Manf-${idx + 1}`,
          text: textData,
          hovertemplate: '%{text}<br>' + axisLabels[chartXAxis] + ': %{x}<br>' + axisLabels[chartYAxis] + ': %{y}<extra></extra>',
          marker: {
            size: 6,
            color: manfColorMap[manf],
            line: {
              color: manfColorMap[manf],
              width: 1
            },
            opacity: 0.8
          }
        });
      }
    });
    
    return traces;
  }, [devices, manufacturers, chartXAxis, chartYAxis, manfColorMap, axisLabels]);

  const layout = {
    title: {
      text: `Select & Compare Products (Count: ${devices.length}) - Powered by DiscoverEE`,
      font: { size: 14, weight: 'bold' }
    },
    xaxis: {
      title: axisLabels[chartXAxis],
      type: 'linear',
      showgrid: true,
      gridcolor: '#e0e0e0'
    },
    yaxis: {
      title: axisLabels[chartYAxis],
      type: displayType === 'log' ? 'log' : 'linear',
      showgrid: true,
      gridcolor: '#e0e0e0'
    },
    hovermode: 'closest',
    showlegend: true,
    legend: {
      orientation: 'h',
      y: 1.15,
      x: 0,
      xanchor: 'left',
      bgcolor: 'rgba(255,255,255,0.8)',
      bordercolor: '#ccc',
      borderwidth: 1
    },
    margin: { l: 80, r: 40, t: 100, b: 70 },
    plot_bgcolor: 'white',
    paper_bgcolor: 'white',
    font: { size: 11 }
  };

  const config = {
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['lasso2d', 'select2d'],
    toImageButtonOptions: {
      format: 'png',
      filename: 'discoveree_chart',
      height: 800,
      width: 1200,
      scale: 2
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded shadow-sm p-3">
      {plotData.length > 0 ? (
        <div>
          <Plot
            data={plotData}
            layout={layout}
            config={config}
            style={{ width: '100%', height: '600px' }}
            useResizeHandler={true}
          />

          <div className="mt-4 pt-3 border-t border-gray-300">
            <h3 className="text-sm font-bold mb-2 text-gray-800">Manufacturers ({manufacturers.length})</h3>
            <div className="grid grid-cols-5 gap-x-6 gap-y-0.5 text-xs text-gray-700">
              {manufacturers.map(manf => (
                <div key={manf}>{manf}</div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-96 text-gray-500">
          No data to display. Please adjust filters.
        </div>
      )}
    </div>
  );
}
