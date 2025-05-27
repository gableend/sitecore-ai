import { useState, useEffect, useRef } from 'react';

interface LogoData {
  name: string;
  url: string;
  description: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  caseStudyImage?: string;
}

interface TrustedBrandsSectionProps {
  onLogoClick?: (prompt: string, response: string, caseStudy?: LogoData) => void;
  onScrollToAI?: () => void;
}

// Email Signup Component
function EmailSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Simulate API call - replace with actual endpoint
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      setIsSubmitted(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 px-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">Thank you for subscribing!</h3>
          <p className="text-green-700">
            You'll receive insights on how AI is transforming digital experiences and the latest updates from Sitecore.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto text-center py-12 px-6">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900">
          Stay Ahead of the AI Revolution
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Get exclusive insights on how AI is reshaping digital experience. Join thousands of leaders transforming their customer journeys.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-200"
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Subscribing...
            </span>
          ) : (
            'Get Insights'
          )}
        </button>
      </form>

      {error && (
        <p className="mt-3 text-sm text-red-600 animate-fade-in">{error}</p>
      )}

      <p className="mt-4 text-xs text-gray-500">
        By subscribing, you agree to receive emails about AI and digital experience insights. Unsubscribe anytime.
      </p>
    </div>
  );
}

const logoData: LogoData[] = [
  {
    name: "Michelin Experiences",
    url: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/f9b0ab95dd7c4ee2ba2fbe875ea9ed14?t=sc260x168",
    description: "Global tire and mobility solutions leader",
    industry: "Automotive & Manufacturing",
    challenge: "Delivering unified digital experiences across diverse business units and geographic markets",
    solution: "Sitecore Experience Platform with personalization and content management capabilities",
    results: ["40% increase in customer engagement", "Unified global brand experience", "Streamlined content operations"],
    caseStudyImage: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/0fc267e5c6a6498a89d7300c59c90b4b?t=sc900x1300"
  },
  {
    name: "HSBC CMB",
    url: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/46db31a73e2649839776bb9a9757d143?t=sc260x168",
    description: "Commercial banking solutions",
    industry: "Financial Services",
    challenge: "Creating personalized banking experiences for commercial clients across multiple channels",
    solution: "Sitecore CDP and Personalize for real-time customer insights and targeted experiences",
    results: ["35% improvement in customer satisfaction", "Enhanced cross-sell opportunities", "Reduced time to market for new services"],
    caseStudyImage: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/07e9a64627d74c96a1a3e91c3bacaf76?t=sc900x1300"
  },
  {
    name: "United Airlines",
    url: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/2e1ff029192d4707851468181648142e?t=sc260x168",
    description: "Major American airline",
    industry: "Travel & Aviation",
    challenge: "Managing complex travel experiences and customer touchpoints across digital and physical channels",
    solution: "Sitecore Experience Platform with omnichannel orchestration",
    results: ["30% increase in digital bookings", "Improved customer journey optimization", "Enhanced operational efficiency"],
    caseStudyImage: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/dd0b00d0f22f468b98ae102baa69c2b3?t=sc900x1300"
  },
  {
    name: "Procter & Gamble",
    url: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/98aa54300e844fa99c9411685f330676?t=sc260x168",
    description: "Consumer goods corporation",
    industry: "Consumer Products",
    challenge: "Managing multiple brand portfolios with consistent yet differentiated digital experiences",
    solution: "Sitecore XM Cloud with Content Hub for centralized brand management",
    results: ["50% faster content deployment", "Consistent brand experiences globally", "Reduced operational costs"],
    caseStudyImage: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/7dc29125a5df4b8082b1852da832d281?t=sc900x1300"
  },
  {
    name: "Microsoft",
    url: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/dcf3bd9373b44c4cb52152377c1d7688?t=sc260x168",
    description: "Technology corporation",
    industry: "Technology",
    challenge: "Scaling partner and customer experiences across diverse product ecosystems",
    solution: "Sitecore Experience Cloud with integrated commerce and personalization",
    results: ["Enhanced partner engagement", "Streamlined customer onboarding", "Improved product adoption rates"],
    caseStudyImage: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/f98bbe7c438c41228b8d726def1dc906?t=sc900x1300"
  },
  {
    name: "Mandarin Oriental Hotel Group",
    url: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/dfff60f1236a4dd2997de61577ab3f47?t=sc260x168",
    description: "Luxury hotel group",
    industry: "Hospitality",
    challenge: "Delivering personalized luxury experiences across global properties and digital touchpoints",
    solution: "Sitecore Personalize with integrated booking systems and guest management",
    results: ["45% increase in direct bookings", "Enhanced guest satisfaction scores", "Improved revenue per guest"],
    caseStudyImage: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/d8e0ea7c56d440f6b68d185ac6dab6a8?t=sc900x1300"
  },
  {
    name: "Bridgestone",
    url: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/94c48f2f89a944d8a21ee3dd3cfd355f?t=sc260x168",
    description: "Tire and rubber company",
    industry: "Automotive",
    challenge: "Creating cohesive digital experiences for B2B and B2C customers across multiple markets",
    solution: "Sitecore Experience Platform with commerce integration",
    results: ["40% growth in online sales", "Improved customer service efficiency", "Enhanced dealer portal experience"],
    caseStudyImage: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/5c686aa5a6a0488ebb5de002587ce263?t=sc900x1300"
  },
  {
    name: "Royal Canin",
    url: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/71154c190946441dbb0ad50987c9cf12?t=sc260x168",
    description: "Pet food manufacturer",
    industry: "Pet Care",
    challenge: "Educating pet owners while driving product recommendations across global markets",
    solution: "Sitecore Experience Platform with personalized content delivery",
    results: ["60% increase in customer engagement", "Improved product discovery", "Enhanced veterinarian partnerships"],
    caseStudyImage: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/80faf2826608417bbb8699d18e8760ce?t=sc900x1300"
  },
  {
    name: "L'Oréal",
    url: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/e6534edbf53a431c8327233e34ea3055?t=sc260x168",
    description: "Beauty and cosmetics leader",
    industry: "Beauty & Consumer Goods",
    challenge: "Managing diverse brand portfolios with personalized beauty experiences across channels",
    solution: "Sitecore Experience Cloud with AI-powered personalization",
    results: ["55% increase in conversion rates", "Enhanced omnichannel experiences", "Improved customer lifetime value"],
    caseStudyImage: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/79baa603762e44dbb7f095f277b2289e?t=sc900x1300"
  },
  {
    name: "British Red Cross",
    url: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/2cee3445185b4783ae13cf34e2b7e094?t=sc260x168",
    description: "Humanitarian organization",
    industry: "Non-Profit",
    challenge: "Engaging donors and volunteers while providing critical information during emergencies",
    solution: "Sitecore Experience Platform with crisis communication capabilities",
    results: ["Improved emergency response times", "Enhanced donor engagement", "Streamlined volunteer coordination"],
    caseStudyImage: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/c92cc570f306485fa3705ac7f32e9cf8?t=sc900x1300"
  },
  {
    name: "Cochlear Ltd",
    url: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/80832c1aaf3447b8b80ff4a6bb1c5aea?t=sc260x168",
    description: "Hearing implant solutions",
    industry: "Healthcare Technology",
    challenge: "Providing educational resources and support for patients, families, and healthcare professionals",
    solution: "Sitecore Experience Platform with personalized healthcare journeys",
    results: ["Improved patient outcomes", "Enhanced healthcare provider resources", "Streamlined support processes"],
    caseStudyImage: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/ec9646d49f1e4b7383fae51eb9627a6c?t=sc900x1300"
  },
  {
    name: "Fujitsu",
    url: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/45a21e3809454cc39412d1043d06e489?t=sc260x168",
    description: "Global Digital Services",
    industry: "Technology Services",
    challenge: "Showcasing complex technology solutions while managing global partner ecosystems",
    solution: "Sitecore Experience Platform with partner portal integration",
    results: ["Enhanced partner collaboration", "Improved lead generation", "Streamlined service delivery"],
    caseStudyImage: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/c07151b7a20c4c95b9b725539b7fa15f?t=sc900x1300"
  },
  {
    name: "Kimberly Clark",
    url: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/78d19f0a228a4d78b97bdb76bdd89b5e?t=sc260x168",
    description: "Personal care products",
    industry: "Consumer Products",
    challenge: "Building brand loyalty across diverse product categories and consumer segments",
    solution: "Sitecore Personalize with integrated e-commerce capabilities",
    results: ["40% increase in customer retention", "Enhanced brand differentiation", "Improved market responsiveness"],
    caseStudyImage: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/1a5bb05d82924cc88dcda4d911f65836?t=sc900x1300"
  },
  {
    name: "Atkore",
    url: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/4a7b290eec094d3c988f929765e4a6dc?t=sc260x168",
    description: "Electrical infrastructure solutions",
    industry: "Infrastructure",
    challenge: "Simplifying complex product catalogs for contractors and distributors",
    solution: "Sitecore Experience Platform with product configuration tools",
    results: ["Simplified product selection", "Enhanced distributor relationships", "Improved sales efficiency"],
    caseStudyImage: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/57225163b45146dbbde3729f69569892?t=sc900x1300"
  },
  {
    name: "Meritage Homes Corp.",
    url: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/d250291a05474ae8a3c91912a82796d9?t=sc260x168",
    description: "Homebuilding company",
    industry: "Real Estate",
    challenge: "Guiding homebuyers through complex decision processes across multiple markets",
    solution: "Sitecore Experience Platform with interactive home configurator",
    results: ["Enhanced buyer experience", "Reduced sales cycle time", "Improved customer satisfaction"],
    caseStudyImage: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/f54155f5735643fba860346758f4a389?t=sc900x1300"
  }
];

