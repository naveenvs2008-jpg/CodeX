
import React, { useState } from 'react';
import { CodingQuestion, Difficulty, UserSubmission, UserStats } from '../types';
import { getAIFeedback } from '../services/aiService';

const getDifficultyColor = (diff: Difficulty) => {
  switch (diff) {
    case Difficulty.EASY: return 'bg-emerald-900/30 text-emerald-400 border border-emerald-900/50';
    case Difficulty.MEDIUM: return 'bg-amber-900/30 text-amber-400 border border-amber-900/50';
    case Difficulty.HARD: return 'bg-rose-900/30 text-rose-400 border border-rose-900/50';
    default: return 'bg-slate-800 text-slate-300';
  }
};

// Fix: Use React.FC to explicitly type the component and its children prop to resolve TS errors in JSX
const Badge: React.FC<{ children: React.ReactNode, color: string }> = ({ children, color }) => (
  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${color}`}>
    {children}
  </span>
);

interface HomeProps {
  question: CodingQuestion;
  onSubmitting: (submission: UserSubmission) => void;
  existingSubmission?: UserSubmission;
  stats: UserStats;
}

const Home: React.FC<HomeProps> = ({ question, onSubmitting, existingSubmission, stats }) => {
  const [answer, setAnswer] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    setIsAnalyzing(true);
    
    const feedback = await getAIFeedback(question.description, answer);
    
    const submission: UserSubmission = {
      questionId: question.id,
      date: new Date().toISOString().split('T')[0],
      answer: answer,
      feedback: feedback
    };
    
    onSubmitting(submission);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Daily Logic</h2>
          <p className="text-slate-500 text-sm">Sharp mind, every single day.</p>
        </div>
        <div className="bg-indigo-600 text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 shadow-lg shadow-indigo-900/40">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
          <span className="font-bold text-lg">{stats.streak}</span>
        </div>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex gap-2 mb-6">
          {/* Fix: Explicitly pass children as a prop to satisfy TypeScript requirement for line 64 and 65 */}
          <Badge color={getDifficultyColor(question.difficulty)} children={question.difficulty} />
          <Badge color="bg-indigo-900/30 text-indigo-400 border border-indigo-900/50" children={question.topic} />
        </div>

        <h3 className="text-2xl font-bold mb-4 text-white">{question.title}</h3>
        <p className="text-slate-300 leading-relaxed mb-8 whitespace-pre-wrap text-lg">{question.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-600 block mb-2 tracking-widest">Example Input</span>
            <code className="code-font text-sm text-indigo-400">{question.exampleInput}</code>
          </div>
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-600 block mb-2 tracking-widest">Example Output</span>
            <code className="code-font text-sm text-emerald-400">{question.exampleOutput}</code>
          </div>
        </div>

        {!existingSubmission ? (
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-400">Draft Your Pseudocode</label>
            <textarea
              className="w-full h-48 bg-slate-950 border border-slate-800 rounded-2xl p-5 code-font text-sm text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500/50 transition-all resize-none shadow-inner"
              placeholder="Start typing your solution logic here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={isAnalyzing}
            />
            <button
              onClick={handleSubmit}
              disabled={!answer.trim() || isAnalyzing}
              className={`w-full py-4 rounded-2xl font-bold text-white shadow-2xl transition-all ${
                !answer.trim() || isAnalyzing 
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700' 
                : 'bg-indigo-600 hover:bg-indigo-500 active:scale-95 shadow-indigo-600/20'
              }`}
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Syncing with AI...
                </span>
              ) : 'Submit Solution'}
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="p-6 bg-slate-950 border border-indigo-900/40 rounded-2xl shadow-xl">
              <h4 className="font-bold text-indigo-400 text-sm flex items-center gap-2 mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Reference Solution
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed font-medium">{question.solution}</p>
            </div>
            
            <div className="p-6 bg-slate-950 border border-emerald-900/40 rounded-2xl shadow-xl">
              <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-2 mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Mentor Insights
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed italic">"{existingSubmission.feedback || 'Excellent problem solving today!'}"</p>
            </div>

            <div className="text-center py-6 border-t border-slate-800 mt-6">
              <p className="text-slate-500 text-sm font-medium">Tomorrow's core logic drops in 12 hours.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
