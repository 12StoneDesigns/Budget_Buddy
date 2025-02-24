import { useTransactions } from "../../contexts/TransactionContext";
import { Download, Upload } from "lucide-react";
import { useToast } from "../ui/use-toast";

export const DataControls = () => {
  const { transactions, importTransactions } = useTransactions();
  const { toast } = useToast();

  const handleExport = () => {
    const dataStr = JSON.stringify(transactions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'budget-buddy-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Data exported successfully",
      className: "bg-card border-primary text-primary",
    });
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        importTransactions(data);
        toast({
          title: "Success",
          description: "Data imported successfully",
          className: "bg-card border-primary text-primary",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to import data",
          variant: "destructive",
          className: "bg-card border-destructive text-destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex gap-4">
      <button 
        onClick={handleExport}
        className="data-control-button group"
      >
        <Download className="h-5 w-5 group-hover:text-secondary transition-colors" />
        <span className="group-hover:text-secondary transition-colors">Export Data</span>
      </button>
      <label className="data-control-button cursor-pointer group">
        <Upload className="h-5 w-5 group-hover:text-secondary transition-colors" />
        <span className="group-hover:text-secondary transition-colors">Import Data</span>
        <input
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImport}
        />
      </label>
    </div>
  );
};
