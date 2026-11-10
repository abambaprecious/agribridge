import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sprout,
  PlusCircle,
  DollarSign,
  TrendingUp,
  Package,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Truck,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

export default function FarmerDashboard({ onOpenAddProduce }) {
  const { listings, orders, currentUser, ticker, setActiveTab, setSelectedOrder } = useApp();

  // Filter listings belonging to this farmer
  const myListings = listings.filter(l => l.farmerId === currentUser.id);

  // Filter orders where this farmer is the seller
  const myOrders = orders.filter(o => o.farmer.id === currentUser.id);
  const pendingOrders = myOrders.filter(o => o.status !== 'COMPLETED_PAID');
  const completedOrders = myOrders.filter(o => o.status === 'COMPLETED_PAID');

  const totalInventoryValue = myListings.reduce((acc, l) => acc + (l.availableQuantity * l.pricePerUnit), 0);
  const escrowPendingFunds = pendingOrders.reduce((acc, o) => acc + o.farmerSubtotal, 0);
  const totalEarned = completedOrders.reduce((acc, o) => acc + o.farmerSubtotal, 0);

  return (
    <div className="space-y-6">
      {/* Profile & Farm Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-green-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-extrabold tracking-wider bg-emerald-500/30 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                Grower Studio
              </span>
              <span className="flex items-center text-xs font-semibold text-amber-300">
                ★ {currentUser.rating} ({currentUser.reviewsCount} verified audits)
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">{currentUser.name}</h2>
            <p className="text-emerald-100 text-xs sm:text-sm">{currentUser.company} • {currentUser.farmSize}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {currentUser.certifications?.map((c, i) => (
                <span key={i} className="text-[10px] bg-white/10 px-2 py-0.5 rounded-md backdrop-blur-xs">
                  ✓ {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={onOpenAddProduce}
          className="px-5 py-3 rounded-2xl bg-white text-emerald-900 font-extrabold text-sm hover:bg-emerald-50 transition-all shadow-lg flex items-center gap-2 shrink-0 self-stretch md:self-auto justify-center"
        >
          <PlusCircle className="w-5 h-5 text-emerald-700" />
          <span>+ List New Harvest</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Inventory Value</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black font-mono text-slate-900">
            ${totalInventoryValue.toLocaleString()}
          </span>
          <p className="text-xs text-slate-500 mt-1">
            Across {myListings.length} listed crop varieties
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Escrow Guaranteed Funds</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black font-mono text-amber-600">
            ${escrowPendingFunds.toLocaleString()}
          </span>
          <p className="text-xs text-slate-500 mt-1">
            Locked in AgriBridge Escrow (Awaiting dock release)
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Completed Payouts</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black font-mono text-emerald-700">
            ${totalEarned.toLocaleString()}
          </span>
          <p className="text-xs text-slate-500 mt-1">
            Direct instant transfer to {currentUser.bankDetails}
          </p>
        </div>
      </div>

      {/* Fair Price Intelligence Advisor */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <h3 className="font-bold text-sm text-emerald-900">
              Fair Market Price Advisor (Anti-Exploitation Benchmark)
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('insights')}
            className="text-xs font-bold text-emerald-700 hover:underline"
          >
            View Full Price Trends →
          </button>
        </div>
        <p className="text-xs text-emerald-800 leading-relaxed">
          Historical middleman networks frequently took 40–60% of farm value. On AgriBridge, transparent Mandi benchmark indices ensure your asking price stays competitive without giving away your harvest margin.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {ticker.slice(0, 4).map(item => (
            <div key={item.id} className="bg-white p-3 rounded-xl border border-emerald-100 shadow-xs text-xs">
              <span className="font-bold text-slate-800 block truncate">{item.name}</span>
              <span className="font-mono text-sm font-bold text-slate-900">${item.benchmarkPrice.toFixed(2)}/{item.unit}</span>
              <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
                {item.change24h >= 0 ? `+${item.change24h}% today` : `${item.change24h}% today`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Active Listings Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900">My Farm Harvest Listings</h3>
            <p className="text-xs text-slate-500">Manage available quantities, prices, and middleman pooling eligibility.</p>
          </div>
          <button
            onClick={onOpenAddProduce}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
          >
            + Add Another Crop
          </button>
        </div>

        {myListings.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <Sprout className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No active produce listings yet</p>
            <p className="text-xs text-slate-400 mt-1">Post your harvest to receive bids from Retailers and Middlemen.</p>
            <button
              onClick={onOpenAddProduce}
              className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
            >
              Post First Harvest
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 overflow-x-auto">
            {myListings.map(listing => (
              <div key={listing.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">{listing.title}</h4>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {listing.grade}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Available: <strong className="text-slate-800">{listing.availableQuantity.toLocaleString()} {listing.unit}</strong> (Min order: {listing.minOrderQuantity} {listing.unit})
                    </p>
                    <span className="text-[10px] text-slate-400">Harvest date: {listing.harvestDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto">
                  <div className="text-right">
                    <span className="font-mono text-base font-extrabold text-slate-900">
                      ${listing.pricePerUnit.toFixed(2)}
                      <span className="text-xs text-slate-500 font-normal"> /{listing.unit}</span>
                    </span>
                    <span className="text-[11px] text-emerald-600 font-semibold block">
                      {listing.bidsCount} Inquiries / Bids
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveTab('marketplace')}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    View on Market
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Orders Involving this Farmer */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900">Sales Contracts & Escrow Dispatches</h3>
            <p className="text-xs text-slate-500">Deliveries tracked with live IoT sensors and dock inspection sign-offs.</p>
          </div>
          <button
            onClick={() => setActiveTab('orders')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
          >
            Open Full Tracker →
          </button>
        </div>

        {myOrders.length === 0 ? (
          <p className="text-xs text-slate-500 py-4">No active sales contracts yet.</p>
        ) : (
          <div className="space-y-3">
            {myOrders.map(order => (
              <div
                key={order.id}
                onClick={() => {
                  setSelectedOrder(order);
                  setActiveTab('orders');
                }}
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer bg-slate-50/50 hover:bg-white"
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
                    Buyer: {order.buyer.company} • Aggregator: {order.intermediary?.company || 'Direct'}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-sm font-mono font-bold text-emerald-700 block">
                    +${order.farmerSubtotal.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {order.escrowStatus === 'RELEASED_TO_FARMER' ? 'Paid to Bank' : 'Secured in Escrow'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
