
import { useState, useEffect } from 'react';
import { User, TrendingUp, AlertCircle, BarChart3 } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  avgTransaction: number;
  frequency: number;
  preferredTime: string;
  riskScore: number;
  recentBehavior: 'normal' | 'unusual' | 'suspicious';
}

const BehavioralAnalysis = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const mockProfiles: UserProfile[] = [
      {
        id: '1',
        name: 'John Smith',
        avgTransaction: 150,
        frequency: 5,
        preferredTime: '6-8 PM',
        riskScore: 15,
        recentBehavior: 'normal'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        avgTransaction: 320,
        frequency: 12,
        preferredTime: '12-2 PM',
        riskScore: 45,
        recentBehavior: 'unusual'
      },
      {
        id: '3',
        name: 'Mike Wilson',
        avgTransaction: 2500,
        frequency: 25,
        preferredTime: '3 AM',
        riskScore: 85,
        recentBehavior: 'suspicious'
      },
      {
        id: '4',
        name: 'Emma Davis',
        avgTransaction: 80,
        frequency: 3,
        preferredTime: '7-9 AM',
        riskScore: 10,
        recentBehavior: 'normal'
      }
    ];
    setProfiles(mockProfiles);
    setSelectedProfile(mockProfiles[0]);
  }, []);

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-600 bg-green-100';
    if (score < 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getBehaviorIcon = (behavior: string) => {
    switch (behavior) {
      case 'normal':
        return <User className="w-5 h-5 text-green-500" />;
      case 'unusual':
        return <TrendingUp className="w-5 h-5 text-yellow-500" />;
      case 'suspicious':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <User className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* User Profiles List */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <User className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-xl font-bold text-gray-800">User Profiles</h2>
        </div>
        
        <div className="space-y-4">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              onClick={() => setSelectedProfile(profile)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                selectedProfile?.id === profile.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {getBehaviorIcon(profile.recentBehavior)}
                  <span className="font-semibold text-gray-800 ml-2">{profile.name}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRiskColor(profile.riskScore)}`}>
                  {profile.riskScore}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Avg: ₹{profile.avgTransaction} • {profile.frequency}/week
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="lg:col-span-2 space-y-6">
        {selectedProfile && (
          <>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <BarChart3 className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-800">
                  Behavioral Analysis - {selectedProfile.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Transaction Patterns</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average Amount:</span>
                        <span className="font-semibold">₹{selectedProfile.avgTransaction}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weekly Frequency:</span>
                        <span className="font-semibold">{selectedProfile.frequency} transactions</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Preferred Time:</span>
                        <span className="font-semibold">{selectedProfile.preferredTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Risk Assessment</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Risk Score</span>
                          <span>{selectedProfile.riskScore}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              selectedProfile.riskScore < 30 ? 'bg-green-500' :
                              selectedProfile.riskScore < 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{width: `${selectedProfile.riskScore}%`}}
                          ></div>
                        </div>
                      </div>
                      <div className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                        selectedProfile.recentBehavior === 'normal' ? 'bg-green-100 text-green-800' :
                        selectedProfile.recentBehavior === 'unusual' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        Recent Behavior: {selectedProfile.recentBehavior.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Anomaly Detection</h3>
                    <div className="space-y-3">
                      {selectedProfile.recentBehavior === 'suspicious' && (
                        <div className="p-3 bg-red-100 border border-red-200 rounded-lg">
                          <div className="flex items-center mb-2">
                            <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                            <span className="text-sm font-semibold text-red-800">High Risk Alert</span>
                          </div>
                          <ul className="text-xs text-red-700 space-y-1">
                            <li>• Unusual transaction time (3 AM)</li>
                            <li>• Amount 10x higher than average</li>
                            <li>• New merchant category</li>
                          </ul>
                        </div>
                      )}
                      
                      {selectedProfile.recentBehavior === 'unusual' && (
                        <div className="p-3 bg-yellow-100 border border-yellow-200 rounded-lg">
                          <div className="flex items-center mb-2">
                            <TrendingUp className="w-4 h-4 text-yellow-500 mr-2" />
                            <span className="text-sm font-semibold text-yellow-800">Pattern Change</span>
                          </div>
                          <ul className="text-xs text-yellow-700 space-y-1">
                            <li>• Frequency increased by 200%</li>
                            <li>• Different location pattern</li>
                          </ul>
                        </div>
                      )}

                      {selectedProfile.recentBehavior === 'normal' && (
                        <div className="p-3 bg-green-100 border border-green-200 rounded-lg">
                          <div className="flex items-center mb-2">
                            <User className="w-4 h-4 text-green-500 mr-2" />
                            <span className="text-sm font-semibold text-green-800">Normal Behavior</span>
                          </div>
                          <p className="text-xs text-green-700">
                            All patterns match historical behavior
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BehavioralAnalysis;
