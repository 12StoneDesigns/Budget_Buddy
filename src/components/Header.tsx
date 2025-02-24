import React from 'react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getButtonClass = (path: string) => {
    const baseClass = "text-zinc-100 hover:text-zinc-300 hover:bg-zinc-800";
    return `${baseClass} ${isActive(path) ? 'bg-zinc-800' : ''}`;
  };

  return (
    <header className="bg-zinc-900 text-zinc-100 py-4 border-b border-zinc-800">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center hover:text-zinc-300 transition-colors">
          <img src="/logo.png" alt="Budget Buddy Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold">Budget Buddy</h1>
        </Link>
        <nav className="space-x-2">
          <Button
            variant="ghost"
            className={getButtonClass('/')}
            asChild
          >
            <Link to="/">Dashboard</Link>
          </Button>
          <Button
            variant="ghost"
            className={getButtonClass('/transactions')}
            asChild
          >
            <Link to="/transactions">Transactions</Link>
          </Button>
          <Button
            variant="ghost"
            className={getButtonClass('/settings')}
            asChild
          >
            <Link to="/settings">Settings</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
