import React from 'react';
import { History, MessageSquare, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ChatHistory.css';

const ChatHistory = () => {
  const navigate = useNavigate();

  const historyList = [
    {
      id: 1,
      title: "5 Day Jaipur Heritage Itinerary",
      date: "Yesterday at 4:30 PM",
      preview: "AI suggested visiting Amer Fort early morning at 9:30 AM to avoid crowds and heat...",
      messagesCount: 14
    },
    {
      id: 2,
      title: "Goa Beach & Nightlife Recommendations",
      date: "Oct 18, 2025",
      preview: "Recommended Thalassa in Siolim for sunset dining and Britto's shack for Goan curry...",
      messagesCount: 8
    },
    {
      id: 3,
      title: "Manali Snow Trip Budget Plan",
      date: "Oct 12, 2025",
      preview: "Allocated ₹15,000 budget including Solang Valley paragliding and hotel stay...",
      messagesCount: 22
    }
  ];

  return (
    <div className="chat-history-page-container">
      <div className="page-header">
        <div className="header-title-wrapper">
          <History size={22} className="header-icon" />
          <h2>Chat History</h2>
        </div>
      </div>

      <div className="history-list">
        {historyList.map(item => (
          <div key={item.id} className="history-card" onClick={() => navigate('/chatbot')}>
            <div className="history-icon-box">
              <MessageSquare size={20} />
            </div>
            <div className="history-card-body">
              <div className="history-card-header">
                <h3>{item.title}</h3>
                <span className="history-date">{item.date}</span>
              </div>
              <p className="history-preview">{item.preview}</p>
              <span className="msg-badge">{item.messagesCount} messages</span>
            </div>
            <div className="history-actions">
              <button className="icon-action-btn" title="Delete Session" onClick={(e) => e.stopPropagation()}>
                <Trash2 size={16} />
              </button>
              <button className="icon-action-btn" title="Resume Session">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
