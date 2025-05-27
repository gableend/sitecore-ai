import Navigation from '../components/Navigation';
import CountdownTimer from '../components/CountdownTimer';
import NewsletterSignup from '../components/NewsletterSignup';
import SocialShare from '../components/SocialShare';
import { Link } from 'react-router-dom';

export default function AgenticEvents() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section with Orlando Venue Background */}
      <div
        className="relative w-full min-h-screen flex items-center justify-center pt-16 bg-cover bg-center bg-no-repeat bg-gray-800"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3), rgba(0,0,0,0.1)), url('https://symposium.sitecore.com/-/media/sym/2025/images/home/03A-155-WDW-Dolphin-Resort-Email-1200x650.jpg?h=650&w=1200&hash=6594FD332223BC62A920E924148A4E89')`,
        }}
      >

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-semibold mb-4 tracking-tight text-white">
            Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400">BIG</span> is coming
          </h1>

          <p className="text-xl md:text-2xl mb-4 text-gray-100">
            The future of digital experience—powered by autonomous AI agents.
          </p>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Join us in Orlando at Symposium for the big reveal.
          </p>

          {/* Countdown Timer */}
          <div className="mb-8">
            <CountdownTimer className="" textColor="text-white" />
          </div>

          {/* CTA Button */}
          <div className="mb-8">
            <a
              href="https://symposium.sitecore.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white sitecore-gradient shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Register for Symposium 2025
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto z-10 px-4 py-10">

        {/* Events Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
              Join the AI conversation
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Register for upcoming events or revisit past discussions shaping the future of agentic experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 border border-purple-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Upcoming Events</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">Sitecore Symposium 2025</h4>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Featured</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    The premier event for digital experience innovation, featuring the launch of Agentic Experience platform.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">November 3, 2025 • Orlando, FL</span>
                    <span className="text-sm text-purple-600 font-medium">You're here! →</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">AI Experience Masterclass</h4>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Register</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Deep dive into implementing AI-powered digital experiences with industry experts.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Q1 2025 • Virtual</span>
                    <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                      Register →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Past Discussions</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">Future of Search Summit</h4>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">Recording</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Industry leaders discussed how AI is transforming search and discovery experiences.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">October 2024 • 2.5k attendees</span>
                    <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                      Watch replay →
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">Conversational UX Workshop</h4>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">Resources</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Hands-on workshop on building natural language interfaces for digital experiences.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">September 2024 • 1.8k attendees</span>
                    <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                      Get resources →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-gray-500 w-full">
        <div className="border-t border-gray-200 pt-8 pb-10 w-full max-w-lg mx-auto px-4">
          <p>© 2025 Sitecore. All rights reserved.</p>
        </div>
      </footer>

      {/* Sitecore footer gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 sitecore-gradient"></div>
    </div>
  );
}
