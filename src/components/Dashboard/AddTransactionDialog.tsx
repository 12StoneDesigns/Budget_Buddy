/**
 * @file AddTransactionDialog.tsx
 * @author T. Landon Love
 * @copyright (c) 2025 12Stone Designs (12stonedesigns.com)
 */

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "../ui/use-toast";
import { Transaction, TransactionType, Frequency } from "../../lib/transactions";
import { useTransactions } from "../../contexts/TransactionContext";

interface AddTransactionDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const AddTransactionDialog = ({ children, open, onOpenChange }: AddTransactionDialogProps) => {
  const { toast } = useToast();
  const { addTransaction } = useTransactions();
  const [type, setType] = useState<TransactionType>('expense');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState<Frequency>('monthly');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    if (!name || !amount || !type || !frequency) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      type,
      name,
      amount: parseFloat(amount),
      frequency,
      category: category || undefined,
      date: date ? new Date(date) : undefined,
    };

    addTransaction(newTransaction);

    toast({
      title: "Success",
      description: "Transaction added successfully",
    });

    if (onOpenChange) {
      onOpenChange(false);
    }
    resetForm();
  };

  const resetForm = () => {
    setType('expense');
    setName('');
    setAmount('');
    setFrequency('monthly');
    setCategory('');
    setDate('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children || <Button variant="outline">Add Transaction</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground neon-card">
        <DialogHeader>
          <DialogTitle className="text-primary">Add Transaction</DialogTitle>
          <DialogDescription className="text-primary/70">
            Enter the details of your transaction below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right text-primary">
              Type
            </Label>
            <Select value={type} onValueChange={(value: TransactionType) => setType(value)}>
              <SelectTrigger className="col-span-3 bg-background text-primary">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-card text-primary">
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="bill">Bill</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-primary">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3 bg-background text-primary"
              placeholder="Enter name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right text-primary">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3 bg-background text-primary"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="frequency" className="text-right text-primary">
              Frequency
            </Label>
            <Select value={frequency} onValueChange={(value: Frequency) => setFrequency(value)}>
              <SelectTrigger className="col-span-3 bg-background text-primary">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent className="bg-card text-primary">
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right text-primary">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="col-span-3 bg-background text-primary">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-card text-primary">
                <SelectItem value="housing">Housing</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {type === 'bill' && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right text-primary">
                Due Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="col-span-3 bg-background text-primary"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Save Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
