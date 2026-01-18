
import React from 'react';

const Documentation: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header>
        <h2 className="text-3xl font-black text-white tracking-tight">System Core</h2>
        <p className="text-slate-500 text-sm mt-1">Under the hood of CodeX.</p>
      </header>

      <section className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
           <div className="w-10 h-10 bg-indigo-600/20 rounded-xl flex items-center justify-center border border-indigo-600/30">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
           </div>
           Data Schema
        </h3>
        <div className="space-y-6">
          <div>
            <span className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-3 block">questions (Firestore Collection)</span>
            <pre className="bg-slate-950 p-5 rounded-2xl border border-slate-800 overflow-x-auto text-[13px] text-slate-400 leading-relaxed font-mono">{`{
  id: string,
  title: string,
  description: string,
  difficulty: "Easy" | "Medium" | "Hard",
  topic: string,
  solution: string,
  activeDate: Timestamp
}`}</pre>
          </div>
          <div>
            <span className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-3 block">users/{"{userId}"}/stats (Firestore Document)</span>
            <pre className="bg-slate-950 p-5 rounded-2xl border border-slate-800 overflow-x-auto text-[13px] text-slate-400 leading-relaxed font-mono">{`{
  streak: number,
  totalAttempted: number,
  lastSubmissionDate: string,
  history: string[]
}`}</pre>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
           <div className="w-10 h-10 bg-rose-600/20 rounded-xl flex items-center justify-center border border-rose-600/30">
              <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
           </div>
           Access Controls
        </h3>
        <pre className="bg-slate-950 text-slate-500 p-6 rounded-2xl border border-slate-800 text-[13px] leading-relaxed font-mono">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /questions/{question} {
      allow read: if request.auth != null;
    }
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}`}
        </pre>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
        <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800">
           <h4 className="font-bold text-white mb-2">Unlocking Logic</h4>
           <p className="text-slate-500 text-sm leading-relaxed">Daily challenges are deterministically seeded based on local date strings to ensure cross-user consistency without central orchestration.</p>
        </div>
        <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800">
           <h4 className="font-bold text-white mb-2">Streak Policy</h4>
           <p className="text-slate-500 text-sm leading-relaxed">Streaks increment if submissions are exactly 24 hours apart. A 48-hour gap triggers a reset to sustain high habit discipline.</p>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
