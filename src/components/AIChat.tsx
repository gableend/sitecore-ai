import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  feedback?: 'helpful' | 'not-helpful';
  isTyping?: boolean;
  followUpQuestions?: string[];
}

interface AIChatProps {
  className?: string;
}

export default function AIChat({ className = '' }: AIChatProps) {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const [showFollowUps, setShowFollowUps] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedPrompts = [
    "Help me learn about AI experiences",
    "What events can I attend to learn about AI experiences",
    "How can AI improve customer engagement?",
    "Tell me about the latest in personalization technology"
  ];

  // Auto-scroll to bottom when new messages are added (but not on initial load)
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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

  const typeMessage = async (messageId: string, content: string) => {
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

      // Variable typing speed for more natural feel
      const delay = words[i].length > 6 ? 100 : 50;
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    // Generate and add follow-up questions
    const followUpQuestions = generateFollowUpQuestions(content);

    setMessages(prev => prev.map(msg =>
      msg.id === messageId
        ? { ...msg, isTyping: false, followUpQuestions }
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
      await typeMessage(assistantMessageId, data.response);

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
    inputRef.current?.focus();
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
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
              <h2 className="text-2xl font-semibold">
                Ask <span className="sitecore-gradient-text">Stream</span>
              </h2>
              <p className="text-sm text-gray-500 mt-1">AI-powered assistance for your questions</p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={clearConversation}
              className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Chat Messages */}
        <div className="space-y-6 mb-6 max-h-96 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className="group">
              {message.role === 'user' ? (
                <div className="flex justify-end">
                  <div className="max-w-xs sm:max-w-md lg:max-w-lg">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl rounded-br-md px-4 py-3">
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
                    <div className="flex-grow max-w-xs sm:max-w-md lg:max-w-lg">
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-bl-md p-4">
                        <div className="prose prose-sm max-w-none text-gray-700">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                          {message.isTyping && (
                            <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse ml-1" />
                          )}
                        </div>
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
                      <div className="flex flex-wrap gap-2">
                        {message.followUpQuestions.map((question) => (
                          <button
                            key={question}
                            onClick={() => handleFollowUpClick(question)}
                            className="px-3 py-1.5 text-xs bg-gradient-to-r from-gray-100 to-gray-200 hover:from-red-50 hover:to-orange-50 text-gray-700 hover:text-red-700 rounded-full border border-gray-200 hover:border-red-200 transition-all duration-200 hover:shadow-sm transform hover:scale-105"
                          >
                            {question}
                          </button>
                        ))}
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
              className="px-6 py-3 sitecore-gradient text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center justify-center space-x-2 ask-stream-button"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <span>Ask Stream</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
