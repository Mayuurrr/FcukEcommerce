import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello, I am Aether Assist. How can I help you navigate our minimalist wardrobe today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // System instructions to guide Aether Assist
      const systemMessage = {
        role: 'system',
        content: `You are Aether Assist, a professional and refined AI assistant for AETHER, a premium quiet-luxury fashion store located in Koramangala, Bangalore.
We sell minimalist, high-quality clothing essentials under Men, Women, and Kids.
Our categories are: Topwear (blazers, shirts, sweaters, graphic tees, hoodies, linen shirts), Bottomwear (straight-leg jeans, wide-leg trousers, satin midi skirts, utility shorts), and Winterwear (wool overcoats, cashmere-blend coats, alpaca cardigans, merino sweaters, kids puffers).
- Respond in a polite, helpful, and concise manner.
- Do NOT use heavy formatting, emojis or generic placeholders. Keep it elegant.
- When referring users to pages or product categories, always use local markdown links so the application can intercept and route them.
  For example:
  * "To view our outerwears, browse our [Winterwear Collection](/collection)."
  * "Explore our linen shirts and basic tees in [Topwear Collection](/collection)."
  * "See your selected pieces and checkout here: [Go to Cart](/cart)."
  * "Review your order status and history: [My Orders](/orders)."
  * "Read about our craftsmanship philosophy: [Our Philosophy](/about)."
  * "Need to reach out? Get details on [Contact Page](/contact)."
  * "For billing or listing products as an admin, see [Admin Dashboard](http://localhost:5173/)."
- Mention actual products from our catalogue: Classic White Oxford Shirt, Essential Crew Neck Tee, Oversized Cashmere-Blend Coat, Slim Straight Jeans, Ribbed Knit Alpaca Cardigan, Wide Leg Tailored Trousers, Kids Puffer Jacket.
- If they ask for discounts, tell them to use welcome code AETHER20 for 20% off.`
      };

      // Map conversation history for Pollinations AI compatibility
      const apiMessages = [
        systemMessage,
        ...messages.map((m) => ({
          role: m.sender === 'bot' ? 'assistant' : 'user',
          content: m.text,
        })),
        { role: 'user', content: query },
      ];

      // Fetch from free, zero-config Pollinations AI completions API
      const response = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          model: 'openai', // Default OpenAI-equivalent model
          private: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Inference failed');
      }

      const botReplyText = await response.text();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botReplyText || 'I am currently processing your request. Please try again shortly.',
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'Apologies, I encountered a connection issue. If you need immediate assistance, explore our [Collections](/collection) or check your [Cart](/cart).',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Helper to parse markdown links [Text](/path)
  const renderMessageText = (text) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      const label = match[1];
      const url = match[2];

      parts.push(
        <button
          key={match.index}
          onClick={() => {
            if (url.startsWith('http')) {
              window.open(url, '_blank');
            } else {
              navigate(url);
              setIsOpen(false);
            }
          }}
          className="text-zinc-950 underline font-medium hover:text-zinc-500 transition-colors"
        >
          {label}
        </button>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  const quickActions = [
    { label: 'Jackets 🧥', text: 'Show me your winterwear and jackets' },
    { label: 'Go to Cart 🛒', text: 'Where is my cart?' },
    { label: 'Order Status 📦', text: 'Track my orders' },
    { label: 'Promo Code 🏷️', text: 'Are there any discount codes?' },
    { label: 'Talk to Human ☕', text: 'I want to talk to a human' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="Toggle Chat"
      >
        {isOpen ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
        )}
      </button>

      {/* Chat Card */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-85 sm:w-96 bg-white border border-zinc-200 shadow-xl overflow-hidden flex flex-col fade-up" style={{ height: '480px' }}>
          {/* Header */}
          <div className="bg-zinc-950 px-5 py-4 flex items-center justify-between text-white">
            <div>
              <p className="text-[9px] tracking-widest uppercase text-zinc-400 font-semibold">AI Assistant</p>
              <h3 className="text-sm font-medium tracking-wide">Aether Assist</h3>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] text-zinc-400 tracking-wider uppercase font-semibold">Active</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-zinc-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-zinc-900 text-white'
                      : 'bg-white text-zinc-800 border border-zinc-100'
                  }`}
                >
                  {renderMessageText(msg.text)}
                </div>
                <span className="text-[9px] text-zinc-400 mt-1 font-light">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-1 bg-white border border-zinc-100 px-4 py-3 text-zinc-400 text-xs">
                <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions List */}
          <div className="px-5 py-2 border-t border-zinc-100 bg-white flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
            {quickActions.map((action, i) => (
              <button
                key={i}
                disabled={isLoading}
                onClick={() => handleSend(action.text)}
                className="text-[10px] font-medium border border-zinc-200 hover:border-zinc-950 hover:bg-zinc-50 text-zinc-500 hover:text-zinc-950 px-3 py-1.5 transition-all duration-150"
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-zinc-100 bg-white flex gap-2"
          >
            <input
              type="text"
              value={input}
              disabled={isLoading}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Aether Assist..."
              className="flex-1 border border-zinc-200 px-3 py-2 text-xs focus:outline-none focus:border-zinc-950 placeholder-zinc-300 bg-white disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-zinc-900 text-white px-4 py-2 text-xs uppercase tracking-widest font-semibold hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
