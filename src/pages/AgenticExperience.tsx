import { useState, useEffect } from 'react';
import LightWavesBackground from '../components/StarryBackground';
import Navigation from '../components/Navigation';
import ContentGrid, { type ContentItem } from '../components/ContentGrid';
import { digitalVisionariesData } from '../components/DigitalVisionaries';
import { Link, useSearchParams } from 'react-router-dom';

// Add Speech Recognition types
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: ((event: Event) => void) | null;
  start(): void;
  stop(): void;
}

interface HotTopic {
  id: string;
  title: string;
  description: string;
  image: string;
  content: {
    video: string;
    podcast: string;
    text: string;
  };
}

interface SearchComponentProps {
  onSearch: (query: string, mode: 'search' | 'stream') => void;
}

const SearchComponent = ({ onSearch }: SearchComponentProps) => {
  const [searchMode, setSearchMode] = useState<'search' | 'stream'>('search');
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  // Suggested searches based on hot topics
  const suggestedSearches = [
    "What is personalization at AI scale?",
    "How does content transformation work?",
    "What is conversational UX?",
    "What is the future of search?",
    "How do generative ads work?",
    "What are experience agents?"
  ];

  // Predictive suggestions based on input
  const allSuggestions = [
    ...suggestedSearches,
    "How to implement AI personalization",
    "Best practices for conversational interfaces",
    "AI-powered content management",
    "Dynamic content optimization",
    "Voice search optimization",
    "Machine learning for marketing",
    "Automated content generation",
    "Real-time personalization strategies"
  ];

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  }, []);

  // Filter suggestions based on query
  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleVoiceInput = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
        setIsListening(false);
      } else {
        recognition.start();
        setIsListening(true);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search submitted:', query, searchMode);
    if (query.trim()) {
      onSearch(query, searchMode);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any as React.FormEvent);
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion, searchMode);
  };

  const handleInputFocus = () => {
    if (query.trim().length === 0) {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicking
    setTimeout(() => {
      setShowSuggestions(false);
    }, 150);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-12 relative">
      <form onSubmit={handleSubmit}>
        <div className="bg-white w-full outline-none focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-500/20 font-sans flex items-center text-gray-900 border border-gray-200 rounded-2xl shadow-sm transition-all duration-75 py-3 px-0 gap-y-4 grid items-center hover:shadow-md">
          <div className="px-3 flex w-full">
            <div className="flex-grow flex-shrink p-3 rounded-full order-1 overflow-hidden relative flex h-full w-full">
              <textarea
                placeholder="Ask anything about AI and digital experience..."
                className="overflow-auto max-h-[45vh] lg:max-h-[40vh] sm:max-h-[25vh] outline-none w-full font-sans caret-purple-500 resize-none selection:bg-purple-500/20 selection:text-gray-900 placeholder:select-none bg-white text-gray-900 placeholder-gray-500 scrollbar-thin scrollbar-track-transparent"
                autoComplete="off"
                rows={1}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                style={{ height: '24px !important' }}
              />
            </div>

            {/* Toggle Section */}
            <div className="bg-white gap-2 flex rounded-l-lg order-0 ml-1">
              <div className="gap-1 flex items-center">
                <div className="group relative isolate flex h-fit focus:outline-none -ml-2 mr-2 min-w-fit">
                  <div className="bg-gray-100 absolute inset-0 rounded-[10px] transition-colors duration-300"></div>
                  <div className="p-1 flex items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => setSearchMode('search')}
                      title="Search content"
                      className={`segmented-control relative focus:outline-none transition-all duration-300 ${
                        searchMode === 'search' ? 'z-10' : ''
                      }`}
                    >
                      {searchMode === 'search' && (
                        <div className="bg-white border border-purple-500/30 shadow-lg shadow-purple-500/10 absolute inset-0 block rounded-lg transition-colors duration-300"></div>
                      )}
                      <div className="relative z-10 flex h-8 w-8 items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className={`transition-colors duration-300 ${searchMode === 'search' ? 'text-purple-600' : 'text-gray-400'}`} fill="currentColor" fillRule="evenodd">
                          <path d="M11 2.125a8.378 8.378 0 0 1 8.375 8.375c0 .767-.1 1.508-.304 2.22l-.029.085a.875.875 0 0 1-1.653-.566l.054-.206c.12-.486.182-.996.182-1.533A6.628 6.628 0 0 0 11 3.875 6.628 6.628 0 0 0 4.375 10.5a6.628 6.628 0 0 0 10.402 5.445c.943-.654 2.242-.664 3.153.109l.176.165.001.002 4.066 4.184a.875.875 0 0 1-1.256 1.22l-4.064-4.185-.104-.088c-.263-.183-.646-.197-.975.03l-.001.003A8.378 8.378 0 0 1 2.625 10.5 8.378 8.378 0 0 1 11 2.125Zm0 7.09a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Z" />
                        </svg>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSearchMode('stream')}
                      title="Stream AI assistance"
                      className={`segmented-control relative focus:outline-none transition-all duration-300 ${
                        searchMode === 'stream' ? 'z-10' : ''
                      }`}
                    >
                      {searchMode === 'stream' && (
                        <div className="sitecore-gradient border border-white/20 shadow-lg shadow-red-500/20 absolute inset-0 block rounded-lg transition-colors duration-300"></div>
                      )}
                      <div className="relative z-10 flex h-8 w-8 items-center justify-center">
                        <img
                          src={searchMode === 'stream'
                            ? "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/cd19406a75f8481680f97b3cf791d967?v=20f609ce"
                            : "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/d9b7166270574983b90f2e57d1077af1?v=735299ad"
                          }
                          alt="Stream AI"
                          title="Stream AI assistance"
                          width="16"
                          height="16"
                          className="transition-all duration-300"
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Controls */}
            <div className="bg-white flex items-center justify-self-end rounded-full order-2 mr-1">
              {/* Voice Input */}
              <div className="relative">
                <button
                  type="button"
                  aria-label="Voice input"
                  onClick={handleVoiceInput}
                  className={`focus-visible:bg-gray-100 hover:bg-gray-100 font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button justify-center text-center items-center rounded-lg cursor-pointer active:scale-[0.97] active:duration-150 origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-[9/8] ${
                    isListening ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <div className="flex items-center min-w-0 font-medium gap-1.5 justify-center">
                    <div className="flex shrink-0 items-center justify-center size-4">
                      {isListening ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="animate-pulse">
                          <path d="M19 9a1 1 0 0 1 1 1a8 8 0 0 1 -6.999 7.938l-.001 2.062h3a1 1 0 0 1 0 2h-8a1 1 0 0 1 0 -2h3v-2.062a8 8 0 0 1 -7 -7.938a1 1 0 1 1 2 0a6 6 0 0 0 12 0a1 1 0 0 1 1 -1m-7 -8a4 4 0 0 1 4 4v5a4 4 0 1 1 -8 0v-5a4 4 0 0 1 4 -4" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 9a1 1 0 0 1 1 1a8 8 0 0 1 -6.999 7.938l-.001 2.062h3a1 1 0 0 1 0 2h-8a1 1 0 0 1 0 -2h3v-2.062a8 8 0 0 1 -7 -7.938a1 1 0 1 1 2 0a6 6 0 0 0 12 0a1 1 0 0 1 1 -1m-7 -8a4 4 0 0 1 4 4v5a4 4 0 1 1 -8 0v-5a4 4 0 0 1 4 -4" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              </div>

              {/* Submit Button */}
              <div className="ml-2">
                <button
                  type="submit"
                  aria-label="Submit search"
                  disabled={!query.trim()}
                  className="sitecore-gradient text-white hover:opacity-80 font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button justify-center text-center items-center rounded-lg cursor-pointer active:scale-[0.97] active:duration-150 origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-[9/8] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center min-w-0 font-medium gap-1.5 justify-center">
                    <div className="flex shrink-0 items-center justify-center size-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m5 12 7-7 7 7"/>
                        <path d="M12 19V5"/>
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

        {/* Predictive Suggestions Dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 text-gray-700 text-sm"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>{suggestion}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Suggested Searches */}
        {!showSuggestions && query.trim().length === 0 && (
          <div className="mt-6">
            <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
              {suggestedSearches.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs font-medium transition-colors hover:shadow-sm border border-gray-200 whitespace-nowrap"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

const hotTopics: HotTopic[] = [
  {
    id: 'personalization-ai-scale',
    title: 'Personalization at AI Scale',
    description: 'Delivering tailored, individual experiences efficiently at scale',
    image: '/images/ai-scale-personalization.webp',
    content: {
      video: 'https://player.vimeo.com/video/example1',
      podcast: 'https://example.com/podcast1.mp3',
      text: `# Personalization at AI Scale

Delivering tailored, individual experiences efficiently at scale through advanced AI-driven personalization that adapts in real-time to user behavior and preferences. Our platform leverages machine learning algorithms to create unique experiences for every visitor.

## Key Benefits
- **Real-time Adaptation**: Content that evolves with user interactions
- **Enterprise Scale**: Handle millions of personalized experiences simultaneously
- **Predictive Intelligence**: Anticipate user needs before they express them
- **Cross-channel Consistency**: Unified personalization across all touchpoints

## Implementation Strategy
1. **Data Collection**: Gather behavioral, contextual, and preference data
2. **AI Processing**: Apply machine learning models for real-time analysis
3. **Content Orchestration**: Dynamically assemble personalized experiences
4. **Continuous Learning**: Refine algorithms based on user feedback

Transform your digital strategy with AI that truly understands your audience.`
    }
  },
  {
    id: 'content-transformation',
    title: 'Content Transformation',
    description: 'Dynamically adapting content for multiple contexts and channels',
    image: '/images/dynamic-content.webp',
    content: {
      video: 'https://player.vimeo.com/video/example2',
      podcast: 'https://example.com/podcast2.mp3',
      text: `# Content Transformation

Dynamically adapting content for multiple contexts and channels to ensure maximum impact and relevance across all touchpoints.

## Core Capabilities
- **Multi-format Adaptation**: Automatically convert content between formats
- **Context-aware Delivery**: Adjust messaging based on channel and audience
- **Real-time Optimization**: Continuously improve content performance
- **Brand Consistency**: Maintain voice and style across all variations

## Use Cases
- **Cross-channel Marketing**: Unified campaigns across all platforms
- **Localization**: Adapt content for different markets and languages
- **Device Optimization**: Tailor content for mobile, desktop, and tablet
- **Audience Segmentation**: Customize messaging for different user groups

## Implementation Benefits
1. **Efficiency**: Reduce content creation time and resources
2. **Consistency**: Ensure brand alignment across all channels
3. **Performance**: Optimize content for each specific context
4. **Scale**: Handle content transformation at enterprise scale

Transform your content strategy with AI that adapts to every context and channel.`
    }
  },
  {
    id: 'conversational-ux',
    title: 'Conversational UX',
    description: 'Creating natural, engaging user interactions through chat and voice',
    image: '/images/conversational-ux.webp',
    content: {
      video: 'https://player.vimeo.com/video/example2',
      podcast: 'https://example.com/podcast2.mp3',
      text: `# Conversational UX

Revolutionize how users interact with your digital platforms through natural language processing and conversational AI interfaces.

## Core Components
- **Natural Language Understanding**: Interpret user intent with high accuracy
- **Context Awareness**: Maintain conversation state across sessions
- **Multi-modal Interactions**: Support voice, text, and visual inputs
- **Emotional Intelligence**: Recognize and respond to user sentiment

## Use Cases
- **Customer Support**: Automated assistance with human-like understanding
- **Product Discovery**: Conversational product recommendations
- **Content Navigation**: Natural language search and exploration
- **Accessibility**: Voice-first interfaces for inclusive design

## Implementation Approach
1. **Intent Recognition**: Map user queries to actionable insights
2. **Response Generation**: Create contextually appropriate responses
3. **Learning Integration**: Improve through continuous user interactions
4. **Fallback Strategies**: Seamless handoff to human agents when needed

Create more intuitive and engaging user experiences through the power of conversation.`
    }
  },
  {
    id: 'future-of-search',
    title: 'Future of Search',
    description: 'Reimagining search through intent-driven, AI-powered experiences',
    image: '/images/future-of-search.webp',
    content: {
      video: 'https://share.synthesia.io/embeds/videos/46319d23-841d-4467-97fd-5af6d9cb053c',
      podcast: 'https://example.com/podcast3.mp3',
      text: `# The future of search: How marketers can get ahead of the AI disruption

Search is changing—fast. And for marketers, especially those responsible for a brand's website and owned channels, this shift is more than algorithm tweaks. It's a disruption driven by AI that is fundamentally changing how people discover, evaluate, and interact with content.

In an AI-first search landscape, the rules are being rewritten. Zero-click results dominate, generative AI tools like ChatGPT and Perplexity are shaping brand perception, and new ad formats are emerging in AI-generated overviews. As a result, traditional SEO and SEM strategies alone no longer guarantee visibility.

But with disruption comes opportunity. Marketers who adapt early—organizing content for AI, embracing semantic search, and preparing for agentic experiences—can not only maintain their relevance but deepen their advantage.

## AI is arbitrating the brand experience

Search is no longer just a list of links. It's a conversation, a summary, an answer—often without attribution or a click-through. Google's AI Overviews and Search Generative Experience (SGE) aim to give users what they need in the results page itself. The rise of zero-click search is already reducing traffic to brand-owned properties. In parallel, tools like ChatGPT, Perplexity, and Claude are becoming research companions for consumers and business buyers alike, sourcing and summarizing content into branded (or unbranded) outputs.

The big shift? These AI tools are now arbitrating how your brand shows up—or if it shows up at all.

## Goodbye SEO and SEM as you knew them

Marketers have long relied on Search Engine Optimization (SEO) and Search Engine Marketing (SEM) to shape discoverability. But AI introduces a new discipline: Generative Engine Optimization (GEO).

GEO is about making your content legible, credible, and useful to AI systems. That means:

- **Structuring content for clarity and precision**
- **Applying schema and semantic tagging** so AI understands what your content means, not just what it says
- **Breaking content into modular, reusable blocks** that can be remixed by AI into answers, summaries, and recommendations

Those who treat this as a content strategy challenge—not just a search one—will win.

## AI advertising: A new frontier

AI summaries aren't just organic real estate. Google is already testing ad placements within AI-generated results. These are pulled dynamically from existing campaigns, but optimized based on query intent, context, and user behavior.

For marketers, this is both an opportunity and a risk. Ad creative must now work harder to earn attention in a context where clicks are scarce and AI is the first—and sometimes only—touchpoint.

## People may not visit your website. Their agents might.

As AI matures, expect to see a new kind of user journey: one led by autonomous agents. These AI assistants—whether built into smartphones, operating systems, or platforms like Amazon and OpenAI—will shop, browse, and evaluate on behalf of users.

What does that mean for marketers?

You're no longer just designing for people. You're designing for agents—entities that prioritize speed, clarity, and confidence. Your content needs to be machine-readable, context-rich, and up-to-date.

## Challenge or opportunity? It depends on what you do next.

AI isn't just disrupting search—it's reshaping how your brand is seen, selected, and surfaced. And while this presents real challenges, especially for brands who rely on traditional SEO and web traffic strategies, it also unlocks new opportunities for those who adapt.

Marketers who hesitate risk losing visibility as AI systems become the new gatekeepers of brand discovery. But those who act now—by organizing their content for machine readability, investing in modular architecture, and embracing AI-friendly strategies like semantic tagging and atomization—will thrive in a world where AI doesn't just direct traffic, it defines the experience.

## How to be future ready—now

To meet this moment, marketers must rethink their content stack. That includes:

- **Investing in a CMS built for the AI era**: One that supports semantic search, modular content, and omnichannel reuse
- **Atomizing your content**: Breaking content into structured, brand-aligned building blocks that can be assembled dynamically—for web, chat, AI answers, or agent-driven discovery
- **Embedding intelligence into your strategy**: Leveraging insights to understand how your content performs not just in search rankings, but in AI summaries and agent interactions

## The way forward

Search is no longer just a channel—it's becoming the experience itself.

That means your content isn't something users find after a click. It's what AI summarizes, recommends, and showcases in the moment that matters. For marketers, this is the new front line of brand building. And it's changing fast.

The good news? You're not starting from scratch. You already own the most valuable asset: your content. The opportunity now is to evolve how that content is structured, served, and surfaced—so it works for AI and humans alike.

At Sitecore, we believe the future belongs to brands that treat AI as a creative and strategic partner. That means rethinking how you build, manage, and activate content across every owned channel, powered by the right CMS and underpinned by modular, brand-safe architecture.

**In the age of AI-driven discovery, your content isn't just part of the experience—it is the experience.**`
    }
  },
  {
    id: 'generative-ads',
    title: 'Generative Ads',
    description: 'AI-driven creation, optimization, and personalization of advertising',
    image: '/images/generative-ads.webp',
    content: {
      video: 'https://player.vimeo.com/video/example4',
      podcast: 'https://example.com/podcast4.mp3',
      text: `# Generative Ads

AI-driven creation, optimization, and personalization of advertising that automatically generates high-performing ad content at scale.

## AI-Powered Creation
- **Dynamic Copy Generation**: Create compelling headlines and descriptions automatically
- **Visual Asset Creation**: Generate images, graphics, and video content
- **Multi-variant Production**: Produce hundreds of ad variations instantly
- **Brand-consistent Output**: Maintain brand voice and visual identity

## Intelligent Optimization
- **Performance-based Learning**: Continuously improve based on ad performance
- **Audience Adaptation**: Tailor messaging for different audience segments
- **Channel Optimization**: Adapt content for specific advertising platforms
- **Real-time Adjustments**: Modify campaigns based on live performance data

## Personalization at Scale
1. **Individual Targeting**: Create unique ads for specific user profiles
2. **Contextual Relevance**: Adapt messaging based on user context and intent
3. **Dynamic Product Integration**: Automatically feature relevant products or services
4. **Cross-channel Consistency**: Maintain coherent messaging across all touchpoints

## Implementation Benefits
- **Efficiency**: Reduce creative production time by 90%
- **Performance**: Increase click-through rates with personalized content
- **Scale**: Generate thousands of ad variations simultaneously
- **ROI**: Optimize advertising spend through intelligent automation

Transform your advertising strategy with AI that creates, optimizes, and personalizes at unprecedented scale.`
    }
  },
  {
    id: 'experience-agents',
    title: 'Experience Agents',
    description: 'Proactive AI agents autonomously enhancing digital experiences',
    image: '/images/experience-agents.webp',
    content: {
      video: 'https://player.vimeo.com/video/example5',
      podcast: 'https://example.com/podcast5.mp3',
      text: `# Experience Agents

Autonomous AI agents that orchestrate, optimize, and personalize digital experiences without human intervention.

## Agent Capabilities
- **Experience Orchestration**: Coordinate multiple touchpoints seamlessly
- **Real-time Optimization**: Adjust experiences based on performance data
- **Proactive Engagement**: Initiate interactions at optimal moments
- **Cross-channel Coordination**: Maintain consistency across all platforms

## Agent Types
1. **Personalization Agents**: Tailor content and layout for individual users
2. **Optimization Agents**: Continuously improve conversion and engagement
3. **Support Agents**: Provide intelligent assistance and problem resolution
4. **Analytics Agents**: Monitor, measure, and report on experience performance

## Autonomous Functions
- **Decision Making**: Choose optimal content and layout variations
- **Performance Monitoring**: Track KPIs and adjust strategies accordingly
- **User Journey Mapping**: Understand and optimize user flow patterns
- **Predictive Actions**: Anticipate needs and prepare relevant experiences

## Benefits
- **24/7 Optimization**: Continuous improvement without manual intervention
- **Scalable Personalization**: Handle millions of unique experiences
- **Rapid Adaptation**: Respond to changes in real-time
- **Data-driven Decisions**: Base actions on comprehensive analytics

## Implementation Phases
1. **Agent Deployment**: Install and configure experience agents
2. **Learning Period**: Allow agents to gather data and learn patterns
3. **Autonomous Operation**: Enable agents to make independent decisions
4. **Continuous Evolution**: Agents improve through machine learning

Experience the future where AI agents work tirelessly to create perfect user experiences.`
    }
  }
];

