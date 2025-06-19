
import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Clock, X } from 'lucide-react';

interface Alert {
  id: string;
  type: 'high' | 'medium' | 'low';
  message: string;
  time: string;
  isRead: boolean;
}

const AlertSystem = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showAlerts, setShowAlerts] = useState(true);

  useEffect(() => {
    const initialAlerts: Alert[] = [
      {
        id: '1',
        type: 'high',
        message: 'Suspicious transaction detected: ₹50,000 from unknown location',
        time: '2 min ago',
        isRead: false
      },
      {
        id: '2',
        type: 'medium',
        message: 'Multiple rapid transactions detected from same card',
        time: '5 min ago',
        isRead: false
      },
      {
        id: '3',
        type: 'low',
        message: 'New device detected for user account',
        time: '10 min ago',
        isRead: true
      }
    ];

    setAlerts(initialAlerts);

    // Simulate new alerts
    const interval = setInterval(() => {
      const newAlert: Alert = {
        id: Date.now().toString(),
        type: Math.random() > 0.7 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low',
        message: 'New security event detected',
        time: 'now',
        isRead: false
      };

      setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getAlertConfig = (type: string) => {
    switch (type) {
      case 'high':
        return {
          color: 'border-red-500 bg-red-50',
          textColor: 'text-red-800',
          icon: <AlertTriangle className="w-5 h-5 text-red-500" />
        };
      case 'medium':
        return {
          color: 'border-yellow-500 bg-yellow-50',
          textColor: 'text-yellow-800',
          icon: <Clock className="w-5 h-5 text-yellow-500" />
        };
      case 'low':
        return {
          color: 'border-green-500 bg-green-50',
          textColor: 'text-green-800',
          icon: <CheckCircle className="w-5 h-5 text-green-500" />
        };
      default:
        return {
          color: 'border-gray-500 bg-gray-50',
          textColor: 'text-gray-800',
          icon: <CheckCircle className="w-5 h-5 text-gray-500" />
        };
    }
  };

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
  };

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  if (!showAlerts || alerts.length === 0) {
    return (
      <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
            <span className="text-green-800 font-semibold">All systems operational - No active alerts</span>
          </div>
          <button
            onClick={() => setShowAlerts(false)}
            className="text-green-600 hover:text-green-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  return (
    <div className="mb-6">
      {/* Alert Header */}
      <div className="bg-white rounded-t-2xl shadow-lg p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
            <h3 className="text-lg font-bold text-gray-800">Security Alerts</h3>
            {unreadCount > 0 && (
              <span className="ml-3 px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                {unreadCount} new
              </span>
            )}
          </div>
          <button
            onClick={() => setShowAlerts(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Alert List */}
      <div className="bg-white rounded-b-2xl shadow-lg max-h-64 overflow-y-auto">
        {alerts.map((alert) => {
          const config = getAlertConfig(alert.type);
          
          return (
            <div
              key={alert.id}
              className={`p-4 border-l-4 ${config.color} ${!alert.isRead ? 'border-r-4 border-r-blue-300' : ''} border-b border-gray-100 last:border-b-0`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  {config.icon}
                  <div className="ml-3 flex-1">
                    <p className={`${config.textColor} font-medium text-sm`}>
                      {alert.message}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">{alert.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {!alert.isRead && (
                    <button
                      onClick={() => markAsRead(alert.id)}
                      className="text-blue-600 hover:text-blue-800 text-xs font-semibold"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertSystem;
