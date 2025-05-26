import { useState, useEffect } from 'react';
import LightWavesBackground from '../components/StarryBackground';
import Navigation from '../components/Navigation';
import { Link, useSearchParams } from 'react-router-dom';

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

const hotTopics: HotTopic[] = [
  {
    id: 'ai-scale-personalization',
    title: 'AI at Scale Personalization',
    description: 'Harness AI to deliver hyper-personalized experiences at enterprise scale',
    image: '/images/ai-scale-personalization.png',
    content: {
      video: 'https://player.vimeo.com/video/example1',
      podcast: 'https://example.com/podcast1.mp3',
      text: `# AI at Scale Personalization

The future of digital experiences lies in AI-driven personalization that adapts in real-time to user behavior and preferences. Our platform leverages machine learning algorithms to create unique experiences for every visitor.

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
    id: 'conversational-ux',
    title: 'Conversational UX',
    description: 'Transform user interactions with natural language interfaces and AI-powered conversations',
    image: '/images/conversational-ux.png',
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
    description: 'Explore next-generation search powered by AI, semantic understanding, and contextual relevance',
    image: '/images/future-of-search.png',
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
    id: 'dynamic-content',
    title: 'Dynamic Content',
    description: 'Create adaptive content that transforms based on user context, preferences, and real-time data',
    image: '/images/dynamic-content.png',
    content: {
      video: 'https://player.vimeo.com/video/example4',
      podcast: 'https://example.com/podcast4.mp3',
      text: `# Dynamic Content

Content that adapts, transforms, and personalizes itself in real-time based on user behavior, context, and preferences.

## Adaptive Elements
- **Smart Headlines**: Titles that resonate with individual users
- **Contextual Images**: Visuals that match user preferences and demographics
- **Personalized Copy**: Messaging tailored to user journey stage
- **Dynamic CTAs**: Calls-to-action optimized for conversion

## Real-time Triggers
- **Behavioral Data**: Actions, clicks, and engagement patterns
- **Environmental Context**: Time, location, device, and weather
- **User Attributes**: Demographics, preferences, and history
- **Business Rules**: Inventory, promotions, and campaign goals

## Content Types
1. **Text Adaptation**: Headlines, descriptions, and messaging
2. **Visual Optimization**: Images, videos, and graphics
3. **Layout Personalization**: Component arrangement and priority
4. **Interactive Elements**: Forms, quizzes, and engagement tools

## Implementation Strategy
- **Content Modeling**: Structure content for maximum flexibility
- **Rule Engine**: Define conditions for content variations
- **A/B Testing**: Continuously optimize content performance
- **Analytics Integration**: Measure impact and effectiveness

Create content experiences that feel personally crafted for every user.`
    }
  },
  {
    id: 'experience-agents',
    title: 'Experience Agents',
    description: 'Deploy autonomous AI agents that orchestrate and optimize digital experiences in real-time',
    image: '/images/experience-agents.png',
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

  // Check for topic parameter in URL
  useEffect(() => {
    const topicParam = searchParams.get('topic');
    if (topicParam) {
      setSelectedTopic(topicParam);
      const topic = hotTopics.find(t => t.id === topicParam);
      if (topic) {
        setCurrentContent(topic.content.text);
      }
    }
  }, [searchParams]);

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    setSearchParams({ topic: topicId });
    const topic = hotTopics.find(t => t.id === topicId);
    if (topic) {
      setCurrentContent(topic.content.text);
      setContentMode('text');
      // Scroll to top of the page when topic is selected
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const handleContentModeChange = (mode: 'video' | 'podcast' | 'text') => {
    setContentMode(mode);
    if (selectedTopic) {
      const topic = hotTopics.find(t => t.id === selectedTopic);
      if (topic) {
        // Always load the appropriate content for the selected mode
        setCurrentContent(topic.content[mode]);
      }
    }
  };

  const handleResetContent = () => {
    if (selectedTopic) {
      const topic = hotTopics.find(t => t.id === selectedTopic);
      if (topic) {
        setCurrentContent(topic.content[contentMode]);
      }
    }
  };

  const handleAIAdjustment = async () => {
    if (!aiPrompt.trim() || !currentContent) return;

    setIsProcessing(true);
    try {
      // Only adjust text content, not video URLs
      const contentToAdjust = contentMode === 'text' ? currentContent :
        selectedTopicData?.content.text || currentContent;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Please adjust the following content based on this request: "${aiPrompt}"\n\nContent to adjust:\n${contentToAdjust}`,
          conversation: []
        }),
      });

      const data = await response.json();
      if (data.response) {
        setCurrentContent(data.response);
        setAiPrompt('');
        setShowAIPanel(false);
        // Switch to text mode to show the adjusted content
        if (contentMode !== 'text') {
          setContentMode('text');
        }
      } else if (data.error) {
        console.error('API Error:', data.error);
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error adjusting content:', error);
      alert('Error adjusting content. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedTopicData = selectedTopic ? hotTopics.find(t => t.id === selectedTopic) : null;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative">
      {/* Background animation */}
      <LightWavesBackground />

      {/* Navigation */}
      <Navigation />

      <div className="container max-w-7xl mx-auto z-10 px-4 py-10 mt-24 mb-10">
        {!selectedTopic ? (
          <>
            {/* Hot AI Experience Topics Section */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-semibold mb-6 tracking-tight">
                  Agentic <span className="sitecore-gradient-text">Experience</span>
                </h1>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                  Explore hot topics shaping digital experiences in the AI era.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hotTopics.map((topic, index) => (
                  <div
                    key={topic.id}
                    className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-100 overflow-hidden"
                    onClick={() => handleTopicSelect(topic.id)}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'slideInUp 0.6s ease-out forwards'
                    }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={topic.image}
                        alt={topic.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold text-lg mb-1">{topic.title}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 text-sm leading-relaxed">{topic.description}</p>
                      <div className="mt-4 flex items-center text-purple-600 text-sm font-medium">
                        <span>Explore Topic</span>
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Events Section */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
                  Join the AI conversation
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Register for upcoming events or revisit past discussions shaping the future of agentic experiences.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Upcoming Events */}
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
                        <Link
                          to="/symposium-2025"
                          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                        >
                          Learn more →
                        </Link>
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

                {/* Past Events */}
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
          </>
        ) : (
          /* Selected Topic Content */
          <div className="max-w-6xl mx-auto">
            {/* Topic Header */}
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
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    {selectedTopicData.description}
                  </p>
                </div>
              )}
            </div>

            {/* Content Mode Switcher */}
            <div className="mb-8">
              <div className="flex justify-center">
                <div className="bg-gray-100 p-1 rounded-lg inline-flex">
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
                </div>
              </div>
            </div>

            {/* Content Display */}
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
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <div className="max-w-md mx-auto">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1a7 7 0 0 1 14 0v1h-4v8h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"/>
                    </svg>
                    <h3 className="text-lg font-semibold mb-2">Podcast Episode</h3>
                    <p className="text-gray-600 mb-4">Audio content coming soon</p>
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="flex items-center justify-center space-x-4">
                        <button className="p-2 bg-gray-200 rounded-full">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </button>
                        <div className="flex-1 bg-gray-200 h-2 rounded-full">
                          <div className="bg-purple-500 h-2 rounded-full w-1/3" />
                        </div>
                        <span className="text-sm text-gray-500">12:34</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {contentMode === 'text' && (
                <article className="max-w-none relative">
                  {/* Reset Button */}
                  <button
                    onClick={handleResetContent}
                    className="absolute top-0 right-0 px-3 py-1 text-sm text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    title="Reset to original content"
                  >
                    Reset
                  </button>

                  <div className="space-y-5 pr-16">
                    {currentContent.split('\n\n').map((section, index) => {
                      if (!section.trim()) return null;

                      // Handle main heading
                      if (section.startsWith('# ')) {
                        return (
                          <h1 key={index} className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                            {section.replace('# ', '')}
                          </h1>
                        );
                      }

                      // Handle section headings
                      if (section.startsWith('## ')) {
                        return (
                          <h2 key={index} className="text-xl font-semibold text-gray-800 mb-3 mt-6 leading-tight border-b border-gray-200 pb-2">
                            {section.replace('## ', '')}
                          </h2>
                        );
                      }

                      // Handle sub-headings
                      if (section.startsWith('### ')) {
                        return (
                          <h3 key={index} className="text-lg font-medium text-gray-700 mb-2 mt-5 leading-tight">
                            {section.replace('### ', '')}
                          </h3>
                        );
                      }

                      // Handle bullet lists
                      if (section.includes('\n- ')) {
                        const items = section.split('\n').filter(line => line.startsWith('- '));
                        return (
                          <ul key={index} className="space-y-2 mb-5">
                            {items.map((item, itemIndex) => (
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

                      // Handle regular paragraphs
                      return (
                        <p key={index} className="text-gray-700 leading-relaxed text-base mb-5">
                          <span dangerouslySetInnerHTML={{
                            __html: section.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                          }} />
                        </p>
                      );
                    })}
                  </div>
                </article>
              )}
            </div>


          </div>
        )}
      </div>

      {/* Floating AI Adjustment Button */}
      {selectedTopic && (
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

      {/* AI Adjustment Panel */}
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

              {/* Suggested Prompts */}
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
