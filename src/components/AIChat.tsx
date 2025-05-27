import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  feedback?: 'helpful' | 'not-helpful';
  isTyping?: boolean;
  followUpQuestions?: string[];
  caseStudy?: {
    name: string;
    url: string;
    description: string;
    industry: string;
    challenge: string;
    solution: string;
    results: string[];
    caseStudyImage?: string;
  };
}

interface AIChatProps {
  className?: string;
  onReady?: (addMessage: (prompt: string, response: string, caseStudy?: any) => void) => void;
}

// Helper functions for hot topic case study content
function getChallengeForTopic(topicId: string): string {
  const challenges: Record<string, string> = {
    'future-of-search': 'Traditional search tools can\'t keep up with changing expectations or content complexity.',
    'generative-ads': 'Your brand might not be visible in AI-first channels. Paid placements, SEO, and content strategies need to adapt to new modes of discovery.',
    'content-transformation': 'Manual production pipelines can\'t keep up with demand. Translating content across formats, markets, or moments is too slow.',
    'personalization-ai-scale': 'Most personalization is still rules-based, disconnected, or limited by segmentation. Scaling requires intelligence, not just data.',
    'conversational-ux': 'Few experiences are designed for conversation. Most websites and apps still rely on static paths, missing a chance to engage.',
    'experience-agents': 'Manual workflows slow down speed to market. Without automation, scaling personalized experiences is impossible.'
  };
  return challenges[topicId] || 'Implementing cutting-edge AI solutions';
}

function getSolutionForTopic(topicId: string): string {
  const solutions: Record<string, string> = {
    'future-of-search': 'Adopt semantic, AI-enhanced search strategies that connect people to what they mean, not just what they type.',
    'generative-ads': 'Rethink your media strategy for a world where AI arbitrates visibility. Prepare to integrate your brand into answers, not just ads.',
    'content-transformation': 'Use AI to reformat, repurpose, and personalize content—faster. Build flexible models that let content flow wherever it\'s needed.',
    'personalization-ai-scale': 'Move beyond rules. Use AI to drive real-time, contextual personalization based on behavior, preferences, and predictive insights.',
    'conversational-ux': 'Design experiences that feel more like a dialogue than a destination. Use conversational AI to guide, assist, and convert.',
    'experience-agents': 'Experiment with AI agents that take action. Start small—brief writing, testing ideas—and grow toward full task orchestration.'
  };
  return solutions[topicId] || 'Sitecore AI-powered experiences';
}

function getResultsForTopic(topicId: string): string[] {
  const results: Record<string, string[]> = {
    'future-of-search': ['Can your search adapt to new behaviors?', 'Are your content models built for discoverability?', 'Do you know how AI is changing SEO?'],
    'generative-ads': ['Do your campaigns account for AI-first discovery?', 'Is your content structured for generative inclusion?', 'Are you exploring partnerships with AI platforms?'],
    'content-transformation': ['Can you transform a single asset into many?', 'Are your systems built to support omnichannel delivery?', 'Are you using AI to accelerate production, not just creation?'],
    'personalization-ai-scale': ['Is your data unified and actionable?', 'Are you testing AI-driven approaches to targeting?', 'Can you personalize in real time across channels?'],
    'conversational-ux': ['Is your UX ready for input beyond clicks?', 'Are you using AI to power chat, voice, or intent detection?', 'Can users get what they need without searching or browsing?'],
    'experience-agents': ['Do your workflows allow AI to act, not just suggest?', 'Can your systems support agentic execution?', 'Are you ready to delegate to digital workers?']
  };
  return results[topicId] || ['Enhanced user engagement', 'Improved conversion rates', 'Streamlined operations'];
}

