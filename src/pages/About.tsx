
import React from 'react';
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container px-4 py-6">
        <nav className="flex justify-between items-center mb-16">
          <Logo />
          <div className="flex gap-4">
            <Link to="/" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link to="/highway-maintenance" className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </Link>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto">
          <div className="fade-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-4xl font-bold mb-8 gradient-text">About Our Project</h1>
            
            <div className="mb-8">
              <img 
                src="/lovable-uploads/b11e5d19-f782-441d-b5a8-95c30fd21e0d.png" 
                alt="System Architecture" 
                className="w-full rounded-lg shadow-lg mb-8"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Our AI/ML-driven Smart Transport Safety & Maintenance System is designed to enhance transportation safety and infrastructure maintenance by leveraging cutting-edge machine learning and real-time analysis. The system integrates <strong>railway flaw detection, highway maintenance forecasting, and vehicle load monitoring</strong> to prevent accidents, reduce maintenance costs, and improve efficiency.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4">Key Features</h3>
              
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
                  <h4 className="text-xl font-semibold mb-3">🚧 Pothole Detection</h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Uses <strong>a custom ML model for real-time pothole identification</strong>.</li>
                    <li>Assesses severity levels (<strong>Low, Medium, High</strong>).</li>
                    <li>Provides maintenance recommendations.</li>
                  </ul>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
                  <h4 className="text-xl font-semibold mb-3">🚆 Railway Fault Detection</h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Detects <strong>rail cracks, missing clips, broken sleepers, misalignment, and worn rails</strong>.</li>
                    <li>Offers severity analysis and repair suggestions.</li>
                  </ul>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
                  <h4 className="text-xl font-semibold mb-3">📊 Smart System Architecture</h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li><strong>Backend:</strong> Python/Flask with ML models trained on custom datasets.</li>
                    <li><strong>Frontend:</strong> HTML, CSS, JavaScript with an interactive UI.</li>
                    <li><strong>Real-Time Processing:</strong> Image upload & chat-based interface for instant feedback.</li>
                  </ul>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
                  <h4 className="text-xl font-semibold mb-3">💡 How It Works</h4>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-600">
                    <li>User selects <strong>pothole detection</strong> or <strong>railway fault detection</strong> mode.</li>
                    <li>Uploads an image or enters a query.</li>
                    <li>The system processes data using trained ML models.</li>
                    <li>Results include <strong>detected issues, severity levels, and repair recommendations</strong>.</li>
                  </ol>
                </div>
              </div>

              <p className="text-gray-600 mt-8">
                By <strong>automating flaw detection and predictive maintenance</strong>, our solution helps ensure <strong>safer roads, reliable railways, and efficient infrastructure management</strong> for a better tomorrow. 🚀
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default About;
