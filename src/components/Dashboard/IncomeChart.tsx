/**
 * @file IncomeChart.tsx
 * @author T. Landon Love
 * @copyright (c) 2025 12Stone Designs (12stonedesigns.com)
 */

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTransactions } from '../../contexts/TransactionContext';
import { calculateMonthlyAmount } from '../../lib/transactions';

export const IncomeChart = () => {
  const { transactions } = useTransactions();
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  
  const monthlyData = months.map((month, index) => {
    const monthIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + calculateMonthlyAmount(t.amount, t.frequency), 0);

    const monthExpenses = transactions
      .filter(t => t.type === 'expense' || t.type === 'bill')
      .reduce((acc, t) => acc + calculateMonthlyAmount(t.amount, t.frequency), 0);

    return {
      name: month,
      income: monthIncome,
      expenses: monthExpenses,
    };
  });

  const emptyData = months.map(month => ({
    name: month,
    income: 0,
    expenses: 0,
  }));

  const data = transactions.length > 0 ? monthlyData : emptyData;

  return (
    <div className="h-[300px] w-full p-4">
      <h3 className="text-lg font-semibold mb-4 text-primary animate-neon">Income vs Expenses</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.2)" />
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--primary))"
            tick={{ fill: 'hsl(var(--primary))' }}
          />
          <YAxis 
            stroke="hsl(var(--primary))"
            tick={{ fill: 'hsl(var(--primary))' }}
          />
          <Tooltip 
            formatter={(value: number) => `$${value.toFixed(2)}`}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              borderColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary))',
            }}
          />
          <Line 
            type="monotone" 
            dataKey="income" 
            stroke="#00F3FF" 
            strokeWidth={2}
            name="Income"
            dot={{ fill: '#00F3FF', strokeWidth: 2 }}
            activeDot={{ r: 8, className: 'animate-neon' }}
          />
          <Line 
            type="monotone" 
            dataKey="expenses" 
            stroke="#FF00E5" 
            strokeWidth={2}
            name="Expenses"
            dot={{ fill: '#FF00E5', strokeWidth: 2 }}
            activeDot={{ r: 8, className: 'animate-neon' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
