import { useState } from 'react';

interface AIConcept {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  detailedContent: string;
}

const aiConcepts: AIConcept[] = [
  {
    id: 'semantic-search',
    title: 'Semantic Search',
    icon: '🔍',
    shortDescription: '',
    detailedContent: `
# Semantic Search

Search that understands context, meaning, and intent—not just keywords.

## Key Characteristics:
- **Context Understanding**: Interprets the full meaning behind search queries
- **Intent Recognition**: Identifies what users are actually looking for
- **Relationship Mapping**: Understands connections between concepts
- **Natural Language Processing**: Handles conversational queries

## Digital Experience Applications:
- Improved site search accuracy
- Conversational search interfaces
- Content recommendation engines
- Knowledge discovery systems
- Intelligent chatbot responses
`
  },
  {
    id: 'knowledge-graphs',
    title: 'Knowledge Graphs',
    icon: '🕸️',
    shortDescription: '',
    detailedContent: `
# Knowledge Graphs

Structured representations of relationships between data, enabling richer content discovery and personalization.

## Core Components:
- **Entities**: People, places, things, and concepts
- **Relationships**: Connections between entities
- **Attributes**: Properties and characteristics
- **Context**: Situational information and metadata

## Digital Experience Applications:
- Enhanced content recommendations
- Personalized user journeys
- Intelligent content tagging
- Cross-platform data unification
- Dynamic content assembly
`
  },
  {
    id: 'vector-embeddings',
    title: 'Vector Embeddings',
    icon: '📊',
    shortDescription: '',
    detailedContent: `
# Vector Embeddings

Mathematical representations of content that power similarity search, recommendations, and intent understanding.

## Technical Features:
- **Numerical Representation**: Convert text, images, and media into vectors
- **Similarity Calculation**: Measure relatedness between content pieces
- **Dimensional Space**: Map concepts in multi-dimensional space
- **Machine Learning Integration**: Enable AI to understand content relationships

## Digital Experience Applications:
- Content similarity matching
- Personalized recommendations
- Semantic search capabilities
- Content clustering and organization
- Intent-based user experiences
`
  },
  {
    id: 'atomic-content',
    title: 'Atomic Content',
    icon: '⚛️',
    shortDescription: '',
    detailedContent: `
# Atomic Content

Breaking content into modular, reusable pieces that can be dynamically assembled and personalized across channels.

## Design Principles:
- **Modularity**: Small, independent content units
- **Reusability**: Same content across multiple contexts
- **Flexibility**: Dynamic assembly based on user needs
- **Consistency**: Unified brand voice and messaging

## Digital Experience Applications:
- Omnichannel content delivery
- Personalized content assembly
- Efficient content management
- A/B testing at component level
- Rapid content iteration
`
  },
  {
    id: 'multimodal-ai',
    title: 'Multimodal AI',
    icon: '🎭',
    shortDescription: '',
    detailedContent: `
# Multimodal AI

AI systems that process and generate across multiple input types—text, image, video, and audio—to deliver richer experiences.

## Modality Types:
- **Text Processing**: Natural language understanding and generation
- **Image Analysis**: Visual recognition and creation
- **Audio Processing**: Speech recognition and synthesis
- **Video Understanding**: Motion and temporal analysis

## Digital Experience Applications:
- Rich content generation
- Accessible content alternatives
- Interactive media experiences
- Cross-modal content search
- Unified content creation workflows
`
  }
];

export default function KeyAIConcepts() {
  const [selectedConcept, setSelectedConcept] = useState<AIConcept | null>(null);

  const openModal = (concept: AIConcept) => {
    setSelectedConcept(concept);
  };

  const closeModal = () => {
    setSelectedConcept(null);
  };

  const renderDetailedContent = (content: string) => {
    const lines = content.trim().split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-2xl font-bold text-gray-900 mb-4 mt-6 first:mt-0">
            {line.replace('# ', '')}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-lg font-semibold text-gray-800 mb-3 mt-5">
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('- **')) {
        const match = line.match(/- \*\*(.+?)\*\*: (.+)/);
        if (match) {
          return (
            <li key={index} className="flex items-start mb-2">
              <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
              <span>
                <strong className="text-gray-900">{match[1]}</strong>: {match[2]}
              </span>
            </li>
          );
        }
      }
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="flex items-start mb-2">
            <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
            <span>{line.replace('- ', '')}</span>
          </li>
        );
      }
      if (line.match(/^\d+\./)) {
        return (
          <li key={index} className="mb-2 ml-4">
            {line}
          </li>
        );
      }
      if (line.trim() === '') {
        return <div key={index} className="mb-3" />;
      }
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-3">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
          Key AI concepts you need to know
        </h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          Essential AI technologies driving the future of digital experiences. Click any concept to learn more.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {aiConcepts.map((concept) => (
          <div
            key={concept.id}
            onClick={() => openModal(concept)}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-100 p-6 text-center group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {concept.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {concept.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {concept.shortDescription}
            </p>
            <div className="mt-4 flex items-center justify-center text-purple-600 text-sm font-medium">
              <span>Learn more</span>
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Modal/Lightbox */}
      {selectedConcept && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div className="flex items-center">
                <span className="text-3xl mr-3">{selectedConcept.icon}</span>
                <h3 className="text-2xl font-semibold text-gray-900">{selectedConcept.title}</h3>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="prose prose-gray max-w-none">
                {renderDetailedContent(selectedConcept.detailedContent)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
