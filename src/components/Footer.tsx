import React from 'react';
import { Github, Twitter, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">About</h3>
            <p className="text-gray-600 text-sm">
              A transparent and fair lottery system built on World Chain, powered by Pyth Entropy.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">How It Works</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">Responsible Gaming</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm">support@lottowin.com</li>
              <li className="text-gray-600 text-sm">Discord Community</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Lotto Win. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;