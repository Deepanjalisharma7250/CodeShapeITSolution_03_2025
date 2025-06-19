
import { useState, useEffect } from 'react';
import { CreditCard, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  merchant: string;
  location: string;
  time: string;
  status: 'normal' | 'suspicious' | 'flagged';
  cardLast4: string;
}

const TransactionMonitoring = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const generateTransaction = (): Transaction => {
    const merchants = ['Amazon', 'Walmart', 'Target', 'Best Buy', 'Starbucks', 'Gas Station', 'Restaurant XYZ', 'Online Store'];
    const locations = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ', 'Unknown Location'];
    
    const amount = Math.random() > 0.8 ? Math.random() * 5000 + 1000 : Math.random() * 500 + 10;
    const isLargeAmount = amount > 1000;
    const isUnknownLocation = Math.random() > 0.7;
    
    let status: 'normal' | 'suspicious' | 'flagged' = 'normal';
    if (isLargeAmount && isUnknownLocation) status = 'flagged';
    else if (isLargeAmount || isUnknownLocation) status = 'suspicious';

    return {
      id: Math.random().toString(36).substr(2, 9),
      amount,
      merchant: merchants[Math.floor(Math.random() * merchants.length)],
      location: isUnknownLocation ? 'Unknown Location' : locations[Math.floor(Math.random() * locations.length)],
      time: new Date().toLocaleTimeString(),
      status,
      cardLast4: Math.floor(Math.random() * 9999).toString().padStart(4, '0')
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTransactions(prev => {
        const newTransaction = generateTransaction();
        return [newTransaction, ...prev.slice(0, 9)]; // Keep last 10 transactions
      });
    }, 3000);

    // Initial transactions
    const initialTransactions = Array.from({ length: 5 }, generateTransaction);
    setTransactions(initialTransactions);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'suspicious':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'flagged':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'border-l-green-500 bg-green-50';
      case 'suspicious':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'flagged':
        return 'border-l-red-500 bg-red-50';
      default:
        return 'border-l-green-500 bg-green-50';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Real-time Feed */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <CreditCard className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Live Transaction Feed</h2>
            <div className="ml-auto flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm text-gray-600">Live</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`border-l-4 p-4 rounded-lg transition-all duration-500 ${getStatusColor(transaction.status)} ${
                  index === 0 ? 'animate-slide-in-right' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getStatusIcon(transaction.status)}
                    <div className="ml-3">
                      <div className="font-semibold text-gray-800">
                        ₹{transaction.amount.toFixed(2)} - {transaction.merchant}
                      </div>
                      <div className="text-sm text-gray-600">
                        Card ending in {transaction.cardLast4} • {transaction.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">{transaction.time}</div>
                    <div className={`text-xs font-semibold capitalize ${
                      transaction.status === 'normal' ? 'text-green-600' :
                      transaction.status === 'suspicious' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {transaction.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Statistics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Transactions</span>
              <span className="font-bold text-gray-800">1,247</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Flagged</span>
              <span className="font-bold text-red-600">23</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Suspicious</span>
              <span className="font-bold text-yellow-600">89</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Normal</span>
              <span className="font-bold text-green-600">1,135</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Fraud Detection Rate</h3>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full" style={{width: '98.2%'}}></div>
            </div>
            <div className="text-center mt-2">
              <span className="text-2xl font-bold text-gray-800">98.2%</span>
              <p className="text-sm text-gray-600">Accuracy Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionMonitoring;