// Case Study Card Component
function CaseStudyCard({ caseStudy }: { caseStudy: Message['caseStudy'] }) {
  if (!caseStudy) return null;
  return (
    <div className="mt-4 mb-2 p-6 border border-purple-200 rounded-xl bg-purple-50 shadow-sm animate-fade-in w-full">
      <div className="flex items-start gap-8">
        {/* Text Content - Narrower */}
        <div className="flex-1 max-w-[60%]">
          <div className="flex items-center mb-3">
            <span className="inline-block w-2 h-2 bg-purple-400 rounded-full mr-2" />
            <a
              href={caseStudy.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-semibold text-purple-700 hover:underline"
            >
              {caseStudy.name}
            </a>
            <span className="ml-3 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
              {caseStudy.industry}
            </span>
          </div>
          <p className="text-sm text-gray-700 mb-4">{caseStudy.description}</p>

          <div className="space-y-3">
            <div>
              <span className="font-semibold text-gray-800 text-sm">Challenge: </span>
              <span className="text-gray-700 text-sm">{caseStudy.challenge}</span>
            </div>

            <div>
              <span className="font-semibold text-gray-800 text-sm">Solution: </span>
              <span className="text-gray-700 text-sm">{caseStudy.solution}</span>
            </div>

            <div>
              <span className="font-semibold text-gray-800 text-sm">Results:</span>
              <ul className="list-disc list-inside text-gray-700 text-sm mt-1 space-y-1">
                {caseStudy.results.map((result, idx) => (
                  <li key={idx}>{result}</li>
                ))}
              </ul>
            </div>

            {/* Multiple CTAs */}
            <div className="mt-4 pt-3 border-t border-purple-200">
              <p className="text-xs text-purple-600 font-medium mb-3 uppercase tracking-wide">Explore this topic</p>
              <div className="flex flex-wrap gap-2">
                <Link
                  to={`${caseStudy.url}&mode=article`}
                  className="inline-flex items-center px-3 py-2 bg-white border border-purple-300 text-purple-700 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-purple-50 hover:border-purple-400 hover:shadow-sm transform hover:scale-105"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Read</span>
                </Link>
                <Link
                  to={`${caseStudy.url}&mode=video`}
                  className="inline-flex items-center px-3 py-2 bg-white border border-purple-300 text-purple-700 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-purple-50 hover:border-purple-400 hover:shadow-sm transform hover:scale-105"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M9 10v5a2 2 0 002 2h2a2 2 0 002-2v-5" />
                  </svg>
                  <span>Watch</span>
                </Link>
                <Link
                  to={`${caseStudy.url}&mode=podcast`}
                  className="inline-flex items-center px-3 py-2 bg-white border border-purple-300 text-purple-700 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-purple-50 hover:border-purple-400 hover:shadow-sm transform hover:scale-105"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <span>Listen</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study Image - Twice as large */}
        <div className="flex-shrink-0 w-80 h-56 bg-white rounded-lg p-2 shadow-sm border border-purple-100">
          <img
            src={caseStudy.caseStudyImage || caseStudy.url}
            alt={`${caseStudy.name} case study`}
            className="w-full h-full object-cover rounded"
            onError={(e) => {
              // Try fallback to logo URL if case study image fails
              const target = e.target as HTMLImageElement;
              if (target.src === caseStudy.caseStudyImage) {
                target.src = caseStudy.url;
              } else {
                // If both fail, use a generic placeholder
                target.src = `https://via.placeholder.com/320x180/f3f4f6/9ca3af?text=${encodeURIComponent(caseStudy.name)}`;
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function AIChat({ className = '', onReady }: AIChatProps) {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const [showFollowUps, setShowFollowUps] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Help me learn about AI experiences",
    "What events can I attend to learn about AI experiences",
    "How can AI improve customer engagement?",
    "Tell me about the latest in personalization technology"
  ];

  const hotTopics = [
    {
      id: 'future-of-search',
      title: 'Future of Search',
      prompt: 'Tell me about the Future of Search and how search is evolving from keywords to meaning',
      response: 'Search is evolving from keywords to meaning, using AI to understand context and intent rather than just matching text.',
      link: '/agentic-experience?topic=future-of-search',
      description: 'Search is evolving from keywords to meaning. Are you ready?'
    },
    {
      id: 'generative-ads',
      title: 'Generative Ads',
      prompt: 'Tell me about Generative Ads and how advertising is entering the world of AI-generated experiences',
      response: 'Advertising is shifting to AI-generated experiences where brands must integrate into AI-driven recommendations and answers, not just traditional ad formats.',
      link: '/agentic-experience?topic=generative-ads',
      description: 'Advertising is entering the world of AI-generated experiences. Are you ready for the shift?'
    },
    {
      id: 'content-transformation',
      title: 'Content Transformation',
      prompt: 'Tell me about Content Transformation and how AI is reshaping how content is created, adapted, and delivered',
      response: 'Content transformation uses AI to automatically reformat, repurpose, and personalize content across multiple channels and formats at scale.',
      link: '/agentic-experience?topic=content-transformation',
      description: 'Content isn\'t static anymore. AI is reshaping how it\'s created, adapted, and delivered.'
    },
    {
      id: 'personalization-ai-scale',
      title: 'Personalization at AI Scale',
      prompt: 'Tell me about Personalization at AI Scale and how one-to-one personalization is finally possible',
      response: 'AI-powered personalization delivers real-time, contextual experiences across all touchpoints using behavioral data and predictive insights instead of rules.',
      link: '/agentic-experience?topic=personalization-ai-scale',
      description: 'One-to-one is finally possible. Are you ready to scale relevance?'
    },
    {
      id: 'conversational-ux',
      title: 'Conversational UX',
      prompt: 'Tell me about Conversational UX and how AI is changing how people interact with digital experiences',
      response: 'Conversational UX transforms digital interactions from menu navigation to natural dialogue using chat, voice, and AI-powered conversations.',
      link: '/agentic-experience?topic=conversational-ux',
      description: 'AI is changing how people interact with digital experiences. Are you ready to talk?'
    },
    {
      id: 'experience-agents',
      title: 'Experience Agents',
      prompt: 'Tell me about Experience Agents and how your next team member might not be human',
      response: 'Experience Agents are autonomous AI systems that perform real tasks like content creation, campaign optimization, and customer journey orchestration.',
      link: '/agentic-experience?topic=experience-agents',
      description: 'Your next team member might not be human. Are you ready for autonomous experiences?'
    }
  ];

  // Smooth scroll to bottom of chat container only
  const scrollToBottom = () => {
    if (chatContainerRef.current && messagesEndRef.current) {
      const container = chatContainerRef.current;
      const scrollHeight = container.scrollHeight;
      const height = container.clientHeight;
      const maxScrollTop = scrollHeight - height;

      container.scrollTo({
        top: maxScrollTop,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to show new message from the top
  const scrollToNewMessage = (messageId: string) => {
    setTimeout(() => {
      // Find the message element and scroll to it
      const messageElement = document.querySelector(`[data-message-id="${messageId}"]`);
      if (messageElement && chatContainerRef.current) {
        const container = chatContainerRef.current;
        const elementTop = (messageElement as HTMLElement).offsetTop;

        container.scrollTo({
          top: Math.max(0, elementTop - 20), // 20px padding from top
          behavior: 'smooth'
        });
      }
    }, 150);
  };

  // Auto-scroll to bottom when new messages are added (but not on initial load)
  useEffect(() => {
    if (messages.length > 0) {
      // Small delay to ensure content is rendered
      setTimeout(scrollToBottom, 50);
    }
  }, [messages]);

  // Auto-scroll when follow-up questions are shown
  useEffect(() => {
    if (showFollowUps) {
      setTimeout(scrollToBottom, 150);
    }
  }, [showFollowUps]);

  // Function to add external messages (from logo clicks)
  const addExternalMessage = (userPrompt: string, assistantResponse: string, caseStudy?: Message['caseStudy']) => {
    // Clear existing conversation for external messages to start fresh
    setMessages([]);
    setShowFollowUps(null);
    setError('');

    const userMessageId = Date.now().toString();
    const assistantMessageId = (Date.now() + 1).toString();

    // Add user message
    const userMessage: Message = {
      id: userMessageId,
      role: 'user',
      content: userPrompt,
      timestamp: new Date()
    };

    // Add assistant message
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: assistantResponse,
      timestamp: new Date(),
      followUpQuestions: generateFollowUpQuestions(assistantResponse),
      caseStudy: caseStudy
    };

    setMessages([userMessage, assistantMessage]);
    setShowFollowUps(assistantMessageId);
    setPrompt('');

    // Scroll to the user message to show the conversation from the beginning
    scrollToNewMessage(userMessageId);
  };

  // Expose the addExternalMessage function to parent component
  useEffect(() => {
    if (onReady) {
      onReady(addExternalMessage);
    }
  }, [onReady]);

  // Don't auto-focus input on mount to prevent page scroll

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const generateFollowUpQuestions = (response: string): string[] => {
    // Simple follow-up question generation based on response content
    const followUps = [];

    if (response.toLowerCase().includes('ai') || response.toLowerCase().includes('artificial intelligence')) {
      followUps.push("How can I implement this in my organization?");
      followUps.push("What are the potential challenges?");
    }

    if (response.toLowerCase().includes('event') || response.toLowerCase().includes('conference')) {
      followUps.push("How do I register for this event?");
      followUps.push("What other events would you recommend?");
    }

    if (response.toLowerCase().includes('personalization') || response.toLowerCase().includes('customer')) {
      followUps.push("Show me some real-world examples");
      followUps.push("What metrics should I track?");
    }

    // Default follow-ups if no specific keywords found
    if (followUps.length === 0) {
      followUps.push("Can you elaborate on this?");
      followUps.push("What are the next steps?");
      followUps.push("Are there any examples?");
    }

    return followUps.slice(0, 3); // Return max 3 follow-ups
  };

  const typeMessage = async (messageId: string, content: string, caseStudy?: Message['caseStudy']) => {
    setTypingMessageId(messageId);
    const words = content.split(' ');
    let currentText = '';

    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? ' ' : '') + words[i];

      setMessages(prev => prev.map(msg =>
        msg.id === messageId
          ? { ...msg, content: currentText, isTyping: true }
          : msg
      ));

      // Scroll less frequently to reduce jerkiness - only every few words
      if (i % 3 === 0) {
        setTimeout(scrollToBottom, 10);
      }

      // Variable typing speed for more natural feel
      const delay = words[i].length > 6 ? 80 : 40;
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    // Generate and add follow-up questions
    const followUpQuestions = generateFollowUpQuestions(content);

    setMessages(prev => prev.map(msg =>
      msg.id === messageId
        ? { ...msg, isTyping: false, followUpQuestions, caseStudy }
        : msg
    ));
    setTypingMessageId(null);

    // Show follow-ups after a brief delay
    setTimeout(() => {
      setShowFollowUps(messageId);
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError('');
    setPrompt('');
    setShowFollowUps(null); // Hide any existing follow-ups

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          conversationHistory: messages.map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessageId = (Date.now() + 1).toString();
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isTyping: true
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);

      // Start typing animation
      await typeMessage(assistantMessageId, data.response, data.caseStudy);

    } catch (error) {
      setIsLoading(false);
      setError('Sorry, I encountered an error. Please try again.');
      console.error('Error calling chat API:', error);
    }
  };

  const handleSuggestedPrompt = (suggestedPrompt: string) => {
    setPrompt(suggestedPrompt);
    inputRef.current?.focus();
  };

  const handleFollowUpClick = (question: string) => {
    setPrompt(question);
    setShowFollowUps(null);
    inputRef.current?.focus();
    // Auto-submit the follow-up question
    setTimeout(() => {
      const form = inputRef.current?.closest('form');
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }, 100);
  };

  const handleHotTopicClick = (topic: typeof hotTopics[0]) => {
    // Clear existing conversation for hot topics to start fresh
    setMessages([]);
    setShowFollowUps(null);
    setError('');

    const userMessageId = Date.now().toString();
    const assistantMessageId = (Date.now() + 1).toString();

    // Add user message
    const userMessage: Message = {
      id: userMessageId,
      role: 'user',
      content: topic.prompt,
      timestamp: new Date()
    };

    // Determine the appropriate image for each topic
    let topicImage = `https://via.placeholder.com/400x300/f97316/ffffff?text=${encodeURIComponent(topic.title)}`;

    // Use custom images for all hot topics
    switch (topic.id) {
      case 'future-of-search':
        topicImage = '/images/future-of-search.webp';
        break;
      case 'generative-ads':
        topicImage = '/images/generative-ads.webp';
        break;
      case 'content-transformation':
        topicImage = '/images/dynamic-content.webp';
        break;
      case 'personalization-ai-scale':
        topicImage = '/images/ai-scale-personalization.webp';
        break;
      case 'conversational-ux':
        topicImage = '/images/conversational-ux.webp';
        break;
      case 'experience-agents':
        topicImage = '/images/experience-agents.webp';
        break;
      default:
        // Keep placeholder for any future topics
        break;
    }

    // Add assistant message with hot topic data
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: topic.response,
      timestamp: new Date(),
      followUpQuestions: [
        "How can I implement this in my organization?",
        "What are the key benefits?",
        "Show me real-world examples"
      ],
      caseStudy: {
        name: topic.title,
        url: topic.link,
        description: topic.description,
        industry: "AI Experiences",
        challenge: getChallengeForTopic(topic.id),
        solution: getSolutionForTopic(topic.id),
        results: getResultsForTopic(topic.id),
        caseStudyImage: topicImage
      }
    };

    setMessages([userMessage, assistantMessage]);
    setShowFollowUps(assistantMessageId);
    setPrompt('');

    // Multiple scroll attempts to ensure we reach the top
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = 0;
        chatContainerRef.current.scrollTo({
          top: 0,
          behavior: 'instant'
        });
      }
    }, 50);

    // Additional scroll attempt after content renders
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = 0;
      }
    }, 300);

    // Final scroll attempt
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = 0;
      }
    }, 600);
  };

  const handleFeedback = (messageId: string, feedback: 'helpful' | 'not-helpful') => {
    setMessages(prev => prev.map(msg =>
      msg.id === messageId
        ? { ...msg, feedback }
        : msg
    ));
  };

  const clearConversation = () => {
    setMessages([]);
    setError('');
    setShowFollowUps(null);
    // Scroll to top of chat container instead of focusing input
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // Small delay to allow for layout changes, then scroll to bottom
    setTimeout(scrollToBottom, 100);
  };

  return (
    <>
      {/* Fullscreen backdrop */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={toggleFullscreen}
        />
      )}

      <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 ${
        isFullscreen
          ? 'fixed left-4 right-4 top-20 bottom-4 z-50 rounded-xl shadow-2xl'
          : className
      }`}>
      <div className={`${isFullscreen ? 'p-4 h-full flex flex-col' : 'p-6'}`}>
        {/* Header */}
        <div className={`flex items-center justify-between ${isFullscreen ? 'mb-4' : 'mb-6'}`}>
          <div className="flex items-center space-x-4">
            <div className="stream-logo-container">
              <div className="stream-pulse-circle">
                <img
                  src="https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/cd19406a75f8481680f97b3cf791d967?v=20f609ce"
                  alt="Stream AI Logo"
                  className="stream-logo-image"
                />
              </div>
            </div>
            <div>
              <h2 className={`font-semibold ${isFullscreen ? 'text-xl' : 'text-2xl'}`}>
                Ask <span className="sitecore-gradient-text">Stream</span>
              </h2>
              <p className="text-sm text-gray-500 mt-1">AI-powered assistance for your questions</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleFullscreen}
              className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2"
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0-4.5l5.5 5.5" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              )}
              <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
            </button>
            {messages.length > 0 && (
              <button
                onClick={clearConversation}
                className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Animated Background for Fullscreen Mode */}
        {isFullscreen && messages.length === 0 && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20">
              <div className="w-96 h-96 rounded-full border-2 border-purple-300 animate-ping" style={{ animationDuration: '3s' }}></div>
              <div className="absolute top-8 left-8 w-80 h-80 rounded-full border border-purple-300 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
              <div className="absolute top-16 left-16 w-64 h-64 rounded-full border border-purple-300 animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
            </div>
            <div className="absolute top-1/4 right-1/4 opacity-10">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-200 to-red-200 animate-pulse" style={{ animationDuration: '6s' }}></div>
            </div>
            <div className="absolute bottom-1/4 left-1/4 opacity-10">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-200 to-purple-200 animate-pulse" style={{ animationDuration: '7s', animationDelay: '3s' }}></div>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className={`space-y-6 overflow-y-auto ${
            isFullscreen
              ? 'flex-1 mb-4'
              : 'mb-6 max-h-[600px]'
          }`}
        >
          {messages.map((message) => (
            <div key={message.id} className="group" data-message-id={message.id}>
              {message.role === 'user' ? (
                <div className="flex justify-end">
                  <div className="max-w-sm sm:max-w-lg lg:max-w-4xl w-4/5">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl rounded-br-md px-4 py-3" data-user-message-id={message.id}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <div className="flex items-center justify-end mt-1 space-x-2">
                      <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
                      <button
                        onClick={() => copyToClipboard(message.content)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
                        title="Copy message"
                      >
                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="stream-avatar-pulse">
                        <img
                          src="https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/cd19406a75f8481680f97b3cf791d967?v=20f609ce"
                          alt="Stream"
                          className="stream-avatar-image"
                        />
                      </div>
                    </div>
                    <div className="flex-grow max-w-sm sm:max-w-lg lg:max-w-4xl w-4/5">
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-bl-md p-4">
                        <div className="prose prose-sm max-w-none text-gray-700" data-content-id={`content-${message.id}`}>
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                          {message.isTyping && (
                            <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse ml-1" />
                          )}
                        </div>
                        {/* Case Study Card */}
                        {message.caseStudy && !message.isTyping && (
                          <CaseStudyCard caseStudy={message.caseStudy} />
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
                          <button
                            onClick={() => copyToClipboard(message.content)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
                            title="Copy message"
                          >
                            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>

                        {!message.isTyping && (
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-400">Helpful?</span>
                            <button
                              onClick={() => handleFeedback(message.id, 'helpful')}
                              className={`p-1 rounded transition-colors ${
                                message.feedback === 'helpful'
                                  ? 'bg-green-100 text-green-600'
                                  : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                              }`}
                              title="Helpful"
                            >
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleFeedback(message.id, 'not-helpful')}
                              className={`p-1 rounded transition-colors ${
                                message.feedback === 'not-helpful'
                                  ? 'bg-red-100 text-red-600'
                                  : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                              }`}
                              title="Not helpful"
                            >
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.106-1.79l-.05-.025A4 4 0 0011.057 2H5.641a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Follow-up Questions Pills */}
                  {message.followUpQuestions && showFollowUps === message.id && !message.isTyping && (
                    <div className="ml-12 mt-3 animate-fade-in">
                      <p className="text-xs text-gray-500 mb-2">Ask a follow-up:</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {message.followUpQuestions.map((question) => (
                          <button
                            key={question}
                            onClick={() => handleFollowUpClick(question)}
                            className="px-3 py-1.5 text-xs bg-gradient-to-r from-gray-100 to-gray-200 hover:from-purple-50 hover:to-purple-50 text-gray-700 hover:text-purple-700 rounded-full border border-gray-200 hover:border-purple-200 transition-all duration-200 hover:shadow-sm transform hover:scale-105"
                          >
                            {question}
                          </button>
                        ))}
                      </div>

                      {/* Hot Topics after follow-ups */}
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-2">Explore other topics:</p>
                        <div className="flex flex-wrap gap-2">
                          {hotTopics.map((topic) => (
                            <button
                              key={topic.id}
                              onClick={() => handleHotTopicClick(topic)}
                              className="px-3 py-1.5 text-xs sitecore-gradient text-white rounded-full font-medium transition-all duration-200 hover:shadow-sm transform hover:scale-105 whitespace-nowrap"
                            >
                              {topic.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Loading State */}
          {isLoading && (
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <div className="stream-avatar-pulse stream-thinking">
                  <img
                    src="https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/cd19406a75f8481680f97b3cf791d967?v=20f609ce"
                    alt="Stream"
                    className="stream-avatar-image"
                  />
                </div>
              </div>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
                <span className="ml-3 text-sm text-gray-500">Stream is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Hot AI Experience Topics - only show when no conversation */}
        {messages.length === 0 && (
          <div className={`${isFullscreen ? 'mb-4' : 'mb-6'}`}>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-purple-500 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-800">Hot AI Experience Topics</h3>
              </div>
            </div>
            <div className="flex flex-nowrap gap-2 mb-6 overflow-x-auto">
              {hotTopics.map((topic, index) => (
                <button
                  key={topic.id}
                  onClick={() => handleHotTopicClick(topic)}
                  className="group relative overflow-hidden sitecore-gradient text-white px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 transform whitespace-nowrap flex-shrink-0"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'slideInUp 0.5s ease-out forwards'
                  }}
                >
                  <div className="flex items-center space-x-1.5">
                    <svg className="w-3 h-3 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                    <span>{topic.title}</span>
                  </div>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Prompts - only show when no conversation */}
        {messages.length === 0 && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3">Try these questions:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestedPrompts.map((suggestedPrompt) => (
                <button
                  key={suggestedPrompt}
                  onClick={() => handleSuggestedPrompt(suggestedPrompt)}
                  className="text-left px-4 py-3 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-sm"
                >
                  {suggestedPrompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-grow relative">
              <input
                ref={inputRef}
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask Stream anything about AI experiences..."
                className="w-full px-4 py-3 pr-12 rounded-lg bg-white border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                disabled={isLoading}
              />
              {prompt && (
                <button
                  type="button"
                  onClick={() => setPrompt('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className="px-6 py-3 sitecore-gradient text-white rounded-full hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center justify-center space-x-2 ask-stream-button group"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <span>Ask Stream</span>
                  <img
                    src="/cta-arrow.svg"
                    alt="Arrow"
                    className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
