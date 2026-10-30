import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Wallet, ArrowUpRight, ArrowDownLeft, Users, 
  Settings, LogOut, CheckCircle, AlertCircle, Copy, Lock, 
  Check, Play, Clock, Sparkles, Award, DollarSign, 
  Smartphone, UserCheck, RefreshCw, ChevronRight, Menu, X,
  Globe, Send, ExternalLink, HelpCircle
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [lang, setLang] = useState('EN');
  
  const [user, setUser] = useState({
    name: 'Rafiqul Islam',
    email: '1roxi1@gmail.com',
    depositWallet: 0,
    earningsWallet: 0,
    membership: 'No Active Package',
    activePackage: false,
    tasksCompletedToday: 0,
    dailyLimit: 0,
    referralCode: 'KODA9928X',
    isAdmin: true
  });

  const [tasks, setTasks] = useState([
    { id: 1, title: 'YouTube Video Watch & Subscribe', reward: 10, timer: 25, active: false, done: false },
    { id: 2, title: 'Facebook Page Follow & Like', reward: 8, timer: 20, active: false, done: false },
    { id: 3, title: 'Telegram Channel Join', reward: 5, timer: 15, active: false, done: false },
    { id: 4, title: 'App Download & Review', reward: 14, timer: 30, active: false, done: false },
    { id: 5, title: 'Website Visit & Read Article', reward: 12, timer: 25, active: false, done: false },
  ]);

  const [activeTimerTask, setActiveTimerTask] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let interval;
    if (activeTimerTask !== null && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && activeTimerTask !== null) {
      // Complete task
      setTasks(prev => prev.map(t => t.id === activeTimerTask ? { ...t, done: true, active: false } : t));
      setUser(prev => ({
        ...prev,
        earningsWallet: prev.earningsWallet + tasks.find(t => t.id === activeTimerTask).reward,
        tasksCompletedToday: prev.tasksCompletedToday + 1
      }));
      setActiveTimerTask(null);
    }
    return () => clearInterval(interval);
  }, [activeTimerTask, timeLeft]);

  const startTask = (task) => {
    if (!user.activePackage) {
      alert('Please activate a membership package first to perform tasks and earn rewards.');
      setActiveTab('memberships');
      return;
    }
    setActiveTimerTask(task.id);
    setTimeLeft(task.timer);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      <div>
        {/* Navbar */}
        <header className="border-b border-slate-800/80 bg-[#0B0F19]/90 sticky top-0 z-50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <span className="text-xl font-black tracking-wider text-white">KODA Task</span>
                <span className="block text-[10px] text-slate-400 font-medium">Membership-Based Task Platform</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-1">
              {[
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'tasks', label: 'Tasks' },
                { id: 'memberships', label: 'Memberships' },
                { id: 'deposit', label: 'Deposit' },
                { id: 'withdraw', label: 'Withdraw' },
                { id: 'referral', label: 'Referral' },
                { id: 'history', label: 'History' },
                ...(user.isAdmin ? [{ id: 'admin', label: 'Admin Panel', icon: Settings }] : [])
              ].map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                      isActive 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    {tab.icon && <Settings className="h-3.5 w-3.5 text-emerald-400" />}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setLang(lang === 'EN' ? 'বাংলা' : 'EN')}
                className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white"
              >
                {lang}
              </button>
              <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-200">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span>{user.name.split(' ')[0]}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Top 3 Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 flex items-center justify-between shadow-lg">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">Deposit Wallet</span>
                    <div className="text-2xl font-black text-emerald-400 mt-1">৳{user.depositWallet}</div>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Wallet className="h-6 w-6" />
                  </div>
                </div>

                <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 flex items-center justify-between shadow-lg">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">Earnings Wallet</span>
                    <div className="text-2xl font-black text-emerald-400 mt-1">৳{user.earningsWallet}</div>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <DollarSign className="h-6 w-6" />
                  </div>
                </div>

                <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 flex items-center justify-between shadow-lg">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">Active Package</span>
                    <div className="text-xl font-black text-amber-400 mt-1">{user.membership}</div>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Award className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {/* Available Tasks Section */}
              <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
                <div className="border-b border-slate-800/80 pb-4">
                  <h2 className="text-lg font-bold text-white">Available Tasks (Timer & Link Enabled)</h2>
                </div>

                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="bg-[#0B0F19] border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-bold text-white">{task.title}</h3>
                        <div className="flex items-center space-x-4 mt-2 text-xs">
                          <span className="text-slate-300 font-mono">Reward: ৳{task.reward}</span>
                          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>Timer: {activeTimerTask === task.id ? `${timeLeft}s remaining` : `${task.timer} Seconds`}</span>
                          </span>
                          <a href="#visit" onClick={(e) => { e.preventDefault(); window.alert(`Opening link for task: ${task.title}`); }} className="text-blue-400 hover:underline flex items-center space-x-1">
                            <span>Visit Link</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>

                      <div>
                        {task.done ? (
                          <span className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center space-x-1.5">
                            <Check className="h-4 w-4" />
                            <span>Completed</span>
                          </span>
                        ) : activeTimerTask === task.id ? (
                          <button disabled className="px-5 py-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold animate-pulse">
                            Running ({timeLeft}s)...
                          </button>
                        ) : (
                          <button 
                            onClick={() => startTask(task)}
                            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-lg shadow-blue-600/20"
                          >
                            Start Task
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TASKS TAB */}
          {activeTab === 'tasks' && (
            <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-white">All Micro Tasks</h2>
              <p className="text-xs text-slate-400">Complete tasks daily according to your active membership tier.</p>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="bg-[#0B0F19] border border-slate-800/80 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">{task.title}</h3>
                      <span className="text-xs text-slate-400 font-mono">Reward: ৳{task.reward} • Timer: {task.timer}s</span>
                    </div>
                    <button onClick={() => startTask(task)} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-500">
                      Start Task
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MEMBERSHIPS TAB */}
          {activeTab === 'memberships' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Membership Packages</h2>
                <p className="text-xs text-slate-400 mt-1">Upgrade your membership tier to unlock daily tasks and high-speed cashout queues.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Basic Starter', price: 500, tasks: '5 Daily Tasks', earnings: '৳250/day' },
                  { name: 'Standard Pro', price: 1200, tasks: '10 Daily Tasks', earnings: '৳600/day' },
                  { name: 'VIP Master Elite', price: 5000, tasks: '30 Daily Tasks', earnings: '৳2,000/day' }
                ].map((pkg, idx) => (
                  <div key={idx} className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                    <div>
                      <span className="text-xs font-mono text-emerald-400 uppercase">Popular Tier</span>
                      <h3 className="text-xl font-black text-white mt-1">{pkg.name}</h3>
                      <div className="text-3xl font-black text-emerald-400 my-4">৳{pkg.price}</div>
                      <ul className="space-y-2 text-xs text-slate-300 mb-6">
                        <li>✓ {pkg.tasks}</li>
                        <li>✓ Estimated {pkg.earnings}</li>
                        <li>✓ Instant Withdrawal Queue</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => {
                        setUser(prev => ({ ...prev, membership: pkg.name, activePackage: true, dailyLimit: 10 }));
                        alert(`Successfully activated ${pkg.name}!`);
                        setActiveTab('dashboard');
                      }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition"
                    >
                      Activate Package
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DEPOSIT TAB */}
          {activeTab === 'deposit' && (
            <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6 max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-white">Manual Deposit Verification</h2>
              <p className="text-xs text-slate-400">Send money to our bKash/Nagad personal number (01737966207) and submit your TrxID below.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">Select Provider</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['bKash', 'Nagad', 'Rocket'].map(m => (
                      <button key={m} className="py-2.5 bg-[#0B0F19] border border-slate-800 rounded-xl text-xs font-bold text-white hover:border-emerald-500">
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">Transaction ID (TrxID)</label>
                  <input type="text" placeholder="e.g. 9N87B6V543" className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl px-4 py-3 text-xs text-white uppercase font-mono" />
                </div>
                <button onClick={() => alert('Deposit verification submitted successfully!')} className="w-full py-3 bg-emerald-500 text-black font-bold text-xs uppercase rounded-xl">
                  Submit Deposit
                </button>
              </div>
            </div>
          )}

          {/* WITHDRAW TAB */}
          {activeTab === 'withdraw' && (
            <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6 max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-white">Wallet Cashout</h2>
              <p className="text-xs text-slate-400">Withdraw your earnings directly to your mobile banking account.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">Recipient Number</label>
                  <input type="text" placeholder="01700000000" className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl px-4 py-3 text-xs text-white font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">Amount (BDT)</label>
                  <input type="number" placeholder="Min ৳100" className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl px-4 py-3 text-xs text-white font-mono" />
                </div>
                <button onClick={() => alert('Cashout request submitted!')} className="w-full py-3 bg-blue-600 text-white font-bold text-xs uppercase rounded-xl">
                  Request Withdrawal
                </button>
              </div>
            </div>
          )}

          {/* REFERRAL TAB */}
          {activeTab === 'referral' && (
            <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-white">Referral Program & Rewards</h2>
              <p className="text-xs text-slate-400">Invite friends and earn bonuses when they activate membership packages.</p>
              <div className="bg-[#0B0F19] p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400">https://kodatask.bd/ref/{user.referralCode}</span>
                <button onClick={() => navigator.clipboard.writeText('https://kodatask.bd/ref/' + user.referralCode)} className="px-3 py-1.5 bg-slate-800 text-xs rounded-lg text-slate-200">
                  Copy Link
                </button>
              </div>
            </div>
          )}

          {/* HISTORY TAB */}
          {activeTab === 'history' && (
            <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-white">Transaction & Audit History</h2>
              <p className="text-xs text-slate-400">No recent deposits or withdrawals recorded.</p>
            </div>
          )}

          {/* ADMIN TAB */}
          {activeTab === 'admin' && user.isAdmin && (
            <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-white">Admin Control Panel (1roxi1@gmail.com)</h2>
              <p className="text-xs text-slate-400">Manage deposits, cashout approvals, and user packages.</p>
            </div>
          )}

        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#0B0F19] py-4 px-4 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white">KODA Task</span>
            <span>•</span>
            <span>Task-Based Earning Platform</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center space-x-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Personal Deposit Verification</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <a href="https://t.me/" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-400 hover:bg-blue-600/20 flex items-center space-x-1.5">
              <Send className="h-3.5 w-3.5" />
              <span>Telegram Support</span>
            </a>
            <span>© 2026 KODA Task</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
