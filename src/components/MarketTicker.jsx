import React from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, TrendingDown, Activity, Sparkles } from 'lucide-react';

export default function MarketTicker() {
  const { ticker } = useApp();

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white overflow-hidden py-2 shadow-inner">
      <div className="flex items-center">
        <div className="px-4 py-0.5 bg-emerald-600/20 border-r border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0 z-10 shadow-md">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>Daily Mandi Index</span>
        </div>

        {/* Marquee Ticker */}
        <div className="overflow-hidden whitespace-nowrap flex-1 relative flex">
          <div className="animate-marquee flex items-center gap-8 text-xs font-medium px-4">
            {ticker.concat(ticker).map((item, idx) => {
              const isPositive = item.change24h >= 0;
              return (
                <div key={`${item.id}-${idx}`} className="inline-flex items-center gap-2 group cursor-pointer hover:bg-slate-800/60 px-2 py-0.5 rounded transition-colors">
                  <span className="font-semibold text-slate-200">{item.name}</span>
                  <span className="text-slate-400 text-[11px]">({item.unit})</span>
                  <span className="font-mono font-bold text-white">${item.benchmarkPrice.toFixed(2)}</span>
                  <span
                    className={`inline-flex items-center text-[11px] font-bold ${
                      isPositive ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {isPositive ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                    {isPositive ? `+${item.change24h}%` : `${item.change24h}%`}
                  </span>
                  <span className="text-slate-600">•</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 px-3 text-[11px] text-slate-400 shrink-0 border-l border-slate-800">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Transparent Farm-Gate Pricing</span>
        </div>
      </div>
    </div>
  );
}

