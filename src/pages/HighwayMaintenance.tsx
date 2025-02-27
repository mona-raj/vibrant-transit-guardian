
import React from 'react';
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";

const HighwayMaintenance = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container px-4 py-6">
        <nav className="flex justify-between items-center mb-16">
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

        <main>
          <div className="max-w-3xl mx-auto text-center mb-16 fade-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-4xl font-bold mb-6 gradient-text">Highway Maintenance</h1>
            <p className="text-xl text-gray-600">
              Smart forecasting and monitoring system for efficient road maintenance and safety.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HighwayMaintenance;
