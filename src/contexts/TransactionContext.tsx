import { createContext, useContext, useState, ReactNode } from 'react';
import { Transaction, calculateDisposableIncome, calculateMonthlyAmount } from '../lib/transactions';

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  importTransactions: (transactions: Transaction[]) => void;
  monthlyIncome: number;
  monthlyExpenses: number;
  disposableIncome: number;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  const removeTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateTransaction = (id: string, updatedFields: Partial<Transaction>) => {
    setTransactions(prev => prev.map(t => 
      t.id === id ? { ...t, ...updatedFields } : t
    ));
  };

  const importTransactions = (newTransactions: Transaction[]) => {
    setTransactions(newTransactions);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    document.documentElement.classList.toggle('dark');
  };

  const monthlyIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + calculateMonthlyAmount(t.amount, t.frequency), 0);

  const monthlyExpenses = transactions
    .filter(t => t.type === 'expense' || t.type === 'bill')
    .reduce((acc, t) => acc + calculateMonthlyAmount(t.amount, t.frequency), 0);

  const disposableIncome = calculateDisposableIncome(transactions);

  return (
    <TransactionContext.Provider value={{
      transactions,
      addTransaction,
      removeTransaction,
      updateTransaction,
      importTransactions,
      monthlyIncome,
      monthlyExpenses,
      disposableIncome,
      isDarkMode,
      toggleDarkMode,
    }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};
