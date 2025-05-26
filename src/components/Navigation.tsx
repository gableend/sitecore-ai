import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-sm border-b border-gray-200 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src="https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/d1adc91bef154dd4bfcd5ad90a0faf8f?v=b40cb986"
                alt="Sitecore Logo"
                className="h-8"
              />
            </Link>
          </div>

          {/* Center Nav Links */}
          <div className="flex-grow flex justify-center">
            <nav className="hidden md:flex space-x-10">
              <Link to="/agentic-experience" className="text-base font-medium text-gray-900 hover:text-gray-700 border-b-2 border-transparent hover:border-red-500 transition-all duration-150 px-2 py-1">
                Agentic Experience
              </Link>
              <Link to="/symposium-2025" className="text-base font-medium text-gray-900 hover:text-gray-700 border-b-2 border-transparent hover:border-red-500 transition-all duration-150 px-2 py-1">
                Symposium 2025
              </Link>
            </nav>
          </div>

          {/* CTA */}
          <div className="hidden md:flex flex-shrink-0">
            <a
              href="https://www.sitecore.com"
              className="inline-flex items-center justify-center pl-6 pr-5 py-2 border border-transparent rounded-full shadow-sm text-white text-base font-medium transition-all duration-150 group"
              style={{ backgroundColor: '#FF2A1D', borderColor: '#FF2A1D' }}
            >
              <span className="mr-2">Visit Sitecore.com</span>
              <img
                src="/cta-arrow.svg"
                alt="Arrow"
                className="w-3 h-3 transform transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center ml-auto">
            <button
              type="button"
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {/* Menu icon */}
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="pt-2 pb-4 px-4 space-y-1">
            <Link to="/agentic-experience" className="block py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md">
              Agentic Experience
            </Link>
            <Link to="/symposium-2025" className="block py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md">
              Symposium 2025
            </Link>
            <a
              href="https://www.sitecore.com"
              className="flex items-center mt-4 py-2 px-3 text-base font-medium text-white rounded-full"
              style={{ backgroundColor: '#FF2A1D' }}
            >
              <span className="mr-2">Visit Sitecore.com</span>
              <img
                src="/cta-arrow.svg"
                alt="Arrow"
                className="w-3 h-3"
              />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
