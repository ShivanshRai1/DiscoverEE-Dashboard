import { FilterPanel } from './components/FilterPanel';
import { ScatterPlot } from './components/ScatterPlot';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white shadow">
        <div className="px-4 py-3">
          <h1 className="text-2xl font-bold">DiscoverEE Dashboard</h1>
          <p className="text-sm text-gray-300">Electronic Component Selection & Comparison Tool</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {/* Filters at Top */}
        <div className="mb-4">
          <FilterPanel />
        </div>

        {/* Scatter Plot */}
        <div className="mb-4">
          <ScatterPlot />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2025 DiscoverEE Dashboard. Powered by React + Vite + Recharts.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
