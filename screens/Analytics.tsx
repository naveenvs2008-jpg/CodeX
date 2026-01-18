
import React from 'react';
import { UserStats } from '../types';

interface AnalyticsProps {
  stats: UserStats;
}

const Analytics: React.FC<AnalyticsProps> = ({ stats }) => {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <h2 className="text-3xl font-black text-white tracking-tight">Performance</h2>
        <p className="text-slate-500 text-sm">Your journey towards coding mastery.</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <StatCard label="Current Streak" value={stats.streak} sub="Days" color="bg-indigo-600 text-white shadow-indigo-900/40" />
        <StatCard label="Completed" value={stats.totalAttempted} sub="Challenges" />
        <StatCard label="Accuracy" value={100} sub="%" />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <h3 className="text-lg font-bold mb-8 text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
          Consistency Matrix
        </h3>
        <div className="flex justify-between items-end h-40 gap-3">
          {last7Days.map((date) => {
            const isCompleted = stats.history.includes(date);
            return (
              <div key={date} className="flex-1 flex flex-col items-center gap-3 group">
                <div 
                  className={`w-full rounded-xl transition-all duration-1000 ease-out ${
                    isCompleted 
                      ? 'bg-indigo-500 h-32 shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                      : 'bg-slate-800 h-10 group-hover:bg-slate-700'
                  }`}
                />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  {new Date(date).toLocaleDateString(undefined, { weekday: 'short' })}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl overflow-hidden">
        <h3 className="text-lg font-bold mb-6 text-white">Challenge Log</h3>
        {stats.history.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-slate-800 rounded-2xl">
            <p className="text-slate-500 text-sm font-medium">No activity recorded yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {stats.history.slice().reverse().map(date => (
              <div key={date} className="flex justify-between items-center p-4 bg-slate-950 rounded-2xl border border-slate-800 transition-hover hover:border-indigo-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
                  <span className="text-slate-300 font-semibold">{new Date(date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Success</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, sub, color = 'bg-slate-900 border-slate-800' }: { label: string, value: number, sub: string, color?: string }) => (
  <div className={`${color} p-7 rounded-3xl border shadow-xl transition-transform hover:-translate-y-1 duration-300`}>
    <p className={`text-[10px] uppercase font-bold tracking-widest ${color.includes('bg-indigo') ? 'text-indigo-200' : 'text-slate-500'} mb-2`}>{label}</p>
    <div className="flex items-baseline gap-2">
      <span className="text-4xl font-black tracking-tight">{value}</span>
      <span className={`text-xs font-bold ${color.includes('bg-indigo') ? 'text-indigo-100' : 'text-slate-600'}`}>{sub}</span>
    </div>
  </div>
);

export default Analytics;
