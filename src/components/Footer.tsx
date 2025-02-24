import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-100 py-4 mt-auto border-t border-zinc-800">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-zinc-400">
          © 2024{' '}
          <a 
            href="https://12stonedesigns.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors underline"
          >
            12Stone Designs
          </a>
          . All rights reserved.
        </div>
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link 
            to="/terms" 
            className="text-zinc-400 hover:text-zinc-300 transition-colors"
          >
            Terms of Service
          </Link>
          <Link 
            to="/privacy" 
            className="text-zinc-400 hover:text-zinc-300 transition-colors"
          >
            Privacy Policy
          </Link>
          <a 
            href="https://www.12stonedesigns.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-300 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
