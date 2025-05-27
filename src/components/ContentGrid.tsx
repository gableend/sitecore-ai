import { useState, useEffect } from 'react';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'hot_topic' | 'visionary' | 'ai_concept' | 'report';
  readTime?: string;
  author?: string;
  fullContent?: string;
  pdfUrl?: string;
}

// Comprehensive content database
const allContent: ContentItem[] = [
  // Hot Topics
  {
    id: 'personalization-ai-scale',
    title: 'Personalization at AI Scale',
    description: 'Delivering tailored, individual experiences efficiently at scale',
    image: '/images/ai-scale-personalization.webp',
    type: 'hot_topic',
    readTime: '5 minute read',
    fullContent: `# Personalization at AI Scale

Delivering tailored, individual experiences efficiently at scale through advanced AI-driven personalization that adapts in real-time to user behavior and preferences.

## Key Benefits
- **Real-time Adaptation**: Instantly responds to user behavior
- **Enterprise Scale**: Handles millions of users simultaneously
- **Predictive Intelligence**: Anticipates user needs
- **Cross-channel Consistency**: Unified experience across touchpoints

## Implementation Strategy
1. **Data Collection**: Comprehensive user behavior tracking
2. **AI Processing**: Machine learning analysis of preferences
3. **Content Orchestration**: Dynamic assembly of experiences
4. **Continuous Learning**: Automated optimization over time

Experience the future where AI agents work tirelessly to create perfect user experiences.`
  },
  {
    id: 'content-transformation',
    title: 'Content Transformation',
    description: 'Dynamically adapting content for multiple contexts and channels',
    image: '/images/dynamic-content.webp',
    type: 'hot_topic',
    readTime: '4 minute read',
    fullContent: `# Content Transformation

Revolutionize how organizations create, manage, and deliver content across multiple channels and contexts.

## Core Capabilities
- **Multi-format Adaptation**: Transform content for web, mobile, email
- **Context-aware Delivery**: Considers user location and behavior
- **Real-time Optimization**: Performance-based improvements
- **Brand Consistency**: Unified messaging across channels

## Use Cases
- Cross-channel marketing campaigns
- Localization for global audiences
- Device optimization
- Audience segmentation`
  },
  {
    id: 'conversational-ux',
    title: 'Conversational UX',
    description: 'Creating natural, engaging user interactions through chat and voice',
    image: '/images/conversational-ux.webp',
    type: 'hot_topic',
    readTime: '6 minute read',
    fullContent: `# Conversational UX

Transform digital interactions by enabling natural language communication between users and systems.

## Core Components
- **Natural Language Understanding**: Interprets complex queries
- **Context Awareness**: Maintains conversation state
- **Multi-modal Interactions**: Text, voice, and visual inputs
- **Emotional Intelligence**: Responds to user sentiment

## Implementation
- Training conversational AI models
- Designing dialogue flows
- Creating knowledge bases
- System integration`
  },
  {
    id: 'future-of-search',
    title: 'Future of Search',
    description: 'Reimagining search through intent-driven, AI-powered experiences',
    image: '/images/future-of-search.webp',
    type: 'hot_topic',
    readTime: '7 minute read',
    fullContent: `# The Future of Search

How marketers can get ahead of the AI disruption.

## Key Changes
- **Zero-click Results**: AI provides direct answers
- **Generative AI Tools**: ChatGPT and Perplexity shape perception
- **GEO Strategy**: Generative Engine Optimization
- **AI Advertising**: New contextual opportunities

## Implications
- Traditional SEO/SEM evolving
- AI agents may replace direct website visits
- Need for AI-friendly content strategies
- Focus on authoritative, structured content`
  },
  {
    id: 'generative-ads',
    title: 'Generative Ads',
    description: 'AI-driven creation, optimization, and personalization of advertising',
    image: '/images/generative-ads.webp',
    type: 'hot_topic',
    readTime: '5 minute read',
    fullContent: `# Generative Ads

AI-driven creation, optimization, and personalization of advertising at scale.

## AI-Powered Creation
- **Dynamic Copy Generation**: Tailored messaging
- **Visual Asset Creation**: Relevant imagery and graphics
- **Multi-variant Production**: Thousands of variations
- **Brand-consistent Output**: Maintains guidelines

## Intelligent Optimization
- Performance-based learning
- Audience adaptation
- Channel optimization
- Real-time adjustments`
  },
  {
    id: 'experience-agents',
    title: 'Experience Agents',
    description: 'Proactive AI agents autonomously enhancing digital experiences',
    image: '/images/experience-agents.webp',
    type: 'hot_topic',
    readTime: '6 minute read',
    fullContent: `# Experience Agents

Autonomous AI agents that orchestrate, optimize, and personalize digital experiences without human intervention.

## Agent Capabilities
- **Experience Orchestration**: Coordinates multiple touchpoints
- **Real-time Optimization**: Adjusts based on performance
- **Proactive Engagement**: Anticipates user needs
- **Cross-channel Coordination**: Maintains consistency

## Agent Types
1. **Personalization Agents**: Tailor content and experiences
2. **Optimization Agents**: Improve performance metrics
3. **Support Agents**: Provide assistance
4. **Analytics Agents**: Gather insights and recommendations

Enable agents to make independent decisions and continuously evolve through machine learning.`
  },

  // Digital Visionaries
  {
    id: 'liz-nelson-ai-cms',
    title: 'Liz Nelson on AI-Powered CMS',
    description: 'How AI transforms content management and digital experiences',
    image: '/images/liz-nelson.webp',
    type: 'visionary',
    readTime: '8 minute read',
    author: 'Liz Nelson, VP of Product',
    fullContent: `# AI-Powered Content Management Systems

Liz Nelson discusses how artificial intelligence revolutionizes content management.

## AI Transformations
- **Automated Content Creation**: Generate relevant, on-brand materials
- **Intelligent Tagging**: Categorize and organize automatically
- **Personalized Delivery**: Serve appropriate content to users
- **Dynamic Optimization**: Improve performance over time

## Future Vision
The future of CMS lies in AI-driven workflows that understand content context, user intent, and business objectives.

## Implementation Focus
- Maintaining human oversight
- Embracing AI capabilities
- Creating engaging experiences
- Achieving better business outcomes`
  },
  {
    id: 'ru-barry-ai-revolution',
    title: 'Ru Barry on the AI Revolution in Marketing',
    description: 'Transforming marketing strategies through artificial intelligence',
    image: '/images/ru-barry.webp',
    type: 'visionary',
    readTime: '9 minute read',
    author: 'Ru Barry, Marketing Innovation Leader',
    fullContent: `# AI Revolution in Marketing

Ru Barry explores how AI fundamentally changes marketing strategies and customer engagement.

## Core Transformations
- **Predictive Analytics**: Forecast customer behavior
- **Automated Campaigns**: Optimize performance in real-time
- **Advanced Personalization**: Unique experiences for each customer
- **Journey Optimization**: Guide users through ideal conversion paths

## Success Factors
- Proper data foundation
- Clear objectives
- Continuous learning
- Ethical considerations

## Future Outlook
Intelligent systems augment human capabilities while delivering personalized, relevant experiences that drive growth.`
  },

  // AI Concepts
  {
    id: 'semantic-search',
    title: 'Semantic Search',
    description: 'Search that understands context, meaning, and intent—not just keywords',
    image: '/images/semantic-search.webp',
    type: 'ai_concept',
    readTime: '4 minute read',
    fullContent: `# Semantic Search

Search that understands context, meaning, and intent—not just keywords.

## Key Characteristics
- **Context Understanding**: Interprets full meaning behind queries
- **Intent Recognition**: Identifies what users actually seek
- **Relationship Mapping**: Understands concept connections
- **Natural Language Processing**: Handles conversational queries

## Applications
- Improved site search accuracy
- Conversational search interfaces
- Content recommendation engines
- Knowledge discovery systems
- Intelligent chatbot responses`
  },
  {
    id: 'knowledge-graphs',
    title: 'Knowledge Graphs',
    description: 'Structured representations of relationships between data',
    image: '/images/knowledge-graphs.webp',
    type: 'ai_concept',
    readTime: '5 minute read',
    fullContent: `# Knowledge Graphs

Structured representations of relationships between data, enabling richer content discovery and personalization.

## Core Components
- **Entities**: People, places, things, and concepts
- **Relationships**: Connections between entities
- **Attributes**: Properties and characteristics
- **Context**: Situational information and metadata

## Applications
- Enhanced content recommendations
- Personalized user journeys
- Intelligent content tagging
- Cross-platform data unification
- Dynamic content assembly`
  },
  {
    id: 'vector-embeddings',
    title: 'Vector Embeddings',
    description: 'Mathematical representations that power similarity search and recommendations',
    image: '/images/vector-embeddings.webp',
    type: 'ai_concept',
    readTime: '6 minute read',
    fullContent: `# Vector Embeddings

Mathematical representations of content that enable AI to understand and compare similarity, relevance, and relationships.

## Technical Features
- **Numerical Representation**: Convert content into comparable vectors
- **Similarity Calculation**: Measure relatedness between items
- **Dimensional Space**: Map concepts in multi-dimensional space
- **ML Integration**: Enable AI to understand relationships

## Applications
- Content similarity matching
- Personalized recommendations
- Semantic search capabilities
- Content clustering
- Intent-based experiences`
  },
  {
    id: 'atomic-content',
    title: 'Atomic Content',
    description: 'Modular, reusable content pieces for dynamic assembly',
    image: '/images/atomic-content.webp',
    type: 'ai_concept',
    readTime: '4 minute read',
    fullContent: `# Atomic Content

Breaking content into modular, reusable pieces that can be dynamically assembled and personalized across channels.

## Design Principles
- **Modularity**: Small, independent content units
- **Reusability**: Same content across multiple contexts
- **Flexibility**: Dynamic assembly based on user needs
- **Consistency**: Unified brand voice and messaging

## Applications
- Omnichannel content delivery
- Personalized content assembly
- Efficient content management
- A/B testing at component level
- Rapid content iteration`
  },
  {
    id: 'multimodal-ai',
    title: 'Multimodal AI',
    description: 'AI systems that process multiple input types—text, image, video, and audio',
    image: '/images/multimodal-ai.webp',
    type: 'ai_concept',
    readTime: '7 minute read',
    fullContent: `# Multimodal AI

AI systems that process and generate across multiple input types to deliver richer experiences.

## Modality Types
- **Text Processing**: Natural language understanding and generation
- **Image Analysis**: Visual recognition and creation
- **Audio Processing**: Speech recognition and synthesis
- **Video Understanding**: Motion and temporal analysis

## Applications
- Rich content generation
- Accessible content alternatives
- Interactive media experiences
- Cross-modal content search
- Unified content creation workflows`
  },

  // Reports
  {
    id: 'content-to-experience-report',
    title: 'From Content to Experience: How AI is Shaping the Future of Marketing',
    description: 'Explore how AI is transforming marketing through scalable innovation',
    image: 'https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/5e3963e061f24c04b2f905226b72c732?t=sc700x700',
    type: 'report',
    readTime: '25 minute read',
    pdfUrl: 'https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/450023cd283f4b16a045ceb782837688?v=78ff2068',
    fullContent: `# From Content to Experience: How AI is Shaping the Future of Marketing

Comprehensive insights into AI's transformative impact on marketing strategies and customer engagement.

## Key Research Areas
- **AI-powered Personalization**: Creating unique customer experiences
- **Automated Content Generation**: Scaling creative production
- **Predictive Analytics**: Anticipating customer needs
- **Intelligent Optimization**: Real-time campaign improvements

## Industry Insights
- Retail transformation strategies
- Financial services innovations
- Healthcare personalization
- Technology sector best practices
- Manufacturing optimization

## Key Findings
Organizations implementing AI-driven marketing achieve higher engagement, improved conversion rates, and better ROI.`
  },
  {
    id: 'websites-2025-report',
    title: 'Websites 2025: How Marketers are Adapting to Digital Trends',
    description: 'How organizations evolve websites using AI, personalization, and scalable CMS',
    image: 'https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/8bcb1dbbd8044281b33d05cc07a5b238?t=sc700x700',
    type: 'report',
    readTime: '30 minute read',
    pdfUrl: 'https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/36b4155047a249ea9437cc8f0a3adbb2?v=d63fcb2e',
    fullContent: `# Websites 2025: How Marketers are Adapting to Changing Digital Trends

Research on website evolution and digital platform transformation strategies.

## Key Trends
- **AI-powered Chatbots**: Intelligent customer assistance
- **Semantic Search**: Understanding user intent
- **Headless Architecture**: Flexible, composable systems
- **Machine Learning**: Content optimization and UX enhancement

## Success Factors
- Mobile-first design principles
- Accessibility considerations
- Cross-channel integration
- Scalable CMS platforms

## Implementation Insights
Technology selection, deployment approaches, and measurement strategies for modern web experiences.`
  }
];

