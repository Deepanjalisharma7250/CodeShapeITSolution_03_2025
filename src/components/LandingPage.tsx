
import { useEffect, useState } from 'react';
import { Shield, ArrowRight, Clock } from 'lucide-react';

interface LandingPageProps {
  onProceed: () => void;
}

const LandingPage = ({ onProceed }: LandingPageProps) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 text-green-400 mr-4" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              SecureGuard
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-blue-200">
            Credit Card Fraud Detection System
          </h2>
          <p className="text-lg md:text-xl text-blue-300 max-w-3xl mx-auto leading-relaxed">
            Advanced AI-powered fraud detection technology protecting your digital transactions 
            with real-time monitoring, behavioral analysis, and intelligent threat prevention.
          </p>
        </div>

        {/* Project Images */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <img 
              src="/lovable-uploads/4701bc51-e4b7-48cd-8d6d-919f88f9d75d.png" 
              alt="CodeShape IT Solution Logo" 
              className="w-64 h-auto rounded-lg shadow-2xl"
            />
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <img 
              src="/lovable-uploads/7f5287d7-8370-4415-a6cc-2e48eca4be56.png" 
              alt="CodeShape IT Solution - Shaping The Future Of Coding" 
              className="w-64 h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>

        {/* Key Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-time Monitoring</h3>
            <p className="text-blue-200 text-sm">24/7 transaction surveillance with instant threat detection</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI-Powered Analysis</h3>
            <p className="text-blue-200 text-sm">Machine learning algorithms for pattern recognition</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
            <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Multi-Factor Security</h3>
            <p className="text-blue-200 text-sm">Advanced authentication and device verification</p>
          </div>
        </div>

        {/* Countdown and CTA */}
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-green-400 mr-3" />
              <span className="text-2xl font-bold">Redirecting to Dashboard</span>
            </div>
            <div className="text-4xl font-mono font-bold text-green-400 mb-4">
              {countdown}s
            </div>
            <button
              onClick={onProceed}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center mx-auto"
            >
              Enter Dashboard Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
          <p className="text-blue-300 text-sm">
            Experience cutting-edge fraud detection technology in action
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
