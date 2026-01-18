
import React, { useState, useEffect, useMemo } from 'react';
import { QUESTIONS_POOL } from './constants';
import { UserStats, UserSubmission } from './types';
import Home from './screens/Home';
import Analytics from './screens/Analytics';
import Documentation from './screens/Documentation';
import Sidebar from './components/Sidebar';
import Splash from './components/Splash';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'stats' | 'docs'>('home');
  const [showSplash, setShowSplash] = useState(true);
  const [userStats, setUserStats] = useState<UserStats>({
    streak: 0,
    totalAttempted: 0,
    daysMissed: 0,
    lastSubmissionDate: null,
    history: []
  });
  const [submissions, setSubmissions] = useState<UserSubmission[]>([]);

  // Load local storage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('codex_stats');
    const savedSubmissions = localStorage.getItem('codex_submissions');
    if (savedStats) setUserStats(JSON.parse(savedStats));
    if (savedSubmissions) setSubmissions(JSON.parse(savedSubmissions));

    // Hide splash after 2.2 seconds
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('codex_stats', JSON.stringify(userStats));
    localStorage.setItem('codex_submissions', JSON.stringify(submissions));
  }, [userStats, submissions]);

  // Determine today's question based on date
  const todayDate = new Date().toISOString().split('T')[0];
  const todayQuestion = useMemo(() => {
    const seed = todayDate.split('-').reduce((acc, part) => acc + parseInt(part), 0);
    return QUESTIONS_POOL[seed % QUESTIONS_POOL.length];
  }, [todayDate]);

  const handleSubmission = (submission: UserSubmission) => {
    const newSubmissions = [...submissions, submission];
    setSubmissions(newSubmissions);

    setUserStats(prev => {
      const isNewDay = prev.lastSubmissionDate !== todayDate;
      if (!isNewDay) return prev;

      let newStreak = prev.streak;
      if (prev.lastSubmissionDate) {
        const last = new Date(prev.lastSubmissionDate);
        const current = new Date(todayDate);
        const diffDays = Math.floor((current.getTime() - last.getTime()) / (1000 * 3600 * 24));
        
        if (diffDays === 1) {
          newStreak += 1;
        } else if (diffDays > 1) {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }

      return {
        ...prev,
        streak: newStreak,
        totalAttempted: prev.totalAttempted + 1,
        lastSubmissionDate: todayDate,
        history: [...prev.history, todayDate]
      };
    });
  };

  if (showSplash) {
    return <Splash />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0 h-screen transition-all duration-700 animate-in fade-in">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {activeTab === 'home' && (
            <Home 
              question={todayQuestion} 
              onSubmitting={handleSubmission} 
              existingSubmission={submissions.find(s => s.date === todayDate)}
              stats={userStats}
            />
          )}
          {activeTab === 'stats' && (
            <Analytics stats={userStats} />
          )}
          {activeTab === 'docs' && (
            <Documentation />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
