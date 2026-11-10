import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  X,
  Thermometer,
  Scale,
  Sparkles,
  FileCheck2,
  DollarSign
} from 'lucide-react';

export default function DockInspectionModal({ order, onClose }) {
  const { advanceOrderMilestone, showToast } = useApp();

  const [brixValue, setBrixValue] = useState(5.8);
  const [defectRate, setDefectRate] = useState(0.8);
  const [weightReceivedKg, setWeightReceivedKg] = useState(order.quantity);
  const [inspectionVerdict, setInspectionVerdict] = useState('FULL_PASS'); // 'FULL_PASS' | 'ADJUSTED_PASS' | 'DISPUTE'
  const [inspectorNotes, setInspectorNotes] = useState('All pallets inspected at DC dock bay 12. Optical sizing uniform, no frost damage, firmness exceeds Grade A retail standard.');

  const handleApproveInspection = () => {
    advanceOrderMilestone(order.id);
    showToast(`Dock Quality Inspection Approved! Escrow payout of $${order.totalAmount.toLocaleString()} released.`);
    onClose();
  };

  const handleDispute = () => {
    showToast(`Inspection hold flagged for Order ${order.id}. Third-party agricultural ombudsman alerted.`, 'warning');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/40 text-blue-300 border border-blue-500/30">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Retailer Receiving Dock Inspection
              </h3>
              <p className="text-xs text-blue-200">
                Consignment: {order.id} • {order.productName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inspection Form */}
        <div className="p-6 space-y-5 text-xs max-h-[75vh] overflow-y-auto">
          {/* Produce Specs Check */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                Weighbridge Net Load
              </span>
              <div className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-blue-600" />
                <span className="font-mono text-base font-bold text-slate-900">
                  {weightReceivedKg.toLocaleString()} {order.unit}
                </span>
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
                ✓ 100% Matches Invoice
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                Sugar / Brix Reading
              </span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="font-mono text-base font-bold text-slate-900">
                  {brixValue}° Brix
                </span>
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
                ✓ Premium Sweetness &gt; 5.5°
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                Transit Cold Log
              </span>
              <div className="flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-emerald-600" />
                <span className="font-mono text-base font-bold text-slate-900">
                  11.2°C Continuous
                </span>
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
                ✓ Zero Temperature Breaks
              </span>
            </div>
          </div>

          {/* Quality Grade & Defect Tolerance Slider */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-900">Surface Defect & Sorting Tolerance</h4>
                <p className="text-[11px] text-slate-500">Maximum allowable defect for Grade A retail is 2.5%</p>
              </div>
              <span className="font-mono font-bold text-sm bg-white px-2.5 py-1 rounded border border-slate-300 text-slate-800">
                {defectRate}% Defects Found
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={5}
              step={0.1}
              value={defectRate}
              onChange={(e) => setDefectRate(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />

            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0% (Flawless)</span>
              <span>1.5% (Export Standard)</span>
              <span>2.5% (Retail Limit)</span>
              <span>5% (Substandard)</span>
            </div>
          </div>

          {/* Verdict Selection */}
          <div className="space-y-2">
            <label className="font-bold text-slate-700 block">Inspection Acceptance Verdict</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setInspectionVerdict('FULL_PASS')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  inspectionVerdict === 'FULL_PASS'
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-900'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Full Grade A Pass</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  100% Escrow released to Grower & Logistics
                </p>
              </button>

              <button
                type="button"
                onClick={() => setInspectionVerdict('ADJUSTED_PASS')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  inspectionVerdict === 'ADJUSTED_PASS'
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 text-amber-900'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Grade B Reclassification</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Accept with 5% discount deduction
                </p>
              </button>

              <button
                type="button"
                onClick={() => setInspectionVerdict('DISPUTE')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  inspectionVerdict === 'DISPUTE'
                    ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-500/20 text-rose-900'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Raise QA Dispute</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Freeze escrow & call independent auditor
                </p>
              </button>
            </div>
          </div>

          {/* Inspector Notes */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">Dock Inspector Comments</label>
            <textarea
              rows={2}
              value={inspectorNotes}
              onChange={(e) => setInspectorNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-blue-500 text-xs"
            />
          </div>

          {/* Payout Distribution Preview */}
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between font-bold text-emerald-950">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Automated Escrow Disbursal upon Sign-off:</span>
              </span>
              <span className="font-mono text-base font-black text-emerald-800">
                ${order.totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-emerald-900 pt-1 border-t border-emerald-200/60">
              <div>
                <span>Farmer ({order.farmer.name}):</span>
                <strong className="block font-mono font-bold text-slate-900">
                  ${order.farmerSubtotal.toLocaleString()} (Direct Bank Transfer)
                </strong>
              </div>
              <div>
                <span>Logistics / Aggregator ({order.intermediary?.name || 'Carrier'}):</span>
                <strong className="block font-mono font-bold text-slate-900">
                  ${order.middlemanMargin.toLocaleString()} (Freight Margin)
                </strong>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>

            {inspectionVerdict === 'DISPUTE' ? (
              <button
                type="button"
                onClick={handleDispute}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-md shadow-rose-600/30 flex items-center gap-1.5"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Submit Quality Dispute</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleApproveInspection}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-700/20 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Sign Dock Inspection & Release Escrow</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
