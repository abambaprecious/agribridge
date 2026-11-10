import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Layers, Sprout, Truck, ShieldCheck, CheckCircle2, DollarSign } from 'lucide-react';

export default function AggregationModal({ onClose }) {
  const { listings, createAggregatedLot, currentUser } = useApp();

  // Selectable farmer listings
  const availableFarmerListings = listings.filter(l => l.middlemanEligible !== false);

  const [selectedListingIds, setSelectedListingIds] = useState(
    availableFarmerListings.slice(0, 2).map(l => l.id)
  );

  const [title, setTitle] = useState('Apex Consolidated Grade A Tomato Consignment');
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState(1.50);
  const [location, setLocation] = useState(currentUser.location || 'Central Regional Distribution Terminal');
  const [qaInspector, setQaInspector] = useState('Dr. Samuel Kalu (Certified Quality Auditor)');

  const selectedListings = availableFarmerListings.filter(l => selectedListingIds.includes(l.id));

  const totalKg = selectedListings.reduce((acc, l) => acc + l.availableQuantity, 0);
  const totalTons = (totalKg / 1000).toFixed(1);
  const avgFarmerPrice = selectedListings.length > 0
    ? (selectedListings.reduce((acc, l) => acc + l.pricePerUnit, 0) / selectedListings.length).toFixed(2)
    : 0;

  const toggleListing = (id) => {
    setSelectedListingIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (selectedListings.length === 0) return;

    const farmerSources = selectedListings.map(l => ({
      name: `${l.farmerName} (${l.farmerCompany})`,
      contributionKg: l.availableQuantity,
      grade: l.grade,
      paid: true
    }));

    createAggregatedLot({
      title: title || `Aggregated Bulk Lot (${totalTons} MT)`,
      totalTons: parseFloat(totalTons),
      totalKg,
      unit: selectedListings[0]?.unit || 'kg',
      pricePerUnit: Number(sellingPricePerUnit),
      farmerSources,
      qualityInspection: {
        inspector: qaInspector,
        score: '97/100',
        status: 'VERIFIED & PASSED',
        defects: '< 1.2% surface blemish',
        coldChainTemp: '11.5°C maintained'
      },
      servicesIncluded: [
        'Multi-Farm Crop Aggregation',
        'Optical Sizing & Sanitized RPC Crates',
        'Pre-cooling to Optimal Target Temperature',
        'Door-to-Door Refrigerated Van Freight',
        'Buyer Escrow Guarantee'
      ],
      location,
      availableForDispatch: 'Immediate (Reefer loaded)',
      targetRetailers: 'Supermarkets, Food Processors, Regional Distribution Centers',
      image: selectedListings[0]?.images[0] || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-amber-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-600/60 text-white border border-amber-500/40">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Multi-Farm Crop Aggregation Tool
              </h3>
              <p className="text-xs text-amber-100">
                Pool scattered smallholder farmer crops into a certified commercial bulk lot for retailers.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-amber-800 text-amber-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleCreate} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Aggregated Lot Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 text-sm focus:outline-hidden focus:border-amber-500"
            />
          </div>

          {/* Select Farmer Listings to Aggregate */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold text-slate-700">
                Select Smallholder Harvests to Pool ({selectedListingIds.length} selected):
              </label>
              <span className="text-[11px] text-amber-700 font-semibold">
                Total: {totalKg.toLocaleString()} kg (~{totalTons} MT)
              </span>
            </div>

            <div className="space-y-2 border border-slate-200 rounded-xl p-3 bg-slate-50/70 max-h-48 overflow-y-auto">
              {availableFarmerListings.map(listing => {
                const isSelected = selectedListingIds.includes(listing.id);
                return (
                  <div
                    key={listing.id}
                    onClick={() => toggleListing(listing.id)}
                    className={`p-2.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-300'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}} // handled by div
                        className="rounded text-amber-600 w-4 h-4"
                      />
                      <div>
                        <p className="font-bold text-slate-900">{listing.title}</p>
                        <p className="text-[11px] text-slate-500">
                          {listing.farmerName} • {listing.location}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-bold text-slate-900">
                        {listing.availableQuantity.toLocaleString()} {listing.unit}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        @ ${listing.pricePerUnit.toFixed(2)}/{listing.unit}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing & Margin Calculator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold">Avg. Farmer Acquisition Price:</span>
              <p className="font-mono font-bold text-sm text-slate-900">${avgFarmerPrice} / kg</p>
              <p className="text-[11px] text-slate-500">Farmers receive immediate bank settlement.</p>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Retail Selling Price / Unit ($) (Includes Freight & Grading)
              </label>
              <input
                type="number"
                step={0.01}
                required
                value={sellingPricePerUnit}
                onChange={(e) => setSellingPricePerUnit(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 font-mono text-sm focus:outline-hidden focus:border-amber-500"
              />
            </div>
          </div>

          {/* Quality Auditor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Certified QA Inspector</label>
              <input
                type="text"
                value={qaInspector}
                onChange={(e) => setQaInspector(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Aggregation Logistics Hub</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-amber-500"
              />
            </div>
          </div>

          {/* Aggregator Margin Preview */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
            <div className="flex justify-between font-bold text-xs">
              <span>Gross Consignment Value:</span>
              <span className="font-mono text-sm">${(totalKg * sellingPricePerUnit).toLocaleString()}</span>
            </div>
            <p className="text-[11px] text-amber-800">
              Middleman value add covers crate sanitization, optical grading, sorting, 11°C pre-cooling, and refrigerated door-to-door transit to the retailer.
            </p>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={selectedListings.length === 0}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-bold shadow-md shadow-amber-600/30 flex items-center gap-1.5"
            >
              <Layers className="w-4 h-4" />
              <span>Publish Aggregated Lot</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
