import LightWavesBackground from '../components/StarryBackground';
import Navigation from '../components/Navigation';
import CountdownTimer from '../components/CountdownTimer';
import NewsletterSignup from '../components/NewsletterSignup';
import SocialShare from '../components/SocialShare';
import { Link } from 'react-router-dom';

export default function Symposium2025() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative">
      {/* Background animation */}
      <LightWavesBackground />

      {/* Navigation */}
      <Navigation />

      <div className="container max-w-5xl mx-auto z-10 px-4 py-10 mt-24 mb-10">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-semibold mb-4 tracking-tight">
            Something <span className="sitecore-gradient-text">BIG</span> is coming
          </h1>

          <p className="text-xl md:text-2xl mb-4 text-gray-700">
            The future of digital experience—powered by autonomous AI agents.
          </p>
          <p className="text-lg md:text-xl mb-12 text-gray-600">
            Join us in Orlando at Symposium for the big reveal.
          </p>
        </div>

        {/* Countdown Timer */}
        <CountdownTimer className="mb-16" />

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="relative h-64 md:h-80 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://symposium.sitecore.com/-/media/sym/2025/images/home/03A-155-WDW-Dolphin-Resort-Email-1200x650.jpg?h=650&w=1200&hash=6594FD332223BC62A920E924148A4E89')`,
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70" />
          </div>
        </div>

        <div className="prose prose-lg max-w-4xl mx-auto">
          <h2>The World's Premier Digital Experience Event</h2>
          <p>
            Sitecore Symposium brings together the brightest minds in digital experience to share insights, innovations, and inspirations. The 2025 edition will be our most exciting yet, featuring the grand unveiling of revolutionary new technologies that will redefine the industry.
          </p>

          <h2>Event Details</h2>
          <ul>
            <li><strong>Date:</strong> November 3rd, 2025</li>
            <li><strong>Location:</strong> Walt Disney World Dolphin Resort, Orlando, Florida</li>
            <li><strong>Featured Announcement:</strong> Agentic Experience Platform Launch</li>
          </ul>

          <h2>Why Attend</h2>
          <ul>
            <li>Be the first to experience the revolutionary Agentic Experience Platform</li>
            <li>Network with industry leaders and Sitecore experts</li>
            <li>Attend hands-on workshops and certification courses</li>
            <li>Gain practical insights from customer success stories</li>
            <li>Enjoy exclusive entertainment and networking events</li>
          </ul>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 my-8">
            <h3 className="text-xl font-semibold mb-3">Book Your Stay</h3>
            <p className="mb-4">
              Secure your accommodations at the Walt Disney World Dolphin Resort with our special Symposium rate. Limited rooms available.
            </p>
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 rounded-md font-medium sitecore-gradient text-white transition-transform hover:scale-105"
            >
              Reserve Your Room
            </a>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 my-8">
            <h3 className="text-xl font-semibold mb-3">Register for Updates</h3>
            <div className="max-w-md mx-auto">
              <NewsletterSignup />
            </div>
          </div>

          <div className="my-8 text-center">
            <h3 className="text-xl font-semibold mb-6">Share the Excitement</h3>
            <SocialShare />
          </div>

          <div className="mt-12 text-center">
            <Link to="/" className="inline-flex items-center px-6 py-3 rounded-md font-medium sitecore-gradient text-white transition-transform hover:scale-105">
              Back to Home
            </Link>
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
