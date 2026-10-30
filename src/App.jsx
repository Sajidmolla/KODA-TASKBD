import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Wallet, ArrowUpRight, ArrowDownLeft, Users, 
  Settings, LogOut, CheckCircle, AlertCircle, Copy, Lock, 
  Check, Play, Clock, Sparkles, Award, DollarSign, 
  Smartphone, UserCheck, RefreshCw, ChevronRight, Menu, X,
  Globe, Send, ExternalLink, HelpCircle, User, BarChart2, Package, Layers, CreditCard
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('admin');
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
    referralCode: 'N/A',
    isAdmin: true
  });

  const [profileNameInput, setProfileNameInput] = useState(user.name);

  // Tasks state
  const [tasks, setTasks] = useState([
    { id: 1, title: 'YouTube Video Watch & Subscribe', reward: 10, timer: 25, active: false, done: false },
    { id: 2, title: 'Facebook Page Follow & Like', reward: 8, timer: 20, active: false, done: false },
    { id: 3, title: 'Telegram Channel Join', reward: 5, timer: 15, active: false, done: false },
    { id: 4, title: 'App Download & Review', reward: 14, timer: 30, active: false, done: false },
    { id: 5, title: 'Website Visit & Read Article', reward: 12, timer: 25, active: false, done: false },
  ]);

  const [activeTimerTask, setActiveTimerTask] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  // Deposit State
  const [depositMethod, setDepositMethod] = useState('bKash');
  const [depositTarget, setDepositTarget] = useState('Direct Balance');
  const [senderPhone, setSenderPhone] = useState('');
  const [depositAmount, setDepositAmount] = useState('500');
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
                        ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    {tab.icon && <Settings className="h-3.5 w-3.5 text-indigo-400" />}
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

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          
          {/* ADMIN CONTROL PANEL TAB (matches screenshot image_4c2a6a.png) */}
          {activeTab === 'admin' && user.isAdmin && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-white">Admin Control Panel</h1>
              </div>

              {/* Admin Sub-navbar */}
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

              {/* Admin Overview Cards */}
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

          {/* DASHBOARD TAB */}
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
            </div>
          )}

          {/* OTHER TABS AS FALLBACK */}
          {activeTab === 'tasks' && (
            <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-white">All Micro Tasks</h2>
            </div>
          )}

          {activeTab === 'memberships' && (
            <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-white">Membership Plans</h2>
            </div>
          )}

          {activeTab === 'deposit' && (
            <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-white">Deposit Gateway</h2>
            </div>
          )}

          {activeTab === 'withdraw' && (
            <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-white">Wallet Cashout</h2>
            </div>
          )}

          {activeTab === 'referral' && (
            <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-white">Referral Program</h2>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-white">Audit History</h2>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6 max-w-xl mx-auto">
              <h2 className="text-xl font-bold text-white">User Profile Settings</h2>
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
