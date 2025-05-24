import LightWavesBackground from '../components/StarryBackground';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';

export default function AgenticExperience() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative">
      {/* Background animation */}
      <LightWavesBackground />

      {/* Navigation */}
      <Navigation />

      <div className="container max-w-5xl mx-auto z-10 px-4 py-10 mt-24 mb-10">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6 tracking-tight">
            Agentic <span className="sitecore-gradient-text">Experience</span>
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl mb-6 text-gray-700">
              The future of digital experience—powered by autonomous AI agents.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="relative h-64 md:h-80 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/42ced3c5ff8445c78cb0ed050837cfd8?t=sc700x700')`,
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70" />
          </div>
        </div>

        <div className="prose prose-lg max-w-4xl mx-auto">
          <h2>Transforming Digital Experiences with AI Agents</h2>
          <p>
            Agentic Experience represents the next evolution in digital experience platforms. By leveraging autonomous AI agents, Sitecore is revolutionizing how businesses interact with customers, creating more personalized, responsive, and intelligent digital experiences.
          </p>

          <h2>Key Features</h2>
          <ul>
            <li><strong>Autonomous Personalization:</strong> AI agents that learn and adapt to individual user preferences in real-time.</li>
            <li><strong>Intelligent Content Delivery:</strong> Content that automatically reorganizes and presents itself based on user behavior and context.</li>
            <li><strong>Conversational Interfaces:</strong> Natural language processing that enables more human-like interactions across digital touchpoints.</li>
            <li><strong>Predictive Analytics:</strong> Advanced analytics that anticipate user needs before they express them.</li>
          </ul>

          <h2>Join the Revolution</h2>
          <p>
            At Symposium 2025, we will unveil how Agentic Experience is transforming the way organizations engage with their audience. Be among the first to witness this technological breakthrough that will reshape the future of digital experiences.
          </p>

          <div className="mt-12 text-center">
            <Link to="/" className="inline-flex items-center px-6 py-3 rounded-md font-medium sitecore-gradient text-white transition-transform hover:scale-105">
              Back to Countdown
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
