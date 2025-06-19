
import { useState, useEffect } from 'react';
import Header from './dashboard/Header';
import TransactionMonitoring from './dashboard/TransactionMonitoring';
import BehavioralAnalysis from './dashboard/BehavioralAnalysis';
import MFADemo from './dashboard/MFADemo';
import GeolocationTracking from './dashboard/GeolocationTracking';
import MLPrediction from './dashboard/MLPrediction';
import RuleBasedDetection from './dashboard/RuleBasedDetection';
import TechnologyShowcase from './dashboard/TechnologyShowcase';
import AlertSystem from './dashboard/AlertSystem';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('monitoring');
  const [showMFA, setShowMFA] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Alert System */}
        <AlertSystem />
        
        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 p-2">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'monitoring', label: 'Transaction Monitoring' },
              { id: 'behavioral', label: 'Behavioral Analysis' },
              { id: 'geolocation', label: 'Geolocation Tracking' },
              { id: 'ml-prediction', label: 'ML Prediction' },
              { id: 'rules', label: 'Rule-Based Detection' },
              { id: 'technology', label: 'Technology Stack' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <button
              onClick={() => setShowMFA(true)}
              className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Demo MFA
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'monitoring' && <TransactionMonitoring />}
          {activeTab === 'behavioral' && <BehavioralAnalysis />}
          {activeTab === 'geolocation' && <GeolocationTracking />}
          {activeTab === 'ml-prediction' && <MLPrediction />}
          {activeTab === 'rules' && <RuleBasedDetection />}
          {activeTab === 'technology' && <TechnologyShowcase />}
        </div>
      </div>

      {/* MFA Modal */}
      {showMFA && <MFADemo onClose={() => setShowMFA(false)} />}
    </div>
  );
};

export default Dashboard;
