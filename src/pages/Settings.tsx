import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { useTransactions } from '../contexts/TransactionContext';
import { Bell, DollarSign, Mail, Shield, Moon } from 'lucide-react';

const Settings = () => {
  const { isDarkMode, toggleDarkMode } = useTransactions();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 space-y-6 md:space-y-8 bg-background">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">Settings</h1>

        <div className="grid gap-6 md:gap-8">
          {/* Appearance */}
          <Card className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
              <Moon className="h-5 w-5" />
              Appearance
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="flex-grow">Dark Mode</Label>
                <Switch
                  id="dark-mode"
                  checked={isDarkMode}
                  onCheckedChange={toggleDarkMode}
                />
              </div>
            </div>
          </Card>

          {/* Currency Settings */}
          <Card className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Currency Settings
            </h2>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select defaultValue="USD">
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="budget-alerts" className="flex-grow">Budget Alerts</Label>
                <Switch id="budget-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="payment-reminders" className="flex-grow">Payment Reminders</Label>
                <Switch id="payment-reminders" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="weekly-summary" className="flex-grow">Weekly Summary</Label>
                <Switch id="weekly-summary" defaultChecked />
              </div>
            </div>
          </Card>

          {/* Email Preferences */}
          <Card className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="marketing-emails" className="flex-grow">Marketing Emails</Label>
                <Switch id="marketing-emails" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="newsletter" className="flex-grow">Newsletter</Label>
                <Switch id="newsletter" defaultChecked />
              </div>
            </div>
          </Card>

          {/* Security */}
          <Card className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="two-factor" className="flex-grow">Two-Factor Authentication</Label>
                <Switch id="two-factor" />
              </div>
              <Button variant="outline" className="w-full">Change Password</Button>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="w-full md:w-auto px-8">Save Changes</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
