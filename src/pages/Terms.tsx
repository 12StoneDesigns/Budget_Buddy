import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 space-y-6 md:space-y-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8">Terms of Service</h1>
          
          <section className="space-y-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground text-sm md:text-base">
              By using Budget Buddy, you agree to these Terms of Service. If you do not agree, please do not use our service.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">2. Service Description</h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Budget Buddy is a personal finance management tool that helps users track expenses, set budgets, and analyze financial habits.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">3. User Responsibilities</h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Users are responsible for:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground text-sm md:text-base">
              <li>Providing accurate financial information</li>
              <li>Maintaining the confidentiality of their account</li>
              <li>Complying with all applicable laws and regulations</li>
              <li>Using the service for personal, non-commercial purposes only</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">4. Financial Data Accuracy</h2>
            <p className="text-muted-foreground text-sm md:text-base">
              While we strive to provide accurate calculations and insights, users are responsible for verifying all financial information and decisions. Budget Buddy is not a substitute for professional financial advice.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">5. Account Security</h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Users are responsible for maintaining the security of their account credentials. We recommend using strong passwords and enabling two-factor authentication when available.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">6. Limitation of Liability</h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Budget Buddy is provided "as is" without any warranties. We are not liable for any financial losses or damages resulting from the use of our service.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">7. Service Modifications</h2>
            <p className="text-muted-foreground text-sm md:text-base">
              We reserve the right to modify, suspend, or discontinue any part of our service at any time. We will provide notice of significant changes when possible.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">8. Termination</h2>
            <p className="text-muted-foreground text-sm md:text-base">
              We reserve the right to terminate or suspend access to our service for any reason, including violation of these Terms of Service.
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

export default Terms;
