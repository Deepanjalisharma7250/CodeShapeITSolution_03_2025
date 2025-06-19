
import { useState, useEffect } from 'react';
import { Brain, TrendingUp, Zap, BarChart3 } from 'lucide-react';

interface PredictionData {
  fraudProbability: number;
  confidenceLevel: number;
  riskFactors: string[];
  recommendation: string;
}

const MLPrediction = () => {
  const [transactionData, setTransactionData] = useState({
    amount: 1500,
    merchant: 'Online Electronics Store',
    location: 'Unknown',
    time: '3:30 AM',
    cardType: 'Credit'
  });
  
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const calculateFraudProbability = () => {
    let score = 0;
    const factors: string[] = [];

    // Amount-based scoring
    if (transactionData.amount > 2000) {
      score += 30;
      factors.push('High transaction amount');
    } else if (transactionData.amount > 1000) {
      score += 15;
      factors.push('Above-average transaction amount');
    }

    // Location-based scoring
    if (transactionData.location === 'Unknown') {
      score += 25;
      factors.push('Unknown transaction location');
    }

    // Time-based scoring
    const hour = parseInt(transactionData.time.split(':')[0]);
    if (hour >= 2 && hour <= 5) {
      score += 20;
      factors.push('Unusual transaction time (late night)');
    }

    // Merchant-based scoring
    if (transactionData.merchant.toLowerCase().includes('online')) {
      score += 10;
      factors.push('Online merchant (higher risk category)');
    }

    // Random factors for demo
    if (Math.random() > 0.7) {
      score += 15;
      factors.push('Velocity check: Multiple transactions detected');
    }

    if (Math.random() > 0.8) {
      score += 20;
      factors.push('Device fingerprint: Unrecognized device');
    }

    const fraudProbability = Math.min(score, 95);
    const confidenceLevel = Math.max(85, 100 - Math.abs(50 - fraudProbability));

    let recommendation = '';
    if (fraudProbability < 30) {
      recommendation = 'APPROVE - Low risk transaction';
    } else if (fraudProbability < 60) {
      recommendation = 'REVIEW - Moderate risk, require additional verification';
    } else {
      recommendation = 'DECLINE - High fraud probability detected';
    }

    return {
      fraudProbability,
      confidenceLevel,
      riskFactors: factors,
      recommendation
    };
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = calculateFraudProbability();
      setPrediction(result);
      setIsAnalyzing(false);
    }, 2000);
  };

  useEffect(() => {
    runAnalysis();
  }, []);

  const getProbabilityColor = (probability: number) => {
    if (probability < 30) return 'text-green-600';
    if (probability < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProbabilityBg = (probability: number) => {
    if (probability < 30) return 'from-green-500 to-green-600';
    if (probability < 60) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Panel */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <Brain className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">ML Fraud Prediction</h2>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Transaction Amount</label>
            <input
              type="number"
              value={transactionData.amount}
              onChange={(e) => setTransactionData({...transactionData, amount: Number(e.target.value)})}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Merchant</label>
            <select
              value={transactionData.merchant}
              onChange={(e) => setTransactionData({...transactionData, merchant: e.target.value})}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option>Online Electronics Store</option>
              <option>Local Restaurant</option>
              <option>Gas Station</option>
              <option>ATM Withdrawal</option>
              <option>Unknown Merchant</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Location</label>
            <select
              value={transactionData.location}
              onChange={(e) => setTransactionData({...transactionData, location: e.target.value})}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option>Home City</option>
              <option>Nearby City</option>
              <option>Different State</option>
              <option>International</option>
              <option>Unknown</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Transaction Time</label>
            <select
              value={transactionData.time}
              onChange={(e) => setTransactionData({...transactionData, time: e.target.value})}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option>9:00 AM</option>
              <option>2:00 PM</option>
              <option>6:00 PM</option>
              <option>11:00 PM</option>
              <option>3:30 AM</option>
            </select>
          </div>
        </div>

        <button
          onClick={runAnalysis}
          disabled={isAnalyzing}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 transition-all duration-300"
        >
          {isAnalyzing ? 'Analyzing...' : 'Run ML Analysis'}
        </button>
      </div>

      {/* Results Panel */}
      <div className="space-y-6">
        {prediction && (
          <>
            {/* Fraud Probability Gauge */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Zap className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-800">Fraud Probability</h3>
              </div>
              
              <div className="relative">
                <div className="w-32 h-32 mx-auto mb-4">
                  <div className="relative w-full h-full">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${prediction.fraudProbability * 2.51} 251`}
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor={prediction.fraudProbability < 30 ? '#10b981' : prediction.fraudProbability < 60 ? '#f59e0b' : '#ef4444'} />
                          <stop offset="100%" stopColor={prediction.fraudProbability < 30 ? '#059669' : prediction.fraudProbability < 60 ? '#d97706' : '#dc2626'} />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getProbabilityColor(prediction.fraudProbability)}`}>
                          {prediction.fraudProbability}%
                        </div>
                        <div className="text-xs text-gray-600">Risk Score</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="mb-2">
                    <span className="text-sm text-gray-600">Confidence Level: </span>
                    <span className="font-semibold">{prediction.confidenceLevel}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Factors */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-5 h-5 text-red-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-800">Risk Factors Detected</h3>
              </div>
              
              <div className="space-y-2">
                {prediction.riskFactors.length > 0 ? (
                  prediction.riskFactors.map((factor, index) => (
                    <div key={index} className="flex items-center p-2 bg-red-50 rounded-lg">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                      <span className="text-sm text-red-800">{factor}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center p-2 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm text-green-800">No significant risk factors detected</span>
                  </div>
                )}
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-800">ML Recommendation</h3>
              </div>
              
              <div className={`p-4 rounded-lg ${
                prediction.recommendation.includes('APPROVE') ? 'bg-green-100 border border-green-200' :
                prediction.recommendation.includes('REVIEW') ? 'bg-yellow-100 border border-yellow-200' :
                'bg-red-100 border border-red-200'
              }`}>
                <p className={`font-semibold ${
                  prediction.recommendation.includes('APPROVE') ? 'text-green-800' :
                  prediction.recommendation.includes('REVIEW') ? 'text-yellow-800' :
                  'text-red-800'
                }`}>
                  {prediction.recommendation}
                </p>
              </div>
            </div>
          </>
        )}

        {isAnalyzing && (
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Running ML fraud detection algorithms...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MLPrediction;
