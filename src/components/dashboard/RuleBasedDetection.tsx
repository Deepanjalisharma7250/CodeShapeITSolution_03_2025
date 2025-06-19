
import { useState, useEffect } from 'react';
import { Shield, Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';

interface Rule {
  id: string;
  name: string;
  condition: string;
  threshold: number;
  action: 'flag' | 'block' | 'review';
  isActive: boolean;
  triggeredCount: number;
}

interface TriggeredTransaction {
  id: string;
  amount: number;
  merchant: string;
  ruleTriggered: string;
  time: string;
  action: string;
}

const RuleBasedDetection = () => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [triggeredTransactions, setTriggeredTransactions] = useState<TriggeredTransaction[]>([]);
  const [isAddingRule, setIsAddingRule] = useState(false);
  const [newRule, setNewRule] = useState({
    name: '',
    condition: 'amount_greater_than',
    threshold: 0,
    action: 'flag' as 'flag' | 'block' | 'review'
  });

  useEffect(() => {
    const defaultRules: Rule[] = [
      {
        id: '1',
        name: 'High Amount Alert',
        condition: 'Amount > ₹',
        threshold: 10000,
        action: 'flag',
        isActive: true,
        triggeredCount: 15
      },
      {
        id: '2',
        name: 'Rapid Transactions',
        condition: 'Transactions in 1 min >',
        threshold: 3,
        action: 'block',
        isActive: true,
        triggeredCount: 8
      },
      {
        id: '3',
        name: 'International Transaction',
        condition: 'International location',
        threshold: 1,
        action: 'review',
        isActive: true,
        triggeredCount: 23
      },
      {
        id: '4',
        name: 'Late Night Activity',
        condition: 'Time between 2-5 AM',
        threshold: 1,
        action: 'flag',
        isActive: false,
        triggeredCount: 42
      },
      {
        id: '5',
        name: 'New Merchant',
        condition: 'First time merchant',
        threshold: 1,
        action: 'review',
        isActive: true,
        triggeredCount: 67
      }
    ];

    const mockTriggeredTransactions: TriggeredTransaction[] = [
      {
        id: '1',
        amount: 15000,
        merchant: 'Luxury Electronics',
        ruleTriggered: 'High Amount Alert',
        time: '2 min ago',
        action: 'Flagged'
      },
      {
        id: '2',
        amount: 500,
        merchant: 'Coffee Shop A',
        ruleTriggered: 'Rapid Transactions',
        time: '5 min ago',
        action: 'Blocked'
      },
      {
        id: '3',
        amount: 2500,
        merchant: 'International Store',
        ruleTriggered: 'International Transaction',
        time: '8 min ago',
        action: 'Under Review'
      },
      {
        id: '4',
        amount: 750,
        merchant: 'Unknown Vendor',
        ruleTriggered: 'New Merchant',
        time: '12 min ago',
        action: 'Under Review'
      }
    ];

    setRules(defaultRules);
    setTriggeredTransactions(mockTriggeredTransactions);
  }, []);

  const addRule = () => {
    if (newRule.name && newRule.threshold > 0) {
      const rule: Rule = {
        id: Date.now().toString(),
        name: newRule.name,
        condition: `${newRule.condition.replace('_', ' ')} ₹`,
        threshold: newRule.threshold,
        action: newRule.action,
        isActive: true,
        triggeredCount: 0
      };
      
      setRules([...rules, rule]);
      setNewRule({ name: '', condition: 'amount_greater_than', threshold: 0, action: 'flag' });
      setIsAddingRule(false);
    }
  };

  const toggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    ));
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'flag':
        return 'bg-yellow-100 text-yellow-800';
      case 'block':
        return 'bg-red-100 text-red-800';
      case 'review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Rules Management */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Shield className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Detection Rules</h2>
            </div>
            <button
              onClick={() => setIsAddingRule(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Rule
            </button>
          </div>

          {/* Add Rule Form */}
          {isAddingRule && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Create New Rule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Rule Name"
                  value={newRule.name}
                  onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <select
                  value={newRule.condition}
                  onChange={(e) => setNewRule({...newRule, condition: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg"
                >
                  <option value="amount_greater_than">Amount Greater Than</option>
                  <option value="transactions_per_minute">Transactions Per Minute</option>
                  <option value="velocity_check">Velocity Check</option>
                </select>
                <input
                  type="number"
                  placeholder="Threshold Value"
                  value={newRule.threshold}
                  onChange={(e) => setNewRule({...newRule, threshold: Number(e.target.value)})}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <select
                  value={newRule.action}
                  onChange={(e) => setNewRule({...newRule, action: e.target.value as 'flag' | 'block' | 'review'})}
                  className="p-3 border border-gray-300 rounded-lg"
                >
                  <option value="flag">Flag Transaction</option>
                  <option value="block">Block Transaction</option>
                  <option value="review">Send for Review</option>
                </select>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => setIsAddingRule(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={addRule}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Rule
                </button>
              </div>
            </div>
          )}

          {/* Rules List */}
          <div className="space-y-4">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  rule.isActive ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full mr-3 ${
                        rule.isActive ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    ></div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{rule.name}</h3>
                      <p className="text-sm text-gray-600">
                        {rule.condition} {rule.threshold}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getActionColor(rule.action)}`}>
                      {rule.action.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-600">
                      {rule.triggeredCount} triggers
                    </span>
                    <button
                      onClick={() => toggleRule(rule.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        rule.isActive 
                          ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteRule(rule.id)}
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Triggered Transactions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
          <h3 className="text-lg font-bold text-gray-800">Recent Triggers</h3>
        </div>
        
        <div className="space-y-4">
          {triggeredTransactions.map((transaction) => (
            <div key={transaction.id} className="p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800">₹{transaction.amount}</span>
                <span className="text-xs text-gray-600">{transaction.time}</span>
              </div>
              <div className="text-sm text-gray-600 mb-2">{transaction.merchant}</div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-red-600 font-semibold">
                  {transaction.ruleTriggered}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  transaction.action === 'Flagged' ? 'bg-yellow-100 text-yellow-800' :
                  transaction.action === 'Blocked' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {transaction.action}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Rule Statistics */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-4">Today's Statistics</h4>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Rules Active:</span>
              <span className="font-semibold">{rules.filter(r => r.isActive).length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Rules Triggered:</span>
              <span className="font-semibold text-red-600">47</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Transactions Blocked:</span>
              <span className="font-semibold text-red-600">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">False Positives:</span>
              <span className="font-semibold text-yellow-600">3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuleBasedDetection;
