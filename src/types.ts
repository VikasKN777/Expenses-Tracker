export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string; // ISO string
  type: TransactionType;
}

export interface Budget {
  category: string;
  limit: number;
  spent: number;
}

export type TimeFilter = 'all' | 'month' | 'week' | 'year';

export interface FinanceState {
  transactions: Transaction[];
  budgets: Budget[];
}

export const CATEGORIES = {
  expense: [
    'Food & Dining',
    'Transportation',
    'Housing',
    'Entertainment',
    'Health',
    'Shopping',
    'Utilities',
    'Other',
  ],
  income: [
    'Salary',
    'Investment',
    'Freelance',
    'Gift',
    'Other',
  ],
};
