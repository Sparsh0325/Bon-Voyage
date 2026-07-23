import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, User, Compass, RefreshCw } from 'lucide-react';
import { generateAIChatResponse } from '../api/ChatApi';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'AI',
      text: "Hello! I am your **TravelMate AI** assistant. Ask me anything about trip itineraries, budget estimates, places to visit, hotels, or local dining spots!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const starterPrompts = [
    "Plan a 3 day budget trip to Jaipur for ₹15,000",
    "Best places to visit in Goa with family",
    "Top vegetarian restaurants in Manali",
    "Suggest luxury 5-star hotels in Udaipur with lake views"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      sender: 'USER',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputPrompt('');
    setIsTyping(true);

    try {
      // Call Free AI API
      const aiReplyText = await generateAIChatResponse(query.trim(), messages);

      const aiMessage = {
        id: Date.now() + 1,
        sender: 'AI',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'AI',
          text: "I am ready to help you plan your trip! Try asking for a 3-day itinerary or hotel recommendations for any destination.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-page-container">
      {/* Page Header */}
      <div className="chatbot-header-bar">
        <div className="header-title-wrapper">
          <div className="ai-status-badge">
            <Compass size={20} className="ai-icon" />
          </div>
          <div>
            <h2>TravelMate AI Co-Pilot</h2>
            <span className="online-status">● Live AI Assistance</span>
          </div>
        </div>

        <button 
          className="clear-chat-btn" 
          onClick={() => setMessages([messages[0]])}
          title="Reset Conversation"
        >
          <RefreshCw size={15} />
          <span>New Chat</span>
        </button>
      </div>

      {/* Starter Suggestion Pills */}
      {messages.length <= 2 && (
        <div className="starter-prompts-container">
          <p className="starter-heading"><Sparkles size={14} /> Quick Travel Ideas</p>
          <div className="starter-pills-grid">
            {starterPrompts.map((promptText, idx) => (
              <button 
                key={idx} 
                className="starter-pill-card"
                onClick={() => handleSendMessage(promptText)}
              >
                <span>{promptText}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages Stream Container */}
      <div className="chat-messages-container">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message-row ${msg.sender.toLowerCase()}`}>
            <div className="message-avatar">
              {msg.sender === 'USER' ? <User size={16} /> : <Sparkles size={16} />}
            </div>
            
            <div className="message-bubble">
              <div className="message-sender-name">
                {msg.sender === 'USER' ? 'You' : 'TravelMate AI'}
                <span className="msg-time">{msg.timestamp}</span>
              </div>
              <div className="message-text">{msg.text}</div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-message-row ai typing">
            <div className="message-avatar">
              <Sparkles size={16} />
            </div>
            <div className="message-bubble typing-bubble">
              <div className="typing-dots">
                <span />
                <span />
                <span />
              </div>
              <span className="typing-text">TravelMate AI is crafting your recommendation...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Message Bar */}
      <div className="chat-input-sticky-footer">
        <form 
          className="chat-input-form" 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <input
            type="text"
            className="chat-input-field"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask TravelMate AI about trips, itineraries, budget tips, hotels..."
            disabled={isTyping}
          />
          <button 
            type="submit" 
            className="chat-send-btn" 
            disabled={!inputPrompt.trim() || isTyping}
            title="Send Message"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
