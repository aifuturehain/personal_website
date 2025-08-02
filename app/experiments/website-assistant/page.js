'use client';

import { useState } from 'react';

// URL Input Component
function URLInput({ onSubmit, isLoading, disabled = false }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (url) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!validateUrl(url.trim())) {
      setError('Please enter a valid HTTP or HTTPS URL');
      return;
    }

    setError('');
    onSubmit(url.trim());
  };

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter Website URL
          </label>
          <div className="flex gap-2">
            <input
              id="url"
              type="text"
              value={url}
              onChange={handleInputChange}
              placeholder="https://example.com"
              disabled={disabled || isLoading}
              className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                error 
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                  : 'border-gray-300 bg-white dark:bg-gray-800'
              } ${
                disabled || isLoading 
                  ? 'opacity-50 cursor-not-allowed' 
                  : ''
              }`}
            />
            <button
              type="submit"
              disabled={disabled || isLoading || !url.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
                </div>
              ) : (
                'Analyze Website'
              )}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}
        </div>
      </form>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <p>💡 Try websites like news articles, blogs, or business websites for best results</p>
      </div>
    </div>
  );
}

// Chat Box Component
function ChatBox({ messages, onSendMessage, isLoading, disabled = false, websiteTitle }) {
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || disabled || isLoading) {
      return;
    }

    onSendMessage(inputMessage.trim());
    setInputMessage('');
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = (message) => {
    switch (message.type) {
      case 'user':
        return (
          <div key={message.id} className="flex justify-end mb-4">
            <div className="max-w-xs lg:max-w-md">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg rounded-br-none">
                <p className="text-sm">{message.content}</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">{formatTime(message.timestamp)}</p>
            </div>
          </div>
        );
      
      case 'bot':
        return (
          <div key={message.id} className="flex justify-start mb-4">
            <div className="max-w-xs lg:max-w-md">
              <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg rounded-bl-none">
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatTime(message.timestamp)}</p>
            </div>
          </div>
        );
      
      case 'system':
        return (
          <div key={message.id} className="flex justify-center mb-4">
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-2 rounded-lg text-sm border border-green-200 dark:border-green-700">
              {message.content}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
      {/* Header */}
      {websiteTitle && (
        <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-900/50 rounded-t-lg">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
            💬 Chatting about: <span className="text-blue-600 dark:text-blue-400">{websiteTitle}</span>
          </h3>
        </div>
      )}

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <p className="text-sm">No messages yet</p>
              <p className="text-xs mt-1">Enter a website URL above to start chatting!</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map(renderMessage)}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="max-w-xs lg:max-w-md">
                  <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg rounded-bl-none">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={disabled ? "Analyze a website first to start chatting" : "Ask a question about the website..."}
            disabled={disabled || isLoading}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <button
            type="submit"
            disabled={disabled || isLoading || !inputMessage.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

// Error State Component
function ErrorState({ title, message, suggestion, onRetry }) {
  return (
    <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">{title}</h3>
          <p className="mt-1 text-sm text-red-700 dark:text-red-300">{message}</p>
          {suggestion && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              <span className="font-medium">Suggestion:</span> {suggestion}
            </p>
          )}
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Loading State Component
function LoadingState({ message = "Loading..." }) {
  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-sm text-gray-600 dark:text-gray-400">{message}</span>
    </div>
  );
}

// Main Website Assistant Page
export default function WebsiteAssistant() {
  const [websiteData, setWebsiteData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isScrapingLoading, setIsScrapingLoading] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUrlSubmit = async (url) => {
    setIsScrapingLoading(true);
    setError(null);
    setMessages([]);
    setWebsiteData(null);

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (data.status === 'error') {
        setError({
          title: getErrorTitle(data.errorType),
          message: data.message,
          suggestion: data.suggestion,
        });
        return;
      }

      setWebsiteData({
        title: data.websiteTitle,
        content: data.content,
        summary: data.contentSummary,
        url: data.url,
      });

      const successMessage = {
        id: Date.now().toString(),
        type: 'system',
        content: `✅ Website analyzed successfully! You can now ask questions about "${data.websiteTitle}"`,
        timestamp: new Date(),
      };

      setMessages([successMessage]);

    } catch (error) {
      console.error('Scraping failed:', error);
      setError({
        title: 'Connection Error',
        message: 'Failed to connect to the server',
        suggestion: 'Please check your internet connection and try again',
      });
    } finally {
      setIsScrapingLoading(false);
    }
  };

  const handleSendMessage = async (question) => {
    if (!websiteData) return;

    setIsChatLoading(true);

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: question,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          websiteContent: websiteData.content,
          websiteTitle: websiteData.title,
          websiteUrl: websiteData.url,
        }),
      });

      const data = await response.json();

      if (data.status === 'error') {
        const errorMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: `❌ ${data.message}\n\n${data.suggestion}`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
        return;
      }

      const botMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Chat failed:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: '❌ Sorry, I encountered an error while processing your question. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
  };

  const getErrorTitle = (errorType) => {
    switch (errorType) {
      case 'INVALID_URL':
        return 'Invalid URL';
      case 'TIMEOUT':
        return 'Request Timeout';
      case 'NOT_FOUND':
        return 'Page Not Found';
      case 'ACCESS_DENIED':
        return 'Access Denied';
      case 'NO_CONTENT':
        return 'No Content Found';
      default:
        return 'Error';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 md:ml-64">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Website Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter any website URL and ask questions about its content using AI
          </p>
        </header>

        {/* Main Content */}
        <div className="space-y-8">
          {/* URL Input Section */}
          <section>
            <URLInput
              onSubmit={handleUrlSubmit}
              isLoading={isScrapingLoading}
              disabled={isScrapingLoading}
            />
          </section>

          {/* Loading State */}
          {isScrapingLoading && (
            <section>
              <LoadingState message="Analyzing website content..." />
            </section>
          )}

          {/* Error State */}
          {error && (
            <section>
              <ErrorState
                title={error.title}
                message={error.message}
                suggestion={error.suggestion}
                onRetry={handleRetry}
              />
            </section>
          )}

          {/* Website Summary */}
          {websiteData && !error && (
            <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Website Summary</h2>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Title:</span> {websiteData.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">URL:</span> 
                  <a 
                    href={websiteData.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 ml-1 underline"
                  >
                    {websiteData.url}
                  </a>
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">
                  <span className="font-medium">Summary:</span> {websiteData.summary}
                </p>
              </div>
            </section>
          )}

          {/* Chat Section */}
          <section>
            <ChatBox
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isChatLoading}
              disabled={!websiteData}
              websiteTitle={websiteData?.title}
            />
          </section>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-600 dark:text-gray-400 mt-16">
          <p>Powered by Google Gemini AI • Part of Abhilash's Experiments</p>
          <p className="mt-1">
            💡 Perfect for business websites, articles, services, and more!
          </p>
        </footer>
      </div>
    </div>
  );
}