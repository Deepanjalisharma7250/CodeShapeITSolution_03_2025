
import { useState } from 'react';
import { X, Shield, Smartphone, Eye, Key } from 'lucide-react';

interface MFADemoProps {
  onClose: () => void;
}

const MFADemo = ({ onClose }: MFADemoProps) => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleOTPSubmit = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep(step + 1);
    }, 2000);
  };

  const handleBiometric = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep(step + 1);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="text-center mb-6">
          <Shield className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-gray-800">Multi-Factor Authentication</h2>
          <p className="text-gray-600 text-sm">Secure access verification demo</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {num}
              </div>
              {num < 4 && (
                <div className={`w-8 h-1 ${step > num ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[200px]">
          {step === 1 && (
            <div className="text-center">
              <Smartphone className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">SMS Verification</h3>
              <p className="text-gray-600 mb-4">Enter the 6-digit code sent to your phone</p>
              <input
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg text-center text-2xl font-mono mb-4"
                maxLength={6}
              />
              <button
                onClick={handleOTPSubmit}
                disabled={otp.length !== 6 || isVerifying}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
              >
                {isVerifying ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <Eye className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Biometric Authentication</h3>
              <p className="text-gray-600 mb-6">Scan your fingerprint or use face recognition</p>
              <div className="relative mb-6">
                <div className="w-24 h-24 border-4 border-green-600 rounded-full mx-auto flex items-center justify-center">
                  <div className={`w-16 h-16 bg-green-600 rounded-full ${isVerifying ? 'animate-pulse' : ''}`}></div>
                </div>
                {isVerifying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <button
                onClick={handleBiometric}
                disabled={isVerifying}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 transition-colors"
              >
                {isVerifying ? 'Scanning...' : 'Start Biometric Scan'}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <Key className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Security Question</h3>
              <p className="text-gray-600 mb-4">What was the name of your first pet?</p>
              <input
                type="text"
                placeholder="Enter your answer"
                className="w-full p-3 border-2 border-gray-200 rounded-lg mb-4"
              />
              <button
                onClick={() => setStep(4)}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Submit Answer
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-600 mb-2">Authentication Successful!</h3>
              <p className="text-gray-600 mb-6">Your identity has been verified successfully</p>
              <button
                onClick={onClose}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Continue to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MFADemo;
