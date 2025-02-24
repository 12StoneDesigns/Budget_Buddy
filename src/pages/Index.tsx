import { BudgetOverview } from "../components/Dashboard/BudgetOverview";
import { ExpenseChart } from "../components/Dashboard/ExpenseChart";
import { IncomeChart } from "../components/Dashboard/IncomeChart";
import { QuickActions } from "../components/Dashboard/QuickActions";
import { DataControls } from "../components/Dashboard/DataControls";
import { Button } from "../components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTransactions } from "../contexts/TransactionContext";

const Index = () => {
  const { isDarkMode, toggleDarkMode } = useTransactions();

  return (
    <div className="container mx-auto p-4 space-y-8 fade-in bg-background">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="logo-container">
            <img 
              src="/logo.png" 
              alt="Budget Buddy Logo" 
              className="h-16 w-16 object-contain rounded-lg logo-glow"
            />
          </div>
          <h1 className="heading-primary animate-neon text-4xl md:text-5xl font-extrabold tracking-tighter">
            Budget Buddy
          </h1>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleDarkMode} 
            className="text-primary hover:text-secondary border-primary hover:border-secondary transition-colors"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <DataControls />
        </div>
      </div>
      
      <div className="neon-card p-6">
        <BudgetOverview />
      </div>
      
      <div className="neon-card p-6">
        <QuickActions />
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="neon-card p-6">
          <h2 className="heading-secondary mb-4">Expense Breakdown</h2>
          <ExpenseChart />
        </div>
        <div className="neon-card p-6">
          <h2 className="heading-secondary mb-4">Income Overview</h2>
          <IncomeChart />
        </div>
      </div>
    </div>
  );
};

export default Index;