export default function AgenticExperience() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [contentMode, setContentMode] = useState<'video' | 'podcast' | 'text'>('text');
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentContent, setCurrentContent] = useState('');
  const [isGeneratingPodcast, setIsGeneratingPodcast] = useState(false);
  const [podcastAudioUrl, setPodcastAudioUrl] = useState<string | null>(null);
  const [podcastChunks, setPodcastChunks] = useState<string[]>([]);
  const [loadedChunks, setLoadedChunks] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [audioQueue, setAudioQueue] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const topicParam = searchParams.get('topic');
    const modeParam = searchParams.get('mode');

    if (topicParam) {
      setSelectedTopic(topicParam);
      const topic = getTopicContent(topicParam);
      if (topic) {
        // Will set content after mode is determined
      }
    }

    let finalMode: 'video' | 'podcast' | 'text' = 'text';
    if (modeParam && (modeParam === 'video' || modeParam === 'podcast' || modeParam === 'article')) {
      if (modeParam === 'article') {
        finalMode = 'text';
      } else {
        finalMode = modeParam as 'video' | 'podcast';
      }
    }

    if (topicParam) {
      const topic = getTopicContent(topicParam);
      if (topic) {
        setContentMode(finalMode);
        setCurrentContent(topic.content[finalMode]);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedTopic) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }, [selectedTopic]);

  useEffect(() => {
    if (contentMode === 'podcast' && podcastAudioUrl) {
      const audioElem = document.getElementById('progressive-podcast-audio') as HTMLAudioElement | null;
      if (audioElem) {
        audioElem.load();
        audioElem.play().catch(() => {});
      }
    }
  }, [podcastAudioUrl]);

  useEffect(() => {
    setPodcastAudioUrl(null);
    setPodcastChunks([]);
    setLoadedChunks(0);
    setTotalChunks(0);
    setCurrentChunkIndex(0);
    setAudioQueue([]);
  }, [selectedTopic]);

  // Debug search results changes
  useEffect(() => {
    console.log('Search results state changed:', searchResults);
  }, [searchResults]);

  const getTopicContent = (topicId: string) => {
    return hotTopics.find(t => t.id === topicId) || digitalVisionariesData.find(c => c.id === topicId);
  };

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    setSearchParams({ topic: topicId });
    const topic = getTopicContent(topicId);
    if (topic) {
      setCurrentContent(topic.content.text);
      setContentMode('text');
    }
  };

  const handleContentModeChange = async (mode: 'video' | 'podcast' | 'text') => {
    setContentMode(mode);
    if (selectedTopic) {
      const topic = getTopicContent(selectedTopic);
      if (topic) {
        setCurrentContent(topic.content[mode]);
        if (mode === 'podcast' && !podcastAudioUrl) {
          await generatePodcast(topic.content.text);
        }
      }
    }
  };

  const handleResetContent = () => {
    if (selectedTopic) {
      const topic = getTopicContent(selectedTopic);
      if (topic) {
        setCurrentContent(topic.content[contentMode]);
      }
    }
  };



  const handleSearch = (query: string, mode: 'search' | 'stream') => {
    setSearchQuery(query);
    setIsSearching(true);
    setSearchResults([]);
    simulateStreamingSearch(query, mode);
  };

  const handleAIAdjustment = async () => {
    if (!aiPrompt.trim() || !selectedTopic) return;

    setIsProcessing(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `Please ${aiPrompt.toLowerCase()} the following content:\n\n${currentContent}`
            }
          ]
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentContent(data.message);
        setShowAIPanel(false);
        setAiPrompt('');
      } else {
        throw new Error('Failed to process AI request');
      }
    } catch (error) {
      console.error('Error processing AI adjustment:', error);
      alert('Error processing request. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const generatePodcast = async (textContent: string) => {
    setIsGeneratingPodcast(true);
    setLoadedChunks(0);
    setCurrentChunkIndex(0);
    setAudioQueue([]);
    setPodcastAudioUrl(null);

    try {
      const chunks = convertToPodcastChunks(textContent);
      setPodcastChunks(chunks);
      setTotalChunks(chunks.length);

      await generateChunk(chunks[0], 0, chunks.length);

      generateRemainingChunks(chunks);

    } catch (error) {
      console.error('Error generating podcast:', error);
      alert('Error generating podcast. Please try again.');
      setIsGeneratingPodcast(false);
    }
  };

  const generateChunk = async (chunkText: string, index: number, total: number) => {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: chunkText,
        voice: 'alloy',
        model: 'tts-1'
      }),
    });

    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const audioBlob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);

      if (index === 0) {
        setPodcastAudioUrl(audioUrl);
        setIsGeneratingPodcast(false);
      } else {
        setAudioQueue(prev => [...prev, audioUrl]);
      }

      setLoadedChunks(prev => prev + 1);
      return audioUrl;
    } else {
      const errorData = await response.json();
      console.error('Failed to generate podcast chunk:', response.status, errorData);
      throw new Error(`Failed to generate audio chunk ${index + 1}`);
    }
  };

  const generateRemainingChunks = async (chunks: string[]) => {
    try {
      for (let i = 1; i < chunks.length; i++) {
        await generateChunk(chunks[i], i, chunks.length);

        if (i < chunks.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }
    } catch (error) {
      console.error('Error generating remaining chunks:', error);
    }
  };

  const playNextChunk = () => {
    if (currentChunkIndex < audioQueue.length) {
      const nextUrl = audioQueue[currentChunkIndex];
      setPodcastAudioUrl(nextUrl);
      setCurrentChunkIndex(prev => prev + 1);
    }
  };

  const convertToPodcastChunks = (content: string) => {
    const cleanContent = content
      .replace(/#{1,6}\s/g, '')
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\n- /g, '\n')
      .replace(/^- /g, '');

    const paragraphs = cleanContent.split('\n\n').filter(p => p.trim());

    if (paragraphs.length === 0) return ["Welcome to this podcast. Thank you for listening."];

    const chunks: string[] = [];
    const title = paragraphs[0] || 'this topic';

    const introduction = paragraphs[1] || '';
    chunks.push(`Welcome to this exploration of ${title}. ${introduction}`);

    for (let i = 2; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i];

      if (paragraph.length > 1200) {
        const sentences = paragraph.split('. ');
        let currentChunk = '';

        for (const sentence of sentences) {
          if ((currentChunk + sentence).length > 1200 && currentChunk) {
            chunks.push(currentChunk.trim() + '.');
            currentChunk = sentence;
          } else {
            currentChunk += (currentChunk ? '. ' : '') + sentence;
          }
        }

        if (currentChunk) {
          chunks.push(currentChunk + (currentChunk.endsWith('.') ? '' : '.'));
        }
      } else {
        chunks.push(paragraph);
      }
    }

    const conclusion = " Thank you for listening to this comprehensive overview.";
    if (chunks.length > 0) {
      const lastChunk = chunks[chunks.length - 1];
      if (lastChunk.length + conclusion.length <= 1400) {
        chunks[chunks.length - 1] = lastChunk + conclusion;
      } else {
        chunks.push("That concludes our exploration of this topic." + conclusion);
      }
    }

    return chunks;
  };





  const handleContentSelect = (content: ContentItem) => {
    setSelectedTopic(content.id);
    setCurrentContent(content.fullContent || '');
    setContentMode('text');
  };

  // Fallback keyword search function
  const performKeywordSearch = async (query: string) => {
    const allContent = [...hotTopics, ...digitalVisionariesData];

    const queryWords = query.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2 && !['what', 'is', 'the', 'how', 'and', 'are', 'can', 'will', 'does'].includes(word));

    const matchingContent = allContent.filter(item => {
      const lowerTitle = item.title.toLowerCase();
      const lowerDescription = item.description.toLowerCase();
      const lowerContent = item.content.text.toLowerCase();

      return queryWords.some(word =>
        lowerTitle.includes(word) ||
        lowerDescription.includes(word) ||
        lowerContent.includes(word)
      );
    });

    // Stream keyword results
    for (let i = 0; i < matchingContent.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300 + i * 200));

      const item = matchingContent[i];
      const streamResult = {
        id: `keyword-${item.id}`,
        type: 'content_reference',
        title: item.title,
        description: item.description,
        content: {
          text: item.content.text.substring(0, 400) + '...',
          fullContent: item.content.text,
          video: item.content.video,
          podcast: item.content.podcast
        },
        image: item.image,
        source: 'Keyword Search',
        originalId: item.id
      };

      setSearchResults(prev => [...prev, streamResult]);
    }
  };

  const simulateStreamingSearch = async (query: string, mode: 'search' | 'stream') => {
    // Keep focus at top - no scrolling during search

    if (mode === 'search') {
      // Use semantic search API for better intent matching
      try {
        console.log('Calling semantic search API for:', query);

        const response = await fetch('/api/semantic-search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: query,
            limit: 5,
            threshold: 0.6
          }),
        });

        if (!response.ok) {
          throw new Error(`Semantic search failed: ${response.status}`);
        }

        const data = await response.json();
        console.log('Semantic search results:', data);

        // Stream semantic search results
        for (let i = 0; i < data.results.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 300 + i * 200));

          const item = data.results[i];
          const streamResult = {
            id: `semantic-${item.id}`,
            type: 'content_reference',
            title: item.title,
            description: item.description,
            content: {
              text: item.content.text.substring(0, 400) + '...',
              fullContent: item.content.text,
              video: item.content.video || '',
              podcast: item.content.podcast || ''
            },
            image: item.image,
            source: `Semantic Search (${(item.similarity * 100).toFixed(1)}% match)`,
            originalId: item.id,
            similarity: item.similarity
          };

          setSearchResults(prev => [...prev, streamResult]);
        }

        // Add related images if we found semantic matches
        if (data.results.length > 0) {
          await new Promise(resolve => setTimeout(resolve, 500));

          const imageResult = {
            id: 'semantic-images-result',
            type: 'images',
            title: 'Related Visual Content',
            description: 'Images semantically related to your search intent',
            content: {
              images: data.results.slice(0, 3).map((result: any) => result.image).filter(Boolean)
            },
            source: 'Semantic Media Discovery'
          };

          if (imageResult.content.images.length > 0) {
            setSearchResults(prev => [...prev, imageResult]);
          }
        }

        // Fallback to keyword search if no semantic results
        if (data.results.length === 0) {
          console.log('No semantic matches found, falling back to keyword search');
          await performKeywordSearch(query);
        }

      } catch (error) {
        console.error('Semantic search failed, falling back to keyword search:', error);
        await performKeywordSearch(query);
      }



    } else {
      // Stream AI mode - generate comprehensive response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Based on this query about AI and digital experience: "${query}", please provide a comprehensive response drawing from knowledge about personalization, content transformation, conversational UX, future of search, generative ads, and experience agents.`,
          conversation: []
        }),
      });

      const data = await response.json();
      if (data.response) {
        // Simulate streaming text response
        const chunks = data.response.split('\n\n');
        let accumulatedText = '';

        for (let i = 0; i < chunks.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 200));
          accumulatedText += chunks[i] + '\n\n';

          const streamResult = {
            id: 'stream-ai-response',
            type: 'ai_response',
            title: `Stream AI: ${query}`,
            description: 'AI-generated comprehensive response',
            content: {
              text: accumulatedText.trim(),
              isStreaming: i < chunks.length - 1
            },
            source: 'Stream AI',
            image: '/images/ai-scale-personalization.webp'
          };

          setSearchResults([streamResult]);
        }
      }
    }
  };

  const selectedTopicData = selectedTopic ? getTopicContent(selectedTopic) : null;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative">
      <LightWavesBackground />
      <Navigation />

      <div className="container max-w-7xl mx-auto z-10 px-4 py-10 mt-24 mb-10">
        {!selectedTopic ? (
          <>
            <div className="mb-16">
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-semibold mb-6 tracking-tight">
                  Agentic <span className="sitecore-gradient-text">Experience</span>
                </h1>
                <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-8">
                  Explore hot topics shaping digital experiences in the AI era.
                </p>

                {/* Search Component */}
                <SearchComponent onSearch={handleSearch} />
              </div>
            </div>

            {/* Content Grid */}
            <ContentGrid
              searchQuery={searchQuery}
              searchResults={searchResults}
              isSearching={isSearching}
              onContentSelect={handleContentSelect}
            />
          </>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <button
                onClick={() => {
                  setSelectedTopic(null);
                  setSearchParams({});
                }}
                className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Topics
              </button>

              {selectedTopicData && (
                <div className="text-center">
                  <h1 className="text-4xl md:text-5xl font-semibold mb-4">
                    {selectedTopicData.title}
                  </h1>
                  <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                    {selectedTopicData.description}
                  </p>
                </div>
              )}
            </div>

            <div className="mb-8">
              <div className="flex justify-center">
                <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                  <button
                    onClick={() => handleContentModeChange('text')}
                    className={`px-6 py-2 rounded-md font-medium transition-all ${
                      contentMode === 'text'
                        ? 'bg-white shadow-sm text-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    📖 Article
                  </button>
                  <button
                    onClick={() => handleContentModeChange('video')}
                    className={`px-6 py-2 rounded-md font-medium transition-all ${
                      contentMode === 'video'
                        ? 'bg-white shadow-sm text-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    📹 Video
                  </button>
                  <button
                    onClick={() => handleContentModeChange('podcast')}
                    className={`px-6 py-2 rounded-md font-medium transition-all ${
                      contentMode === 'podcast'
                        ? 'bg-white shadow-sm text-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    🎧 Podcast
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              {contentMode === 'video' && (
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                {selectedTopicData?.id === 'future-of-search' ? (
                  <iframe
                    src={currentContent}
                    loading="lazy"
                    title="Synthesia video player - Future Search"
                    allowFullScreen
                    allow="encrypted-media; fullscreen;"
                    className="w-full h-full border-none"
                  />
                ) : selectedTopicData?.id === 'liz-nelson-ai-cms' || selectedTopicData?.id === 'ru-barry-ai-revolution' ? (
                  <video
                    src={currentContent}
                    controls
                    className="w-full h-full"
                    poster={selectedTopicData?.image}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-white text-center">
                      <svg className="w-16 h-16 mx-auto mb-4 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      <p className="text-lg">Video content coming soon</p>
                      <p className="text-sm opacity-60">Integration with video platform in progress</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {contentMode === 'podcast' && (
              <div className="bg-gray-50 rounded-lg p-8">
                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-6">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1a7 7 0 0 1 14 0v1h-4v8h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"/>
                    </svg>
                    <h3 className="text-lg font-semibold mb-2">AI-Generated Podcast</h3>
                    <p className="text-gray-600 mb-4">
                      {isGeneratingPodcast
                        ? loadedChunks === 0
                          ? 'Generating audio from article content...'
                          : `Streaming audio... (${loadedChunks}/${totalChunks} chunks ready)`
                        : podcastAudioUrl
                          ? 'Article converted to podcast using OpenAI TTS'
                          : 'Click to generate podcast from article content'
                      }
                    </p>
                  </div>

                  {isGeneratingPodcast && (
                    <div className="bg-white rounded-lg p-6 border text-center">
                      <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p className="text-gray-600">
                        {loadedChunks === 0
                          ? 'Converting article to audio...'
                          : `Streaming audio... (${loadedChunks}/${totalChunks} chunks ready)`}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
                    </div>
                  )}

                  {podcastAudioUrl && !isGeneratingPodcast && (
                    <div className="bg-white rounded-lg p-6 border">
                      <audio
                        id="progressive-podcast-audio"
                        controls
                        className="w-full mb-4"
                        onEnded={playNextChunk}
                      >
                        <source src={podcastAudioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">
                          🎙️ AI-narrated version of "{selectedTopicData?.title}"
                        </p>
                        <button
                          onClick={() => {
                            setPodcastAudioUrl(null);
                            setPodcastChunks([]);
                            setLoadedChunks(0);
                            setTotalChunks(0);
                            setCurrentChunkIndex(0);
                            setAudioQueue([]);
                            if (selectedTopic) {
                              const topic = getTopicContent(selectedTopic);
                              if (topic) {
                                generatePodcast(topic.content.text);
                              }
                            }
                          }}
                          className="mt-2 text-sm text-purple-600 hover:text-purple-700"
                        >
                          Regenerate Audio
                        </button>
                      </div>
                      {audioQueue.length > 0 && (
                        <div className="mt-4 text-xs text-gray-500">
                          <p>
                            {`Ready chunks: ${loadedChunks}/${totalChunks}. `}
                            {currentChunkIndex < audioQueue.length
                              ? 'Next chunk will play automatically.'
                              : loadedChunks < totalChunks
                                ? 'Waiting for more audio...'
                                : 'All chunks played.'}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {!podcastAudioUrl && !isGeneratingPodcast && (
                    <div className="bg-white rounded-lg p-6 border text-center">
                      <button
                        onClick={() => {
                          if (selectedTopic) {
                            const topic = getTopicContent(selectedTopic);
                            if (topic) {
                              generatePodcast(topic.content.text);
                            }
                          }
                        }}
                        className="sitecore-gradient text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                      >
                        🎙️ Generate Podcast
                      </button>
                      <p className="text-sm text-gray-500 mt-2">
                        Uses OpenAI TTS to convert the article into audio
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {contentMode === 'text' && (
              <article className="max-w-none relative">
                <button
                  onClick={handleResetContent}
                  className="absolute top-0 right-0 px-3 py-1 text-sm text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  title="Reset to original content"
                >
                  Reset
                </button>

                <div className="space-y-5 pr-16">
                  {(() => {
                    const allSections = currentContent.split('\n\n');
                    const blockquoteMarkers = new Set();

                    for (let i = 0; i < allSections.length; i++) {
                      const section = allSections[i];
                      if (section.startsWith('> **"') ||
                          section.startsWith('> — **') ||
                          section.startsWith('> *') ||
                          section.includes('*Sitecore*') ||
                          section.trim() === '>') {
                        blockquoteMarkers.add(i);
                      }
                    }

                    const processedSections = [];
                    let i = 0;

                    while (i < allSections.length) {
                      const section = allSections[i];

                      if (!section.trim()) {
                        i++;
                        continue;
                      }

                      if (blockquoteMarkers.has(i)) {
                        if (section.startsWith('> **"')) {
                          let blockquoteContent = section;
                          let j = i + 1;

                          while (j < allSections.length && blockquoteMarkers.has(j)) {
                            blockquoteContent += '\n\n' + allSections[j];
                            j++;
                          }

                          const lines = blockquoteContent.split('\n').filter(line => line.trim());
                          const quoteLine = lines.find(line => line.startsWith('> **"'));
                          const authorLine = lines.find(line => line.startsWith('> — **'));
                          const titleLine = lines.find(line => line.startsWith('> *') && !line.includes('—') && !line.includes('Sitecore'));
                          const companyLine = lines.find(line => line.includes('*Sitecore*'));

                          if (quoteLine && authorLine) {
                            const quote = quoteLine.replace('> **"', '').replace('"**', '');
                            const author = authorLine.replace('> — **', '').replace('**', '');
                            const title = titleLine ? titleLine.replace('> *', '').replace('*', '') : '';
                            const company = companyLine ? companyLine.replace('> *', '').replace('*', '') : '';

                            processedSections.push({
                              type: 'testimonial',
                              content: { quote, author, title, company },
                              index: i
                            });
                          }

                          i = j;
                        } else {
                          i++;
                        }
                      } else {
                        if (!section.includes('> **"') && !section.includes('"**')) {
                          processedSections.push({
                            type: 'regular',
                            content: section,
                            index: i
                          });
                        }
                        i++;
                      }
                    }

                    return processedSections.map((item, index) => {
                      if (item.type === 'testimonial') {
                        const testimonialContent = item.content as { quote: string; author: string; title: string; company: string; };
                        const { quote, author, title, company } = testimonialContent;
                        return (
                          <div key={index} className="testimonial bg-gray-50 rounded-xl p-8 my-8 border-l-4 border-purple-500">
                            <blockquote>
                              <div className="text-lg leading-relaxed text-gray-900 mb-6 italic">
                                "{quote}<span className="relative">.</span>"
                              </div>
                              <footer>
                                <div className="flex flex-row items-start justify-start gap-4">
                                  <div className="flex flex-col">
                                    <cite className="not-italic">
                                      <p className="text-base font-semibold text-gray-900 leading-tight">{author}</p>
                                      <p className="text-sm text-gray-600 leading-tight">{title}</p>
                                      <p className="text-sm text-gray-600 leading-tight">{company}</p>
                                    </cite>
                                  </div>
                                </div>
                              </footer>
                            </blockquote>
                          </div>
                        );
                      }

                      const section = item.content as string;

                      if (section.startsWith('# ')) {
                        return (
                          <h1 key={index} className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                            {section.replace('# ', '')}
                          </h1>
                        );
                      }

                      if (section.startsWith('## ')) {
                        return (
                          <h2 key={index} className="text-xl font-semibold text-gray-800 mb-3 mt-6 leading-tight border-b border-gray-200 pb-2">
                            {section.replace('## ', '')}
                          </h2>
                        );
                      }

                      if (section.startsWith('### ')) {
                        return (
                          <h3 key={index} className="text-lg font-medium text-gray-700 mb-2 mt-5 leading-tight">
                            {section.replace('### ', '')}
                          </h3>
                        );
                      }

                      if (section.includes('\n- ')) {
                        const items = section.split('\n').filter((line: string) => line.startsWith('- '));
                        return (
                          <ul key={index} className="space-y-2 mb-5">
                            {items.map((item: string, itemIndex: number) => (
                              <li key={itemIndex} className="flex items-start text-gray-700 leading-relaxed text-base">
                                <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                                <span dangerouslySetInnerHTML={{
                                  __html: item.replace('- ', '').replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                                }} />
                              </li>
                            ))}
                          </ul>
                        );
                      }

                      return (
                        <p key={index} className="text-gray-700 leading-relaxed text-base mb-5">
                          <span dangerouslySetInnerHTML={{
                            __html: section.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                          }} />
                        </p>
                      );
                    });
                  })()}
                </div>
              </article>
            )}
            </div>

            {selectedTopic && contentMode === 'text' && (
              <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
                <button
                  onClick={() => setShowAIPanel(true)}
                  className="sitecore-gradient text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 backdrop-blur-sm bg-opacity-90"
                  style={{ backgroundColor: 'rgba(235, 0, 26, 0.9)' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="font-medium">Adjust with Stream AI</span>
                </button>
              </div>
            )}

            {showAIPanel && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Adjust Content with AI</h3>
                    <button
                      onClick={() => setShowAIPanel(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How would you like to adjust the content?
                    </label>
                    <textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="e.g., Summarize in 3 key points, Translate to Spanish, Make it more technical, etc."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                      rows={3}
                    />

                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-2">Quick suggestions:</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Summarize in 3 key points",
                          "Make it more concise",
                          "Explain for beginners",
                          "Add more technical detail",
                          "Create bullet points",
                          "Translate to Spanish"
                        ].map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => setAiPrompt(suggestion)}
                            className="px-2 py-1 text-xs bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 rounded transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowAIPanel(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAIAdjustment}
                      disabled={!aiPrompt.trim() || isProcessing}
                      className="flex-1 px-4 py-2 sitecore-gradient text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? 'Processing...' : 'Apply'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="mt-8 text-center text-sm text-gray-500 w-full">
        <div className="border-t border-gray-200 pt-8 pb-10 w-full max-w-lg mx-auto px-4">
          <p>© 2025 Sitecore. All rights reserved.</p>
        </div>
      </footer>

      <div className="absolute bottom-0 left-0 right-0 h-1 sitecore-gradient" />
    </div>
  );
}
