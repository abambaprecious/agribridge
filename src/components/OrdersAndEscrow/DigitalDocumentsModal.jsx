import React from 'react';
import { X, Printer, ShieldCheck, CheckCircle2, Truck, FileText, Download } from 'lucide-react';

export default function DigitalDocumentsModal({ order, onClose }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Controls */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm">Official Digital Bill of Lading & Escrow Receipt</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 space-y-6 text-slate-800 text-xs font-sans print:p-0">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-300 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                  Agri<span className="text-emerald-600">Bridge</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Verified Electronic Consignment Note
                </span>
              </div>
              <p className="text-slate-500 text-[11px]">Agri-Commodity Exchange & Smart Escrow Network</p>
              <p className="text-slate-400 text-[10px]">Reference: e-CMR / BOL Standard Protocol ISO-28000</p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block">Consignment ID:</span>
              <span className="font-mono text-base font-bold text-slate-900">{order.id}</span>
              <span className="text-[10px] text-slate-500 block mt-1">Date: {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Tripartite Entity Blocks */}
          <div className="grid grid-cols-3 gap-4 border border-slate-200 rounded-xl p-4 bg-slate-50">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                1. Producer / Grower
              </span>
              <h5 className="font-bold text-sm text-slate-900">{order.farmer.name}</h5>
              <p className="text-slate-600">{order.farmer.company}</p>
              <span className="inline-block mt-1 text-[10px] text-emerald-700 font-semibold bg-emerald-100 px-1.5 py-0.2 rounded">
                Verified Origin
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                2. Carrier / Aggregator
              </span>
              <h5 className="font-bold text-sm text-slate-900">
                {order.intermediary ? order.intermediary.name : 'Direct Logistics'}
              </h5>
              <p className="text-slate-600">
                {order.intermediary ? order.intermediary.company : 'Direct Farm Fleet'}
              </p>
              <span className="inline-block mt-1 text-[10px] text-amber-800 font-semibold bg-amber-100 px-1.5 py-0.2 rounded">
                Cold Chain Bonded
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                3. Consignee / Retailer
              </span>
              <h5 className="font-bold text-sm text-slate-900">{order.buyer.name}</h5>
              <p className="text-slate-600">{order.buyer.company}</p>
              <span className="inline-block mt-1 text-[10px] text-blue-800 font-semibold bg-blue-100 px-1.5 py-0.2 rounded">
                Escrow Depositor
              </span>
            </div>
          </div>

          {/* Cargo Details Table */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">
              Consignment Cargo Manifest
            </h4>
            <table className="w-full text-left border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 text-[11px] font-bold uppercase">
                <tr>
                  <th className="p-2.5">Commodity Description</th>
                  <th className="p-2.5 text-center">Quantity</th>
                  <th className="p-2.5 text-right">Unit Price</th>
                  <th className="p-2.5 text-right">Total Escrow Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2.5">
                    <p className="font-bold text-slate-900">{order.productName}</p>
                    <p className="text-[11px] text-slate-500">Quality Certified • Monitored Cold Chain</p>
                  </td>
                  <td className="p-2.5 text-center font-mono font-bold">
                    {order.quantity.toLocaleString()} {order.unit}
                  </td>
                  <td className="p-2.5 text-right font-mono">${order.unitPrice.toFixed(2)}</td>
                  <td className="p-2.5 text-right font-mono font-bold text-emerald-700">
                    ${order.totalAmount.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* QA Inspection & Temperature Certificate */}
          <div className="border border-emerald-200 bg-emerald-50/50 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Automated Quality Audit & Phytosanitary Log</span>
              </div>
              <span className="font-mono text-[10px] font-bold text-emerald-800">
                Cert #{order.inspectionData?.certNumber || 'QA-CERT-2026'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-700">
              <div>
                <span className="text-slate-400 block">Authorized Inspector:</span>
                <span className="font-semibold">{order.inspectionData?.inspectorName || 'AgriBridge Automated QA'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Defect Rate:</span>
                <span className="font-semibold">{order.inspectionData?.defectsFoundPct || 0.8}% (Grade A Pass)</span>
              </div>
              <div>
                <span className="text-slate-400 block">Transit Cold Range:</span>
                <span className="font-semibold">
                  {order.telemetry?.currentTempCelsius || 11.2}°C (Optimal)
                </span>
              </div>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="pt-4 border-t border-slate-200 grid grid-cols-3 gap-6 text-[10px] text-slate-500">
            <div>
              <p className="font-bold text-slate-700 mb-6">Producer Sign-off</p>
              <div className="border-b border-dashed border-slate-400 pb-1 font-mono text-emerald-800">
                Amara Eze [Digital Key 902F]
              </div>
              <p className="mt-1">Farm Gate Dispatch Confirmed</p>
            </div>

            <div>
              <p className="font-bold text-slate-700 mb-6">Aggregator / Driver</p>
              <div className="border-b border-dashed border-slate-400 pb-1 font-mono text-amber-800">
                Carlos Morales [Apex Reefer #04]
              </div>
              <p className="mt-1">Cold Chain Integrity Guaranteed</p>
            </div>

            <div>
              <p className="font-bold text-slate-700 mb-6">Retailer Receiving Dock</p>
              <div className="border-b border-dashed border-slate-400 pb-1 font-mono text-blue-800">
                {order.status === 'COMPLETED_PAID' ? 'Elena Rostova [DC Accepted]' : '[Pending Dock Inspection]'}
              </div>
              <p className="mt-1">Smart Escrow Release Trigger</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

