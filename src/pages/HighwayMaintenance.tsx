
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import ChatBot from '@/components/ChatBot';

const HighwayMaintenance = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container px-4 py-6">
        <nav className="flex justify-between items-center mb-8">
          <Logo />
          <div className="flex gap-4">
            <Link to="/" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link to="/about" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              About
            </Link>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 gradient-text">Highway Maintenance Assistant</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-4">
                Our AI-powered assistant can help you with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Pothole detection and analysis</li>
                <li>Maintenance scheduling</li>
                <li>Safety recommendations</li>
                <li>Real-time infrastructure monitoring</li>
              </ul>
              <p className="text-gray-600">
                Feel free to ask questions in English, Hindi, or Punjabi!
              </p>
            </div>
            <div>
              <ChatBot />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighwayMaintenance;
