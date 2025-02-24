import { Plus, ArrowUpDown, PiggyBank, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { AddTransactionDialog } from "./AddTransactionDialog";
import { useState } from "react";

export const QuickActions = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <AddTransactionDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-24 neon-card bg-card hover:bg-primary/10 transition-all w-full group pulse-button"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="h-6 w-6 mb-2 text-primary animate-neon group-hover:scale-110 transition-transform" />
          <span className="text-primary font-semibold group-hover:text-secondary transition-colors">
            Add Transaction
          </span>
        </Button>
      </AddTransactionDialog>
      <Button
        variant="outline"
        className="flex flex-col items-center justify-center h-24 neon-card bg-card hover:bg-primary/10 transition-all group"
        disabled
      >
        <ArrowUpDown className="h-6 w-6 mb-2 text-primary/50 group-hover:text-primary/70 transition-colors" />
        <span className="text-primary/50 group-hover:text-primary/70 transition-colors">Transfer</span>
      </Button>
      <Button
        variant="outline"
        className="flex flex-col items-center justify-center h-24 neon-card bg-card hover:bg-primary/10 transition-all group"
        disabled
      >
        <PiggyBank className="h-6 w-6 mb-2 text-primary/50 group-hover:text-primary/70 transition-colors" />
        <span className="text-primary/50 group-hover:text-primary/70 transition-colors">Save</span>
      </Button>
      <Button
        variant="outline"
        className="flex flex-col items-center justify-center h-24 neon-card bg-card hover:bg-primary/10 transition-all group"
        disabled
      >
        <Settings className="h-6 w-6 mb-2 text-primary/50 group-hover:text-primary/70 transition-colors" />
        <span className="text-primary/50 group-hover:text-primary/70 transition-colors">Settings</span>
      </Button>
    </div>
  );
};
