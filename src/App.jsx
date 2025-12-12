import { FilterPanel } from './components/FilterPanel';
import { ScatterPlot } from './components/ScatterPlot';
import { useState } from 'react';
import './App.css';

function App() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="discoveree-header">
        <div className="max-w-7xl mx-auto py-3 flex items-center justify-between" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
          <div className="flex items-center gap-6">
            <div className="discoveree-logo">
              <img src="/logo" alt="DiscoverEE" className="discoveree-logo-img" />
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
          <div className="flex items-center gap-3" style={{ marginRight: '120px' }}>
            <div 
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button 
                className="bg-teal-600 text-white rounded text-sm font-medium hover:bg-teal-700 transition-colors border-2 border-teal-600"
                style={{ padding: '8px 16px' }}
              >
                dnp
              </button>
              
              {showDropdown && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 rounded-xl shadow-xl overflow-hidden" style={{ width: '280px', zIndex: 1000, backgroundColor: '#0f766e', padding: '20px' }}>
                  {/* Triangle pointer */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0" style={{
                    borderLeft: '10px solid transparent',
                    borderRight: '10px solid transparent',
                    borderBottom: '10px solid #0f766e'
                  }}></div>
                  
                  <div className="px-6 py-5 text-white text-center font-semibold text-lg mb-5" style={{ backgroundColor: '#0f766e' }}>
                    Available : $0
                  </div>
                  <button className="w-full px-6 py-4 text-center bg-white text-gray-800 hover:bg-gray-50 transition-colors font-medium text-base mb-4 rounded-lg" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    Survey Form
                  </button>
                  <button className="w-full px-6 py-4 text-center bg-white text-gray-800 hover:bg-gray-50 transition-colors font-medium text-base mb-4 rounded-lg" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    Landing Page
                  </button>
                  <button className="w-full px-6 py-4 text-center bg-white text-gray-800 hover:bg-gray-50 transition-colors font-medium text-base mb-4 rounded-lg" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    My Activity
                  </button>
                  <button className="w-full px-6 py-4 text-center bg-white text-gray-800 hover:bg-gray-50 transition-colors font-medium text-base mb-4 rounded-lg" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    Change Password
                  </button>
                  <button className="w-full px-6 py-4 text-center bg-white text-gray-800 hover:bg-gray-50 transition-colors font-medium text-base rounded-lg" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    Signout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="discoveree-accent" />
      </header>

      {/* Main Content - centered and padded for polish */}
      <main className="py-4">
        <div className="max-w-7xl mx-auto" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
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
