/**
 * @file ExpenseChart.tsx
 * @author T. Landon Love
 * @copyright (c) 2025 12Stone Designs (12stonedesigns.com)
 */

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTransactions } from '../../contexts/TransactionContext';

export const ExpenseChart = () => {
  const { transactions } = useTransactions();
  
  const expenseData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc: { name: string; value: number }[], curr) => {
      const existingCategory = acc.find(item => item.name === (curr.category || 'Other'));
      if (existingCategory) {
        existingCategory.value += curr.amount;
      } else {
        acc.push({ name: curr.category || 'Other', value: curr.amount });
      }
      return acc;
    }, []);

  const emptyData = [{ name: 'No Expenses', value: 1 }];
  const COLORS = ['#00F3FF', '#39FF14', '#FF00E5', '#FFA500', '#FF1493'];

  const chartData = expenseData.length > 0 ? expenseData : emptyData;

  return (
    <div className="h-[300px] w-full p-4">
      <h3 className="text-lg font-semibold mb-4 text-primary animate-neon">Expense Breakdown</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]}
                className="animate-neon"
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => `$${value.toFixed(2)}`}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              borderColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary))',
            }}
          />
          <Legend 
            formatter={(value) => <span className="text-primary">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
