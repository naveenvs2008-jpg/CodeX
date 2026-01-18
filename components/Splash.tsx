
import React from 'react';

const Splash: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-[100]">
      <div className="animate-splash flex flex-col items-center">
        <div className="w-20 h-20 bg-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(99,102,241,0.4)]">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-white">Code<span className="text-indigo-400">X</span></h1>
        <p className="text-slate-500 mt-2 font-medium tracking-widest text-xs uppercase">Daily Logic Training</p>
      </div>
    </div>
  );
};

export default Splash;
