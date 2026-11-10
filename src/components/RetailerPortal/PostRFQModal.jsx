import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Store, FileText, Calendar, DollarSign, MapPin, Truck } from 'lucide-react';

export default function PostRFQModal({ onClose }) {
  const { postRFQ, currentUser } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    crop: 'Vine Tomatoes',
    category: 'Vegetables',
    gradeRequirement: 'Grade A (Uniform size, brix > 5.5, zero blemishes)',
    quantityNeeded: 10000,
    unit: 'kg',
    frequency: 'Weekly contract (8 weeks)',
    targetBudgetPerUnit: 1.40,
    deliveryDestination: `${currentUser.company} Central Distribution Center #4`,
    deadlineDate: '2026-11-20',
    paymentTerms: '100% Escrow deposit on AgriBridge; released within 24h of dock inspection',
    logisticsRequired: 'Refrigerated transit mandatory (10°C to 12°C)'
  });

  const cropsByCategory = {
    Vegetables: ['Vine Tomatoes', 'Bell Peppers', 'Red Onions', 'Cabbage', 'Carrots'],
    Fruits: ['Hass Avocados', 'Mangoes', 'Pineapples', 'Watermelons', 'Citrus'],
    Grains: ['Yellow Maize (Corn)', 'Soybeans', 'Rice', 'Wheat', 'Sorghum'],
    Legumes: ['Snow Peas', 'French Beans', 'Chickpeas', 'Dry Beans']
  };

  const handleCategoryChange = (cat) => {
    setFormData(prev => ({
      ...prev,
      category: cat,
      crop: cropsByCategory[cat][0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalBudget = formData.quantityNeeded * formData.targetBudgetPerUnit;
    postRFQ({
      ...formData,
      totalBudget,
      title: formData.title || `Bulk Procurement: ${formData.quantityNeeded.toLocaleString()} ${formData.unit} ${formData.crop}`
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/30 text-blue-400 border border-blue-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Post Retail Procurement RFQ
              </h3>
              <p className="text-xs text-slate-400">
                Receive competing quotes from verified Farmers and Logistics Aggregators.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* RFQ Title */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Procurement Tender Title (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Standing Weekly Supply: 15 MT Grade A Vine Tomatoes"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-hidden focus:border-blue-500"
            />
          </div>

          {/* Category & Crop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-hidden focus:border-blue-500"
              >
                {Object.keys(cropsByCategory).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Crop</label>
              <select
                value={formData.crop}
                onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-hidden focus:border-blue-500"
              >
                {cropsByCategory[formData.category]?.map(cr => (
                  <option key={cr} value={cr}>{cr}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quantity & Target Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Quantity Needed</label>
              <input
                type="number"
                min={100}
                step={50}
                required
                value={formData.quantityNeeded}
                onChange={(e) => setFormData({ ...formData, quantityNeeded: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Unit</label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-hidden focus:border-blue-500"
              >
                <option value="kg">kg (Kilograms)</option>
                <option value="ton">ton (Metric Tons)</option>
                <option value="crates">Crates (10kg)</option>
                <option value="bags">Bags (50kg)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Max Budget / Unit ($)</label>
              <input
                type="number"
                min={0.01}
                step={0.01}
                required
                value={formData.targetBudgetPerUnit}
                onChange={(e) => setFormData({ ...formData, targetBudgetPerUnit: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 font-mono focus:outline-hidden focus:border-blue-500"
              />
            </div>
          </div>

          {/* Grade requirements */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Quality & Grade Standards
            </label>
            <input
              type="text"
              required
              value={formData.gradeRequirement}
              onChange={(e) => setFormData({ ...formData, gradeRequirement: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-hidden focus:border-blue-500"
            />
          </div>

          {/* Delivery & Logistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Delivery Destination</label>
              <input
                type="text"
                required
                value={formData.deliveryDestination}
                onChange={(e) => setFormData({ ...formData, deliveryDestination: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Bid Submission Deadline</label>
              <input
                type="date"
                required
                value={formData.deadlineDate}
                onChange={(e) => setFormData({ ...formData, deadlineDate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-hidden focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Mandatory Logistics / Cold Chain Specs
            </label>
            <input
              type="text"
              value={formData.logisticsRequired}
              onChange={(e) => setFormData({ ...formData, logisticsRequired: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-hidden focus:border-blue-500"
            />
          </div>

          {/* Summary Box */}
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs space-y-1">
            <div className="flex justify-between font-bold text-blue-900">
              <span>Estimated Tender Value:</span>
              <span className="font-mono text-sm">
                ${(formData.quantityNeeded * formData.targetBudgetPerUnit).toLocaleString()}
              </span>
            </div>
            <p className="text-blue-700 text-[11px]">
              When you accept a proposal from a Farmer or Middleman, this amount will be funded into AgriBridge Escrow and disbursed only when your dock inspection team confirms the shipment.
            </p>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5"
            >
              <Store className="w-4 h-4" />
              <span>Publish RFQ to Marketplace</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
