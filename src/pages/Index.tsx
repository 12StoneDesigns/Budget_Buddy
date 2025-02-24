import { BudgetOverview } from "../components/Dashboard/BudgetOverview";
import { ExpenseChart } from "../components/Dashboard/ExpenseChart";
import { IncomeChart } from "../components/Dashboard/IncomeChart";
import { QuickActions } from "../components/Dashboard/QuickActions";
import { DataControls } from "../components/Dashboard/DataControls";
import { Button } from "../components/ui/button";
import { Moon, Sun, ArrowLeft } from "lucide-react";
import { useTransactions } from "../contexts/TransactionContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Index = () => {
  const { isDarkMode, toggleDarkMode } = useTransactions();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 space-y-8 fade-in bg-background">
        <div className="flex items-center justify-between">
          <a 
            href="https://www.12stonedesigns.com/projects"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </a>
          <div className="flex items-center gap-4">
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
      </main>
      <Footer />
    </div>
  );
};

export default Index;
