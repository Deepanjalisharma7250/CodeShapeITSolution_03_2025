
import { useState, useEffect } from 'react';
import { MapPin, Smartphone, Monitor, AlertTriangle, CheckCircle } from 'lucide-react';

interface LocationData {
  id: string;
  location: string;
  coordinates: string;
  device: string;
  time: string;
  status: 'trusted' | 'new' | 'suspicious';
  transactionAmount?: number;
}

const GeolocationTracking = () => {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    const mockLocations: LocationData[] = [
      {
        id: '1',
        location: 'New York, NY',
        coordinates: '40.7128° N, 74.0060° W',
        device: 'iPhone 13',
        time: '2 minutes ago',
        status: 'trusted',
        transactionAmount: 85.50
      },
      {
        id: '2', 
        location: 'Los Angeles, CA',
        coordinates: '34.0522° N, 118.2437° W',
        device: 'MacBook Pro',
        time: '1 hour ago',
        status: 'new',
        transactionAmount: 1250.00
      },
      {
        id: '3',
        location: 'Unknown Location (VPN)',
        coordinates: 'Hidden',
        device: 'Unknown Device',
        time: '30 minutes ago',
        status: 'suspicious',
        transactionAmount: 5000.00
      },
      {
        id: '4',
        location: 'Chicago, IL',
        coordinates: '41.8781° N, 87.6298° W',
        device: 'Samsung Galaxy',
        time: '3 hours ago',
        status: 'trusted',
        transactionAmount: 42.80
      }
    ];
    
    setLocations(mockLocations);
    setSelectedLocation(mockLocations[0]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'trusted':
        return 'border-green-500 bg-green-50';
      case 'new':
        return 'border-yellow-500 bg-yellow-50';
      case 'suspicious':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'trusted':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'new':
        return <MapPin className="w-5 h-5 text-yellow-500" />;
      case 'suspicious':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <MapPin className="w-5 h-5 text-gray-500" />;
    }
  };

  const getDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes('iphone') || device.toLowerCase().includes('samsung')) {
      return <Smartphone className="w-4 h-4" />;
    }
    return <Monitor className="w-4 h-4" />;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Map Visualization */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <MapPin className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Transaction Locations</h2>
          </div>
          
          {/* Mock Map */}
          <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-xl h-96 overflow-hidden">
            <div className="absolute inset-0 bg-gray-200 opacity-20"></div>
            
            {/* Mock location pins */}
            <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              <div className="text-xs bg-white px-2 py-1 rounded shadow mt-1">NY</div>
            </div>
            
            <div className="absolute top-1/2 left-1/6 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              <div className="text-xs bg-white px-2 py-1 rounded shadow mt-1">LA</div>
            </div>
            
            <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              <div className="text-xs bg-white px-2 py-1 rounded shadow mt-1">???</div>
            </div>
            
            <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              <div className="text-xs bg-white px-2 py-1 rounded shadow mt-1">CHI</div>
            </div>
            
            <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow">
              <div className="text-sm font-semibold text-gray-800 mb-2">Legend</div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Trusted Location</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span>New Location</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span>Suspicious Location</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Details */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Locations</h3>
          <div className="space-y-3">
            {locations.map((location) => (
              <div
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                className={`p-3 rounded-lg border-l-4 cursor-pointer transition-all duration-300 ${getStatusColor(location.status)} ${
                  selectedLocation?.id === location.id ? 'ring-2 ring-blue-300' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    {getStatusIcon(location.status)}
                    <span className="font-semibold text-sm ml-2">{location.location}</span>
                  </div>
                  <span className="text-xs text-gray-600">{location.time}</span>
                </div>
                <div className="flex items-center text-xs text-gray-600">
                  {getDeviceIcon(location.device)}
                  <span className="ml-1">{location.device}</span>
                </div>
                {location.transactionAmount && (
                  <div className="text-xs font-semibold text-gray-800 mt-1">
                    ₹{location.transactionAmount.toFixed(2)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {selectedLocation && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Location Details</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-semibold text-gray-600">Location:</span>
                <p className="text-gray-800">{selectedLocation.location}</p>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-600">Coordinates:</span>
                <p className="text-gray-800 font-mono text-sm">{selectedLocation.coordinates}</p>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-600">Device:</span>
                <p className="text-gray-800">{selectedLocation.device}</p>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-600">Status:</span>
                <div className="flex items-center mt-1">
                  {getStatusIcon(selectedLocation.status)}
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                    selectedLocation.status === 'trusted' ? 'bg-green-100 text-green-800' :
                    selectedLocation.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedLocation.status.toUpperCase()}
                  </span>
                </div>
              </div>
              {selectedLocation.transactionAmount && (
                <div>
                  <span className="text-sm font-semibold text-gray-600">Transaction:</span>
                  <p className="text-lg font-bold text-gray-800">₹{selectedLocation.transactionAmount.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeolocationTracking;
