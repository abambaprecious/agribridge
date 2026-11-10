import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sprout, PlusCircle, Package, MapPin, Calendar, DollarSign, Upload } from 'lucide-react';

export default function AddProduceModal({ onClose }) {
  const { addListing, currentUser } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    crop: 'Vine Tomatoes',
    variety: 'Hydroponic Roma Pro',
    category: 'Vegetables',
    grade: 'Grade A (Export / Retail Standard)',
    certifiedOrganic: true,
    totalQuantity: 10000,
    availableQuantity: 10000,
    unit: 'kg',
    pricePerUnit: 1.35,
    minOrderQuantity: 500,
    location: currentUser.location || 'Kaduna Agricultural Belt',
    harvestDate: new Date().toISOString().split('T')[0],
    shelfLifeDays: 14,
    storageCondition: 'Cooled packing shed, 12°C',
    deliveryOptions: ['Farm-Gate Pickup', 'Aggregator Fleet Collection'],
    moistureOrSugar: 'Brix Index: 5.6°',
    packaging: '10 kg ventilated stackable plastic crates',
    description: 'Freshly harvested crops from our controlled greenhouse. Tested for zero chemical residues and peak flavor.'
  });

  const crops = {
    Vegetables: ['Vine Tomatoes', 'Bell Peppers', 'Red Onions', 'Carrots', 'Cabbage', 'Cucumbers'],
    Fruits: ['Hass Avocados', 'Watermelons', 'Mangoes', 'Pineapples', 'Strawberries'],
    Grains: ['Yellow Maize (Corn)', 'Soybeans', 'Rice', 'Wheat', 'Sorghum'],
    Legumes: ['Snow Peas', 'French Beans', 'Green Peas', 'Dry Beans']
  };

  const sampleImages = {
    'Vine Tomatoes': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80',
    'Bell Peppers': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&auto=format&fit=crop&q=80',
    'Hass Avocados': 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&auto=format&fit=crop&q=80',
    'Yellow Maize (Corn)': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&auto=format&fit=crop&q=80',
    'Snow Peas': 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=800&auto=format&fit=crop&q=80'
  };

  const handleCategoryChange = (cat) => {
    const defaultCrop = crops[cat][0];
    setFormData(prev => ({
      ...prev,
      category: cat,
      crop: defaultCrop
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalImage = sampleImages[formData.crop] || sampleImages['Vine Tomatoes'];

    addListing({
      ...formData,
      totalQuantity: Number(formData.availableQuantity),
      availableQuantity: Number(formData.availableQuantity),
      pricePerUnit: Number(formData.pricePerUnit),
      minOrderQuantity: Number(formData.minOrderQuantity),
      images: [finalImage],
      title: formData.title || `${formData.grade} ${formData.crop} (${formData.variety})`
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-emerald-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-700/60 text-white border border-emerald-600/40">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                List Produce / Harvest on AgriBridge
              </h3>
              <p className="text-xs text-emerald-100">
                Direct exposure to verified Supermarket Retailers and Regional Aggregators.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-emerald-700 text-emerald-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          {/* Produce Name */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">Listing Headline</label>
            <input
              type="text"
              placeholder="e.g. Hydroponic Vine Tomatoes (Grade A Greenhouse)"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 text-sm focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              >
                {Object.keys(crops).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Crop Type</label>
              <select
                value={formData.crop}
                onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              >
                {crops[formData.category]?.map(cr => (
                  <option key={cr} value={cr}>{cr}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Seed Variety</label>
              <input
                type="text"
                value={formData.variety}
                onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Quantity & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Available Quantity</label>
              <input
                type="number"
                min={10}
                required
                value={formData.availableQuantity}
                onChange={(e) => setFormData({ ...formData, availableQuantity: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono text-sm focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Unit</label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              >
                <option value="kg">kg</option>
                <option value="ton">ton</option>
                <option value="crates">crates</option>
                <option value="bags">bags</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Price / Unit ($)</label>
              <input
                type="number"
                step={0.01}
                required
                value={formData.pricePerUnit}
                onChange={(e) => setFormData({ ...formData, pricePerUnit: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono text-sm focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Min. Order (MOQ)</label>
              <input
                type="number"
                min={10}
                required
                value={formData.minOrderQuantity}
                onChange={(e) => setFormData({ ...formData, minOrderQuantity: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono text-sm focus:outline-hidden focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Quality & Organic Check */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Quality Grade</label>
              <select
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              >
                <option value="Grade A (Export / Retail Standard)">Grade A (Export / Retail Standard)</option>
                <option value="Grade B (Local Market)">Grade B (Local Market)</option>
                <option value="Grade 1 (Commercial Milling)">Grade 1 (Commercial Milling)</option>
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 text-emerald-900 font-semibold w-full">
                <input
                  type="checkbox"
                  checked={formData.certifiedOrganic}
                  onChange={(e) => setFormData({ ...formData, certifiedOrganic: e.target.checked })}
                  className="rounded text-emerald-600 w-4 h-4"
                />
                <span>🌱 Certified Organic Produce</span>
              </label>
            </div>
          </div>

          {/* Harvest Date & Shelf Life */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Harvest Date</label>
              <input
                type="date"
                required
                value={formData.harvestDate}
                onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Shelf Life (Days)</label>
              <input
                type="number"
                value={formData.shelfLifeDays}
                onChange={(e) => setFormData({ ...formData, shelfLifeDays: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Farm Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">Description & Storage Instructions</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-hidden focus:border-emerald-500"
            />
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
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-700/20 flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish Listing to Exchange</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
