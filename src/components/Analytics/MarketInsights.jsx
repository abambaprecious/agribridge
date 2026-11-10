import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Activity,
  DollarSign,
  PieChart,
  Sprout,
  Truck,
  Store,
  ShieldCheck,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export default function MarketInsights() {
  const { ticker, marketInsights } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-800">
              <TrendingUp className="w-5 h-5 text-indigo-700" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
              Agri-Commodity Benchmark & Fair Price Index
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Real-time terminal market indices, seasonal price trajectory, and transparent value-chain distribution metrics.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
          <Activity className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>Live Daily Spot Updates</span>
        </div>
      </div>

      {/* Grid of Commodity Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ticker.map(item => {
          const isPos = item.change24h >= 0;
          return (
            <div key={item.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded-md font-semibold bg-slate-100 text-slate-700">
                  {item.category}
                </span>
                <span className={`font-bold flex items-center ${isPos ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {isPos ? `+${item.change24h}%` : `${item.change24h}%`}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-base text-slate-900">{item.name}</h4>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black font-mono text-slate-900">
                    ${item.benchmarkPrice.toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-500">/{item.unit}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>7d Low: ${item.low7d.toFixed(2)}</span>
                <span>7d High: ${item.high7d.toFixed(2)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fair Value Chain Transparency Comparison */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-500/30">
            Supply Chain Economic Transformation
          </span>
          <h3 className="text-xl sm:text-3xl font-extrabold font-heading">
            Where Does Each Dollar Go? Legacy vs. AgriBridge
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In traditional informal food supply chains, layers of untracked middlemen took up to 65% of the consumer price, leaving small farmers impoverished. AgriBridge restructures the relationship:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Legacy Broken Chain */}
          <div className="bg-slate-800/80 rounded-2xl p-5 border border-rose-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-rose-300">❌ Traditional Fragmented Supply Chain</h4>
              <span className="text-[11px] text-rose-400 font-mono font-bold">Farmer receives ~28%</span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Smallholder Farmer Share:</span>
                  <span className="font-bold text-rose-300">28% ($0.42/kg)</span>
                </div>
                <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full w-[28%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Speculative Brokers / Informal Intermediaries:</span>
                  <span className="font-bold text-amber-400">48% ($0.72/kg)</span>
                </div>
                <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[48%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Retailer / Supermarket Margin:</span>
                  <span className="font-bold text-blue-400">24% ($0.36/kg)</span>
                </div>
                <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[24%]" />
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 italic">
              Result: Farmers struggle to buy seeds; post-harvest spoilage exceeds 35% due to lack of cold chain.
            </p>
          </div>

          {/* AgriBridge Fair System */}
          <div className="bg-slate-800/80 rounded-2xl p-5 border border-emerald-500/40 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-emerald-300">✓ AgriBridge Transparent Ecosystem</h4>
              <span className="text-[11px] text-emerald-400 font-mono font-bold">Farmer receives ~76%</span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span className="flex items-center gap-1 font-semibold text-white">
                    <Sprout className="w-3.5 h-3.5 text-emerald-400" /> Farmer / Grower Share:
                  </span>
                  <span className="font-bold text-emerald-400">76% ($1.14/kg)</span>
                </div>
                <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[76%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span className="flex items-center gap-1 font-semibold text-white">
                    <Truck className="w-3.5 h-3.5 text-amber-400" /> Value-Add Aggregator (Cold Fleet & QA):
                  </span>
                  <span className="font-bold text-amber-400">10% ($0.15/kg)</span>
                </div>
                <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full w-[10%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span className="flex items-center gap-1 font-semibold text-white">
                    <Store className="w-3.5 h-3.5 text-blue-400" /> Retailer Margin (Lower retail price!):
                  </span>
                  <span className="font-bold text-blue-400">14% ($0.21/kg)</span>
                </div>
                <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-400 h-full w-[14%]" />
                </div>
              </div>
            </div>
            <p className="text-[11px] text-emerald-300/90 italic">
              Result: Farmers earn 2.7× more; Middlemen are incentivized for cold-chain & quality grading; Spoilage drops below 3%.
            </p>
          </div>
        </div>
      </div>

      {/* Regional Market Intelligence & Demand Highlights */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="font-heading font-bold text-lg text-slate-900">
          Regional Crop Demand Intelligence & Production Signals
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {marketInsights.regionalDemandHighlights.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">{item.crop}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800">
                  {item.trend}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.reason}</p>
              <div className="pt-2 border-t border-slate-200 text-xs text-emerald-800 font-medium">
                💡 <strong>Strategy:</strong> {item.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
