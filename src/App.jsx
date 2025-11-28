import { FilterPanel } from './components/FilterPanel';
import { ScatterPlot } from './components/ScatterPlot';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="site-container">
        {/* Header - styled to match original DiscoverEE header */}
        <header className="discoveree-header">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="discoveree-logo">
                <img src="../DiscoverEE_Logo_Black_Red.svg.png" alt="DiscoverEE" className="discoveree-logo-img" />
              </div>
              <nav className="hidden lg:flex gap-6 text-sm text-gray-700">
                <a href="#">Transistors</a>
                <a href="#">Passive</a>
                <a href="#">Crystals</a>
                <a href="#">Calculators</a>
                <a href="#">Modeling</a>
                <a href="#">Resources</a>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <button className="text-sm bg-teal-600 text-white px-3 py-1 rounded">dnp</button>
            </div>
          </div>
          <div className="discoveree-accent" />
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Filters at Top */}
            <div className="mb-4">
              <FilterPanel />
            </div>

            {/* Scatter Plot */}
            <div className="mb-4">
              <ScatterPlot />
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="discoveree-footer">
        <div className="max-w-7xl mx-auto px-6 text-center py-3">
          <p className="text-white text-sm">&copy; 2025 DiscoverEE.io All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
