/**
 * @file BudgetOverview.tsx
 * @author T. Landon Love
 * @copyright (c) 2025 12Stone Designs (12stonedesigns.com)
 */

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useTransactions } from "../../contexts/TransactionContext";

export const BudgetOverview = () => {
  const { monthlyIncome, monthlyExpenses, disposableIncome } = useTransactions();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="neon-card bg-card hover:bg-card/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">Total Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-primary animate-neon" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary glow-text">${disposableIncome.toFixed(2)}</div>
          <p className="text-xs text-primary/70">
            Available balance
          </p>
        </CardContent>
      </Card>
      <Card className="neon-card bg-card hover:bg-card/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">Monthly Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-primary animate-neon" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary glow-text">${monthlyIncome.toFixed(2)}</div>
          <p className="text-xs text-primary/70">
            Total monthly income
          </p>
        </CardContent>
      </Card>
      <Card className="neon-card bg-card hover:bg-card/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">Monthly Expenses</CardTitle>
          <TrendingDown className="h-4 w-4 text-primary animate-neon" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary glow-text">${monthlyExpenses.toFixed(2)}</div>
          <p className="text-xs text-primary/70">
            Total monthly expenses
          </p>
        </CardContent>
      </Card>
      <Card className="neon-card bg-card hover:bg-card/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">Savings</CardTitle>
          <Wallet className="h-4 w-4 text-primary animate-neon" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary glow-text">${Math.max(0, disposableIncome).toFixed(2)}</div>
          <p className="text-xs text-primary/70">
            Potential monthly savings
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
