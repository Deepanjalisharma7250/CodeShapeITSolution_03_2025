
import { useState, useEffect } from 'react';
import LandingPage from '@/components/LandingPage';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDashboard(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {!showDashboard ? (
        <LandingPage onProceed={() => setShowDashboard(true)} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default Index;
