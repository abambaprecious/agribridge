import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import MarketTicker from './components/MarketTicker';
import MarketplaceView from './components/MarketplaceView';
import RFQMarketplace from './components/BiddingAndRFQ/RFQMarketplace';
import OrderTracker from './components/OrdersAndEscrow/OrderTracker';
import FarmerDashboard from './components/FarmerPortal/FarmerDashboard';
import AddProduceModal from './components/FarmerPortal/AddProduceModal';
import MiddlemanDashboard from './components/MiddlemanPortal/MiddlemanDashboard';
import AggregationModal from './components/MiddlemanPortal/AggregationModal';
import RetailerDashboard from './components/RetailerPortal/RetailerDashboard';
import PostRFQModal from './components/RetailerPortal/PostRFQModal';
import ChatDrawer from './components/Messaging/ChatDrawer';
import MarketInsights from './components/Analytics/MarketInsights';
import {
  Sprout,
  ShieldCheck,
  CheckCircle2,
  X,
  Truck,
  Store,
  Layers,
  Heart
} from 'lucide-react';

function MainLayout() {
  const { activeTab, currentUser, toastMessage } = useApp();

  const [showAddProduceModal, setShowAddProduceModal] = useState(false);
  const [showAggregationModal, setShowAggregationModal] = useState(false);
  const [showPostRFQModal, setShowPostRFQModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <div>
        {/* Navigation Bar */}
        <Navbar />

        {/* Live Daily Mandi Spot Price Ticker */}
        <MarketTicker />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {activeTab === 'marketplace' && (
            <MarketplaceView
              onOpenAddProduce={() => setShowAddProduceModal(true)}
              onOpenAggregationModal={() => setShowAggregationModal(true)}
            />
          )}

          {activeTab === 'rfqs' && (
            <RFQMarketplace />
          )}

          {activeTab === 'orders' && (
            <OrderTracker />
          )}

          {activeTab === 'dashboard' && (
            <>
              {currentUser.role === 'farmer' && (
                <FarmerDashboard onOpenAddProduce={() => setShowAddProduceModal(true)} />
              )}
              {currentUser.role === 'middleman' && (
                <MiddlemanDashboard onOpenAggregationModal={() => setShowAggregationModal(true)} />
              )}
              {currentUser.role === 'retailer' && (
                <RetailerDashboard onOpenPostRFQ={() => setShowPostRFQModal(true)} />
              )}
            </>
          )}

          {activeTab === 'insights' && (
            <MarketInsights />
          )}

          {activeTab === 'messages' && (
            <ChatDrawer />
          )}
        </main>
      </div>

      {/* Global Modals */}
      {showAddProduceModal && (
        <AddProduceModal onClose={() => setShowAddProduceModal(false)} />
      )}

      {showAggregationModal && (
        <AggregationModal onClose={() => setShowAggregationModal(false)} />
      )}

      {showPostRFQModal && (
        <PostRFQModal onClose={() => setShowPostRFQModal(false)} />
      )}

      {/* Real-time Toast Notifications */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 max-w-md">
            <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-slate-100 leading-snug">
              {toastMessage.message}
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
              <Sprout className="w-3.5 h-3.5" />
            </div>
            <span className="font-heading font-extrabold text-slate-800 text-sm">
              Agri<span className="text-emerald-600">Bridge</span>
            </span>
            <span>• Direct Agricultural Commerce & Logistics Exchange</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Escrow Protected
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-700 font-semibold">
              <Truck className="w-3.5 h-3.5" /> Monitored Cold Chain (ISO-22000)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-blue-700 font-semibold">
              <Store className="w-3.5 h-3.5" /> Certified Retail Dock Grading
            </span>
          </div>

          <p className="text-slate-400 text-[11px]">
            Empowering smallholders & retailers through transparent intermediation.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

