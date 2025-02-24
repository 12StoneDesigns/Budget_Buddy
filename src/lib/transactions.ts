export type TransactionType = 'income' | 'expense' | 'bill';
export type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Transaction {
  id: string;
  type: TransactionType;
  name: string;
  amount: number;
  frequency: Frequency;
  category?: string;
  date?: Date;
  startDate?: Date;
  endDate?: Date;
  isRecurring?: boolean;
}

export const DEFAULT_CATEGORIES = {
  expense: ['Housing', 'Food', 'Transport', 'Utilities', 'Entertainment', 'Other'],
  income: ['Salary', 'Freelance', 'Investment', 'Other'],
  bill: ['Rent', 'Utilities', 'Insurance', 'Subscription', 'Other']
};

export const calculateMonthlyAmount = (amount: number, frequency: Frequency): number => {
  switch (frequency) {
    case 'daily':
      return amount * 30;
    case 'weekly':
      return amount * 4.33;
    case 'monthly':
      return amount;
    case 'yearly':
      return amount / 12;
    default:
      return amount;
  }
};

export const calculateDisposableIncome = (transactions: Transaction[]): number => {
  const monthlyIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + calculateMonthlyAmount(t.amount, t.frequency), 0);

  const monthlyExpenses = transactions
    .filter(t => t.type === 'expense' || t.type === 'bill')
    .reduce((acc, t) => acc + calculateMonthlyAmount(t.amount, t.frequency), 0);

  return monthlyIncome - monthlyExpenses;
};