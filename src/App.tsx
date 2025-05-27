import LightWavesBackground from './components/StarryBackground';
import Navigation from './components/Navigation';
import AIChat from './components/AIChat';
import TrustedBrandsSection from './components/TrustedBrandsSection';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

function App() {
  const addMessageRef = useRef<((prompt: string, response: string, caseStudy?: any) => void) | null>(null);
  const aiChatRef = useRef<HTMLDivElement>(null);

  const handleLogoClick = (prompt: string, response: string, caseStudy?: any) => {
    if (addMessageRef.current) {
      addMessageRef.current(prompt, response, caseStudy);
    }
  };

  const handleAIChatReady = (addMessage: (prompt: string, response: string, caseStudy?: any) => void) => {
    addMessageRef.current = addMessage;
  };

  const scrollToAI = () => {
    if (aiChatRef.current) {
      aiChatRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative">
      {/* Background animation */}
      <LightWavesBackground />

      {/* Navigation */}
      <Navigation />

      <div className="container max-w-6xl mx-auto z-10 px-4 py-10 mt-24 mb-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6 tracking-tight">
            Welcome to <span className="sitecore-gradient-text">Sitecore.ai</span>
          </h1>
          <p className="text-xl max-w-4xl mx-auto mb-8 text-gray-700">
            AI is reshaping digital experience. Are you ready?
          </p>

          {/* Video Section */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="rounded-lg overflow-hidden shadow-2xl bg-gray-100">
              <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1920/1080' }}>
                <iframe
                  src="https://share.synthesia.io/embeds/videos/ed600396-5007-4059-805c-74c8705d1c16?autoplay=1"
                  loading="lazy"
                  title="Synthesia video player - AI Keynote"
                  allowFullScreen
                  allow="encrypted-media; fullscreen; autoplay;"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    border: 'none',
                    padding: 0,
                    margin: 0,
                    overflow: 'hidden'
                  }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* AI Chat Section */}
        <div ref={aiChatRef}>
          <AIChat className="mb-10" onReady={handleAIChatReady} />
        </div>

        {/* Trusted Brands Section - Right underneath AI */}
        <TrustedBrandsSection onLogoClick={handleLogoClick} onScrollToAI={scrollToAI} />
      </div>

      <footer className="mt-8 text-center text-sm text-gray-500 w-full">
        <div className="border-t border-gray-200 pt-8 pb-10 w-full max-w-lg mx-auto px-4">
          <p>© 2025 Sitecore. All rights reserved.</p>
        </div>
      </footer>

      {/* Sitecore footer gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 sitecore-gradient" />
    </div>
  );
}

export default App;
