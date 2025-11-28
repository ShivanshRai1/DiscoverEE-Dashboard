import { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { useStore } from '../store/useStore';

// Color palette for manufacturers (vibrant, alternating hues)
const MANUFACTURER_COLORS = [
  '#c0392b', '#e74c3c', '#2980b9', '#3498db', '#27ae60',
  '#2ecc71', '#f39c12', '#f1c40f', '#8e44ad', '#9b59b6',
  '#16a085', '#1abc9c', '#d35400', '#e67e22', '#34495e',
  '#6c5ce7', '#e84393', '#00b894', '#0984e3', '#b2bec3'
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
    vds: 'Breakdown Voltage(V)',
    rdsontyp10vgs25ta: 'On-Resistance(ohm)',
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
          hovertemplate: '%{text}<br>' + axisLabels[chartXAxis] + ': %{x:.0f} V<br>' + axisLabels[chartYAxis] + ': %{y:.3e} Ω<extra></extra>',
          hoverlabel: { bgcolor: 'rgba(255,255,255,0.96)', bordercolor: '#d1d5db', font: { size: 13, color: '#111827' } },
          marker: {
            size: 8,
            color: manfColorMap[manf],
            symbol: 'circle-open',
            line: {
              color: manfColorMap[manf],
              width: 1.6
            },
            opacity: 0.95
          },
          hoverinfo: 'text'
        });
      }
    });
    
    return traces;
  }, [devices, manufacturers, chartXAxis, chartYAxis, manfColorMap, axisLabels]);

  const layout = {
    title: {
      text: `Select & Compare Products (Count: ${devices.length}) - Powered by DiscoverEE`,
      font: { size: 15, family: 'Helvetica, Arial, sans-serif', weight: 'bold' },
      x: 0.5,
      xanchor: 'center',
      // nudge title slightly upward for better balance with legend
      y: 1.06,
      yanchor: 'top'
    },
    xaxis: {
      title: {
        text: axisLabels[chartXAxis],
        font: { size: 13, color: '#374151', family: 'Helvetica, Arial, sans-serif' },
        standoff: 10
      },
      type: 'linear',
      showgrid: true,
      gridcolor: '#e6e6e6',
      gridwidth: 1,
      tickfont: { size: 11, family: 'Helvetica, Arial, sans-serif' },
      tickformat: '.0f'
    },
    yaxis: {
      title: {
        text: axisLabels[chartYAxis],
        font: { size: 13, color: '#374151', family: 'Helvetica, Arial, sans-serif' },
        standoff: 40
      },
      type: displayType === 'log' ? 'log' : 'linear',
      showgrid: true,
      gridcolor: '#e6e6e6',
      gridwidth: 1,
      tickfont: { size: 11, family: 'Helvetica, Arial, sans-serif' },
      exponentformat: 'e',
      tickformat: displayType === 'log' ? '.0e' : undefined,
      automargin: true,
      minor: { ticklen: 4, gridcolor: '#f6f6f6', gridwidth: 0.5 }
    },
    hovermode: 'closest',
    // enable Plotly's built-in legend (restore original in-plot legend positioning)
    showlegend: true,
    legend: {
      orientation: 'h',
      // anchor legend by its bottom and nudge it slightly above the plot area
      y: 1.01,
      yanchor: 'bottom',
      x: 0.5,
      xanchor: 'center',
      bgcolor: 'rgba(255,255,255,0.95)',
      bordercolor: '#e5e7eb',
      borderwidth: 1,
      traceorder: 'normal',
      font: { size: 11, family: 'Helvetica, Arial, sans-serif' },
      itemclick: 'toggleothers',
      itemdoubleclick: 'toggle'
    },
    shapes: [
      // vertical baseline at x = 0
      { type: 'line', x0: 0, x1: 0, y0: 0, y1: 1, yref: 'paper', line: { color: '#111111', width: 2 } }
    ],
    // increase top margin slightly so legend sits above the plot without overlapping
    margin: { l: 80, r: 40, t: 130, b: 50 },
    // set a larger fixed height so the chart occupies more vertical space like the original
    height: 820,
    plot_bgcolor: 'white',
    paper_bgcolor: 'white',
    font: { size: 11, family: 'Helvetica, Arial, sans-serif' },
    hoverlabel: { bgcolor: 'rgba(255,255,255,0.96)', bordercolor: '#d1d5db', font: { family: 'Helvetica, Arial, sans-serif', color: '#111827', size: 13 } }
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
  <div className="bg-white border border-gray-300 rounded shadow-sm py-2 px-3">
      {plotData.length > 0 ? (
        <div>
          <Plot
            data={plotData}
            layout={layout}
            config={config}
            style={{ width: '100%', height: '820px' }}
            useResizeHandler={true}
          />

          <div style={{ display: 'none' }} className="mt-4 pt-3 border-t border-gray-300">
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
