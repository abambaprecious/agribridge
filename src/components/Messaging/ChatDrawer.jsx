import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Send,
  User,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Truck,
  Sprout,
  Store,
  Clock,
  Sparkles
} from 'lucide-react';

export default function ChatDrawer() {
  const {
    conversations,
    activeChatId,
    setActiveChatId,
    sendMessage,
    currentUser,
    users
  } = useApp();

  const [messageInput, setMessageInput] = useState('');

  const currentChat = conversations.find(c => c.id === activeChatId) || conversations[0];

  const handleSend = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !currentChat) return;
    sendMessage(currentChat.id, messageInput);
    setMessageInput('');
  };

  const sendQuickReply = (text) => {
    if (!currentChat) return;
    sendMessage(currentChat.id, text);
  };

  const getParticipantBadge = (name) => {
    if (name.includes('Farmer')) {
      return { bg: 'bg-emerald-50 text-emerald-800 border-emerald-200', icon: <Sprout className="w-3 h-3 text-emerald-600" /> };
    }
    if (name.includes('Middleman') || name.includes('Aggregator')) {
      return { bg: 'bg-amber-50 text-amber-800 border-amber-200', icon: <Truck className="w-3 h-3 text-amber-600" /> };
    }
    return { bg: 'bg-blue-50 text-blue-800 border-blue-200', icon: <Store className="w-3 h-3 text-blue-600" /> };
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col md:flex-row h-[780px]">
      {/* Left Column: Conversation Channels List */}
      <div className="w-full md:w-80 border-r border-slate-200 flex flex-col bg-slate-50/50">
        <div className="p-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-base text-slate-900 font-heading">
              Trade Negotiation Room
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Tripartite deals between Farmers, Aggregators & Retailers.
          </p>
        </div>

        <div className="p-3 overflow-y-auto flex-1 space-y-2">
          {conversations.map(conv => {
            const isSelected = conv.id === (currentChat?.id);
            const lastMsg = conv.messages[conv.messages.length - 1];

            return (
              <div
                key={conv.id}
                onClick={() => setActiveChatId(conv.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'bg-white border-teal-500 shadow-xs ring-2 ring-teal-500/10'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-slate-900 truncate">
                    {conv.title}
                  </span>
                  {conv.orderRef && (
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded">
                      {conv.orderRef}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 line-clamp-1">
                  {lastMsg ? lastMsg.text : 'New trade inquiry...'}
                </p>

                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{conv.participants.length} Parties in chat</span>
                  <span className="text-teal-600 font-medium">Active Deal</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Chat Messages & Input */}
      {currentChat ? (
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-slate-900">{currentChat.title}</h4>
                {currentChat.orderRef && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                    Linked to {currentChat.orderRef}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Messaging as: <strong className="text-slate-800">{currentUser.name}</strong> ({currentUser.role.toUpperCase()})
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Escrow Protected Channel</span>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {currentChat.messages.map(msg => {
              const isMe = msg.senderId === currentUser.id;
              const badge = getParticipantBadge(msg.senderName);

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className={`inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-semibold border ${badge.bg}`}>
                      {badge.icon}
                      <span className="ml-1">{msg.senderName}</span>
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div
                    className={`max-w-lg rounded-2xl p-3.5 text-xs leading-relaxed shadow-xs ${
                      isMe
                        ? 'bg-emerald-700 text-white rounded-tr-none'
                        : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Trade Actions */}
          <div className="px-4 py-2 border-t border-slate-100 bg-slate-50 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Quick Terms:
            </span>
            <button
              onClick={() => sendQuickReply("Confirmed: Farm-gate pre-cooling completed at 11.2°C. Loading truck now.")}
              className="text-[11px] bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg"
            >
              ✓ Confirm Pre-cooling
            </button>
            <button
              onClick={() => sendQuickReply("Counter-offer: We can deliver at $1.38/kg with refrigerated transit included.")}
              className="text-[11px] bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg"
            >
              $ Counter-offer $1.38/kg
            </button>
            <button
              onClick={() => sendQuickReply("Retailer DC Dock bay 12 reserved for morning unloading. Automated inspection team alerted.")}
              className="text-[11px] bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg"
            >
              🏢 Reserve Dock Bay
            </button>
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-200 flex items-center gap-2 bg-white">
            <input
              type="text"
              placeholder={`Type contract terms or message as ${currentUser.name}...`}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-teal-500"
            />
            <button
              type="submit"
              disabled={!messageInput.trim()}
              className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400">
          <p>Select a conversation from the left to start negotiating.</p>
        </div>
      )}
    </div>
  );
}
