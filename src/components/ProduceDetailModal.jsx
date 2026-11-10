import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  Award,
  CheckCircle2,
  DollarSign,
  Truck,
  Package,
  Layers,
  Sparkles,
  MessageSquare,
  FileCheck2,
  AlertCircle
} from 'lucide-react';

export default function ProduceDetailModal({ listing, onClose, onOpenNegotiation }) {
  const { currentUser, purchaseListingDirect, startOrOpenChat } = useApp();
  const [orderQty, setOrderQty] = useState(listing.minOrderQuantity || 1000);
  const [deliveryMode, setDeliveryMode] = useState('Farm-Gate Pickup');

  const unit = listing.unit || 'kg';
  const totalPrice = (listing.pricePerUnit * orderQty).toFixed(2);
  const escrowFee = (totalPrice * 0.015).toFixed(2); // 1.5% escrow security fee
  const grandTotal = (parseFloat(totalPrice) + parseFloat(escrowFee)).toFixed(2);

  const handleBuyNow = () => {
    purchaseListingDirect(listing, orderQty, currentUser.role === 'middleman');
    onClose();
  };

  const handleMessageSeller = () => {
    startOrOpenChat(
      [listing.farmerId],
      `Inquiry: ${listing.title} (${listing.crop})`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header with image banner */}
        <div className="relative h-64 sm:h-72 bg-slate-900">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors backdrop-blur-xs"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-emerald-500 text-white">
                  {listing.crop}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-white/20 text-white backdrop-blur-xs">
                  {listing.grade}
                </span>
                {listing.certifiedOrganic && (
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-900/80 text-emerald-300 border border-emerald-500/30">
                    🌱 Organic Certified
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                {listing.title}
              </h2>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {listing.location} ({listing.distanceKm} km from regional hub)
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-right">
              <span className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold block">Asking Price</span>
              <span className="text-2xl font-extrabold text-white font-mono">
                ${listing.pricePerUnit.toFixed(2)}
                <span className="text-xs text-slate-300 font-normal"> /{unit}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Body Details */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {/* Seller / Farmer Profile */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <img
                src={listing.farmerAvatar}
                alt={listing.farmerName}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-500/20"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-slate-900">{listing.farmerName}</h4>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                    Verified Grower
                  </span>
                </div>
                <p className="text-xs text-slate-500">{listing.farmerCompany}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-600">
                  <span className="flex items-center text-amber-600 font-semibold">
                    ★ 4.9 (48 successful trades)
                  </span>
                  <span>•</span>
                  <span>100% On-Time Harvest</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleMessageSeller}
              className="px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-white hover:border-slate-400 transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Chat with Farmer</span>
            </button>
          </div>

          {/* Description & Technical Specs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Produce Specifications</h4>
            <p className="text-sm text-slate-700 leading-relaxed">{listing.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Available Volume</span>
                <span className="text-sm font-bold text-slate-900">
                  {listing.availableQuantity.toLocaleString()} {unit}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Total batch: {listing.totalQuantity.toLocaleString()} {unit}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Min. Order (MOQ)</span>
                <span className="text-sm font-bold text-slate-900">
                  {listing.minOrderQuantity.toLocaleString()} {unit}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Flexible for co-ops</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Harvest Date</span>
                <span className="text-sm font-bold text-slate-900">{listing.harvestDate}</span>
                <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
                  Shelf life: {listing.shelfLifeDays} days
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Quality Metric</span>
                <span className="text-sm font-bold text-slate-900">{listing.moistureOrSugar}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Lab tested</span>
              </div>
            </div>
          </div>

          {/* Packaging and Storage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
                <Package className="w-4 h-4 text-emerald-600" />
                <span>Standard Packaging</span>
              </div>
              <p className="text-emerald-800">{listing.packaging}</p>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200">
              <div className="flex items-center gap-1.5 font-bold text-blue-900 mb-1">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Storage & Pre-cooling</span>
              </div>
              <p className="text-blue-800">{listing.storageCondition}</p>
            </div>
          </div>

          {/* Purchase / Escrow Calculator */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <h4 className="text-sm font-bold">AgriBridge Smart Escrow Order</h4>
                  <p className="text-[11px] text-slate-400">
                    Funds are locked until dock delivery inspection passes.
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                100% Protected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1.5">
                  Order Quantity ({unit})
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={listing.minOrderQuantity}
                    max={listing.availableQuantity}
                    step={100}
                    value={orderQty}
                    onChange={(e) => setOrderQty(Math.max(listing.minOrderQuantity, Number(e.target.value)))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-hidden focus:border-emerald-500"
                  />
                  <button
                    onClick={() => setOrderQty(listing.availableQuantity)}
                    className="px-2.5 py-2 rounded-xl bg-slate-700 text-slate-200 hover:bg-slate-600 text-xs font-semibold shrink-0"
                  >
                    Max
                  </button>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Min: {listing.minOrderQuantity} {unit} • Max: {listing.availableQuantity} {unit}
                </span>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1.5">
                  Delivery / Logistics
                </label>
                <select
                  value={deliveryMode}
                  onChange={(e) => setDeliveryMode(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-hidden focus:border-emerald-500"
                >
                  {listing.deliveryOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Middleman fleet coordination available
                </span>
              </div>
            </div>

            {/* Financial Breakdown */}
            <div className="bg-slate-800/80 rounded-xl p-3 text-xs space-y-1.5 border border-slate-700">
              <div className="flex justify-between text-slate-300">
                <span>Produce Subtotal ({orderQty.toLocaleString()} {unit} × ${listing.pricePerUnit.toFixed(2)}):</span>
                <span className="font-mono font-medium">${parseFloat(totalPrice).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>AgriBridge Trust & Escrow Guarantee (1.5%):</span>
                <span className="font-mono">${parseFloat(escrowFee).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-400 pt-1.5 border-t border-slate-700 font-bold text-sm">
                <span>Total Escrow Deposit:</span>
                <span className="font-mono text-base">${parseFloat(grandTotal).toLocaleString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-700/30 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm Purchase & Lock Escrow</span>
              </button>

              <button
                onClick={() => {
                  onOpenNegotiation(listing);
                  onClose();
                }}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span>Make Counter-Offer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

