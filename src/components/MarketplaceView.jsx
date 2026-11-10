import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  Sprout,
  Truck,
  Store,
  Layers,
  MapPin,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Package,
  PlusCircle,
  Sparkles,
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';
import ProduceDetailModal from './ProduceDetailModal';

export default function MarketplaceView({ onOpenAddProduce, onOpenAggregationModal }) {
  const {
    listings,
    aggregatedLots,
    currentUser,
    purchaseListingDirect,
    startOrOpenChat,
    setActiveTab,
    ticker
  } = useApp();

  const [viewMode, setViewMode] = useState('all'); // 'all' | 'direct' | 'aggregated'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [activeModalListing, setActiveModalListing] = useState(null);

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Legumes'];
  const grades = ['All', 'Grade A', 'Export Grade', 'Grade 1'];

  // Filter direct farmer listings
  const filteredListings = listings.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesGrade = selectedGrade === 'All' || item.grade.toLowerCase().includes(selectedGrade.toLowerCase());
    const matchesOrganic = !organicOnly || item.certifiedOrganic;

    return matchesSearch && matchesCategory && matchesGrade && matchesOrganic;
  });

  // Filter aggregated lots
  const filteredAggregated = aggregatedLots.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.aggregatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleNegotiate = (listing) => {
    startOrOpenChat(
      [listing.farmerId],
      `Negotiation for ${listing.crop} (${listing.title})`
    );
  };

  return (
    <div className="space-y-6">
      {/* Hero Announcement Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Direct Fair Trade & Aggregated Supermarket Supply</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading leading-tight">
            Fair Prices for Farmers. <br className="hidden sm:inline" />
            Quality Bulk for Retailers. Powered by Middlemen.
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl leading-relaxed">
            Eliminate unfair speculation. Farmers list certified harvests, verified aggregators pool supply with cold storage & transport, and retailers receive dock-inspected produce backed by smart escrow.
          </p>

          {/* Quick CTA based on active role */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {currentUser.role === 'farmer' && (
              <button
                onClick={onOpenAddProduce}
                className="px-4 py-2.5 rounded-xl bg-white text-emerald-900 font-bold text-sm hover:bg-emerald-50 transition-all shadow-md flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4 text-emerald-700" />
                <span>List Your Harvest / Produce</span>
              </button>
            )}

            {currentUser.role === 'middleman' && (
              <button
                onClick={onOpenAggregationModal}
                className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all shadow-md flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>Create Aggregated Bulk Lot</span>
              </button>
            )}

            {currentUser.role === 'retailer' && (
              <button
                onClick={() => setActiveTab('rfqs')}
                className="px-4 py-2.5 rounded-xl bg-blue-500 text-white font-bold text-sm hover:bg-blue-400 transition-all shadow-md flex items-center gap-2"
              >
                <Store className="w-4 h-4" />
                <span>Post Retail Procurement RFQ</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('insights')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-xs transition-colors border border-white/20 flex items-center gap-1.5"
            >
              <span>View Mandi Price Index</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400 via-emerald-400 to-transparent pointer-events-none" />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by crop, variety, farmer name, region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          {/* View mode toggle */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 shrink-0 self-start lg:self-auto">
            <button
              onClick={() => setViewMode('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Offerings ({listings.length + aggregatedLots.length})
            </button>

            <button
              onClick={() => setViewMode('direct')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'direct'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>Farmer Direct ({listings.length})</span>
            </button>

            <button
              onClick={() => setViewMode('aggregated')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'aggregated'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Middleman Aggregated ({aggregatedLots.length})</span>
            </button>
          </div>
        </div>

        {/* Category & Attributes Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Grade filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-400">Grade:</span>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-medium text-slate-700 focus:outline-hidden"
              >
                {grades.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* Organic toggle */}
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs font-medium text-slate-700 bg-emerald-50/80 px-2.5 py-1 rounded-lg border border-emerald-200">
              <input
                type="checkbox"
                checked={organicOnly}
                onChange={(e) => setOrganicOnly(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
              />
              <span>🌱 Organic Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* SECTION 1: Middleman Aggregated Lots (Show when viewMode === 'all' or 'aggregated') */}
      {(viewMode === 'all' || viewMode === 'aggregated') && filteredAggregated.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
                <Layers className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-slate-900">
                  Consolidated Bulk Consignments (Middleman Hubs)
                </h3>
                <p className="text-xs text-slate-500">
                  Multi-farm pooled shipments. Inspected, standardized, washed, and freight-guaranteed for Supermarket Retailers.
                </p>
              </div>
            </div>

            {currentUser.role === 'middleman' && (
              <button
                onClick={onOpenAggregationModal}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
              >
                <span>+ Build New Lot</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredAggregated.map(lot => (
              <div
                key={lot.id}
                className="bg-white rounded-2xl border border-amber-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top image & badges */}
                  <div className="relative h-44 bg-slate-900">
                    <img
                      src={lot.image}
                      alt={lot.title}
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500 text-slate-950 shadow-xs flex items-center gap-1">
                        <Layers className="w-3 h-3" />
                        {lot.totalTons} Metric Tons Pooled
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-600 text-white shadow-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> QA Score: {lot.qualityInspection.score}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <span className="text-white text-xs font-medium flex items-center gap-1 drop-shadow-md">
                        <Truck className="w-3.5 h-3.5 text-amber-400" />
                        {lot.availableForDispatch}
                      </span>
                      <span className="text-amber-300 font-mono text-lg font-bold drop-shadow-md">
                        ${lot.pricePerUnit.toFixed(2)}
                        <span className="text-xs text-slate-200"> /{lot.unit}</span>
                      </span>
                    </div>
                  </div>

                  {/* Lot Body */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h4 className="font-bold text-base text-slate-900 leading-snug">{lot.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        Hub: {lot.location}
                      </p>
                    </div>

                    {/* Contributing Farmers */}
                    <div className="bg-amber-50/50 rounded-xl p-3 border border-amber-100 text-xs">
                      <div className="flex items-center justify-between font-bold text-amber-900 mb-1.5">
                        <span className="flex items-center gap-1">
                          <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                          Pooled Smallholder Sources ({lot.farmerSources.length} farms):
                        </span>
                        <span className="text-[11px] text-amber-700">Fair price paid</span>
                      </div>
                      <div className="space-y-1">
                        {lot.farmerSources.map((source, idx) => (
                          <div key={idx} className="flex justify-between text-slate-700 text-[11px]">
                            <span>• {source.name}</span>
                            <span className="font-semibold text-slate-900">{source.contributionKg.toLocaleString()} kg</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Middleman Services Included */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Value-Added Services Included:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {lot.servicesIncluded.map((service, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                          >
                            ✓ {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={lot.aggregatorAvatar}
                      alt={lot.aggregatorName}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <div className="leading-tight">
                      <span className="text-xs font-bold text-slate-800 block">{lot.aggregatorName}</span>
                      <span className="text-[10px] text-slate-500">Bonded Aggregator</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startOrOpenChat([lot.aggregatorId], `Inquiry: ${lot.title}`)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-white"
                    >
                      Inquire
                    </button>
                    <button
                      onClick={() => {
                        purchaseListingDirect({
                          id: lot.id,
                          crop: lot.title,
                          variety: 'Consolidated Bulk',
                          unit: lot.unit,
                          pricePerUnit: lot.pricePerUnit,
                          minOrderQuantity: 5000,
                          availableQuantity: lot.totalKg,
                          farmerId: lot.aggregatorId,
                          farmerName: lot.aggregatorName,
                          farmerCompany: lot.aggregatorCompany,
                          location: lot.location,
                          grade: 'Grade A Aggregated'
                        }, 5000);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      Order Consignment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: Farmer Direct Produce Listings */}
      {(viewMode === 'all' || viewMode === 'direct') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                <Sprout className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-slate-900">
                  Direct Harvests from Farmers & Growers
                </h3>
                <p className="text-xs text-slate-500">
                  Direct farm-gate supply. Buy directly or aggregate into larger wholesale orders.
                </p>
              </div>
            </div>

            <span className="text-xs font-semibold text-slate-500">
              Showing {filteredListings.length} crop batches
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredListings.map(listing => {
              // Find commodity benchmark
              const benchmark = ticker.find(t => t.name.toLowerCase().includes(listing.crop.toLowerCase().split(' ')[0]));
              const isBelowBenchmark = benchmark && listing.pricePerUnit < benchmark.benchmarkPrice;

              return (
                <div
                  key={listing.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Image & Badges */}
                    <div className="relative h-44 bg-slate-100 overflow-hidden">
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                      <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-xs">
                          {listing.category}
                        </span>
                        {listing.certifiedOrganic && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600 text-white backdrop-blur-xs">
                            🌱 Organic
                          </span>
                        )}
                      </div>

                      <div className="absolute top-2.5 right-2.5">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 text-slate-800 shadow-xs backdrop-blur-xs">
                          {listing.grade.split(' ')[0]}
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between text-white">
                        <div>
                          <span className="text-[11px] font-medium opacity-90 block">Available Now:</span>
                          <span className="font-bold text-sm">
                            {listing.availableQuantity.toLocaleString()} {listing.unit}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-xl font-extrabold text-white">
                            ${listing.pricePerUnit.toFixed(2)}
                            <span className="text-xs font-normal opacity-90"> /{listing.unit}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Listing Content */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 leading-snug line-clamp-1 group-hover:text-emerald-700 transition-colors">
                          {listing.title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{listing.location}</span>
                          <span className="text-slate-400">•</span>
                          <span className="shrink-0">{listing.distanceKm} km</span>
                        </div>
                      </div>

                      {/* Farmer trust badge */}
                      <div className="flex items-center justify-between py-2 border-y border-slate-100 text-xs">
                        <div className="flex items-center gap-1.5">
                          <img
                            src={listing.farmerAvatar}
                            alt={listing.farmerName}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span className="font-semibold text-slate-800">{listing.farmerName}</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <span className="text-[11px] text-amber-600 font-semibold">★ 4.9</span>
                      </div>

                      {/* Quality & Delivery */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <span className="text-slate-400 block text-[10px]">MOQ:</span>
                          <span className="font-semibold text-slate-800">{listing.minOrderQuantity} {listing.unit}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <span className="text-slate-400 block text-[10px]">Harvest:</span>
                          <span className="font-semibold text-slate-800">{listing.harvestDate}</span>
                        </div>
                      </div>

                      {/* Benchmark compare note */}
                      {benchmark && (
                        <div className="text-[11px] flex items-center justify-between text-slate-500 bg-slate-50 px-2 py-1 rounded">
                          <span>Daily Mandi Spot:</span>
                          <span className="font-mono font-medium">${benchmark.benchmarkPrice.toFixed(2)}/{benchmark.unit}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveModalListing(listing)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-white flex-1 text-center"
                    >
                      View Specs
                    </button>

                    {currentUser.role === 'middleman' ? (
                      <button
                        onClick={() => handleNegotiate(listing)}
                        className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center justify-center gap-1 flex-1 shadow-xs"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Procure / Bid</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveModalListing(listing)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1 flex-1 shadow-xs"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Buy via Escrow</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Produce Specs Modal */}
      {activeModalListing && (
        <ProduceDetailModal
          listing={activeModalListing}
          onClose={() => setActiveModalListing(null)}
          onOpenNegotiation={handleNegotiate}
        />
      )}
    </div>
  );
}

