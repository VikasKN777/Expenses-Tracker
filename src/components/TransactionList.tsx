import { Transaction } from '../types';
import { formatCurrency, formatDate, cn } from '../lib/utils';
import { ArrowUpRight, ArrowDownLeft, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export function TransactionList({ transactions, onDelete }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 italic">No transactions yet. Start by adding one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {transactions.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="group flex items-center justify-between p-4 bg-white rounded-2xl hover:shadow-md transition-all border border-transparent hover:border-black/5"
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "p-3 rounded-xl",
                t.type === 'income' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
              )}>
                {t.type === 'income' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{t.category}</h4>
                <p className="text-sm text-gray-500">{t.description || 'No description'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className={cn(
                  "font-semibold",
                  t.type === 'income' ? "text-green-600" : "text-gray-900"
                )}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </p>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-tight">
                  {formatDate(t.date)}
                </p>
              </div>
              <button
                onClick={() => onDelete(t.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
