import React, { useState } from 'react';
import { Users, Share2, ThumbsUp, MessageSquare, Plus, Check } from 'lucide-react';
import './GroupPlanner.css';

const GroupPlanner = () => {
  const [voteCount, setVoteCount] = useState({ 1: 3, 2: 2, 3: 4 });
  const [voted, setVoted] = useState({});

  const handleVote = (id) => {
    setVoted(prev => ({ ...prev, [id]: !prev[id] }));
    setVoteCount(prev => ({
      ...prev,
      [id]: prev[id] + (voted[id] ? -1 : 1)
    }));
  };

  const groupMembers = [
    { name: "Sam (Host)", avatar: "S", bg: "#6366f1" },
    { name: "Alex", avatar: "A", bg: "#ec4899" },
    { name: "Rahul", avatar: "R", bg: "#10b981" },
    { name: "Maya", avatar: "M", bg: "#f59e0b" },
  ];

  const pollItems = [
    {
      id: 1,
      title: "W Goa Resort & Beach Club",
      type: "HOTEL OPTION",
      cost: "₹12,000 / night",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
      submittedBy: "Rahul"
    },
    {
      id: 2,
      title: "Thalassa Mediterranean Sunset Dinner",
      type: "DINING OPTION",
      cost: "₹2,200 for two",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
      submittedBy: "Alex"
    },
    {
      id: 3,
      title: "Private Yacht Cruise & Snorkeling",
      type: "ACTIVITY OPTION",
      cost: "₹3,500 / person",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
      submittedBy: "Sam"
    }
  ];

  return (
    <div className="group-planner-container">
      {/* Header */}
      <div className="group-planner-header">
        <div className="group-title-col">
          <div className="badge-tag">
            <Users size={15} />
            <span>Group Trip Workspace</span>
          </div>
          <h2>Goa Beach & Nightlife Escape 2025</h2>
        </div>

        {/* Share Invite Code */}
        <div className="share-code-card">
          <div className="code-text">Invite Code: <strong>GOA-TRIP-99</strong></div>
          <button className="copy-code-btn" title="Copy Invite Code">
            <Share2 size={15} />
            <span>Share Trip</span>
          </button>
        </div>
      </div>

      {/* Members Bar */}
      <div className="group-members-bar">
        <h4>Group Members ({groupMembers.length})</h4>
        <div className="avatars-row">
          {groupMembers.map((m, idx) => (
            <div key={idx} className="member-avatar-item" style={{ backgroundColor: m.bg }} title={m.name}>
              <span>{m.avatar}</span>
            </div>
          ))}
          <button className="add-member-circle-btn" title="Add Member">
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Poll Voting Cards */}
      <div className="group-section-title">
        <h3>Collaborative Voting Poll</h3>
        <p>Vote on activities and hotels suggested by group members</p>
      </div>

      <div className="poll-cards-grid">
        {pollItems.map(item => (
          <div key={item.id} className="poll-card">
            <div className="poll-image-box">
              <img src={item.image} alt={item.title} />
              <span className="poll-type-badge">{item.type}</span>
            </div>
            <div className="poll-card-body">
              <h4>{item.title}</h4>
              <p className="poll-cost">{item.cost}</p>
              <span className="suggested-by">Suggested by {item.submittedBy}</span>

              <div className="poll-footer-actions">
                <button 
                  className={`vote-btn ${voted[item.id] ? 'voted' : ''}`}
                  onClick={() => handleVote(item.id)}
                >
                  {voted[item.id] ? <Check size={16} /> : <ThumbsUp size={16} />}
                  <span>{voteCount[item.id]} Votes</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupPlanner;
