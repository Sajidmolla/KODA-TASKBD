import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Wallet, ArrowUpRight, ArrowDownLeft, Users, 
  Settings, LogOut, CheckCircle, AlertCircle, Copy, Lock, 
  Check, Play, Clock, Sparkles, Award, DollarSign, 
  Smartphone, UserCheck, RefreshCw, ChevronRight, Menu, X,
  Globe, Send, ExternalLink, HelpCircle, User, BarChart2, Package, Layers, CreditCard
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminSubTab, setAdminSubTab] = useState('overview');
  const [lang, setLang] = useState('EN');
  
  const [user, setUser] = useState({
    name: 'Rafiqul Islam',
    email: '1roxi1@gmail.com',
    mobile: 'N/A',
    depositWallet: 0,
    earningsWallet: 0,
    membership: 'No Active Package',
    activePackage: false,
    tasksCompletedToday: 0,
    dailyLimit: 0,
    referralCode: 'KODA9928X',
    isAdmin: true
  });

  const [profileNameInput, setProfileNameInput] = useState(user.name);

  const [tasks, setTasks] = useState([
    { id: 1, title: 'YouTube Video Watch & Subscribe', reward: 10, timer: 25, active: false, done: false },
    { id: 2, title: 'Facebook Page Follow & Like', reward: 8, timer: 20, active: false, done: false },
    { id: 3, title: 'Telegram Channel Join', reward: 5, timer: 15, active: false, done: false },
    { id: 4, title: 'App Download & Review', reward: 14, timer: 30, active: false, done: false },
    { id: 5, title: 'Website Visit & Read Article', reward: 12, timer: 25, active: false, done: false },
  ]);

  const [activeTimerTask, setActiveTimerTask] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const [depositMethod, setDepositMethod] = useState('bKash');
  const [depositTarget, setDepositTarget] = useState('Direct Balance');
  const [senderPhone, setSenderPhone] = useState('');
  const [depositAmount, setDepositAmount] = useState('500');
  const [depositTrxId, setDepositTrxId] = useState('');
  const [depositHistory, setDepositHistory] = useState([]);
  const [depositSuccess, setDepositSuccess] = useState('');

  const [cashoutMethod, setCashoutMethod] = useState('bKash');
  const [cashoutPhone, setCashoutPhone] = useState('');
  const [cashoutAmount, setCashoutAmount] = useState('');
  const [cashoutHistory, setCashoutHistory] = useState([]);
  const [cashoutError, setCashoutError] = useState('');
  const [cashoutSuccess, setCashoutSuccess] = useState('');

  useEffect(() => {
    let interval;
    if (activeTimerTask !== null && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && activeTimerTask !== null) {
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

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    if (!depositTrxId.trim()) return;
    const newRecord = {
      trxId: depositTrxId,
      method: depositMethod,
      senderPhone: senderPhone || '017XXXXXXXX',
      amount: depositAmount,
      packageTarget: depositTarget,
      status: 'Pending Verification',
      adminNote: 'Awaiting manual audit'
    };
    setDepositHistory([newRecord, ...depositHistory]);
    setDepositTrxId('');
    setDepositSuccess('Deposit verification reference submitted successfully!');
    setTimeout(() => setDepositSuccess(''), 4000);
  };

  const handleCashoutSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(cashoutAmount);
    if (!amt || amt < 100 || amt > 25000) {
      setCashoutError('Minimum cashout is ৳100 and Maximum is ৳25,000.');
      return;
    }
    if (amt > user.earningsWallet) {
      setCashoutError('Insufficient earnings wallet balance.');
      return;
    }
    if (!user.activePackage) {
      setCashoutError('You must have an active membership package to withdraw funds.');
      return;
    }

    const newRecord = {
      gross: amt,
      netDisbursed: amt * 0.98,
      status: 'Processing',
      payoutTrxId: 'Pending',
      adminNote: 'Queued for mobile disbursement'
    };

    setUser(prev => ({ ...prev, earningsWallet: prev.earningsWallet - amt }));
    setCashoutHistory([newRecord, ...cashoutHistory]);
    setCashoutAmount('');
    setCashoutError('');
    setCashoutSuccess('Cashout request submitted successfully!');
    setTimeout(() => setCashoutSuccess(''), 4000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      <div>
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
              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex items-center space-x-2 px-3 py-1 rounded-full border text-xs transition ${
                  activeTab === 'profile' ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700'
                }`}
              >
                <User className="h-3.5 w-3.5 text-indigo-400" />
                <span>Admin</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
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

          {activeTab === 'memberships' && (
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h2 className="text-3xl font-black text-white">Select Membership Plan</h2>
                <p className="text-xs text-slate-400">Choose a tier that fits your daily availability. Upgrades take effect immediately and quota resets every 24 hours.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'Basic Starter', desc: 'Perfect for beginners looking to earn daily pocket money with easy micro-tasks.', price: 500, days: 30, limit: '5 Tasks', potential: '৳100', tasksList: ['5 Daily AI & Ad Tasks', '৳100 Daily Guaranteed Potential', '30 Days Validity', 'Instant bKash/Nagad Payout', 'Standard Support'] },
                  { name: 'Standard Pro', desc: 'Most popular membership plan with enhanced daily income and high-tier tasks.', price: 1200, days: 30, limit: '10 Tasks', potential: '৳450', tasksList: ['10 Daily AI & Ad Tasks', '৳450 Daily Potential (৳13,500/mo)', '30 Days Validity', 'Priority Withdrawal Queue', 'Dedicated Telegram Support'] },
                  { name: 'Premium Booster', desc: 'Advanced package for serious earners offering high payout AI tasks and extended validity.', price: 2500, days: 45, limit: '18 Tasks', potential: '৳950', tasksList: ['18 Daily Premium Tasks', '৳950 Daily Potential (৳42,750 total)', 'Extended 45 Days Validity', 'VIP Fast Cashouts', 'Exclusive High-Reward AI tasks'] },
                  { name: 'VIP Master Elite', desc: 'Ultimate membership with maximum daily task limits, highest rewards and instant...', price: 5000, days: 60, limit: '30 Tasks', potential: '৳1700', tasksList: ['30 Daily High-Reward Tasks', '৳1700 Daily Potential (৳102,000 total)', '60 Days Long Validity', 'Instant Automated Cashouts', 'Personal Account Manager'] }
                ].map((pkg, idx) => (
                  <div key={idx} className="bg-[#111827] border border-slate-800/80 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-black text-white">{pkg.name}</h3>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{pkg.desc}</p>
                      </div>

                      <div>
                        <div className="text-3xl font-black text-amber-400 font-mono">৳{pkg.price} <span className="text-xs text-slate-400 font-normal">/ {pkg.days} Days</span></div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 bg-[#0B0F19] p-3 rounded-xl border border-slate-800/80 text-center font-mono">
                        <div>
                          <span className="block text-[9px] text-slate-500 uppercase">Daily Limit</span>
                          <span className="text-xs font-bold text-white">{pkg.limit}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] text-slate-500 uppercase">Daily Potential</span>
                          <span className="text-xs font-bold text-emerald-400">{pkg.potential}</span>
                        </div>
                      </div>

                      <ul className="space-y-2 text-xs text-slate-300">
                        {pkg.tasksList.map((t, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      onClick={() => {
                        setUser(prev => ({ ...prev, membership: pkg.name, activePackage: true, dailyLimit: 10 }));
                        alert(`Successfully activated ${pkg.name}!`);
                        setActiveTab('dashboard');
                      }}
                      className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-lg shadow-amber-500/20"
                    >
                      Deposit ৳{pkg.price} to Activate &gt;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'deposit' && (
            <div className="space-y-8">
              <div>
                <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">Manual Gateway • Personal Account Verification • Deduplication Indexed</span>
                <h1 className="text-3xl font-extrabold text-white mt-1">Deposit Verification Gateway</h1>
                <p className="text-slate-400 text-sm mt-1">Transfer to our verified personal line, submit your Transaction ID (TrxID), and balance or package will be credited automatically.</p>
              </div>

              {depositSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <span>{depositSuccess}</span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#111827] border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl">
                  <h3 className="text-sm font-mono uppercase text-slate-400 mb-4">1. Select Financial Provider</h3>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {['bKash', 'Nagad', 'Rocket'].map((m) => (
                      <button
                        key={m}
                        onClick={() => setDepositMethod(m)}
                        className={`py-3 px-4 rounded-2xl font-bold text-sm transition border ${
                          depositMethod === m 
                            ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30' 
                            : 'bg-[#0B0F19] text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {m}
                        <span className="block text-[10px] font-normal text-slate-300 mt-0.5">Personal</span>
                      </button>
                    ))}
                  </div>

                  <div className="bg-[#0B0F19] border border-slate-800/80 rounded-2xl p-5 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400 font-mono">Official {depositMethod} Personal Line:</span>
                      <span className="text-xs font-mono text-emerald-400 flex items-center space-x-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                        <span>Verified Active</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-[#111827] p-3 rounded-xl border border-slate-800">
                      <span className="text-lg font-mono font-bold text-white tracking-widest">01737966207</span>
                      <button 
                        onClick={() => navigator.clipboard.writeText('01737966207')}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center space-x-1 border border-slate-700"
                      >
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#111827] border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl">
                  <h3 className="text-sm font-mono uppercase text-slate-400 mb-4">2. Submit Transaction Reference</h3>
                  
                  <form onSubmit={handleDepositSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-2">Target Membership Tier (Optional)</label>
                      <select
                        value={depositTarget}
                        onChange={(e) => setDepositTarget(e.target.value)}
                        className="w-full bg-[#0B0F19] border border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
                      >
                        <option value="Direct Balance">Direct Balance</option>
                        <option value="Basic Starter — ৳500 (5 Daily Tasks)">Basic Starter — ৳500 (5 Daily Tasks)</option>
                        <option value="Standard Pro — ৳1200 (10 Daily Tasks)">Standard Pro — ৳1200 (10 Daily Tasks)</option>
                        <option value="Premium Booster — ৳2500 (18 Daily Tasks)">Premium Booster — ৳2500 (18 Daily Tasks)</option>
                        <option value="VIP Master Elite — ৳5000 (30 Daily Tasks)">VIP Master Elite — ৳5000 (30 Daily Tasks)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-2">Sender Mobile Number *</label>
                      <input
                        type="text"
                        required
                        placeholder="01700000000"
                        value={senderPhone}
                        onChange={(e) => setSenderPhone(e.target.value)}
                        className="w-full bg-[#0B0F19] border border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-200 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-2">Deposit Amount (BDT) *</label>
                      <input
                        type="number"
                        required
                        placeholder="500"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        className="w-full bg-[#0B0F19] border border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-200 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-2">Transaction ID (TrxID) *</label>
                      <input
                        type="text"
                        required
                        placeholder="SADFDF"
                        value={depositTrxId}
                        onChange={(e) => setDepositTrxId(e.target.value)}
                        className="w-full bg-[#0B0F19] border border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-200 uppercase font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2"
                    >
                      <ShieldCheck className="h-4 w-4" />
                      <span>Submit Deposit Reference</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'withdraw' && (
            <div className="space-y-8 max-w-3xl mx-auto">
              <div>
                <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">Mobile Banking Disbursement • bKash / Nagad / Rocket</span>
                <h1 className="text-3xl font-extrabold text-white mt-1">Wallet Cashout Gateway</h1>
                <p className="text-slate-400 text-sm mt-1">Transfer earnings directly to your personal mobile banking account.</p>
              </div>

              <div className="bg-[#111827] border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="bg-[#0B0F19] border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between">
                  <span className="text-xs uppercase font-mono text-slate-400">Available Wallet Balance</span>
                  <span className="text-3xl font-black font-mono text-cyan-400">৳{user.earningsWallet.toFixed(2)}</span>
                </div>

                <form onSubmit={handleCashoutSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-2">Personal Recipient Mobile Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="01700000000"
                      value={cashoutPhone}
                      onChange={(e) => setCashoutPhone(e.target.value)}
                      className="w-full bg-[#0B0F19] border border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-200 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-2">Cashout Amount (BDT) *</label>
                    <input
                      type="number"
                      required
                      placeholder="Min ৳100, Max ৳25000"
                      value={cashoutAmount}
                      onChange={(e) => setCashoutAmount(e.target.value)}
                      className="w-full bg-[#0B0F19] border border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-200 font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-lg shadow-cyan-500/20"
                  >
                    Submit Cashout Request
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'referral' && (
            <div className="space-y-8 max-w-3xl mx-auto">
              <div>
                <h1 className="text-3xl font-extrabold text-white">Referral Program & Rewards</h1>
                <p className="text-slate-400 text-sm mt-1">Invite friends and earn rewards when they activate memberships.</p>
              </div>

              <div className="bg-[#111827] border border-slate-800/80 rounded-3xl p-12 shadow-xl text-center space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                  <Lock className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Referral Program Locked</h2>
                  <p className="text-slate-400 text-xs max-w-md mx-auto mt-2">The referral system is unlocked exclusively for members who have purchased and activated a membership package.</p>
                </div>
                <button
                  onClick={() => setActiveTab('memberships')}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition"
                >
                  Unlock Referral by Purchasing Membership Now &gt;
                </button>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-white">Transaction & Audit History</h2>
              <p className="text-xs text-slate-400">No recent deposits or withdrawals recorded.</p>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400">
                  <User className="h-6 w-6" />
                </div>
                <h1 className="text-2xl font-extrabold text-white">User Profile Settings</h1>
              </div>

              <div className="bg-[#111827] border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">Full Name (Editable)</label>
                  <input
                    type="text"
                    value={profileNameInput}
                    onChange={(e) => setProfileNameInput(e.target.value)}
                    className="w-full bg-[#0B0F19] border border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">Email Address (Locked & Unchangeable)</label>
                  <input
                    type="text"
                    disabled
                    value={user.email}
                    className="w-full bg-[#0B0F19]/60 border border-slate-800/80 rounded-2xl px-4 py-3 text-xs text-slate-400 font-mono cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">Mobile Number (Locked & Unchangeable)</label>
                  <input
                    type="text"
                    disabled
                    value={user.mobile}
                    className="w-full bg-[#0B0F19]/60 border border-slate-800/80 rounded-2xl px-4 py-3 text-xs text-slate-400 font-mono cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">Unique Referral Code</label>
                  <input
                    type="text"
                    disabled
                    value={user.referralCode}
                    className="w-full bg-[#0B0F19]/60 border border-slate-800/80 rounded-2xl px-4 py-3 text-xs text-cyan-400 font-mono cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">Active Membership Package</label>
                  <input
                    type="text"
                    disabled
                    value={user.membership}
                    className="w-full bg-[#0B0F19]/60 border border-slate-800/80 rounded-2xl px-4 py-3 text-xs text-amber-400 font-mono font-bold cursor-not-allowed"
                  />
                </div>

                <button
                  onClick={() => {
                    setUser(prev => ({ ...prev, name: profileNameInput }));
                    alert('Profile name updated successfully!');
                  }}
                  className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-blue-600/20"
                >
                  Save Profile Name
                </button>

                <button
                  onClick={() => alert('Logged out successfully (Demo)')}
                  className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-rose-600/20 flex items-center justify-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout Account</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'admin' && user.isAdmin && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-white">Admin Control Panel</h1>
              </div>

              <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-2 flex flex-wrap items-center gap-2">
                {[
                  { id: 'overview', label: 'Overview', icon: BarChart2 },
                  { id: 'finance', label: 'Finance', badge: '6', icon: DollarSign },
                  { id: 'packages', label: 'Packages', icon: Package },
                  { id: 'tasks', label: 'Tasks', icon: Layers },
                  { id: 'users', label: 'Users', icon: Users },
                  { id: 'gateways', label: 'Gateways', icon: CreditCard }
                ].map((sub) => {
                  const Icon = sub.icon;
                  const isActive = adminSubTab === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setAdminSubTab(sub.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                        isActive 
                          ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-lg' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                      <span>{sub.label}</span>
                      {sub.badge && (
                        <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-black">
                          {sub.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {adminSubTab === 'overview' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-2">
                    <span className="text-xs text-slate-400 font-medium">New Registered Users (Total)</span>
                    <div className="text-3xl font-black text-emerald-400 font-mono">0</div>
                  </div>

                  <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-2">
                    <span className="text-xs text-slate-400 font-medium">Pending Deposit Requests</span>
                    <div className="text-3xl font-black text-amber-400 font-mono">3</div>
                  </div>

                  <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-2">
                    <span className="text-xs text-slate-400 font-medium">Pending Withdrawal Requests</span>
                    <div className="text-3xl font-black text-amber-400 font-mono">3</div>
                  </div>

                  <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-2">
                    <span className="text-xs text-slate-400 font-medium">Active Task Synthesizer</span>
                    <div className="text-3xl font-black text-indigo-400 font-mono">5 Tasks</div>
                  </div>
                </div>
              )}

              {adminSubTab !== 'overview' && (
                <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-8 text-center text-slate-400 text-sm">
                  Management panel for <strong className="text-white capitalize">{adminSubTab}</strong> is ready for action.
                </div>
              )}
            </div>
          )}

        </main>
      </div>

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
