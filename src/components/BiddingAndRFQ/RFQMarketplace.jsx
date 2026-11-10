import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  DollarSign,
  Calendar,
  MapPin,
  Truck,
  Sprout,
  Store,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  Send,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import PostRFQModal from '../RetailerPortal/PostRFQModal';

export default function RFQMarketplace() {
  const {
    rfqs,
    currentUser,
    submitRFQBid,
    acceptRFQBid,
    startOrOpenChat
  } = useApp();

  const [showPostModal, setShowPostModal] = useState(false);
  const [expandedRfqId, setExpandedRfqId] = useState('rfq-301');
  const [activeBidRfqId, setActiveBidRfqId] = useState(null);

  // Bid form state
  const [offeredPrice, setOfferedPrice] = useState(1.40);
  const [offeredQuantity, setOfferedQuantity] = useState(15000);
  const [timeline, setTimeline] = useState('Guaranteed delivery within 48h of order');
  const [includesFreight, setIncludesFreight] = useState(currentUser.role === 'middleman');
  const [notes, setNotes] = useState('');

  const handleOpenBidModal = (rfq) => {
    setActiveBidRfqId(rfq.id);
    setOfferedPrice(rfq.targetBudgetPerUnit);
    setOfferedQuantity(rfq.quantityNeeded);
    setIncludesFreight(currentUser.role === 'middleman');
    setNotes(
      currentUser.role === 'middleman'
        ? `Consolidated from verified regional growers. Temperature logged refrigerated transit included.`
        : `Direct farm-gate supply from our orchards. Freshly picked.`
    );
  };

  const handleSendBid = (e) => {
    e.preventDefault();
    if (!activeBidRfqId) return;

    submitRFQBid(activeBidRfqId, {
      offeredPrice: Number(offeredPrice),
      offeredQuantity: Number(offeredQuantity),
      timeline,
      includesFreight,
      notes
    });

    setActiveBidRfqId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-800">
              <FileText className="w-5 h-5 text-blue-700" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
              Buyer RFQs & Procurement Tenders
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Supermarket chains & commercial buyers post high-volume supply requisitions. Farmers and Aggregators bid transparently with contract terms.
          </p>
        </div>

        {currentUser.role === 'retailer' ? (
          <button
            onClick={() => setShowPostModal(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-600/30 flex items-center gap-2 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New RFQ Tender</span>
          </button>
        ) : (
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-400 block">Eligible to Bid:</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {currentUser.role === 'farmer' ? '🚜 Direct Farmer Quotes' : '🚛 Aggregator Logistics Quotes'}
            </span>
          </div>
        )}
      </div>

      {/* RFQ List */}
      <div className="space-y-4">
        {rfqs.map(rfq => {
          const isExpanded = expandedRfqId === rfq.id;
          const isOwner = rfq.retailerId === currentUser.id;
          const userAlreadyBid = rfq.bids.some(b => b.bidderId === currentUser.id);

          return (
            <div
              key={rfq.id}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                isExpanded ? 'border-blue-300 shadow-md ring-1 ring-blue-100' : 'border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              {/* RFQ Summary Card */}
              <div className="p-5">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
                        {rfq.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700">
                        {rfq.frequency}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                        rfq.status === 'OPEN' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {rfq.status === 'OPEN' ? '● OPEN FOR BIDS' : 'CONTRACT AWARDED'}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {rfq.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <Store className="w-3.5 h-3.5 text-blue-600" />
                        {rfq.retailerCompany}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {rfq.deliveryDestination}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-rose-600 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        Deadline: {rfq.deadlineDate}
                      </span>
                    </div>
                  </div>

                  {/* Volume & Budget Box */}
                  <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100 self-stretch lg:self-auto justify-between lg:justify-end">
                    <div>
                      <span className="text-[11px] text-slate-400 block font-semibold">Tender Volume</span>
                      <span className="text-base font-extrabold text-slate-900 font-mono">
                        {rfq.quantityNeeded.toLocaleString()} {rfq.unit}
                      </span>
                    </div>

                    <div className="border-l border-slate-200 pl-4 text-right">
                      <span className="text-[11px] text-slate-400 block font-semibold">Target Price</span>
                      <span className="text-base font-extrabold text-emerald-700 font-mono">
                        ${rfq.targetBudgetPerUnit.toFixed(2)}
                        <span className="text-xs text-slate-500 font-normal"> /{rfq.unit}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Specs Pill Summary */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-2 text-slate-600">
                    <span className="font-semibold text-slate-800">Requirements:</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                      {rfq.gradeRequirement}
                    </span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 flex items-center gap-1">
                      <Truck className="w-3 h-3 text-slate-500" />
                      {rfq.logisticsRequired}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Bid Action for Farmers / Middlemen */}
                    {rfq.status === 'OPEN' && !isOwner && (
                      <button
                        onClick={() => handleOpenBidModal(rfq)}
                        disabled={userAlreadyBid}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                          userAlreadyBid
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : currentUser.role === 'middleman'
                            ? 'bg-amber-600 hover:bg-amber-500 text-white'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        }`}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{userAlreadyBid ? 'Quote Submitted' : 'Submit Quotation'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => setExpandedRfqId(isExpanded ? null : rfq.id)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1 transition-colors"
                    >
                      <span>{rfq.bids.length} Proposals Submitted</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Collapsible Bids / Proposals Table */}
              {isExpanded && (
                <div className="bg-slate-50/70 border-t border-slate-200 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Submitted Bids & Proposals ({rfq.bids.length})
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      Escrow is initiated upon accepting any quotation
                    </span>
                  </div>

                  {rfq.bids.length === 0 ? (
                    <div className="text-center py-6 bg-white rounded-xl border border-slate-200">
                      <p className="text-xs text-slate-500">No proposals received yet.</p>
                      {currentUser.role !== 'retailer' && (
                        <button
                          onClick={() => handleOpenBidModal(rfq)}
                          className="mt-2 text-xs font-bold text-emerald-600 hover:underline"
                        >
                          Be the first to submit a proposal!
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {rfq.bids.map((bid, bIndex) => {
                        const isMiddleman = bid.bidderRole === 'middleman';
                        const totalBidCost = bid.offeredPrice * bid.offeredQuantity;

                        return (
                          <div
                            key={bIndex}
                            className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-3"
                          >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-xl text-white ${
                                  isMiddleman ? 'bg-amber-600' : 'bg-emerald-600'
                                }`}>
                                  {isMiddleman ? <Truck className="w-4 h-4" /> : <Sprout className="w-4 h-4" />}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-slate-900">{bid.bidderName}</span>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                                      isMiddleman
                                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                                        : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                    }`}>
                                      {isMiddleman ? 'AGGREGATOR HUB' : 'GROWER DIRECT'}
                                    </span>
                                  </div>
                                  <span className="text-xs text-slate-500">
                                    Delivery timeline: {bid.timeline}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 self-end sm:self-auto">
                                <div className="text-right">
                                  <span className="font-mono text-lg font-extrabold text-slate-900">
                                    ${bid.offeredPrice.toFixed(2)}
                                    <span className="text-xs text-slate-500 font-normal"> /{rfq.unit}</span>
                                  </span>
                                  <span className="text-[11px] text-slate-400 block font-mono">
                                    Total: ${totalBidCost.toLocaleString()}
                                  </span>
                                </div>

                                {/* Acceptance Button for Retailer */}
                                {isOwner && rfq.status === 'OPEN' && (
                                  <button
                                    onClick={() => acceptRFQBid(rfq.id, bid)}
                                    className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>Accept & Fund Escrow</span>
                                  </button>
                                )}

                                <button
                                  onClick={() => startOrOpenChat([bid.bidderId], `RFQ Negotiation: ${rfq.crop}`)}
                                  className="px-2.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-medium"
                                  title="Chat with bidder"
                                >
                                  Negotiate
                                </button>
                              </div>
                            </div>

                            {/* Bid terms & freight note */}
                            <div className="bg-slate-50 p-2.5 rounded-lg text-xs text-slate-700 flex flex-wrap items-center justify-between gap-2">
                              <p className="flex-1 italic">{bid.notes}</p>
                              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold shrink-0 ${
                                bid.includesFreight
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {bid.includesFreight ? '✓ Temperature-controlled freight included' : '⚠ Farm-gate pickup required'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Quotation Modal */}
      {activeBidRfqId && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900">
                  Submit Bid for RFQ: {activeBidRfqId}
                </h3>
                <p className="text-xs text-slate-500">
                  Offering supply as {currentUser.name} ({currentUser.role.toUpperCase()})
                </p>
              </div>
              <button
                onClick={() => setActiveBidRfqId(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendBid} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Price / Unit ($)</label>
                  <input
                    type="number"
                    step={0.01}
                    required
                    value={offeredPrice}
                    onChange={(e) => setOfferedPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono text-sm focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Quantity Offered</label>
                  <input
                    type="number"
                    step={100}
                    required
                    value={offeredQuantity}
                    onChange={(e) => setOfferedQuantity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono text-sm focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Delivery Timeline</label>
                <input
                  type="text"
                  required
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="freightCheck"
                  checked={includesFreight}
                  onChange={(e) => setIncludesFreight(e.target.checked)}
                  className="rounded text-emerald-600 w-4 h-4"
                />
                <label htmlFor="freightCheck" className="font-medium text-slate-700 cursor-pointer">
                  Includes door-to-door temperature-logged freight
                </label>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Notes & Quality Guarantee</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800">
                Total quotation value: <span className="font-bold font-mono">${(offeredPrice * offeredQuantity).toLocaleString()}</span>. Backed by AgriBridge Smart Escrow.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveBidRfqId(null)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-700/20"
                >
                  Confirm & Submit Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post RFQ Modal for Retailers */}
      {showPostModal && (
        <PostRFQModal onClose={() => setShowPostModal(false)} />
      )}
    </div>
  );
}
