import React from 'react';
import { Link } from 'react-router-dom';

export default function CardSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
      {/* Agentic Experience Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden group">
        <div className="relative h-56 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 ease-in-out group-hover:scale-110"
            style={{
              backgroundImage: `url('https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/42ced3c5ff8445c78cb0ed050837cfd8?t=sc700x700')`,
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70" />
        </div>
        <div className="p-6 relative bg-white">
          <h3 className="text-2xl font-semibold mb-2">Agentic Experience</h3>
          <p className="text-gray-600 mb-4">
            Discover how autonomous AI agents are revolutionizing digital experiences and changing the way businesses engage with customers.
          </p>
          <Link
            to="/agentic-experience"
            className="inline-flex items-center text-base font-medium text-black border-b-2 border-transparent hover:border-red-500 transition-all duration-150 group"
          >
            <span className="mr-2">Learn more</span>
            <svg
              className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Symposium 2025 Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden group">
        <div className="relative h-56 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 ease-in-out group-hover:scale-110"
            style={{
              backgroundImage: `url('https://symposium.sitecore.com/-/media/sym/2025/images/home/03A-155-WDW-Dolphin-Resort-Email-1200x650.jpg?h=650&w=1200&hash=6594FD332223BC62A920E924148A4E89')`,
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70" />
        </div>
        <div className="p-6 relative bg-white">
          <h3 className="text-2xl font-semibold mb-2">Symposium 2025</h3>
          <p className="text-gray-600 mb-4">
            Join thousands of digital experience professionals in Orlando for our largest event of the year, with exclusive announcements and hands-on workshops.
          </p>
          <Link
            to="/symposium-2025"
            className="inline-flex items-center text-base font-medium text-black border-b-2 border-transparent hover:border-red-500 transition-all duration-150 group"
          >
            <span className="mr-2">Register now</span>
            <svg
              className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
