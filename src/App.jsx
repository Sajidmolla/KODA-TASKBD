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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40 p-8 border border-slate-800/80 shadow-2xl overflow-hidden">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Welcome back, {user.name}!</h1>
              <p className="text-slate-400 mt-1 max-w-xl text-sm sm:text-base">Complete your daily micro-tasks or upgrade your membership tier to maximize your daily earnings.</p>
            </div>
          </div>
        )}

        {activeTab === 'deposit' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-extrabold text-white">Deposit Verification Gateway</h1>
            <p className="text-slate-400 text-sm">Transfer to our verified personal line and submit TrxID.</p>
          </div>
        )}

        {activeTab === 'cashout' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-extrabold text-white">Wallet Cashout Gateway</h1>
            <p className="text-slate-400 text-sm">Withdraw your earnings safely.</p>
          </div>
        )}

        {activeTab === 'referral' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-extrabold text-white">Referral Program & Rewards</h1>
            <p className="text-slate-400 text-sm">Invite friends and earn rewards.</p>
          </div>
        )}

        {activeTab === 'admin' && user.email === '1roxi1@gmail.com' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-extrabold text-white">Admin Control Panel</h1>
            <p className="text-slate-400 text-sm">Welcome Admin (1roxi1@gmail.com). Manage deposits and users here.</p>
          </div>
        )}
      </main>
    </div>
  );
}
