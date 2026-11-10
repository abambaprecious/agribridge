import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  PackageCheck,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Thermometer,
  Fuel,
  User,
  ArrowRight,
  FileText,
  DollarSign,
  AlertCircle,
  MessageSquare,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import DigitalDocumentsModal from './DigitalDocumentsModal';

export default function OrderTracker() {
  const {
    orders,
    selectedOrder,
    setSelectedOrder,
    advanceOrderMilestone,
    startOrOpenChat,
    currentUser
  } = useApp();

  const [showDocsModal, setShowDocsModal] = useState(false);

  // Set default selected order if none selected
  const activeOrder = selectedOrder || orders[0];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ORDER_PLACED':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'HARVEST_AGGREGATED':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'QUALITY_CHECKED':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'IN_TRANSIT':
        return 'bg-teal-100 text-teal-800 border-teal-200 animate-pulse-subtle';
      case 'DELIVERED':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'COMPLETED_PAID':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
              <PackageCheck className="w-5 h-5 text-amber-700" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
              Supply Chain & Smart Escrow Tracker
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time tracking from farm harvest through cold chain transit to dock inspection and instant payment release.
          </p>
        </div>

        {activeOrder && (
          <button
            onClick={() => setShowDocsModal(true)}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors shrink-0"
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>Digital Bill of Lading & QA Cert</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Order Selector List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Active Consignments ({orders.length})
          </h3>

          <div className="space-y-2.5">
            {orders.map(ord => {
              const isSelected = activeOrder?.id === ord.id;
              const statusPill = getStatusColor(ord.status);

              return (
                <div
                  key={ord.id}
                  onClick={() => setSelectedOrder(ord)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/10'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-slate-900">{ord.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusPill}`}>
                      {ord.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 leading-snug line-clamp-1">
                    {ord.productName}
                  </h4>

                  <div className="flex items-center justify-between mt-3 text-xs">
                    <span className="text-slate-500">
                      {ord.quantity.toLocaleString()} {ord.unit}
                    </span>
                    <span className="font-mono font-bold text-slate-900">
                      ${ord.totalAmount.toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="truncate">Buyer: {ord.buyer.name}</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Escrow
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Order Deep-Dive Tracker (8 cols) */}
        {activeOrder ? (
          <div className="lg:col-span-8 space-y-5">
            {/* Order Overview Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold bg-slate-100 px-2.5 py-1 rounded-md text-slate-700">
                      {activeOrder.id}
                    </span>
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusColor(activeOrder.status)}`}>
                      {activeOrder.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{activeOrder.productName}</h3>
                </div>

                <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                    Escrow Locked Value
                  </span>
                  <span className="text-xl font-black font-mono text-emerald-800">
                    ${activeOrder.totalAmount.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-medium block">
                    {activeOrder.escrowStatus === 'RELEASED_TO_FARMER' ? '✓ Payout Disbursed' : '🛡 100% Protected'}
                  </span>
                </div>
              </div>

              {/* Multi-party Participants */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Farmer / Producer
                  </span>
                  <p className="font-bold text-slate-900">{activeOrder.farmer.name}</p>
                  <p className="text-slate-500">{activeOrder.farmer.company}</p>
                  <span className="text-emerald-700 font-mono font-semibold block mt-1">
                    Earns: ${activeOrder.farmerSubtotal.toLocaleString()}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Middleman / Logistics
                  </span>
                  <p className="font-bold text-slate-900">
                    {activeOrder.intermediary ? activeOrder.intermediary.name : 'Direct Dispatch'}
                  </p>
                  <p className="text-slate-500">
                    {activeOrder.intermediary ? activeOrder.intermediary.company : 'Grower fleet'}
                  </p>
                  <span className="text-amber-700 font-mono font-semibold block mt-1">
                    Margin: ${activeOrder.middlemanMargin.toLocaleString()}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Retailer / Buyer
                  </span>
                  <p className="font-bold text-slate-900">{activeOrder.buyer.name}</p>
                  <p className="text-slate-500">{activeOrder.buyer.company}</p>
                  <span className="text-blue-700 font-mono font-semibold block mt-1">
                    Funded in Escrow
                  </span>
                </div>
              </div>

              {/* Telemetry & Cold Chain Sensor (Simulated Live Hardware Gauge) */}
              {activeOrder.telemetry && (
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-4 text-white space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold">{activeOrder.telemetry.truckId}</span>
                      <span className="text-[10px] text-slate-400">Driver: {activeOrder.telemetry.driverName}</span>
                    </div>
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      LIVE IOT SENSORS ACTIVE
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                      <div className="flex items-center gap-1 text-slate-400 text-[10px] mb-1">
                        <Thermometer className="w-3.5 h-3.5 text-blue-400" />
                        <span>Cold Bay Temp</span>
                      </div>
                      <span className="font-mono text-base font-bold text-white">
                        {activeOrder.telemetry.currentTempCelsius}°C
                      </span>
                      <span className="text-[10px] text-emerald-400 block mt-0.5">Target: {activeOrder.telemetry.targetTempRange}</span>
                    </div>

                    <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                      <div className="flex items-center gap-1 text-slate-400 text-[10px] mb-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>GPS Coordinates</span>
                      </div>
                      <span className="font-medium text-white truncate block">
                        {activeOrder.telemetry.currentLocation}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">ETA: ~{activeOrder.telemetry.etaMinutes} mins</span>
                    </div>

                    <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                      <div className="flex items-center gap-1 text-slate-400 text-[10px] mb-1">
                        <Fuel className="w-3.5 h-3.5 text-amber-400" />
                        <span>Reefer Battery & Fuel</span>
                      </div>
                      <span className="font-mono text-base font-bold text-white">
                        {activeOrder.telemetry.fuelLevel}
                      </span>
                      <span className="text-[10px] text-emerald-400 block mt-0.5">No refrigeration breaks</span>
                    </div>

                    <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                      <div className="flex items-center gap-1 text-slate-400 text-[10px] mb-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                        <span>QA Optical Grade</span>
                      </div>
                      <span className="font-mono text-base font-bold text-white">
                        Pass (96.8%)
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Defects &lt; 1.2%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 6-Milestone Progress Tracker */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Consignment Milestones & Escrow Release Triggers
                </h4>

                <div className="space-y-3">
                  {activeOrder.milestones.map((m, idx) => {
                    const isCompleted = m.completed;
                    const isCurrent = idx === activeOrder.currentMilestoneIndex;

                    return (
                      <div
                        key={idx}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                          isCurrent
                            ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-200/50'
                            : isCompleted
                            ? 'bg-emerald-50/50 border-emerald-200'
                            : 'bg-slate-50/60 border-slate-200 opacity-60'
                        }`}
                      >
                        <div className={`mt-0.5 p-1 rounded-full text-white ${
                          isCompleted ? 'bg-emerald-600' : isCurrent ? 'bg-amber-500' : 'bg-slate-300'
                        }`}>
                          <CheckCircle2 className="w-4 h-4" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-slate-900">{m.step}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{m.date}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">{m.note}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Simulator Action Controls */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const participantIds = [activeOrder.farmer.id, activeOrder.buyer.id];
                      if (activeOrder.intermediary) participantIds.push(activeOrder.intermediary.id);
                      startOrOpenChat(participantIds, `Order ${activeOrder.id} Negotiation`, activeOrder.id);
                    }}
                    className="px-3 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-teal-600" />
                    <span>Open Order Chat Channel</span>
                  </button>

                  <button
                    onClick={() => setShowDocsModal(true)}
                    className="px-3 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>View Bill of Lading</span>
                  </button>
                </div>

                {/* Progress Button */}
                {activeOrder.status !== 'COMPLETED_PAID' ? (
                  <button
                    onClick={() => advanceOrderMilestone(activeOrder.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition-all flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>
                      {activeOrder.currentMilestoneIndex === 4
                        ? 'Retailer Dock Sign-Off & Release Escrow ($' + activeOrder.totalAmount.toLocaleString() + ')'
                        : 'Simulate Next Milestone Step'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 border border-emerald-300">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Escrow Released & Deal Closed</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Digital Documents Modal */}
      {showDocsModal && activeOrder && (
        <DigitalDocumentsModal
          order={activeOrder}
          onClose={() => setShowDocsModal(false)}
        />
      )}
    </div>
  );
}
