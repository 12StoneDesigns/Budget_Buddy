import { useTransactions } from "../../contexts/TransactionContext";
import { Download, Upload } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { Transaction, TransactionType, Frequency } from "../../lib/transactions";
import * as XLSX from 'xlsx';

export const DataControls = () => {
  const { transactions, importTransactions } = useTransactions();
  const { toast } = useToast();

  const handleExport = (format: 'json' | 'excel') => {
    const exportData = transactions.map(transaction => ({
      ...transaction,
      date: transaction.date?.toISOString(),
      startDate: transaction.startDate?.toISOString(),
      endDate: transaction.endDate?.toISOString()
    }));

    if (format === 'json') {
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'budget-buddy-data.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else if (format === 'excel') {
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Transactions");
      XLSX.writeFile(wb, "budget-buddy-data.xlsx");
    }

    toast({
      title: "Success",
      description: `Data exported successfully as ${format.toUpperCase()}`,
      className: "bg-card border-primary text-primary",
    });
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        let data: unknown[];
        if (file.name.endsWith('.json')) {
          data = JSON.parse(e.target?.result as string);
        } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
          const workbook = XLSX.read(e.target?.result, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          data = XLSX.utils.sheet_to_json(worksheet);
        } else {
          throw new Error('Unsupported file format');
        }
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format: expected an array');
        }

        // Validate raw data structure
        const isValidRawTransaction = (t: unknown): t is {
          id: string;
          type: TransactionType;
          name: string;
          amount: number;
          frequency: Frequency;
          date?: string;
          startDate?: string;
          endDate?: string;
          category?: string;
          isRecurring?: boolean;
        } => {
          if (typeof t !== 'object' || t === null) return false;
          const obj = t as Record<string, unknown>;
          
          return typeof obj.id === 'string' &&
                 ['income', 'expense', 'bill'].includes(obj.type as string) &&
                 typeof obj.name === 'string' &&
                 typeof obj.amount === 'number' &&
                 ['daily', 'weekly', 'monthly', 'yearly'].includes(obj.frequency as string) &&
                 (obj.date === undefined || typeof obj.date === 'string') &&
                 (obj.startDate === undefined || typeof obj.startDate === 'string') &&
                 (obj.endDate === undefined || typeof obj.endDate === 'string') &&
                 (obj.category === undefined || typeof obj.category === 'string') &&
                 (obj.isRecurring === undefined || typeof obj.isRecurring === 'boolean');
        };

        if (!data.every(isValidRawTransaction)) {
          throw new Error('Invalid transaction data structure');
        }

        // Convert validated data to Transaction objects
        const processedData = data.map(transaction => ({
          ...transaction,
          date: transaction.date ? new Date(transaction.date) : undefined,
          startDate: transaction.startDate ? new Date(transaction.startDate) : undefined,
          endDate: transaction.endDate ? new Date(transaction.endDate) : undefined
        }));

        importTransactions(processedData as Transaction[]);
        toast({
          title: "Success",
          description: "Data imported successfully",
          className: "bg-card border-primary text-primary",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to import data",
          variant: "destructive",
          className: "bg-card border-destructive text-destructive",
        });
      }
    };
    
    if (file.name.endsWith('.json')) {
      reader.readAsText(file);
    } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      reader.readAsBinaryString(file);
    } else {
      toast({
        title: "Error",
        description: "Unsupported file format",
        variant: "destructive",
        className: "bg-card border-destructive text-destructive",
      });
    }
  };

  return (
    <div className="flex gap-4">
      <button 
        onClick={() => handleExport('json')}
        className="data-control-button group"
      >
        <Download className="h-5 w-5 group-hover:text-secondary transition-colors" />
        <span className="group-hover:text-secondary transition-colors">Export JSON</span>
      </button>
      <button 
        onClick={() => handleExport('excel')}
        className="data-control-button group"
      >
        <Download className="h-5 w-5 group-hover:text-secondary transition-colors" />
        <span className="group-hover:text-secondary transition-colors">Export Excel</span>
      </button>
      <label className="data-control-button cursor-pointer group">
        <Upload className="h-5 w-5 group-hover:text-secondary transition-colors" />
        <span className="group-hover:text-secondary transition-colors">Import Data</span>
        <input
          type="file"
          accept=".json,.xlsx,.xls"
          className="hidden"
          onChange={handleImport}
        />
      </label>
    </div>
  );
};