const typeLabels = {
  'hot_topic': 'Hot Topic',
  'visionary': 'Digital Visionary',
  'ai_concept': 'Key AI Concept',
  'report': 'Research Report'
};

const typeColors = {
  'hot_topic': 'bg-red-500',
  'visionary': 'bg-purple-600',
  'ai_concept': 'bg-blue-500',
  'report': 'bg-green-600'
};

interface ContentGridProps {
  searchQuery?: string;
  searchResults?: any[];
  isSearching?: boolean;
  onContentSelect: (content: ContentItem) => void;
}

export default function ContentGrid({ searchQuery, searchResults, isSearching, onContentSelect }: ContentGridProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [displayContent, setDisplayContent] = useState<ContentItem[]>(allContent);

  // Update displayed content based on search or filter
  useEffect(() => {
    if (searchQuery && searchResults && searchResults.length > 0) {
      // Map search results to our content items
      const mappedResults = searchResults.map(result => {
        const baseContent = allContent.find(item => item.id === result.id || item.id === result.originalId);
        if (baseContent) {
          return {
            ...baseContent,
            // Use search result content if available
            fullContent: result.content?.fullContent || baseContent.fullContent
          };
        }
        return null;
      }).filter(Boolean) as ContentItem[];

      setDisplayContent(mappedResults);
    } else if (selectedFilter === 'all') {
      setDisplayContent(allContent);
    } else {
      setDisplayContent(allContent.filter(item => item.type === selectedFilter));
    }
  }, [searchQuery, searchResults, selectedFilter]);

  const handleDownload = async (item: ContentItem) => {
    if (item.pdfUrl) {
      const link = document.createElement('a');
      link.href = item.pdfUrl;
      link.download = `${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.pdf`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Agentic Experience Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Discover insights, strategies, and stories to elevate your digital experience.
            Explore our comprehensive collection of AI concepts, expert insights, and research.
          </p>
        </div>

        {/* Filter Tabs */}
        {!searchQuery && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { key: 'all', label: 'All Content' },
              { key: 'hot_topic', label: 'Hot Topics' },
              { key: 'visionary', label: 'Digital Visionaries' },
              { key: 'ai_concept', label: 'AI Concepts' },
              { key: 'report', label: 'Research Reports' }
            ].map(filter => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedFilter === filter.key
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}

        {/* Search Results Header */}
        {searchQuery && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Search Results</h2>
                <p className="text-gray-600">
                  {isSearching ? 'Searching...' : `${displayContent.length} results found for "${searchQuery}"`}
                </p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayContent.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
              onClick={() => onContentSelect(item)}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {/* Content Image with Overlay */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Type Overlay */}
                <div className="absolute top-4 left-4">
                  <span className={`${typeColors[item.type]} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                    {typeLabels[item.type]}
                  </span>
                </div>

                {/* PDF Badge for Reports */}
                {item.type === 'report' && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      📄 PDF
                    </span>
                  </div>
                )}
              </div>

              {/* Content Info */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>{item.readTime}</span>
                  {item.author && <span>By {item.author}</span>}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3 text-left leading-tight line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed text-left line-clamp-3">
                  {item.description}
                </p>

                {/* Action Button for Reports */}
                {item.type === 'report' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(item);
                    }}
                    className="mt-4 w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Report
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {displayContent.length === 0 && !isSearching && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search terms or browse all content.</p>
          </div>
        )}

        {/* Loading State */}
        {isSearching && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Searching for relevant content...</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Export the content data for use in other components
export { allContent, typeLabels, typeColors };
export type { ContentItem };
