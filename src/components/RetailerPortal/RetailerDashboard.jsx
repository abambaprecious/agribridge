import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Store,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Truck,
  PlusCircle,
  Package,
  Calendar,
  DollarSign,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

export default function RetailerDashboard({ onOpenPostRFQ }) {
  const { rfqs, orders, currentUser, setActiveTab, setSelectedOrder, advanceOrderMilestone } = useApp();

  // RFQs posted by this retailer
  const myRfqs = rfqs.filter(r => r.retailerId === currentUser.id);

  // Orders where this retailer is buyer
  const myOrders = orders.filter(o => o.buyer.id === currentUser.id);
  const activeOrders = myOrders.filter(o => o.status !== 'COMPLETED_PAID');
  const totalEscrowDeposited = activeOrders.reduce((acc, o) => acc + o.totalAmount, 0);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-extrabold tracking-wider bg-blue-500/30 text-blue-200 px-2.5 py-0.5 rounded-full border border-blue-400/30">
                Commercial Procurement Center
              </span>
              <span className="flex items-center text-xs font-semibold text-amber-300">
                ★ {currentUser.rating} ({currentUser.reviewsCount} supplier ratings)
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">{currentUser.name}</h2>
            <p className="text-blue-100 text-xs sm:text-sm">{currentUser.company}</p>
            <div className="flex flex-wrap gap-2 mt-2 text-[10px] text-blue-200">
              <span className="bg-white/10 px-2 py-0.5 rounded">Stores: {currentUser.storeCount}</span>
              <span className="bg-white/10 px-2 py-0.5 rounded">Volume: {currentUser.procurementVolume}</span>
              <span className="bg-white/10 px-2 py-0.5 rounded">Verified Escrow Buyer</span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenPostRFQ}
          className="px-5 py-3 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-extrabold text-sm transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2 shrink-0 self-stretch md:self-auto justify-center"
        >
          <PlusCircle className="w-5 h-5" />
          <span>+ Post Procurement Tender</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Tenders & RFQs</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black font-mono text-slate-900">
            {myRfqs.length} Open RFQs
          </span>
          <p className="text-xs text-slate-500 mt-1">
            Total {myRfqs.reduce((acc, r) => acc + r.bids.length, 0)} supplier proposals received
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Funds Locked in Escrow</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black font-mono text-emerald-700">
            ${totalEscrowDeposited.toLocaleString()}
          </span>
          <p className="text-xs text-slate-500 mt-1">
            Held safely until dock quality sign-off
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Shipments En Route</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black font-mono text-amber-600">
            {activeOrders.length} Shipments
          </span>
          <p className="text-xs text-slate-500 mt-1">Reefer temperature & GPS active</p>
        </div>
      </div>

      {/* Dock Quality Inspection / Shipments Arriving */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Central Distribution Dock Inbound Deliveries
            </h3>
            <p className="text-xs text-slate-500">
              Inspect cargo, review temperature history, and release escrow payout.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('orders')}
            className="text-xs font-bold text-blue-700 hover:text-blue-800"
          >
            Live Tracking Map →
          </button>
        </div>

        <div className="space-y-3">
          {myOrders.map(order => (
            <div
              key={order.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-slate-900">{order.id}</span>
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-blue-100 text-blue-800">
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{order.productName}</h4>
                  <p className="text-xs text-slate-500">
                    Grower: {order.farmer.company} • Aggregator/Driver: {order.intermediary?.company || 'Direct'}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <div className="text-right">
                    <span className="font-mono font-bold text-base text-slate-900">
                      ${order.totalAmount.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold block">
                      Escrow: {order.escrowStatus}
                    </span>
                  </div>

                  {order.status !== 'COMPLETED_PAID' ? (
                    <button
                      onClick={() => advanceOrderMilestone(order.id)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        {order.currentMilestoneIndex >= 4 ? 'Approve Dock Sign-Off' : 'Advance Milestone'}
                      </span>
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                      ✓ Inspected & Released
                    </span>
                  )}
                </div>
              </div>

              {/* Progress mini-bar */}
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${((order.currentMilestoneIndex + 1) / order.milestones.length) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active RFQs Posted by this Retailer */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900">My Procurement Tenders & Quotes</h3>
            <p className="text-xs text-slate-500">Review quotes submitted by Farmers and Logistics Aggregators.</p>
          </div>
          <button
            onClick={() => setActiveTab('rfqs')}
            className="text-xs font-bold text-blue-700 hover:text-blue-800"
          >
            Manage All RFQs →
          </button>
        </div>

        <div className="space-y-3">
          {myRfqs.map(rfq => (
            <div key={rfq.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900">{rfq.title}</h4>
                <span className="font-mono text-sm font-bold text-emerald-700">
                  Target: ${rfq.targetBudgetPerUnit.toFixed(2)}/{rfq.unit}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Volume: {rfq.quantityNeeded.toLocaleString()} {rfq.unit} • Status: {rfq.status} • {rfq.bids.length} Proposals Submitted
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveTab('rfqs')}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Review Bids & Award Contract →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
