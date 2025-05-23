"use client";

import { useState } from 'react';

export default function ChatbotDemo() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I\'m your AI customer service assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  // Sample responses for demo purposes
  const botResponses = {
    'order status': 'I can help you check your order status. Could you please provide your order number?',
    'return policy': 'Our return policy allows returns within 30 days of purchase with a valid receipt. Would you like more details about specific product categories?',
    'shipping': 'Standard shipping typically takes 3-5 business days. Express shipping is available for an additional fee and delivers within 1-2 business days.',
    'contact': 'You can reach our human support team at support@example.com or call us at (555) 123-4567 during business hours (9am-5pm EST, Monday-Friday).',
    'hours': 'Our customer service team is available Monday through Friday, 9am to 5pm Eastern Time. On weekends, we offer limited support from 10am to 2pm.',
    'help': 'I can help with order status, returns, shipping information, product questions, and more. What specific information are you looking for?',
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { id: messages.length + 1, sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    
    // Generate bot response
    setTimeout(() => {
      let botResponse = 'I\'m not sure I understand. Could you please rephrase your question?';
      
      // Check for keywords in user input
      Object.entries(botResponses).forEach(([keyword, response]) => {
        if (input.toLowerCase().includes(keyword)) {
          botResponse = response;
        }
      });
      
      setMessages(prev => [...prev, { 
        id: prev.length + 1, 
        sender: 'bot', 
        text: botResponse 
      }]);
    }, 1000);
    
    setInput('');
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="section-title">Customer Service Chatbot Demo</h1>
      <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">
        The below is for demonstation purposes only and not an actaul chatbot.
      </p>
      
      <div className="max-w-lg mx-auto border rounded-lg overflow-hidden shadow-md">
        <div className="bg-primary text-white p-4">
          <h2 className="font-medium">AI Customer Service Assistant</h2>
        </div>
        
        <div className="h-96 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`mb-4 ${message.sender === 'user' ? 'text-right' : ''}`}
            >
              <div 
                className={`inline-block p-3 rounded-lg ${message.sender === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'}`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message here..."
            className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Chat message input"
          />
          <button 
            onClick={handleSend}
            className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary/90"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}