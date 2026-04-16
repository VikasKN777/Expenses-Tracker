import { Card } from './ui/Card';
import { formatCurrency } from '../lib/utils';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

interface SummaryCardsProps {
  balance: number;
  income: number;
  expenses: number;
}

export function SummaryCards({ balance, income, expenses }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 bg-black/5 w-24 h-24 rounded-full blur-2xl group-hover:bg-black/10 transition-all" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-black text-white rounded-xl">
              <Wallet className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Balance</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-light tracking-tight">{formatCurrency(balance)}</span>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-xs text-gray-500 font-medium">Safe to spend</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 text-green-600 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Income</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-light tracking-tight">{formatCurrency(income)}</span>
            <span className="text-xs text-green-600 font-medium mt-2">Keep growing it!</span>
          </div>
        </div>
      </Card>

      <Card className="relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-50 text-red-600 rounded-xl">
              <TrendingDown className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Expenses</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-light tracking-tight">{formatCurrency(expenses)}</span>
            <span className="text-xs text-red-600 font-medium mt-2">{((expenses / (income || 1)) * 100).toFixed(1)}% of income</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
