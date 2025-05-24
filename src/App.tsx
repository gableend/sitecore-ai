import LightWavesBackground from './components/StarryBackground';
import Navigation from './components/Navigation';
import AIChat from './components/AIChat';
import CardSection from './components/CardSection';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative">
      {/* Background animation */}
      <LightWavesBackground />

      {/* Navigation */}
      <Navigation />

      <motion.div
        className="container max-w-6xl mx-auto z-10 px-4 py-10 mt-24 mb-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="text-center mb-16"
          variants={sectionVariants}
        >
          <h1 className="text-5xl md:text-6xl font-semibold mb-6 tracking-tight">
            Welcome to <span className="sitecore-gradient-text">Sitecore.ai</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-700">
            AI is reshaping digital experience. Are you ready?
          </p>

          {/* Video Section */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="rounded-lg overflow-hidden shadow-2xl bg-gray-100">
              <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1920/1080' }}>
                <iframe
                  src="https://share.synthesia.io/embeds/videos/9556b5b6-6cee-4cf1-a8d9-1b3dc50eb7ad"
                  loading="lazy"
                  title="Synthesia video player - AI Keynote"
                  allowFullScreen
                  allow="encrypted-media; fullscreen;"
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
        </motion.div>

        {/* Feature Cards Section */}
        <motion.div
          className="mb-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <CardSection />
        </motion.div>

        {/* AI Chat Section */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <AIChat className="mb-16" />
        </motion.div>
      </motion.div>

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
