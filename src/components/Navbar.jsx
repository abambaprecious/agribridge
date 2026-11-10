import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sprout,
  Truck,
  Store,
  FileText,
  MessageSquare,
  TrendingUp,
  PackageCheck,
  Bell,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  Users,
  Search
} from 'lucide-react';

export default function Navbar() {
  const {
    currentUser,
    users,
    switchUser,
    activeTab,
    setActiveTab,
    orders,
    notifications,
    conversations
  } = useApp();

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const activeOrdersCount = orders.filter(o => o.status !== 'COMPLETED_PAID').length;
  const unreadMessagesCount = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);
  const unreadNotificationsCount = notifications.filter(n => n.unread).length;

  const getRoleBadge = (role) => {
    switch (role) {
      case 'farmer':
        return {
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          icon: <Sprout className="w-3.5 h-3.5 text-emerald-600 mr-1" />,
          label: 'Farmer / Grower'
        };
      case 'middleman':
        return {
          bg: 'bg-amber-100 text-amber-800 border-amber-300',
          icon: <Truck className="w-3.5 h-3.5 text-amber-600 mr-1" />,
          label: 'Aggregator / Middleman'
        };
      case 'retailer':
        return {
          bg: 'bg-blue-100 text-blue-800 border-blue-300',
          icon: <Store className="w-3.5 h-3.5 text-blue-600 mr-1" />,
          label: 'Retailer / Supermarket'
        };
      default:
        return { bg: 'bg-slate-100 text-slate-800', icon: null, label: role };
    }
  };

  const roleBadge = getRoleBadge(currentUser.role);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Banner / Role Switcher Quick Pill */}
      <div className="bg-slate-900 text-slate-300 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-medium text-emerald-400">Live Agri-Commodity Exchange</span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">Smart Escrow Protection Active</span>
          </div>

          {/* Quick Demo Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium hidden md:inline">Test Persona:</span>
            <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
              <button
                onClick={() => switchUser('user-farmer-1')}
                className={`px-2.5 py-0.5 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                  currentUser.role === 'farmer' && currentUser.id === 'user-farmer-1'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Sprout className="w-3 h-3" /> Amara (Farmer)
              </button>
              <button
                onClick={() => switchUser('user-middleman-1')}
                className={`px-2.5 py-0.5 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                  currentUser.role === 'middleman'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Truck className="w-3 h-3" /> Carlos (Middleman)
              </button>
              <button
                onClick={() => switchUser('user-retailer-1')}
                className={`px-2.5 py-0.5 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                  currentUser.role === 'retailer'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Store className="w-3 h-3" /> Elena (Retailer)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('marketplace')}
              className="flex items-center gap-2.5 focus:outline-hidden text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-700/20">
                <Sprout className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900">
                    Agri<span className="text-emerald-600">Bridge</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Hub
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-none">
                  Farmer • Middleman • Retailer
                </p>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'marketplace'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>Marketplace</span>
            </button>

            <button
              onClick={() => setActiveTab('rfqs')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'rfqs'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Buyer RFQs</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 relative ${
                activeTab === 'orders'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <PackageCheck className="w-4 h-4 text-amber-600" />
              <span>Escrow & Orders</span>
              {activeOrdersCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                  {activeOrdersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {currentUser.role === 'farmer' && <Sprout className="w-4 h-4 text-emerald-600" />}
              {currentUser.role === 'middleman' && <Truck className="w-4 h-4 text-amber-600" />}
              {currentUser.role === 'retailer' && <Store className="w-4 h-4 text-blue-600" />}
              <span>My Portal</span>
            </button>

            <button
              onClick={() => setActiveTab('insights')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'insights'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <span>Price Index</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 relative ${
                activeTab === 'messages'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-teal-600" />
              <span>Deal Room</span>
              {unreadMessagesCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              )}
            </button>
          </nav>

          {/* Right Controls: Notifications & User Profile */}
          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Exchange Alerts</h4>
                    <span className="text-[10px] text-emerald-600 font-semibold">{notifications.length} updates</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.map(n => (
                      <div key={n.id} className="p-3 text-xs hover:bg-slate-50 transition-colors">
                        <p className="text-slate-800 font-medium leading-relaxed">{n.text}</p>
                        <span className="text-[10px] text-slate-400 mt-1 inline-block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Active User Card with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 border border-slate-200 transition-all text-left"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-lg object-cover ring-2 ring-emerald-500/20"
                />
                <div className="hidden lg:block">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-900 truncate max-w-[120px]">
                      {currentUser.name}
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-semibold border ${roleBadge.bg}`}>
                      {roleBadge.label}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {/* User Dropdown Selector */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs text-slate-400 font-medium">Logged in as:</p>
                    <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-xs text-slate-500 truncate">{currentUser.company}</p>
                  </div>

                  <div className="py-2">
                    <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Switch Role Account
                    </p>
                    <div className="space-y-1">
                      {users.map(u => {
                        const badge = getRoleBadge(u.role);
                        const isCurrent = u.id === currentUser.id;
                        return (
                          <button
                            key={u.id}
                            onClick={() => {
                              switchUser(u.id);
                              setShowUserDropdown(false);
                            }}
                            className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors ${
                              isCurrent ? 'bg-slate-100 font-bold' : 'hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <img
                                src={u.avatar}
                                alt={u.name}
                                className="w-7 h-7 rounded-md object-cover"
                              />
                              <div>
                                <p className="text-xs font-semibold text-slate-800">{u.name}</p>
                                <span className="text-[10px] text-slate-500">{u.company}</span>
                              </div>
                            </div>
                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${badge.bg}`}>
                              {u.role.toUpperCase()}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-100 text-xs font-medium">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`flex flex-col items-center py-1 px-2 rounded ${
              activeTab === 'marketplace' ? 'text-emerald-700 font-bold' : 'text-slate-500'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>Market</span>
          </button>
          <button
            onClick={() => setActiveTab('rfqs')}
            className={`flex flex-col items-center py-1 px-2 rounded ${
              activeTab === 'rfqs' ? 'text-blue-700 font-bold' : 'text-slate-500'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>RFQs</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex flex-col items-center py-1 px-2 rounded ${
              activeTab === 'orders' ? 'text-amber-700 font-bold' : 'text-slate-500'
            }`}
          >
            <PackageCheck className="w-4 h-4" />
            <span>Orders</span>
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center py-1 px-2 rounded ${
              activeTab === 'dashboard' ? 'text-emerald-700 font-bold' : 'text-slate-500'
            }`}
          >
            {currentUser.role === 'farmer' && <Sprout className="w-4 h-4" />}
            {currentUser.role === 'middleman' && <Truck className="w-4 h-4" />}
            {currentUser.role === 'retailer' && <Store className="w-4 h-4" />}
            <span>Portal</span>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex flex-col items-center py-1 px-2 rounded ${
              activeTab === 'messages' ? 'text-teal-700 font-bold' : 'text-slate-500'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat</span>
          </button>
        </div>
      </div>
    </header>
  );
}

