import React, { useState, useEffect } from 'react';
import {
  Truck,
  MapPin,
  Thermometer,
  ShieldCheck,
  Fuel,
  Compass,
  AlertTriangle,
  Clock,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function LiveRouteMap({ order }) {
  const [truckProgress, setTruckProgress] = useState(65); // percentage along the route
  const [telemetryTemp, setTelemetryTemp] = useState(order.telemetry?.currentTempCelsius || 11.2);
  const [speed, setSpeed] = useState(72); // km/h

  // Simulate subtle real-time telemetry fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryTemp(prev => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
      setSpeed(prev => Math.floor(68 + Math.random() * 8));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const checkpoints = [
    { name: 'Farm Gate Loading', location: order.farmer.company, status: 'PASSED', time: '08:30 AM', icon: '🌱' },
    { name: 'Apex Aggregation & Pre-Chill Hub', location: 'Central Logistics Bay 4', status: 'PASSED', time: '11:15 AM', icon: '❄️' },
    { name: 'Corridor Highway Checkpoint 3', location: 'Mile 84 Waypoint', status: 'IN_TRANSIT', time: 'Now (Active)', icon: '🚛' },
    { name: 'FreshMart Receiving Dock #12', location: order.buyer.company, status: 'SCHEDULED', time: '14:30 PM (Est)', icon: '🏬' }
  ];

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-4 shadow-xl">
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h4 className="font-bold text-sm tracking-wide">Live Cold-Chain Telemetry & Transit Map</h4>
            <span className="text-[10px] uppercase font-bold bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
              Active Fleet Stream
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Unit: {order.telemetry?.truckId || 'Reefer #AB-04'} • En route to {order.buyer.company}
          </p>
        </div>

        {/* Live Gauges Header */}
        <div className="flex items-center gap-3 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <div className="flex items-center gap-1.5">
            <Thermometer className="w-4 h-4 text-blue-400" />
            <div>
              <span className="text-[10px] text-slate-400 block leading-none">Internal Reefer</span>
              <span className="font-mono text-xs font-bold text-emerald-400">{telemetryTemp}°C</span>
            </div>
          </div>
          <div className="h-6 w-px bg-slate-700" />
          <div className="flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-[10px] text-slate-400 block leading-none">Ground Speed</span>
              <span className="font-mono text-xs font-bold text-white">{speed} km/h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Interactive Route Canvas */}
      <div className="relative bg-slate-950 rounded-xl p-5 border border-slate-800 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Dynamic Route SVG Map */}
        <div className="relative z-10 py-4">
          <svg className="w-full h-24 overflow-visible" viewBox="0 0 700 80">
            {/* Background path line */}
            <path
              d="M 50 40 Q 200 10, 350 40 T 650 40"
              fill="none"
              stroke="#334155"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Active completed route path */}
            <path
              d="M 50 40 Q 200 10, 350 40 T 650 40"
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="650"
              strokeDashoffset="180"
            />
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="60%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>

            {/* Checkpoint 1: Farm Origin */}
            <circle cx="50" cy="40" r="10" fill="#10b981" stroke="#064e3b" strokeWidth="3" />
            <text x="50" y="70" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Farm Origin</text>

            {/* Checkpoint 2: Aggregator Cold Hub */}
            <circle cx="250" cy="22" r="9" fill="#06b6d4" stroke="#083344" strokeWidth="3" />
            <text x="250" y="6" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="bold">Cold Hub & QA</text>

            {/* Checkpoint 3: In Transit Moving Truck Point */}
            <g transform="translate(460, 32)">
              <circle cx="0" cy="0" r="14" fill="#f59e0b" className="animate-ping opacity-75" />
              <circle cx="0" cy="0" r="11" fill="#f59e0b" stroke="#78350f" strokeWidth="2.5" />
              <text x="0" y="3.5" textAnchor="middle" fill="#000" fontSize="10" fontWeight="extrabold">🚛</text>
            </g>
            <text x="460" y="65" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">Highway Mile 84</text>

            {/* Checkpoint 4: Retailer DC Dock */}
            <circle cx="650" cy="40" r="10" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="3" />
            <text x="650" y="70" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Retailer DC Dock</text>
          </svg>
        </div>

        {/* Environmental conditions strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-3 border-t border-slate-800/80">
          <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Ambient Temp:</span>
            <span className="font-mono text-slate-200 font-bold">31.4°C (Hot Corridor)</span>
          </div>
          <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Cold Insulation:</span>
            <span className="font-mono text-emerald-400 font-bold">100% Sealed (11.2°C)</span>
          </div>
          <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Relative Humidity:</span>
            <span className="font-mono text-slate-200 font-bold">88% (Anti-Shrinkage)</span>
          </div>
          <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Next Inspection:</span>
            <span className="font-mono text-amber-400 font-bold">In 38 km (Dock #12)</span>
          </div>
        </div>
      </div>

      {/* Route Checkpoints Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
        {checkpoints.map((cp, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl border transition-all ${
              cp.status === 'PASSED'
                ? 'bg-slate-800/60 border-emerald-500/30 text-slate-300'
                : cp.status === 'IN_TRANSIT'
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-200 ring-1 ring-amber-500/20'
                : 'bg-slate-900/40 border-slate-800 text-slate-500'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-base">{cp.icon}</span>
              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                cp.status === 'PASSED'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                  : cp.status === 'IN_TRANSIT'
                  ? 'bg-amber-950 text-amber-400 border border-amber-500/40 animate-pulse'
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {cp.status}
              </span>
            </div>
            <h5 className="font-bold text-white text-xs truncate">{cp.name}</h5>
            <p className="text-[10px] text-slate-400 truncate mt-0.5">{cp.location}</p>
            <span className="text-[10px] text-slate-400 font-mono mt-1 block">{cp.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
