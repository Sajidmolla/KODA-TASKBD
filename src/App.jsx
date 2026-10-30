import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Wallet, ArrowUpRight, ArrowDownLeft, Users, 
  Settings, LogOut, CheckCircle, AlertCircle, Copy, Lock, 
  Check, Play, Clock, Sparkles, Award, DollarSign, 
  Smartphone, UserCheck, RefreshCw, ChevronRight, Menu, X 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState({
    name: 'Rafiqul Islam',
    email: '1roxi1@gmail.com',
    balance: 1450.00,
    membership: 'Standard Pro',
    activePackage: true,
    tasksCompletedToday: 7,
    dailyLimit: 10,
    referralCode: 'KODA9928X',
    referralCount: 4,
    isAdmin: true
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Deposit State
  const [depositMethod, setDepositMethod] = useState('bKash');
  const [depositTarget, setDepositTarget] = useState('Direct Balance');
  const [depositTrxId, setDepositTrxId] = useState('');
  const [depositHistory, setDepositHistory] = useState([]);
  const [depositSuccess, setDepositSuccess] = useState('');

  // Cashout State
  const [cashoutMethod, setCashoutMethod] = useState('bKash');
  const [cashoutPhone, setCashoutPhone] = useState('');
  const [cashoutAmount, setCashoutAmount] = useState('');
  const [cashoutHistory, setCashoutHistory] = useState([]);
  const [cashoutError, setCashoutError] = useState('');
  const [cashoutSuccess, setCashoutSuccess] = useState('');

  // Task Timer State
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [taskMessage, setTaskMessage] = useState('');

  useEffect(() => {
    let interval;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerRunning) {
      setTimerRunning(false);
      setUser(prev => ({
        ...prev,
        balance: prev.balance + 45,
        tasksCompletedToday: prev.tasksCompletedToday + 1
      }));
      setTaskMessage('Successfully completed task! +৳45 added to your wallet.');
      setTimeLeft(30);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    if (!depositTrxId.trim()) return;
    const newRecord = {
      trxId: depositTrxId,
      method: depositMethod,
      senderPhone: '017XXXXXXXX',
      amount: depositTarget.includes('৳') ? depositTarget.split('৳')[1].split(' ')[0] : '500',
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
    if (amt > user.balance) {
      setCashoutError('Insufficient available wallet balance.');
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
      adminNote: 'Queued for mobile banking disbursement'
    };

    setUser(prev => ({ ...prev, balance: prev.balance - amt }));
    setCashoutHistory([newRecord, ...cashoutHistory]);
    setCashoutAmount('');
    setCashoutError('');
    setCashoutSuccess('Cashout request submitted successfully!');
    setTimeout(() => setCashoutSuccess(''), 4000);
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-black">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0A0D14]/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Sparkles className="h-5 w-5 text-black" />
            </div>
            <div>
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">KODA TASK BD</span>
              <span className="block text-[10px] text-cyan-400 font-mono tracking-widest uppercase">Neon & Glassmorphism</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Wallet },
              { id: 'deposit', label: 'Deposit Gateway', icon: ArrowDownLeft },
              { id: 'cashout', label: 'Cashout', icon: ArrowUpRight },
              { id: 'referral', label: 'Referral Rewards', icon: Users },
              ...(user.email === '1roxi1@gmail.com' ? [{ id: 'admin', label: 'Admin Control', icon: Settings }] : [])
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-mono text-slate-300">৳{user.balance.toFixed(2)}</span>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0A0D14] border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Wallet },
              { id: 'deposit', label: 'Deposit Gateway', icon: ArrowDownLeft },
              { id: 'cashout', label: 'Cashout', icon: ArrowUpRight },
              { id: 'referral', label: 'Referral Rewards', icon: Users },
              ...(user.email === '1roxi1@gmail.com' ? [{ id: 'admin', label: 'Admin Control', icon: Settings }] : [])
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium ${
                    activeTab === tab.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-400'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40 p-8 border border-slate-800/80 shadow-2xl overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Verified Account • {user.membership}</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Welcome back, {user.name}!</h1>
                  <p className="text-slate-400 mt-1 max-w-xl text-sm sm:text-base">Complete your daily micro-tasks or upgrade your membership tier to maximize your daily earnings potential on KODA Task BD.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center min-w-[200px]">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">Wallet Balance</span>
                  <span className="text-3xl font-black text-cyan-400 mt-1">৳{user.balance.toFixed(2)}</span>
                  <button 
                    onClick={() => setActiveTab('cashout')}
                    className="mt-4 w-full py-2 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-lg shadow-cyan-500/20"
                  >
                    Withdraw Funds
                  </button>
                </div>
              </div>
            </div>

            {/* Task Section & Membership */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-cyan-400" />
                      <span>Daily Task Execution Panel</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Run active timer to verify micro-task completion.</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700">
                    Done: {user.tasksCompletedToday}/{user.dailyLimit}
                  </span>
                </div>

                {taskMessage && (
                  <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span>{taskMessage}</span>
                  </div>
                )}

                <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
                  <div className="relative mb-6">
                    <div className="w-36 h-36 rounded-full border-4 border-slate-800 flex items-center justify-center bg-slate-900/50 shadow-inner">
                      <span className="text-4xl font-black font-mono text-cyan-400">00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm mb-6">Click below to start the verification timer and collect your task reward.</p>

                  <button
                    disabled={timerRunning || user.tasksCompletedToday >= user.dailyLimit}
                    onClick={() => { setTaskMessage(''); setTimerRunning(true); }}
                    className={`px-8 py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wider transition shadow-lg ${
                      timerRunning || user.tasksCompletedToday >= user.dailyLimit
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-cyan-500/25 hover:brightness-110'
                    }`}
                  >
                    {timerRunning ? 'Verifying Task...' : user.tasksCompletedToday >= user.dailyLimit ? 'Daily Limit Reached' : 'Start Task Timer'}
                  </button>
                </div>
              </div>

              {/* Membership Status Card */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Active Membership</h3>
                  <p className="text-xs text-slate-400 mb-6">Your current tier unlocks specific task quotas and priority payout queues.</p>
                  
                  <div className="bg-gradient-to-br from-slate-950 to-blue-950/30 border border-cyan-500/30 rounded-2xl p-5 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono uppercase text-cyan-400">Tier Status</span>
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
                    </div>
                    <h4 className="text-xl font-black text-white">{user.membership}</h4>
                    <p className="text-xs text-slate-400 mt-2">Daily Quota: {user.dailyLimit} Tasks • Earn up to ৳450/day</p>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab('deposit')}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold uppercase tracking-wider border border-slate-700 transition"
                >
                  Upgrade Membership Tier
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DEPOSIT GATEWAY TAB */}
        {activeTab === 'deposit' && (
          <div className="space-y-8 animate-fadeIn">
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
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
                <h3 className="text-sm font-mono uppercase text-slate-400 mb-4">1. Select Financial Provider</h3>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {['bKash', 'Nagad', 'Rocket'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setDepositMethod(m)}
                      className={`py-3 px-4 rounded-2xl font-bold text-sm transition border ${
                        depositMethod === m 
                          ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30' 
                          : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {m}
                      <span className="block text-[10px] font-normal text-slate-300 mt-0.5">Personal</span>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 font-mono">Official {depositMethod} Personal Line:</span>
                    <span className="text-xs font-mono text-emerald-400 flex items-center space-x-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                      <span>Verified Active</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
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

                <div>
                  <h4 className="text-xs font-mono uppercase text-slate-400 mb-2">Instructions:</h4>
                  <ol className="text-xs text-slate-400 space-y-1.5 list-decimal pl-4">
                    <li>Open your {depositMethod} App and choose <strong className="text-slate-200">Send Money</strong>.</li>
                    <li>Send exact amount to <strong className="text-slate-200 font-mono">01737966207</strong>.</li>
                    <li>Copy the returned <strong className="text-slate-200 font-mono">Transaction ID (TrxID)</strong> and complete the verification form on the right.</li>
                  </ol>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
                <h3 className="text-sm font-mono uppercase text-slate-400 mb-4">2. Submit Transaction Reference</h3>
                
                <form onSubmit={handleDepositSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-2">Target Membership Tier (Optional)</label>
                    <select
                      value={depositTarget}
                      onChange={(e) => setDepositTarget(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
                    >
                      <option value="Direct Balance">Direct Balance</option>
                      <option value="Basic Starter — ৳500 (5 Daily Tasks)">Basic Starter — ৳500 (5 Daily Tasks)</option>
                      <option value="Standard Pro — ৳1200 (10 Daily Tasks)">Standard Pro — ৳1200 (10 Daily Tasks)</option>
                      <option value="Premium Booster — ৳2500 (18 Daily Tasks)">Premium Booster — ৳2500 (18 Daily Tasks)</option>
                      <option value="VIP Master Elite — ৳5000 (30 Daily Tasks)">VIP Master Elite — ৳5000 (30 Daily Tasks)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-2">Transaction ID (TrxID) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 9N87B6V543"
                      value={depositTrxId}
                      onChange={(e) => setDepositTrxId(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 font-mono uppercase"
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

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-6">Deposit Audit Log</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500 uppercase">
                      <th className="pb-3 font-medium">TrxID</th>
                      <th className="pb-3 font-medium">Method</th>
                      <th className="pb-3 font-medium">Sender Phone</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Package Target</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Admin Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {depositHistory.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="py-8 text-center text-slate-500">No deposits recorded yet.</td>
                      </tr>
                    ) : (
                      depositHistory.map((item, idx) => (
                        <tr key={idx}>
                          <td className="py-4 text-cyan-400 font-bold">{item.trxId}</td>
                          <td className="py-4">{item.method}</td>
                          <td className="py-4">{item.senderPhone}</td>
                          <td className="py-4">৳{item.amount}</td>
                          <td className="py-4">{item.packageTarget}</td>
                          <td className="py-4">
                            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              {item.status}
                            </span>
                          </td>
                          <td className="py-4 text-slate-500">{item.adminNote}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CASHOUT GATEWAY TAB */}
        {activeTab === 'cashout' && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">Mobile Banking Disbursement • bKash / Nagad / Rocket • Zero Unjustified Holds</span>
              <h1 className="text-3xl font-extrabold text-white mt-1">Wallet Cashout Gateway</h1>
              <p className="text-slate-400 text-sm mt-1">Transfer earnings directly to your personal mobile banking account. Requests are audited and settled with verifiable reference IDs.</p>
            </div>

            {!user.activePackage && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span><strong>Notice:</strong> You must have an active membership package to withdraw referral/earnings rewards.</span>
                </div>
                <button 
                  onClick={() => setActiveTab('deposit')}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition"
                >
                  Buy Package
                </button>
              </div>
            )}

            {cashoutSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <span>{cashoutSuccess}</span>
              </div>
            )}

            {cashoutError && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>{cashoutError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 mb-6 flex items-center justify-between">
                  <span className="text-xs uppercase font-mono text-slate-400">Available Wallet Balance</span>
                  <span className="text-3xl font-black font-mono text-cyan-400">৳{user.balance.toFixed(2)}</span>
                </div>

                <form onSubmit={handleCashoutSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-3">Payout Provider</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['bKash', 'Nagad', 'Rocket'].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setCashoutMethod(m)}
                          className={`py-3 rounded-2xl font-bold text-sm transition border ${
                            cashoutMethod === m 
                              ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30' 
                              : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-2">Personal Recipient Mobile Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="01700000000"
                      value={cashoutPhone}
                      onChange={(e) => setCashoutPhone(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
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
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 space-y-2 font-mono text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Requested Gross:</span>
                      <span className="text-white">৳{cashoutAmount ? parseFloat(cashoutAmount).toFixed(2) : '0.00'}</span>
                    </div>
                    <div className="flex justify-between text-rose-400">
                      <span>Processing Fee (0%):</span>
                      <span>-৳0.00</span>
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold">
                      <span className="text-slate-300">Net Receivable:</span>
                      <span className="text-cyan-400">৳{cashoutAmount ? parseFloat(cashoutAmount).toFixed(2) : '0.00'}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                    <span>Submit Cashout Request</span>
                  </button>
                </form>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-mono uppercase text-cyan-400 mb-4 flex items-center space-x-2">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Withdrawal Terms</span>
                  </h3>
                  
                  <div className="space-y-4 text-xs text-slate-400">
                    <div>
                      <strong className="block text-slate-200 mb-1">Threshold Policy</strong>
                      <p>Minimum withdrawal is ৳100. Requests below this threshold cannot be processed.</p>
                    </div>
                    <div>
                      <strong className="block text-slate-200 mb-1">Escrow & Refund Safety</strong>
                      <p>Funds are held safely in escrow during verification. In the rare event of rejection, funds return immediately to your balance.</p>
                    </div>
                    <div>
                      <strong className="block text-slate-200 mb-1">Reference ID Tracking</strong>
                      <p>Every payout is logged with a verifiable TrxID accessible in your audit log below.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-6">Withdrawal Audit Log</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500 uppercase">
                      <th className="pb-3 font-medium">Gross</th>
                      <th className="pb-3 font-medium">Net Disbursed</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Payout TrxID</th>
                      <th className="pb-3 font-medium">Admin Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {cashoutHistory.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-slate-500">No withdrawal requests logged yet.</td>
                      </tr>
                    ) : (
                      cashoutHistory.map((item, idx) => (
                        <tr key={idx}>
                          <td className="py-4 text-white">৳{item.gross.toFixed(2)}</td>
                          <td className="py-4 text-cyan-400 font-bold">৳{item.netDisbursed.toFixed(2)}</td>
                          <td className="py-4">
                            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              {item.status}
                            </span>
                          </td>
                          <td className="py-4 text-slate-400">{item.payoutTrxId}</td>
                          <td className="py-4 text-slate-500">{item.adminNote}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* REFERRAL REWARDS TAB */}
        {activeTab === 'referral' && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h1 className="text-3xl font-extrabold text-white">Referral Program & Rewards</h1>
              <p className="text-slate-400 text-sm mt-1">Invite friends and earn rewards when they activate their memberships.</p>
            </div>

            {!user.activePackage ? (
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-10 backdrop-blur-xl text-center">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 text-amber-400">
                  <Lock className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-black text-white">Referral Program Locked</h2>
                <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2 mb-6">The referral system and unique referral link are unlocked exclusively for members who have purchased and activated a membership package.</p>
                <button
                  onClick={() => setActiveTab('deposit')}
                  className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-lg shadow-amber-500/20"
                >
                  Unlock Referral by Purchasing Membership Now &gt;
                </button>
              </div>
            ) : (
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
                <div>
                  <h3 className="text-sm font-mono uppercase text-cyan-400 mb-2">Your Unique Referral Link</h3>
                  <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <span className="text-sm font-mono text-white">https://kodatask.bd/ref/{user.referralCode}</span>
                    <button 
                      onClick={() => navigator.clipboard.writeText(`https://kodatask.bd/ref/${user.referralCode}`)}
                      className="px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono flex items-center space-x-2 hover:bg-cyan-500/20"
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy Link</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Milestone Rewards Structure</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { invites: '10 Invites', reward: '৳500 Cash Bonus' },
                      { invites: '20 Invites', reward: '৳1,500 Cash Bonus' },
                      { invites: '50 Invites', reward: '৳3,000 Cash Bonus' }
                    ].map((m, idx) => (
                      <div key={idx} className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl">
                        <span className="text-xs font-mono text-cyan-400">{m.invites}</span>
                        <h4 className="text-lg font-bold text-white mt-1">Reward: {m.reward}</h4>
                        <span className="block text-[10px] text-slate-500 mt-2">(Must have active membership)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ADMIN CONTROL TAB */}
        {activeTab === 'admin' && user.email === '1roxi1@gmail.com' && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <span className="text-xs font-mono text-rose-400 tracking-wider uppercase">Restricted Administrator Portal • Authorized: 1roxi1@gmail.com</span>
              <h1 className="text-3xl font-extrabold text-white mt-1">Admin Control Panel</h1>
              <p className="text-slate-400 text-sm mt-1">Review pending deposit transactions, audit cashout queues, and manage platform users.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl">
                <span className="text-xs font-mono text-slate-400 uppercase">Total System Deposits</span>
                <h3 className="text-3xl font-black text-cyan-400 mt-2">৳48,500</h3>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl">
                <span className="text-xs font-mono text-slate-400 uppercase">Pending Cashout Requests</span>
                <h3 className="text-3xl font-black text-amber-400 mt-2">12 Queued</h3>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl">
                <span className="text-xs font-mono text-slate-400 uppercase">Active Platform Users</span>
                <h3 className="text-3xl font-black text-emerald-400 mt-2">1,284 Members</h3>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-6">Pending Deposit Verification Queue</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500 uppercase">
                      <th className="pb-3 font-medium">TrxID</th>
                      <th className="pb-3 font-medium">Method</th>
                      <th className="pb-3 font-medium">Package</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="py-4 text-cyan-400 font-bold">9N87B6V543</td>
                      <td className="py-4">bKash</td>
                      <td className="py-4">Standard Pro — ৳1200</td>
                      <td className="py-4 space-x-2">
                        <button className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold hover:bg-emerald-500/20">Approve</button>
                        <button className="px-3 py-1 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold hover:bg-rose-500/20">Reject</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
