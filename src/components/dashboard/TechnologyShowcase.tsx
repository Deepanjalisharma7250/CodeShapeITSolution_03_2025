
import { useState } from 'react';
import { Code, Database, Shield, Zap, Globe, Smartphone } from 'lucide-react';

const TechnologyShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const technologies = {
    frontend: [
      { name: 'React', description: 'Component-based UI framework', icon: '⚛️', level: 95 },
      { name: 'TypeScript', description: 'Type-safe JavaScript', icon: '📘', level: 90 },
      { name: 'Tailwind CSS', description: 'Utility-first CSS framework', icon: '🎨', level: 92 },
      { name: 'Vite', description: 'Fast build tool and dev server', icon: '⚡', level: 88 }
    ],
    security: [
      { name: 'JWT Authentication', description: 'Secure token-based auth', icon: '🔐', level: 85 },
      { name: 'AES Encryption', description: 'Advanced encryption standard', icon: '🛡️', level: 90 },
      { name: 'OAuth 2.0', description: 'Secure authorization framework', icon: '🔑', level: 87 },
      { name: 'TLS/SSL', description: 'Transport layer security', icon: '🔒', level: 93 }
    ],
    analysis: [
      { name: 'Machine Learning', description: 'Pattern recognition algorithms', icon: '🧠', level: 82 },
      { name: 'Real-time Processing', description: 'Live data stream analysis', icon: '⚡', level: 89 },
      { name: 'Behavioral Analytics', description: 'User behavior pattern detection', icon: '📊', level: 85 },
      { name: 'Risk Scoring', description: 'Dynamic risk assessment', icon: '⚖️', level: 91 }
    ],
    integration: [
      { name: 'REST APIs', description: 'RESTful web services', icon: '🌐', level: 94 },
      { name: 'WebSockets', description: 'Real-time communication', icon: '🔄', level: 87 },
      { name: 'GraphQL', description: 'Flexible query language', icon: '📈', level: 83 },
      { name: 'Microservices', description: 'Distributed architecture', icon: '🏗️', level: 86 }
    ]
  };

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: 'Advanced Security',
      description: 'Multi-layered security architecture with encryption, authentication, and monitoring'
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: 'Real-time Processing',
      description: 'Lightning-fast transaction analysis with millisecond response times'
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      title: 'Global Scale',
      description: 'Designed to handle millions of transactions across multiple regions'
    },
    {
      icon: <Smartphone className="w-8 h-8 text-purple-600" />,
      title: 'Mobile-First',
      description: 'Responsive design optimized for all devices and screen sizes'
    }
  ];

  const categories = [
    { id: 'frontend', name: 'Frontend', icon: <Code className="w-5 h-5" /> },
    { id: 'security', name: 'Security', icon: <Shield className="w-5 h-5" /> },
    { id: 'analysis', name: 'Analysis', icon: <Database className="w-5 h-5" /> },
    { id: 'integration', name: 'Integration', icon: <Globe className="w-5 h-5" /> }
  ];

  return (
    <div className="space-y-8">
      {/* Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Technology Stack */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <Code className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Technology Stack</h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Technology Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {technologies[activeCategory as keyof typeof technologies].map((tech, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors duration-300">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">{tech.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{tech.name}</h3>
                  <p className="text-gray-600 text-sm">{tech.description}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Implementation Level</span>
                  <span className="font-semibold">{tech.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${tech.level}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Overview */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <Database className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">System Architecture</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-blue-50 rounded-xl">
            <h3 className="text-lg font-bold text-blue-800 mb-3">Frontend Layer</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• React-based user interface</li>
              <li>• Real-time dashboard updates</li>
              <li>• Responsive design system</li>
              <li>• Progressive web app features</li>
            </ul>
          </div>

          <div className="p-6 bg-green-50 rounded-xl">
            <h3 className="text-lg font-bold text-green-800 mb-3">Processing Layer</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Machine learning algorithms</li>
              <li>• Rule-based detection engine</li>
              <li>• Behavioral analysis system</li>
              <li>• Risk scoring framework</li>
            </ul>
          </div>

          <div className="p-6 bg-purple-50 rounded-xl">
            <h3 className="text-lg font-bold text-purple-800 mb-3">Security Layer</h3>
            <ul className="space-y-2 text-sm text-purple-700">
              <li>• End-to-end encryption</li>
              <li>• Multi-factor authentication</li>
              <li>• Secure API endpoints</li>
              <li>• Audit logging system</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <Zap className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Performance Metrics</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">&lt; 100ms</div>
            <div className="text-gray-600">Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">1M+</div>
            <div className="text-gray-600">Transactions/Day</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">98.5%</div>
            <div className="text-gray-600">Accuracy Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyShowcase;
