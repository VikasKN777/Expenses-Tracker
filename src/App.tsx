import { useState, useEffect, useMemo } from 'react';
import { Transaction, TransactionType } from './types';
import { SummaryCards } from './components/SummaryCards';
import { TransactionList } from './components/TransactionList';
import { TransactionForm } from './components/TransactionForm';
import { FinanceChart } from './components/FinanceChart';
import { Plus, LayoutDashboard, History, Sparkles } from 'lucide-react';
import { formatCurrency } from './lib/utils';
import { Card } from './components/ui/Card';

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('prosper_transactions');
    return saved ? JSON.parse(saved) : [];
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'history'>('dashboard');

  useEffect(() => {
    localStorage.setItem('prosper_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const { balance, income, expenses } = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      income: totalIncome,
      expenses: totalExpenses,
      balance: totalIncome - totalExpenses
    };
  }, [transactions]);

  const addTransaction = (data: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const smartTip = useMemo(() => {
    const expenseRatio = expenses / (income || 1);
    if (expenseRatio > 0.8) return "You're spending over 80% of your income. Consider looking into your 'Other' categories for savings.";
    if (expenseRatio < 0.3 && income > 0) return "Great job! You have a high savings rate. Have you considered an automated investment plan?";
    if (transactions.length < 3) return "Add more transactions to get personalized financial insights.";
    return "Your spending seems balanced. Track for another week to unlock deeper trend analysis.";
  }, [income, expenses, transactions.length]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-900 font-sans pb-24 md:pb-8">
      {/* Navigation - Top Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-bottom border-black/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div>
              <h1 className="font-bold tracking-tight text-lg">Prosper</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Finance Tracker</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-gray-100 p-1 rounded-2xl">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'dashboard' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'history' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <History className="w-4 h-4" />
              Transactions
            </button>
          </nav>

          <button
            onClick={() => setIsFormOpen(true)}
            className="md:flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all shadow-lg shadow-black/5 active:scale-95 whitespace-nowrap hidden"
          >
            <Plus className="w-4 h-4" />
            New Entry
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-light tracking-tight">Overview</h2>
            <p className="text-gray-500 text-sm mt-1">Managed balance: <span className="text-black font-semibold">{formatCurrency(balance)}</span></p>
          </div>
          
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none py-3 px-5 flex items-center gap-3 max-w-sm">
            <div className="p-2 bg-white/10 rounded-lg">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Smart Insights</p>
              <p className="text-xs font-medium leading-relaxed">{smartTip}</p>
            </div>
          </Card>
        </section>

        {/* Dashboard View */}
        {activeTab === 'dashboard' ? (
          <div className="space-y-8">
            <SummaryCards balance={balance} income={income} expenses={expenses} />
            <FinanceChart transactions={transactions} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Recent Transactions</h3>
                  <button onClick={() => setActiveTab('history')} className="text-sm font-medium text-gray-500 hover:text-black transition-colors">View All</button>
                </div>
                <TransactionList transactions={transactions.slice(0, 5)} onDelete={deleteTransaction} />
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Quick Access</h3>
                <Card className="p-0 overflow-hidden divide-y divide-gray-50">
                  <button 
                    onClick={() => setIsFormOpen(true)}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                        <Plus className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">Add Manual Entry</span>
                    </div>
                    <span className="text-xs text-gray-400">Ctrl + N</span>
                  </button>
                  <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group opacity-50 cursor-not-allowed">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                        <History className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">Export CSV</span>
                    </div>
                    <span className="text-xs text-gray-400">Pro</span>
                  </button>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          /* History View */
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-[24px] shadow-sm">
              <h3 className="font-semibold text-xl">All Transactions</h3>
              <div className="flex gap-2">
                <select className="px-4 py-2 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-black/5">
                  <option>All Types</option>
                  <option>Income</option>
                  <option>Expense</option>
                </select>
                <select className="px-4 py-2 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-black/5">
                  <option>Last 30 Days</option>
                  <option>Last 3 Months</option>
                  <option>Full Year</option>
                </select>
              </div>
            </div>
            <Card>
              <TransactionList transactions={transactions} onDelete={deleteTransaction} />
            </Card>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-md bg-black/90 backdrop-blur-lg rounded-[24px] p-2 flex justify-around items-center z-50 shadow-2xl">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${
            activeTab === 'dashboard' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Dash</span>
        </button>
        
        <button
          onClick={() => setIsFormOpen(true)}
          className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center -translate-y-4 shadow-xl active:scale-90 transition-transform"
        >
          <Plus className="w-8 h-8" />
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${
            activeTab === 'history' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
          }`}
        >
          <History className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Log</span>
        </button>
      </div>

      <TransactionForm 
        onAdd={addTransaction} 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </div>
  );
}
