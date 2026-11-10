import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Truck,
  Layers,
  Thermometer,
  ShieldCheck,
  Package,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Calendar,
  DollarSign,
  ArrowRight,
  PlusCircle,
  FileText
} from 'lucide-react';

export default function MiddlemanDashboard({ onOpenAggregationModal }) {
  const { aggregatedLots, orders, rfqs, currentUser, setActiveTab, setSelectedOrder } = useApp();

  // Lots aggregated by this middleman
  const myAggregatedLots = aggregatedLots.filter(a => a.aggregatorId === currentUser.id);

  // Orders where this middleman is intermediary or buyer
  const myOrders = orders.filter(o => o.intermediary?.id === currentUser.id || o.buyer?.id === currentUser.id);
  const activeOrders = myOrders.filter(o => o.status !== 'COMPLETED_PAID');

  const totalTonsAggregated = myAggregatedLots.reduce((acc, a) => acc + a.totalTons, 0);
  const totalFleetRevenue = myOrders.reduce((acc, o) => acc + (o.middlemanMargin || 0), 0);

  return (
    <div className="space-y-6">
      {/* Profile & Logistics Hub Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-extrabold tracking-wider bg-amber-500/30 text-amber-200 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                Bonded Aggregator & Cold Hub
              </span>
              <span className="flex items-center text-xs font-semibold text-amber-300">
                ★ {currentUser.rating} ({currentUser.reviewsCount} audits)
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">{currentUser.name}</h2>
            <p className="text-amber-100 text-xs sm:text-sm">{currentUser.company}</p>
            <div className="flex flex-wrap gap-2 mt-2 text-[10px] text-amber-200">
              <span className="bg-white/10 px-2 py-0.5 rounded">Fleet: {currentUser.fleetSize}</span>
              <span className="bg-white/10 px-2 py-0.5 rounded">Storage: {currentUser.storageCapacity}</span>
              <span className="bg-white/10 px-2 py-0.5 rounded">Margin: {currentUser.commissionRate}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenAggregationModal}
          className="px-5 py-3 rounded-2xl bg-white text-amber-950 font-extrabold text-sm hover:bg-amber-50 transition-all shadow-lg flex items-center gap-2 shrink-0 self-stretch md:self-auto justify-center"
        >
          <Layers className="w-5 h-5 text-amber-700" />
          <span>+ Create Aggregated Lot</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Pooled Volume</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black font-mono text-slate-900">
            {totalTonsAggregated} MT
          </span>
          <p className="text-xs text-slate-500 mt-1">Across {myAggregatedLots.length} retail consignments</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Cold Chain Fleet</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black font-mono text-slate-900">
            14 Reefer Vans
          </span>
          <p className="text-xs text-emerald-600 font-semibold mt-1">● 6 Active in transit</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Cold Storage Bays</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
              <Thermometer className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black font-mono text-slate-900">
            11.2°C Avg
          </span>
          <p className="text-xs text-slate-500 mt-1">Pre-chill & humidity controlled</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Aggregation Margins</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black font-mono text-emerald-700">
            ${totalFleetRevenue.toLocaleString()}
          </span>
          <p className="text-xs text-slate-500 mt-1">4.5% transparent freight margin</p>
        </div>
      </div>

      {/* Aggregated Lots Managed by this Middleman */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900">Active Aggregated Bulk Lots</h3>
            <p className="text-xs text-slate-500">
              Pooled lots available for Supermarket purchase with verified grading & refrigerated delivery.
            </p>
          </div>
          <button
            onClick={onOpenAggregationModal}
            className="text-xs font-bold text-amber-700 hover:text-amber-800"
          >
            + Pool New Smallholder Harvests
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myAggregatedLots.map(lot => (
            <div key={lot.id} className="p-4 rounded-xl border border-amber-200 bg-amber-50/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950">
                  {lot.totalTons} MT Consolidated
                </span>
                <span className="font-mono font-bold text-slate-900">
                  ${lot.pricePerUnit.toFixed(2)} / {lot.unit}
                </span>
              </div>

              <h4 className="font-bold text-sm text-slate-900">{lot.title}</h4>

              <div className="space-y-1 text-xs text-slate-600">
                <p className="font-semibold text-slate-800">
                  Pooled from {lot.farmerSources.length} farms:
                </p>
                {lot.farmerSources.map((s, i) => (
                  <div key={i} className="flex justify-between text-[11px]">
                    <span>• {s.name}</span>
                    <span className="font-mono">{s.contributionKg.toLocaleString()} kg</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> QA: {lot.qualityInspection.score}
                </span>
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className="text-amber-800 font-bold hover:underline"
                >
                  View on Marketplace →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middleman Live Order Dispatches */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Active Logistics & Escrow Dispatches ({activeOrders.length})
            </h3>
            <p className="text-xs text-slate-500">
              Refrigerated transit updates, IoT temperature logging, and dock inspection approvals.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('orders')}
            className="text-xs font-bold text-amber-700 hover:text-amber-800"
          >
            Open Live Telemetry Tracker →
          </button>
        </div>

        <div className="space-y-3">
          {myOrders.map(order => (
            <div
              key={order.id}
              onClick={() => {
                setSelectedOrder(order);
                setActiveTab('orders');
              }}
              className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer bg-slate-50/50 hover:bg-white"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-slate-900">{order.id}</span>
                  <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-amber-100 text-amber-800">
                    {order.status.replace('_', ' ')}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{order.productName}</h4>
                <p className="text-xs text-slate-500">
                  Retailer: {order.buyer.company} • Grower: {order.farmer.company}
                </p>
              </div>

              <div className="text-right">
                <span className="text-sm font-mono font-bold text-amber-700 block">
                  Logistics Margin: +${order.middlemanMargin.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400">
                  Escrow Total: ${order.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
