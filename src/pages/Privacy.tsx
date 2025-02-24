import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Privacy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-8 space-y-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">1. Data Collection and Usage</h2>
            <p className="text-muted-foreground">
              Budget Buddy collects and processes financial information that you explicitly provide, 
              including transaction data, income sources, and expense categories. This information is 
              used solely to provide you with budgeting and financial tracking services.
            </p>

            <h2 className="text-2xl font-semibold mb-4">2. Financial Information Security</h2>
            <p className="text-muted-foreground">
              We implement industry-standard security measures to protect your financial data. All 
              sensitive information is encrypted during transmission and storage. We do not share your 
              financial information with third parties without your explicit consent.
            </p>

            <h2 className="text-2xl font-semibold mb-4">3. Data Storage and Retention</h2>
            <p className="text-muted-foreground">
              Your financial data is stored securely and retained only for as long as necessary to 
              provide our services. You can request deletion of your data at any time through your 
              account settings.
            </p>

            <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
            <p className="text-muted-foreground">
              Budget Buddy may integrate with third-party services for enhanced functionality. These 
              integrations are optional, and you will be informed of any data sharing requirements 
              before enabling them.
            </p>

            <h2 className="text-2xl font-semibold mb-4">5. User Rights</h2>
            <p className="text-muted-foreground">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request data deletion</li>
              <li>Export your data</li>
              <li>Opt-out of data collection</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">6. Updates to Privacy Policy</h2>
            <p className="text-muted-foreground">
              We may update this privacy policy periodically. Users will be notified of any significant 
              changes to how we handle personal information.
            </p>
          </section>

          <div className="mt-8 text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