export default function TrustedBrandsSection({ onLogoClick, onScrollToAI }: TrustedBrandsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Calculate the width of one complete set of logos
    const logoWidth = 180; // Fixed width for consistency
    const gap = 32; // Gap between logos
    const oneSetWidth = logoData.length * (logoWidth + gap);

    let animationId: number;
    let startTime: number;
    const duration = 27000; // 27 seconds (20% slower than 22.5s)

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = (elapsed % duration) / duration;

      const translateX = -progress * oneSetWidth;
      container.style.transform = `translateX(${translateX}px)`;

      if (isAnimating) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isAnimating]);

  const handleLogoClick = (logo: LogoData) => {
    const prompt = `Tell me about ${logo.name}'s success story with Sitecore`;

    // Pass structured case study data instead of markdown text
    const response = `Case study data for ${logo.name} loaded.`;

    if (onLogoClick) {
      onLogoClick(prompt, response, logo);
    }

    if (onScrollToAI) {
      setTimeout(() => {
        onScrollToAI();
      }, 200);
    }
  };

  const LogoItem = ({ logo }: { logo: LogoData }) => (
    <div
      className="flex-shrink-0"
      style={{ width: '180px' }}
    >
      <button
        className="group cursor-pointer focus:outline-none w-full"
        onClick={() => handleLogoClick(logo)}
      >
        <div className="relative flex h-[120px] w-full overflow-visible">
          <img
            alt={logo.name}
            width="180"
            height="120"
            className="w-full h-full object-contain p-4 transition-all duration-200"
            src={logo.url}
          />
          <span className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-100 transition-opacity duration-200 text-xs">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </span>
        </div>
      </button>
    </div>
  );

  return (
    <>
      <section className="w-screen overflow-hidden -ml-[50vw] left-1/2 relative mt-5">
        <div className="relative overflow-hidden">
          <div
            ref={containerRef}
            className="flex items-center gap-8"
            style={{ width: 'max-content' }}
          >
            {Array.from({ length: 3 }).map((_, setIndex) =>
              logoData.map((logo, logoIndex) => (
                <LogoItem
                  key={`${setIndex}-${logoIndex}`}
                  logo={logo}
                />
              ))
            )}
          </div>
        </div>
      </section>
      <EmailSignup />
    </>
  );
}
